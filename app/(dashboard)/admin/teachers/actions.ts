"use server";

import { revalidatePath } from "next/cache";
import { getSuperAdminContext } from "@/lib/auth/super-admin";
import { teacherAssignmentSchema, teacherCreateSchema, teacherUpdateSchema } from "@/lib/validation/teacher";

const TEACHER_ROLE_ID = "e9893d00-02a7-4815-8e11-0cc83661650d";
type Row = Record<string, unknown>;
const rows = (value: unknown): Row[] => Array.isArray(value) ? value as Row[] : [];
const str = (row: Row, key: string) => typeof row[key] === "string" ? row[key] as string : "";
function optionLabel(row: Row, candidates: string[], fallback: string) {
  for (const key of candidates) {
    const value = row[key];
    if ((typeof value === "string" || typeof value === "number") && String(value).trim()) return String(value).trim();
  }
  const start = row.start_year ?? row.start_date;
  const end = row.end_year ?? row.end_date;
  if (start != null && end != null) return `${String(start)}–${String(end)}`;
  return fallback;
}

export async function listTeachers() {
  const auth = await getSuperAdminContext();
  if (!auth.success) return { success: false as const, message: auth.message, teachers: [] };
  const { data, error } = await auth.admin.from("teachers").select("id,full_name,email,phone,qualification,specialization,joining_date,status,profile_id").order("full_name");
  if (error) return { success: false as const, message: "Teacher records could not be loaded.", teachers: [] };
  const teachers = rows(data);
  const ids = teachers.map((t) => t.id).filter((id): id is string => typeof id === "string");
  const [{ data: assignments }, { data: years }] = await Promise.all([
    ids.length ? auth.admin.from("teacher_assignments").select("teacher_id,status,unassigned_at").in("teacher_id", ids) : Promise.resolve({ data: [] }),
    auth.admin.from("academic_years").select("id,name,year,academic_year,is_current"),
  ]);
  const assignmentRows = rows(assignments);
  return { success: true as const, teachers: teachers.map((t) => ({
    id: str(t, "id"), fullName: str(t, "full_name"), email: str(t, "email"), phone: str(t, "phone"),
    qualification: str(t, "qualification"), specialization: str(t, "specialization"), joiningDate: str(t, "joining_date"), status: str(t, "status"),
    assignments: assignmentRows.filter((a) => a.teacher_id === t.id).length,
  })), years: rows(years).map((y) => ({ id: str(y, "id"), label: str(y, "name") || str(y, "academic_year") || str(y, "year"), current: y.is_current === true })),
    classes: [], batches: [],
  };
}

type ProvisioningFailure = { message?: unknown; code?: unknown; details?: unknown; hint?: unknown; status?: unknown };
function provisioningError(operation: string, error: unknown) {
  const value = error && typeof error === "object" ? error as ProvisioningFailure : {};
  const diagnostic = {
    operation,
    code: typeof value.code === "string" ? value.code : undefined,
    message: typeof value.message === "string" ? value.message : String(error),
    details: typeof value.details === "string" ? value.details : undefined,
    hint: typeof value.hint === "string" ? value.hint : undefined,
    status: typeof value.status === "number" ? value.status : undefined,
  };
  console.error("[teacher-provisioning] operation failed", diagnostic);
  const description = [
    `${operation} failed${diagnostic.code ? ` (${diagnostic.code})` : ""}: ${diagnostic.message}`,
    diagnostic.details ? `Details: ${diagnostic.details}` : "",
    diagnostic.hint ? `Hint: ${diagnostic.hint}` : "",
  ].filter(Boolean).join(" ");
  return { success: false as const, operation, message: description, error: diagnostic };
}

async function removeTeacherProvisioningRows(
  admin: ReturnType<typeof import("@/lib/supabase/admin").createAdminClient>,
  userId: string,
  teacherId?: string,
) {
  let ok = true;
  if (teacherId) {
    const result = await admin.from("teachers").delete().eq("id", teacherId);
    if (result.error) { ok = false; provisioningError("rollback teacher row", result.error); }
  }
  const profile = await admin.from("profiles").delete().eq("id", userId);
  if (profile.error) { ok = false; provisioningError("rollback profile row", profile.error); }
  if (ok) {
    const authResult = await admin.auth.admin.deleteUser(userId);
    if (authResult.error) provisioningError("rollback Auth user", authResult.error);
  }
  return ok;
}

