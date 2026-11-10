"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSuperAdminContext } from "@/lib/auth/super-admin";
import { studentAdminUpdateSchema, studentAdmissionSchema } from "@/lib/validation/student";
import { getStudentAuthEmail, migrateStudentAuthProfile } from "@/lib/auth/student-auth-migration.mjs";

export type AdmissionOption = { id: string; label: string };
export type StudentAdmissionOptionsResult =
  | { success: true; classes: AdmissionOption[]; boards: AdmissionOption[]; academicYears: AdmissionOption[] }
  | { success: false; message: string };

export type CreateStudentAdmissionResult =
  | { success: true; studentId: string; rollNumber: string }
  | { success: false; code: "unauthenticated" | "unauthorized" | "authorization_check_failed" | "invalid_input" | "options_unavailable" | "auth_creation_failed" | "admission_failed" | "admission_outcome_uncertain"; message: string; fieldErrors?: Record<string, string[]> };

type AuthorizedClientResult =
  | { success: true; supabase: Awaited<ReturnType<typeof createClient>>; admin: ReturnType<typeof createAdminClient> }
  | { success: false; code: "unauthenticated" | "unauthorized" | "authorization_check_failed"; message: string };

async function getAuthorizedAdminClient(): Promise<AuthorizedClientResult> {
  const auth = await getSuperAdminContext();
  if (auth.success) return { success: true, supabase: auth.supabase, admin: auth.admin };
  if (auth.authenticated) return { success: false, code: "unauthorized", message: auth.message };
  return {
    success: false,
    code: auth.message.startsWith("Sign in") ? "unauthenticated" : "authorization_check_failed",
    message: auth.message,
  };
}

type Row = Record<string, unknown>;
function asRows(data: unknown): Row[] {
  return Array.isArray(data) ? data.filter((row): row is Row => Boolean(row) && typeof row === "object") : [];
}
function rowLabel(row: Row): string {
  const label = ["name", "class_name", "board_name", "title", "label", "year", "academic_year", "code"]
    .map((key) => row[key]).find((value) => typeof value === "string" || typeof value === "number");
  return label === undefined ? "" : String(label);
}
function optionsFrom(data: unknown): AdmissionOption[] {
  return asRows(data).flatMap((row) => {
    const id = row.id;
    const label = rowLabel(row);
    return typeof id === "string" && label ? [{ id, label }] : [];
  });
}
function isActive(row: Row): boolean {
  return row.is_active === true || row.active === true ||
    (typeof row.status === "string" && row.status.toLowerCase() === "active");
}
function courseName(row: Row): string {
  return [row.name, row.course_name, row.title].find((value): value is string => typeof value === "string") ?? "";
}
function getAdmissionResult(data: unknown): { studentId: string; rollNumber: string } | null {
  const row = Array.isArray(data) ? data[0] : data;
  if (!row || typeof row !== "object") return null;
  const record = row as Record<string, unknown>;
  const studentId = record.student_id ?? record.studentId ?? record.id;
  const rollNumber = record.roll_number ?? record.student_roll_number ?? record.rollNumber;
  return typeof studentId === "string" && typeof rollNumber === "string" && rollNumber.trim()
    ? { studentId, rollNumber }
    : null;
}
async function removeCreatedAuthUser(admin: ReturnType<typeof createAdminClient>, userId: string): Promise<boolean> {
  try {
    const { error } = await admin.auth.admin.deleteUser(userId);
    return !error;
  } catch {
    return false;
  }
}

export type AdminStudentRecord = {
  id: string;
  name: string;
  rollNumber: string;
  className: string;
  boardName: string;
  schoolName: string;
  studentContact: string;
  courseName: string;
  academicYear: string;
  currentYear: boolean;
  admissionDate: string;
  learningMode: string;
  admissionStatus: string;
  accountStatus: string;
  dateOfBirth: string;
  profilePictureUrl: string;
  lastYearPercentage: string;
  fatherName: string;
  motherName: string;
  parentOccupation: string;
  parentEducation: string;
  parentContact: string;
  email: string;
  address: string;
  admissionSource: string;
};

function textValue(row: Row | null | undefined, ...keys: string[]): string {
  if (!row) return "";
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" || typeof value === "number") return String(value);
  }
  return "";
}

