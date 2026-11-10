import type { SupabaseClient, User } from "@supabase/supabase-js";

export function getStudentAuthEmail(profileId: string): string;
export function resolveStudentAuthByRollNumber(admin: SupabaseClient, rollNumber: string): Promise<{
  studentId: string;
  profileId: string;
  rollNumber: string;
  studentName: string;
}>;
export function migrateStudentAuthProfile(
  admin: SupabaseClient,
  profileId: string,
  knownEmailOwners?: Map<string, string>,
): Promise<{ status: "migrated" | "already_migrated" | "conflict" | "failed"; user?: User; targetEmail?: string }>;
