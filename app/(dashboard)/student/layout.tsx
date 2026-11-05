import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { AppShell } from "@/components/layout/appShell";
import { StudentAccountProvider } from "@/components/students/studentPages";
import { createClient } from "@/lib/supabase/server";

type Row = Record<string, unknown>;
function value(row: Row | null | undefined, ...keys: string[]): string {
  if (!row) return "";
  for (const key of keys) if (typeof row[key] === "string" || typeof row[key] === "number") return String(row[key]);
  return "";
}
function relatedLabel(row: Row | null, ...keys: string[]) {
  return value(row, ...keys);
}

export default async function StudentLayout({ children }: { children: ReactNode }) {
  await connection();
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect("/");

  const { data: assignments, error: assignmentError } = await supabase
    .from("user_roles").select("role_id").eq("user_id", user.id);
  if (assignmentError || !assignments?.length) redirect("/");
  const { data: roles, error: roleError } = await supabase
    .from("roles").select("name").in("id", assignments.map(({ role_id }) => role_id));
  if (roleError || !roles?.some(({ name }) => name === "student")) redirect("/");

  const [{ data: profile }, { data: studentData, error: studentError }, { data: currentYears, error: yearsError }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase.from("students").select("*").eq("profile_id", user.id).maybeSingle(),
    supabase.from("academic_years").select("*").eq("is_current", true),
  ]);
  if (!profile || profile.status !== "active" || studentError || !studentData || yearsError || !currentYears?.length) redirect("/");

  const student = studentData as Row;
  const currentYearIds = currentYears.map(({ id }) => id);
  const { data: enrollments, error: enrollmentError } = await supabase
    .from("student_enrollments").select("*").eq("student_id", student.id).in("academic_year_id", currentYearIds);
  const enrollment = (enrollments as Row[] | null)?.find((item) => String(item.status ?? "active").toLowerCase() === "active");
  if (enrollmentError || !enrollment) redirect("/");

  const currentYear = (currentYears as Row[]).find(({ id }) => id === enrollment.academic_year_id) as Row | undefined;
  const [classResult, boardResult, courseEnrollmentsResult] = await Promise.all([
    enrollment.class_id ? supabase.from("classes").select("*").eq("id", enrollment.class_id).maybeSingle() : Promise.resolve({ data: null }),
    enrollment.board_id ? supabase.from("boards").select("*").eq("id", enrollment.board_id).maybeSingle() : Promise.resolve({ data: null }),
    supabase.from("course_enrollments").select("*"),
  ]);
  const courseEnrollments = (courseEnrollmentsResult.data as Row[] | null) ?? [];
  const courseEnrollment = courseEnrollments.find((row) =>
    row.student_id === student.id || row.student_enrollment_id === enrollment.id || row.enrollment_id === enrollment.id,
  );
  const courseId = courseEnrollment?.course_id ?? enrollment.course_id;
  const { data: course } = courseId
    ? await supabase.from("courses").select("*").eq("id", courseId).maybeSingle()
    : { data: null };

  const name = value(student, "full_name", "name", "student_name") || value(profile as Row, "display_name", "full_name", "name") || "Student";
  const avatar = value(student, "profile_picture_url") || value(profile as Row, "avatar_url", "profile_picture", "photo_url");
  const personalFields = ["date_of_birth", "profile_picture_url", "father_name", "mother_name", "parent_occupation", "parent_education", "parent_contact", "email", "address"] as const;
  const personalProfile = Object.fromEntries(personalFields.map((field) => [field, student[field] == null ? "" : String(student[field])]));
  personalProfile.email ||= user.email ?? "";
  const academic = {
    rollNumber: value(enrollment as Row, "roll_number", "student_roll_number"),
    className: relatedLabel(classResult.data as Row | null, "name", "class_name", "code", "label"),
    boardName: relatedLabel(boardResult.data as Row | null, "name", "board_name", "code", "label"),
    schoolName: value(student, "school_name"),
    academicYear: value(currentYear, "name", "academic_year", "year", "label"),
    admissionDate: value(enrollment as Row, "admission_date"),
    learningMode: value(enrollment as Row, "learning_mode"),
    courseName: value(course as Row | null, "name", "course_name", "title") || value(courseEnrollment, "course_name"),
    enrollmentStatus: value(enrollment as Row, "status") || "Active",
  };

  return <AppShell role="student"><StudentAccountProvider name={name} avatar={avatar} email={user.email ?? ""} studentContact={value(student, "student_contact", "phone", "contact")} personalProfile={personalProfile} academic={academic}>{children}</StudentAccountProvider></AppShell>;
}