function relatedRow(rows: Row[], id: unknown): Row | undefined {
  return typeof id === "string" ? rows.find((row) => row.id === id) : undefined;
}

function studentEnrollmentFor(studentId: string, enrollments: Row[], currentYearIds: Set<string>): Row | undefined {
  const own = enrollments.filter((row) => row.student_id === studentId || row.studentId === studentId);
  return own.find((row) => currentYearIds.has(String(row.academic_year_id)) && String(row.status ?? "active").toLowerCase() === "active")
    ?? own.find((row) => currentYearIds.has(String(row.academic_year_id)))
    ?? own.sort((a, b) => textValue(b, "admission_date", "created_at").localeCompare(textValue(a, "admission_date", "created_at")))[0];
}

function courseEnrollmentFor(studentId: string, enrollment: Row | undefined, courseEnrollments: Row[]): Row | undefined {
  return courseEnrollments.find((row) =>
    row.student_id === studentId || row.studentId === studentId ||
    (enrollment && (row.student_enrollment_id === enrollment.id || row.enrollment_id === enrollment.id)),
  );
}

function mapAdminStudent(
  student: Row,
  enrollment: Row | undefined,
  courseEnrollment: Row | undefined,
  currentYearIds: Set<string>,
  tables: { classes: Row[]; boards: Row[]; academicYears: Row[]; courses: Row[]; profiles: Row[] },
): AdminStudentRecord {
  const classRow = relatedRow(tables.classes, enrollment?.class_id ?? student.class_id);
  const boardRow = relatedRow(tables.boards, enrollment?.board_id ?? student.board_id);
  const yearRow = relatedRow(tables.academicYears, enrollment?.academic_year_id);
  const courseId = courseEnrollment?.course_id ?? enrollment?.course_id;
  const courseRow = relatedRow(tables.courses, courseId);
  const profile = relatedRow(tables.profiles, student.profile_id);
  const accountStatus = textValue(profile, "status") || "Unknown";
  return {
    id: textValue(student, "id"),
    name: textValue(student, "full_name", "name", "student_name") || "Unnamed student",
    rollNumber: textValue(enrollment, "roll_number", "student_roll_number", "rollNumber"),
    className: textValue(classRow, "name", "class_name", "code", "label") || textValue(enrollment, "class_name"),
    boardName: textValue(boardRow, "name", "board_name", "code", "label") || textValue(enrollment, "board_name"),
    schoolName: textValue(student, "school_name"),
    studentContact: textValue(student, "student_contact", "phone", "contact"),
    courseName: textValue(courseRow, "name", "course_name", "title") || textValue(courseEnrollment, "course_name"),
    academicYear: textValue(yearRow, "name", "academic_year", "year", "label"),
    currentYear: Boolean(enrollment && currentYearIds.has(String(enrollment.academic_year_id))),
    admissionDate: textValue(enrollment, "admission_date"),
    learningMode: textValue(enrollment, "learning_mode"),
    admissionStatus: textValue(enrollment, "status") || "No enrollment",
    accountStatus,
    dateOfBirth: textValue(student, "date_of_birth"),
    profilePictureUrl: textValue(student, "profile_picture_url"),
    lastYearPercentage: textValue(student, "last_year_percentage"),
    fatherName: textValue(student, "father_name"),
    motherName: textValue(student, "mother_name"),
    parentOccupation: textValue(student, "parent_occupation"),
    parentEducation: textValue(student, "parent_education"),
    parentContact: textValue(student, "parent_contact"),
    email: textValue(student, "email"),
    address: textValue(student, "address"),
    admissionSource: textValue(student, "admission_source"),
  };
}

export type AdminStudentListResult =
  | { success: true; students: AdminStudentRecord[] }
  | { success: false; message: string };