export async function createTeacher(input: unknown) {
  const auth = await getSuperAdminContext();
  if (!auth.success) return { success: false as const, message: auth.message };
  const parsed = teacherCreateSchema.safeParse(input);
  if (!parsed.success) return { success: false as const, message: "Check the teacher details and try again.", fieldErrors: parsed.error.flatten().fieldErrors };
  const d = parsed.data;
  let userId: string;
  let teacherId: string;
  try {
    const { data, error } = await auth.admin.auth.admin.createUser({ email: d.email, password: d.password, email_confirm: true });
    if (error) return provisioningError("Auth user creation", error);
    if (!data.user) return provisioningError("Auth user creation", new Error("Supabase Auth returned no user and no error."));
    userId = data.user.id;
    // Auth deployments commonly create profiles from an auth.users trigger.
    // The newly created Auth UUID is unique, so upsert safely handles either
    // that trigger-created row or the no-trigger case without duplicating it.
    const profile = await auth.admin.from("profiles").upsert(
      { id: userId, status: "active", full_name: d.fullName },
      { onConflict: "id" },
    );
    if (profile.error) {
      if (profile.status >= 400 && profile.status < 500) {
        const rollback = await auth.admin.auth.admin.deleteUser(userId);
        if (rollback.error) provisioningError("rollback Auth user after profile rejection", rollback.error);
      }
      return provisioningError("profiles upsert", profile.error);
    }

    const teacher = await auth.admin.from("teachers").insert({ profile_id: userId, full_name: d.fullName, email: d.email, phone: d.phone, qualification: d.qualification, specialization: d.specialization, address: d.address, joining_date: d.joiningDate, status: "active" }).select("id").single();
    if (teacher.error || !teacher.data) {
      if (teacher.error && teacher.status >= 400 && teacher.status < 500) {
        await removeTeacherProvisioningRows(auth.admin, userId);
      }
      return provisioningError("teachers insert", teacher.error ?? new Error("Supabase returned no teacher row."));
    }
    teacherId = teacher.data.id;

    const role = await auth.admin.from("user_roles").insert({ user_id: userId, role_id: TEACHER_ROLE_ID });
    if (role.error) {
      if (role.status >= 400 && role.status < 500) {
        const removed = await auth.admin.from("user_roles").delete().eq("user_id", userId).eq("role_id", TEACHER_ROLE_ID);
        if (removed.error) provisioningError("rollback teacher role", removed.error);
        await removeTeacherProvisioningRows(auth.admin, userId, teacherId);
      }
      return provisioningError("user_roles insert", role.error);
    }

    revalidatePath("/admin/teachers");
    return { success: true as const };
  } catch (error) {
    return provisioningError("unexpected teacher provisioning error", error);
  }
}

export async function updateTeacher(input: unknown) {
  const auth = await getSuperAdminContext();
  if (!auth.success) return { success: false as const, message: auth.message };
  const parsed = teacherUpdateSchema.safeParse(input);
  if (!parsed.success) return { success: false as const, message: "Check the teacher details and try again." };
  const { id, ...d } = parsed.data;
  const { data: existing, error: lookupError } = await auth.admin.from("teachers").select("id,profile_id,full_name").eq("id", id).maybeSingle();
  if (lookupError || !existing || typeof existing.profile_id !== "string") {
    return { success: false as const, message: "Teacher profile could not be verified; no changes were saved." };
  }
  const profileUpdate = await auth.admin.from("profiles").update({ full_name: d.fullName }).eq("id", existing.profile_id).select("id").maybeSingle();
  if (profileUpdate.error || !profileUpdate.data) {
    return { success: false as const, message: "Teacher profile name could not be saved; no teacher details were changed." };
  }
  const { error, status } = await auth.admin.from("teachers").update({ full_name: d.fullName, email: d.email, phone: d.phone, qualification: d.qualification, specialization: d.specialization, address: d.address, joining_date: d.joiningDate, status: d.status }).eq("id", id);
  if (error) {
    // Roll back only when PostgREST confirms a client-side rejection. For
    // transport/5xx failures the teacher update may have committed.
    if (status >= 400 && status < 500) {
      const rollback = await auth.admin.from("profiles").update({ full_name: existing.full_name }).eq("id", existing.profile_id);
      return { success: false as const, message: rollback.error
        ? "Teacher details could not be saved and profile-name rollback failed. Review both records before retrying."
        : "Teacher details could not be saved; the profile name was restored." };
    }
    return { success: false as const, message: "The save response was uncertain. Check that the teacher and profile names match before retrying." };
  }
  revalidatePath("/admin/teachers");
  return { success: true as const };
}

