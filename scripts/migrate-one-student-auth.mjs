import { createClient } from "@supabase/supabase-js";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { migrateStudentAuthProfile, resolveStudentAuthByRollNumber, getStudentAuthEmail } from "../lib/auth/student-auth-migration.mjs";

const rollInput = process.argv[2]?.trim().toUpperCase();
if (!rollInput || !/^[A-Z0-9-]+$/.test(rollInput)) {
  console.error("Usage: node --env-file=.env.local scripts/migrate-one-student-auth.mjs <ROLL_NUMBER>");
  process.exit(2);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRoleKey) {
  console.error("Missing Supabase server configuration. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.");
  process.exit(2);
}

const admin = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
});

try {
  const student = await resolveStudentAuthByRollNumber(admin, rollInput);
  const { data, error } = await admin.auth.admin.getUserById(student.profileId);
  const user = data?.user;
  if (error || !user || user.id !== student.profileId) throw new Error("The linked Auth user could not be verified.");

  const targetEmail = getStudentAuthEmail(student.profileId);
  console.log("Student account migration preview");
  console.log(`Student: ${student.studentName}`);
  console.log(`Roll number: ${student.rollNumber}`);
  console.log(`Profile/Auth UUID: ${student.profileId}`);
  console.log(`Current Auth email: ${user.email ?? "not set"}`);
  console.log(`Current Auth email confirmed: ${user.email_confirmed_at ? "yes" : "no"}`);
  console.log(`Current Auth phone: ${user.phone ? "present" : "not set"}`);
  console.log(`Current Auth phone confirmed: ${user.phone_confirmed_at ? "yes" : "no"}`);
  console.log(`Target internal email: ${targetEmail}`);

  if (user.email?.toLowerCase() === targetEmail.toLowerCase() && user.email_confirmed_at) {
    console.log("No change needed; this account is already migrated.");
    process.exit(0);
  }

  const expected = `MIGRATE ${student.rollNumber} ${student.profileId}`;
  const readline = createInterface({ input: stdin, output: stdout });
  let confirmation;
  try {
    confirmation = await readline.question(`\nTo update this existing Auth user, type exactly:\n${expected}\n> `);
  } finally {
    readline.close();
  }
  if (confirmation.trim() !== expected) {
    console.log("Confirmation did not match. No Auth user was changed.");
    process.exit(1);
  }

  const result = await migrateStudentAuthProfile(admin, student.profileId);
  if (result.status !== "migrated" && result.status !== "already_migrated") {
    throw new Error(result.status === "conflict"
      ? "The target internal email belongs to another Auth user. No change was made."
      : "Migration or post-update verification failed. Check the Auth user before retrying.");
  }

  const { data: verifiedData, error: verifiedError } = await admin.auth.admin.getUserById(student.profileId);
  const verifiedUser = verifiedData?.user;
  if (verifiedError || !verifiedUser || verifiedUser.id !== student.profileId ||
      verifiedUser.email?.toLowerCase() !== targetEmail.toLowerCase() || !verifiedUser.email_confirmed_at) {
    throw new Error("Post-update verification did not match. Check the Auth user before retrying.");
  }

  console.log(result.status === "already_migrated" ? "Account was already migrated." : "Migration completed and email was verified.");
  console.log(`Auth user UUID preserved: ${verifiedUser.id === student.profileId ? "yes" : "no"}`);
  console.log("Password preserved: yes; the update request changed only email and email_confirm, and never supplied a password.");
} catch (error) {
  console.error(error instanceof Error ? error.message : "Migration failed. No credentials or passwords were logged.");
  process.exitCode = 1;
}