export async function getAdminStudents(): Promise<AdminStudentListResult> {
  const auth = await getAuthorizedAdminClient();
  if (!auth.success) return { success: false, message: auth.message };

  try {
    const [studentsResult, enrollmentsResult, yearsResult, classesResult, boardsResult, coursesResult, courseEnrollmentsResult, profilesResult] = await Promise.all([
      auth.supabase.from("students").select("*"),
      auth.supabase.from("student_enrollments").select("*"),
      auth.supabase.from("academic_years").select("*"),
      auth.supabase.from("classes").select("*"),
      auth.supabase.from("boards").select("*"),
      auth.supabase.from("courses").select("*"),
      auth.supabase.from("course_enrollments").select("*"),
      auth.supabase.from("profiles").select("id,status"),
    ]);
    if (studentsResult.error || enrollmentsResult.error || yearsResult.error) {
      return { success: false, message: "Student records could not be loaded from Supabase. Check the server key and table access, then try again." };
    }

    const students = asRows(studentsResult.data);
    const enrollments = asRows(enrollmentsResult.data);
    const currentYearIds = new Set(asRows(yearsResult.data).filter((row) => row.is_current === true).map((row) => String(row.id)));
    const tables = {
      classes: asRows(classesResult.data),
      boards: asRows(boardsResult.data),
      academicYears: asRows(yearsResult.data),
      courses: asRows(coursesResult.data),
      profiles: asRows(profilesResult.data),
    };
    const courseEnrollments = asRows(courseEnrollmentsResult.data);
    return {
      success: true,
      students: students.map((student) => {
        const id = String(student.id ?? "");
        const enrollment = studentEnrollmentFor(id, enrollments, currentYearIds);
        const courseEnrollment = courseEnrollmentFor(id, enrollment, courseEnrollments);
        return mapAdminStudent(student, enrollment, courseEnrollment, currentYearIds, tables);
      }),
    };
  } catch {
    return { success: false, message: "Student records could not be loaded. Check the Supabase server configuration and try again." };
  }
}

export type AdminDashboardSummary = {
  success: boolean;
  message?: string;
  activeStudents: number | null;
  currentYearStudents: number | null;
  classCounts: Array<{ className: string; count: number }>;
  activeTeachers: number | null;
  crashCourseEnrollments: number | null;
};

export async function getAdminDashboardSummary(): Promise<AdminDashboardSummary> {
  const auth = await getAuthorizedAdminClient();
  if (!auth.success) {
    return { success: false, message: auth.message, activeStudents: null, currentYearStudents: null, classCounts: [], activeTeachers: null, crashCourseEnrollments: null };
  }
  const result = await getAdminStudents();
  if (!result.success) {
    return { success: false, message: result.message, activeStudents: null, currentYearStudents: null, classCounts: [], activeTeachers: null, crashCourseEnrollments: null };
  }
  const activeStudents = result.students.filter((student) => student.accountStatus.toLowerCase() === "active" && student.admissionStatus.toLowerCase() === "active");
  const currentYearStudents = activeStudents.filter((student) => student.currentYear);
  const classCounts = new Map<string, number>();
  for (const student of currentYearStudents) {
    const label = student.className || "Class not set";
    classCounts.set(label, (classCounts.get(label) ?? 0) + 1);
  }
  let activeTeachers: number | null = null;
  try {
    const { data, error } = await auth.supabase.from("teachers").select("*");
    if (!error) activeTeachers = asRows(data).filter((row) => row.is_active === true || row.active === true || String(row.status ?? "").toLowerCase() === "active").length;
  } catch {
    activeTeachers = null;
  }
  return {
    success: true,
    activeStudents: activeStudents.length,
    currentYearStudents: currentYearStudents.length,
    classCounts: [...classCounts.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([className, count]) => ({ className, count })),
    activeTeachers,
    crashCourseEnrollments: currentYearStudents.filter((student) => student.courseName.toLowerCase().includes("crash course")).length,
  };
}