export async function getTeacherOptions() {
  const auth = await getSuperAdminContext();
  if (!auth.success) return { success: false as const, message: auth.message };
  // Read through the authenticated Super Admin session so the existing RLS
  // policies remain in force; these option reads do not need service-role access.
  // Select the rows rather than guessing display-column names: the confirmed
  // contract guarantees the keys used below, but doesn't define label columns.
  const [years, classes, batches] = await Promise.all([
    auth.supabase.from("academic_years").select("*"),
    auth.supabase.from("classes").select("*"),
    auth.supabase.from("batches").select("*"),
  ]);
  const queryErrors = [
    ["academic_years", years.error],
    ["classes", classes.error],
    ["batches", batches.error],
  ] as const;
  for (const [table, error] of queryErrors) {
    if (error) {
      console.error(`[teacher-options] ${table} query failed`, {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
    }
  }
  if (years.error || classes.error || batches.error) {
    const failedTable = queryErrors.find(([, error]) => error)?.[0];
    const resourceName = failedTable === "academic_years" ? "academic years" : failedTable;
    return { success: false as const, message: `Could not load ${resourceName}. Check its access and try again.` };
  }
  return {
    success: true as const,
    years: rows(years.data).map((year, index) => ({
      id: str(year, "id"),
      label: optionLabel(year, ["academic_year", "academic_year_name", "year_name", "name", "label", "year"], `Academic year ${index + 1}`),
      current: year.is_current === true,
    })),
    classes: rows(classes.data).map((row, index) => ({
      id: str(row, "id"),
      label: optionLabel(row, ["class_name", "name", "class", "title", "label", "code", "grade", "standard"], `Class ${index + 1}`),
    })),
    batches: rows(batches.data).map((row, index) => ({
      id: str(row, "id"),
      label: optionLabel(row, ["batch_name", "name", "title", "label", "code"], `Batch ${index + 1}`),
      academicYearId: str(row, "academic_year_id"),
    })),
  };
}

export async function assignTeacher(input: unknown) {
  const auth = await getSuperAdminContext();
  if (!auth.success) return { success: false as const, message: auth.message };
  const parsed = teacherAssignmentSchema.safeParse(input);
  if (!parsed.success) return { success: false as const, message: "Select a teacher, academic year, and class or batch." };
  const d = parsed.data;
  const assignment = { teacher_id: d.teacherId, academic_year_id: d.academicYearId, class_id: d.targetType === "class" ? d.targetId : null, batch_id: d.targetType === "batch" ? d.targetId : null, assigned_at: new Date().toISOString().slice(0, 10), status: "active" };
  const { error } = await auth.admin.from("teacher_assignments").insert(assignment);
  if (error) return { success: false as const, message: "Assignment could not be saved. Check for a duplicate active assignment or academic year mismatch." };
  revalidatePath("/admin/teachers");
  return { success: true as const };
}

export async function setTeacherAssignmentStatus(idInput: unknown, statusInput: unknown) {
  const auth = await getSuperAdminContext();
  if (!auth.success) return { success: false as const, message: auth.message };
  if (typeof idInput !== "string" || !zUuid(idInput) || !["active", "inactive"].includes(String(statusInput))) return { success: false as const, message: "Invalid assignment." };
  const status = String(statusInput);
  const { error } = await auth.admin.from("teacher_assignments").update({ status, unassigned_at: status === "inactive" ? new Date().toISOString().slice(0, 10) : null }).eq("id", idInput);
  if (error) return { success: false as const, message: "Assignment status could not be updated." };
  revalidatePath("/admin/teachers");
  return { success: true as const };
}
function zUuid(value: string) { return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value); }
