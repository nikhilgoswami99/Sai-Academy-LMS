import "server-only";
import { getTeacherContext } from "@/lib/auth/teacher";

export type TeacherRow = Record<string, unknown>;
const asRows = (data: unknown): TeacherRow[] => Array.isArray(data) ? data as TeacherRow[] : [];
const text = (row: TeacherRow | undefined, ...keys: string[]) => {
  for (const key of keys) {
    const value = row?.[key];
    if (typeof value === "string" || typeof value === "number") return String(value);
  }
  return "—";
};
const optionName = (row: TeacherRow | undefined, fallback: string) => text(row, "name", "class_name", "batch_name", "academic_year", "year", "label", "code") === "—" ? fallback : text(row, "name", "class_name", "batch_name", "academic_year", "year", "label", "code");

export type TeacherScopeResult =
  | { success: true; supabase: Awaited<ReturnType<typeof import("@/lib/supabase/server").createClient>>; teacherName: string; yearName: string; yearId: string | null; assignments: TeacherRow[]; classes: TeacherRow[]; batches: TeacherRow[]; students: TeacherRow[]; enrollments: TeacherRow[]; batchEnrollments: TeacherRow[] }
  | { success: false; message: string };

export async function getTeacherScope(): Promise<TeacherScopeResult> {
  const context = await getTeacherContext();
  if (!context) return { success: false, message: "Your teacher account could not be verified. Sign in again or contact the academy administrator." };
  const { supabase, teacher } = context;
  const [yearResult, assignmentsResult] = await Promise.all([
    supabase.from("academic_years").select("id,is_current").eq("is_current", true),
    supabase.from("teacher_assignments").select("id,teacher_id,class_id,batch_id,academic_year_id,assigned_at,unassigned_at,status").eq("teacher_id", teacher.id).order("assigned_at", { ascending: false }),
  ]);
  if (yearResult.error || assignmentsResult.error) {
    console.error("[teacher-pages] assignment scope query failed", yearResult.error ?? assignmentsResult.error);
    return { success: false, message: "Your assigned classes and batches could not be loaded. Check your access and try again." };
  }
  const year = asRows(yearResult.data)[0];
  const yearId = typeof year?.id === "string" ? year.id : null;
  const allAssignments = asRows(assignmentsResult.data);
  const assignments = allAssignments.filter((row) => row.status === "active" && !row.unassigned_at && (!yearId || row.academic_year_id === yearId));
  const classIds = [...new Set(assignments.map((row) => row.class_id).filter((id): id is string => typeof id === "string"))];
  const batchIds = [...new Set(assignments.map((row) => row.batch_id).filter((id): id is string => typeof id === "string"))];
  const [classesResult, batchesResult] = await Promise.all([
    classIds.length ? supabase.from("classes").select("*").in("id", classIds) : Promise.resolve({ data: [], error: null }),
    batchIds.length ? supabase.from("batches").select("*").in("id", batchIds) : Promise.resolve({ data: [], error: null }),
  ]);
  if (classesResult.error || batchesResult.error) {
    console.error("[teacher-pages] assigned class/batch query failed", classesResult.error ?? batchesResult.error);
    return { success: false, message: "Your assigned classes or batches could not be loaded. Check your access and try again." };
  }
  let classes = asRows(classesResult.data);
  const batches = asRows(batchesResult.data);
  const assignedClassIds = [...new Set([...classIds, ...batches.map((row) => row.class_id).filter((id): id is string => typeof id === "string")])];
  const linkedClassIds = assignedClassIds.filter((id) => !classes.some((row) => row.id === id));
  if (linkedClassIds.length) {
    const linkedClasses = await supabase.from("classes").select("*").in("id", linkedClassIds);
    if (linkedClasses.error) {
      console.error("[teacher-pages] batch class lookup failed", linkedClasses.error);
      return { success: false, message: "Classes associated with your assigned batches could not be loaded." };
    }
    classes = [...classes, ...asRows(linkedClasses.data)];
  }
  const [classEnrollmentsResult, batchEnrollmentsResult] = await Promise.all([
    assignedClassIds.length && yearId
      ? supabase.from("student_enrollments").select("student_id,class_id,academic_year_id,roll_number,status").in("class_id", assignedClassIds).eq("academic_year_id", yearId).eq("status", "active")
      : Promise.resolve({ data: [], error: null }),
    batchIds.length
      ? supabase.from("student_batch_enrollments").select("student_id,batch_id,status,left_at").in("batch_id", batchIds).eq("status", "active")
      : Promise.resolve({ data: [], error: null }),
  ]);
  if (classEnrollmentsResult.error || batchEnrollmentsResult.error) {
    console.error("[teacher-pages] assigned student enrollment query failed", classEnrollmentsResult.error ?? batchEnrollmentsResult.error);
    return { success: false, message: "Students in your current assignments could not be loaded. Check your access and try again." };
  }
  const classEnrollments = asRows(classEnrollmentsResult.data);
  const batchEnrollments = asRows(batchEnrollmentsResult.data).filter((row) => !row.left_at);
  const studentIds = [...new Set([...classEnrollments, ...batchEnrollments].map((row) => row.student_id).filter((id): id is string => typeof id === "string"))];
  const studentsResult = studentIds.length
    ? await supabase.from("students").select("*").in("id", studentIds)
    : { data: [], error: null };
  if (studentsResult.error) {
    console.error("[teacher-pages] assigned student query failed", studentsResult.error);
    return { success: false, message: "Your assigned students could not be loaded. Check your access and try again." };
  }
  return {
    success: true,
    supabase,
    teacherName: text(teacher as TeacherRow, "full_name"),
    yearName: yearId ? optionName(year, "Current academic year") : "No current academic year",
    yearId,
    assignments: allAssignments,
    classes,
    batches,
    students: asRows(studentsResult.data),
    enrollments: classEnrollments,
    batchEnrollments,
  };
}

export function teacherText(row: TeacherRow | undefined, ...keys: string[]) { return text(row, ...keys); }
export function teacherLabel(row: TeacherRow | undefined, fallback: string) { return optionName(row, fallback); }