export async function updateAdminStudent(studentIdInput: unknown, submitted: unknown) {
  const auth = await getAuthorizedAdminClient();
  if (!auth.success) return { success: false as const, message: auth.message };
  if (typeof studentIdInput !== "string" || !/^[0-9a-f-]{36}$/i.test(studentIdInput)) {
    return { success: false as const, message: "Select a valid student record." };
  }
  const parsed = studentAdminUpdateSchema.safeParse(submitted);
  if (!parsed.success) return { success: false as const, message: "Check the student details and try again.", fieldErrors: parsed.error.flatten().fieldErrors };

  try {
    const { data: studentData, error: studentError } = await auth.supabase.from("students").select("*").eq("id", studentIdInput).maybeSingle();
    if (studentError || !studentData) return { success: false as const, message: "Student record could not be found." };
    const student = studentData as Row;
    const profileId = textValue(student, "profile_id");
    if (!profileId) return { success: false as const, message: "This student has no linked login account." };

    const values = parsed.data;
    const entries: Array<[string[], unknown]> = [
      [["full_name", "name", "student_name"], values.fullName],
      [["school_name"], values.schoolName],
      [["date_of_birth"], values.dateOfBirth ?? null],
      [["profile_picture_url"], values.profilePictureUrl ?? null],
      [["last_year_percentage"], values.lastYearPercentage ?? null],
      [["father_name"], values.fatherName ?? null],
      [["mother_name"], values.motherName ?? null],
      [["parent_occupation"], values.parentOccupation ?? null],
      [["parent_education"], values.parentEducation ?? null],
      [["parent_contact"], values.parentContact ?? null],
      [["email"], values.email ?? null],
      [["address"], values.address ?? null],
      [["admission_source"], values.admissionSource ?? null],
    ];
    const updates: Row = {};
    for (const [candidates, value] of entries) {
      const column = candidates.find((candidate) => candidate in student);
      if (column) updates[column] = value;
    }
    const contactColumn = ["student_contact", "phone", "contact"].find((candidate) => candidate in student);
    if (!contactColumn) return { success: false as const, message: "The student contact column is not available in the current database schema." };
    updates[contactColumn] = values.studentContact;

    const { error: updateError } = await auth.supabase.from("students").update(updates).eq("id", studentIdInput);
    if (updateError) {
      return { success: false as const, message: "Student details could not be saved. No academic enrollment history was changed." };
    }

    revalidatePath("/admin/students");
    revalidatePath("/admin");
    return { success: true as const };
  } catch {
    return { success: false as const, message: "Student details could not be saved. Check the Supabase server configuration and try again." };
  }
}

export async function setAdminStudentActive(studentIdInput: unknown, active: unknown) {
  const auth = await getAuthorizedAdminClient();
  if (!auth.success) return { success: false as const, message: auth.message };
  if (typeof studentIdInput !== "string" || !/^[0-9a-f-]{36}$/i.test(studentIdInput) || typeof active !== "boolean") {
    return { success: false as const, message: "Select a valid student account." };
  }
  try {
    const { data: student, error: studentError } = await auth.supabase.from("students").select("profile_id").eq("id", studentIdInput).maybeSingle();
    if (studentError || !student || typeof student.profile_id !== "string") return { success: false as const, message: "The linked student account could not be found." };
    const { data: updatedProfile, error } = await auth.supabase.from("profiles").update({ status: active ? "active" : "inactive" }).eq("id", student.profile_id).select("id").maybeSingle();
    if (error || !updatedProfile) return { success: false as const, message: "Account status could not be updated. The student and enrollment history were preserved." };
    revalidatePath("/admin/students");
    revalidatePath("/admin");
    return { success: true as const };
  } catch {
    return { success: false as const, message: "Account status could not be updated. Check the Supabase server configuration and try again." };
  }
}

export type StudentAuthMigrationResult = {
  success: boolean;
  dryRun: boolean;
  eligible: number;
  alreadyMigrated: number;
  migrated: number;
  conflicts: number;
  failed: number;
  message?: string;
};

