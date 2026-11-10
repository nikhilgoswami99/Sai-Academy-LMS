"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type LoginResult =
  | { success: true; redirectTo: "/admin" | "/student" }
  | { success: false; message: string };

type StudentIdentity = { studentId: string; profileId: string };

const genericLoginFailure =
  "Sign-in failed. Check your email or roll number and password and try again.";

async function getRoleNames(
  admin: ReturnType<typeof createAdminClient>,
  userId: string,
): Promise<string[] | null> {
  const { data: assignments, error: assignmentError } = await admin
    .from("user_roles")
    .select("role_id")
    .eq("user_id", userId);
  if (assignmentError || !assignments?.length) return null;

  const { data: roles, error: rolesError } = await admin
    .from("roles")
    .select("name")
    .in(
      "id",
      assignments.map(({ role_id }) => role_id),
    );
  if (rolesError || !roles) return null;
  return roles.map(({ name }) => name);
}

async function getActiveStudentForRoll(
  admin: ReturnType<typeof createAdminClient>,
  rollNumber: string,
): Promise<StudentIdentity | null> {
  const { data: currentYears, error: yearsError } = await admin
    .from("academic_years")
    .select("id")
    .eq("is_current", true);
  if (yearsError || !currentYears?.length) return null;

  const { data: enrollments, error: enrollmentError } = await admin
    .from("student_enrollments")
    .select("student_id")
    .eq("roll_number", rollNumber)
    .eq("status", "active")
    .in(
      "academic_year_id",
      currentYears.map(({ id }) => id),
    )
    .limit(2);
  // A roll must resolve to exactly one active enrollment in the current year.
  if (enrollmentError || enrollments?.length !== 1) return null;

  const { data: student, error: studentError } = await admin
    .from("students")
    .select("id,profile_id")
    .eq("id", enrollments[0].student_id)
    .maybeSingle();
  if (studentError || !student || typeof student.profile_id !== "string")
    return null;

  const { data: profile, error: profileError } = await admin
    .from("profiles")
    .select("id,status")
    .eq("id", student.profile_id)
    .maybeSingle();
  if (
    profileError ||
    !profile ||
    profile.id !== student.profile_id ||
    profile.status !== "active"
  )
    return null;

  return {
    studentId: String(student.id),
    profileId: student.profile_id,
  };
}

async function signInWithEmail(
  email: string,
  password: string,
): Promise<LoginResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { success: false, message: genericLoginFailure };

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    await supabase.auth.signOut();
    return { success: false, message: genericLoginFailure };
  }

  try {
    const admin = createAdminClient();
    const { data: profile, error: profileError } = await admin
      .from("profiles")
      .select("status")
      .eq("id", user.id)
      .maybeSingle();
    const roles =
      profile?.status === "active" ? await getRoleNames(admin, user.id) : null;
    if (
      !profileError &&
      profile?.status === "active" &&
      roles?.includes("super_admin")
    ) {
      return { success: true, redirectTo: "/admin" };
    }
  } catch {
    // Use the same response for missing, inactive, and unrecognized accounts.
  }

  await supabase.auth.signOut();
  return { success: false, message: genericLoginFailure };
}

async function signInWithRollNumber(
  rollNumber: string,
  password: string,
): Promise<LoginResult> {
  const supabase = await createClient();
  const admin = createAdminClient();

  // Resolve the roll number only on the server. The students.profile_id FK
  // points to profiles.id, which in turn is the Auth user ID.
  const student = await getActiveStudentForRoll(admin, rollNumber);
  if (!student) return { success: false, message: genericLoginFailure };

  const roles = await getRoleNames(admin, student.profileId);
  if (!roles?.includes("student"))
    return { success: false, message: genericLoginFailure };

  // Read phone from the linked auth.users identity, never from browser input
  // or the student_contact field.
  const { data: authResult, error: authLookupError } =
    await admin.auth.admin.getUserById(student.profileId);
  const authUser = authResult?.user;
  const authPhone = authUser?.phone;
  if (
    authLookupError ||
    !authUser ||
    authUser.id !== student.profileId ||
    !authPhone
  ) {
    return { success: false, message: genericLoginFailure };
  }

  const { data: signedIn, error: signInError } =
    await supabase.auth.signInWithPassword({
      phone: authPhone,
      password,
    });
  if (signInError || !signedIn.user || signedIn.user.id !== student.profileId) {
    await supabase.auth.signOut();
    return { success: false, message: genericLoginFailure };
  }

  // Recheck authorization after authentication so stale or changed enrollment
  // state cannot receive a student session.
  const verifiedStudent = await getActiveStudentForRoll(admin, rollNumber);
  const verifiedRoles = await getRoleNames(admin, signedIn.user.id);
  if (
    !verifiedStudent ||
    verifiedStudent.studentId !== student.studentId ||
    verifiedStudent.profileId !== signedIn.user.id ||
    !verifiedRoles?.includes("student")
  ) {
    await supabase.auth.signOut();
    return { success: false, message: genericLoginFailure };
  }

  return { success: true, redirectTo: "/student" };
}

export async function signInWithIdentifier(
  identifierInput: unknown,
  passwordInput: unknown,
): Promise<LoginResult> {
  if (
    typeof identifierInput !== "string" ||
    typeof passwordInput !== "string"
  ) {
    return { success: false, message: genericLoginFailure };
  }

  const identifier = identifierInput.trim();
  const password = passwordInput;
  if (
    !identifier ||
    !password ||
    identifier.length > 254 ||
    password.length > 1024
  ) {
    return { success: false, message: genericLoginFailure };
  }

  try {
    if (identifier.includes("@")) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
        return { success: false, message: genericLoginFailure };
      }
      return await signInWithEmail(identifier, password);
    }

    const rollNumber = identifier.toUpperCase();
    if (!/^[A-Z0-9-]+$/.test(rollNumber)) {
      return { success: false, message: genericLoginFailure };
    }
    return await signInWithRollNumber(rollNumber, password);
  } catch {
    return { success: false, message: genericLoginFailure };
  }
}