/** Super-admin-only, repeatable migration. Defaults to dry-run. */
export async function migrateStudentAuthEmails(dryRunInput: unknown = true): Promise<StudentAuthMigrationResult> {
  const auth = await getAuthorizedAdminClient();
  const dryRun = dryRunInput !== false;
  const empty = { success: false, dryRun, eligible: 0, alreadyMigrated: 0, migrated: 0, conflicts: 0, failed: 0 };
  if (!auth.success) return { ...empty, message: auth.message };

  try {
    const { data: students, error: studentsError } = await auth.admin.from("students").select("profile_id");
    if (studentsError || !students) return { ...empty, message: "Student accounts could not be loaded for migration." };

    const profileIds = [...new Set(students.flatMap((row) => typeof row.profile_id === "string" ? [row.profile_id] : []))];
    const usersByEmail = new Map<string, string>();
    for (let page = 1; ; page += 1) {
      const { data, error } = await auth.admin.auth.admin.listUsers({ page, perPage: 1000 });
      if (error || !data?.users) return { ...empty, message: "Auth identities could not be checked for email collisions." };
      for (const user of data.users) if (user.email) usersByEmail.set(user.email.toLowerCase(), user.id);
      if (data.users.length < 1000) break;
    }

    let eligible = 0;
    let alreadyMigrated = 0;
    let migrated = 0;
    let conflicts = 0;
    let failed = 0;
    for (const profileId of profileIds) {
      if (dryRun) {
        const { data, error } = await auth.admin.auth.admin.getUserById(profileId);
        const user = data?.user;
        const targetEmail = getStudentAuthEmail(profileId);
        if (error || !user || user.id !== profileId) { failed += 1; continue; }
        const owner = usersByEmail.get(targetEmail.toLowerCase());
        if (owner && owner !== profileId) { conflicts += 1; continue; }
        if (user.email?.toLowerCase() === targetEmail.toLowerCase() && user.email_confirmed_at) alreadyMigrated += 1;
        else eligible += 1;
        continue;
      }

      const result = await migrateStudentAuthProfile(auth.admin, profileId, usersByEmail);
      if (result.status === "migrated") migrated += 1;
      else if (result.status === "already_migrated") alreadyMigrated += 1;
      else if (result.status === "conflict") conflicts += 1;
      else failed += 1;
    }

    revalidatePath("/admin/students");
    return { success: failed === 0 && conflicts === 0, dryRun, eligible, alreadyMigrated, migrated, conflicts, failed };
  } catch {
    return { ...empty, message: "Student Auth migration could not be completed. Check the server configuration and review Auth identities before retrying." };
  }
}

export async function getStudentAdmissionOptions(): Promise<StudentAdmissionOptionsResult> {
  const auth = await getAuthorizedAdminClient();
  if (!auth.success) return { success: false, message: auth.message };

  try {
    const admin = createAdminClient();
    const [classesResult, boardsResult, yearsResult, coursesResult] = await Promise.all([
      admin.from("classes").select("*"),
      admin.from("boards").select("*"),
      admin.from("academic_years").select("*"),
      admin.from("courses").select("*"),
    ]);
    if (classesResult.error || boardsResult.error || yearsResult.error || coursesResult.error) {
      return { success: false, message: "Admission options could not be loaded from Supabase. Check the classes, boards, academic_years, and courses tables and their service access." };
    }

    const activeCrashCourse = asRows(coursesResult.data).find((row) =>
      isActive(row) && courseName(row).toLowerCase().includes("crash course"),
    );
    if (!activeCrashCourse || typeof activeCrashCourse.id !== "string") {
      return { success: false, message: "No active Crash Course was found in Supabase. Activate the existing Crash Course before creating admissions." };
    }

    return {
      success: true,
      classes: optionsFrom(classesResult.data),
      boards: optionsFrom(boardsResult.data),
      academicYears: optionsFrom(yearsResult.data),
    };
  } catch {
    return { success: false, message: "Admission options could not be loaded. Check the Supabase server configuration and try again." };
  }
}

export async function createStudentAdmission(submitted: unknown): Promise<CreateStudentAdmissionResult> {
  const auth = await getAuthorizedAdminClient();
  if (!auth.success) return auth;

  const parsed = studentAdmissionSchema.safeParse(submitted);
  if (!parsed.success) {
    return {
      success: false,
      code: "invalid_input",
      message: "Review the admission details and correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const admission = parsed.data;
  let admin: ReturnType<typeof createAdminClient> | null = null;
  let authUserId: string | null = null;
  let rpcStarted = false;

  try {
    admin = createAdminClient();
    const { data: courses, error: coursesError } = await admin.from("courses").select("*");
    if (coursesError) {
      return { success: false, code: "options_unavailable", message: "The active Crash Course could not be verified. No account was created." };
    }
    const activeCrashCourse = asRows(courses).find((row) =>
      isActive(row) && courseName(row).toLowerCase().includes("crash course"),
    );
    if (!activeCrashCourse || typeof activeCrashCourse.id !== "string") {
      return { success: false, code: "options_unavailable", message: "No active Crash Course was found. No account was created." };
    }

    const temporaryEmail = `provision.${crypto.randomUUID()}@login.saiacademy.com`;
    const { data: authData, error: authError } = await admin.auth.admin.createUser({
      email: temporaryEmail,
      email_confirm: true,
      password: admission.studentContact,
    });
    if (authError || !authData.user) {
      return { success: false, code: "auth_creation_failed", message: "The student login account could not be created. Check that email/password authentication is enabled and try again." };
    }
    authUserId = authData.user.id;

    const { error: emailError } = await admin.auth.admin.updateUserById(authUserId, {
      email: getStudentAuthEmail(authUserId),
      email_confirm: true,
    });
    if (emailError) {
      const cleanupSucceeded = await removeCreatedAuthUser(admin, authUserId);
      authUserId = null;
      return {
        success: false,
        code: "auth_creation_failed",
        message: cleanupSucceeded
          ? "The student login identity could not be configured. No account was retained; check the internal email domain and try again."
          : "The student login identity could not be configured and its unused account could not be removed. Contact the academy administrator.",
      };
    }

    rpcStarted = true;
    const { data: rpcData, error: rpcError, status: rpcStatus } = await admin.rpc("create_student_admission", {
      p_profile_id: authUserId,
      p_full_name: admission.fullName,
      p_student_contact: admission.studentContact,
      p_school_name: admission.schoolName,
      p_class_id: admission.classId,
      p_board_id: admission.boardId,
      p_academic_year_id: admission.academicYearId,
      p_course_id: activeCrashCourse.id,
      p_city_code: admission.cityCode,
      p_learning_mode: admission.learningMode,
      p_admission_date: admission.admissionDate,
      p_date_of_birth: null,
      p_profile_picture_url: null,
      p_last_year_percentage: null,
      p_father_name: null,
      p_mother_name: null,
      p_parent_occupation: null,
      p_parent_education: null,
      p_parent_contact: null,
      p_email: null,
      p_address: null,
      p_admission_source: null,
    });

    if (rpcError) {
      // Only an explicit client-side PostgREST response confirms the function
      // rejected the transaction. A timeout, transport error, or 5xx may have
      // committed, so retain the Auth account for manual reconciliation.
      if (rpcStatus >= 400 && rpcStatus < 500 && Boolean(rpcError.code)) {
        const cleanupSucceeded = await removeCreatedAuthUser(admin, authUserId);
        return {
          success: false,
          code: "admission_failed",
          message: cleanupSucceeded
            ? "Admission was rejected by the database. The unused login account was removed; correct the details and retry."
            : "Admission was rejected, but the unused login account could not be removed. Contact the academy administrator before retrying.",
        };
      }
      return {
        success: false,
        code: "admission_outcome_uncertain",
        message: "The admission response could not be confirmed. The login account was retained to avoid deleting a possibly admitted student. Do not retry; ask the academy administrator to check Supabase first.",
      };
    }

    const result = getAdmissionResult(rpcData);
    if (!result) {
      return {
        success: false,
        code: "admission_outcome_uncertain",
        message: "The database accepted the admission, but did not return a readable roll number. The login account was retained. Do not retry; ask the academy administrator to verify the admission in Supabase.",
      };
    }

    try {
      revalidatePath("/admin/students");
    } catch {
      // The RPC succeeded and returned the generated roll number; the client
      // also refreshes the route, so cache invalidation failure must not make
      // an admitted student appear unconfirmed.
    }
    return { success: true, ...result };
  } catch {
    if (authUserId && admin && !rpcStarted) await removeCreatedAuthUser(admin, authUserId);
    return {
      success: false,
      code: rpcStarted ? "admission_outcome_uncertain" : "auth_creation_failed",
      message: rpcStarted
        ? "The admission response was interrupted. The login account was retained because the database may have committed. Do not retry; ask the academy administrator to check Supabase first."
        : "The student login account could not be created. Check the Supabase configuration and try again.",
    };
  }
}
