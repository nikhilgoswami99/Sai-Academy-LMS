import { PageHeader } from "@/components/dashboard/pageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTeacherScope, teacherLabel, teacherText, type TeacherRow } from "@/lib/teacher/assigned-data";

type Resource = "students" | "batches" | "attendance" | "exams" | "results";
const headings: Record<Resource, { title: string; description: string }> = {
  students: { title: "My Students", description: "Students enrolled in your current class and batch assignments." },
  batches: { title: "My Batches", description: "Batches assigned to you for the current academic year." },
  attendance: { title: "Attendance", description: "Attendance records visible for your assigned classes and batches." },
  exams: { title: "Exams", description: "Exams for classes and batches assigned to you." },
  results: { title: "Results", description: "Results for students in your current assignments." },
};
const visibleValue = (row: TeacherRow | undefined, keys: string[]) => teacherText(row, ...keys);
function Grid({ columns, data, empty }: { columns: string[]; data: string[][]; empty: string }) {
  return <section className="overflow-hidden rounded-xl border bg-card"><Table><TableHeader><TableRow>{columns.map((column) => <TableHead key={column}>{column}</TableHead>)}</TableRow></TableHeader><TableBody>{data.length ? data.map((record, i) => <TableRow key={i}>{record.map((cell, j) => <TableCell key={j}>{cell}</TableCell>)}</TableRow>) : <TableRow><TableCell colSpan={columns.length} className="h-28 text-center text-muted-foreground">{empty}</TableCell></TableRow>}</TableBody></Table></section>;
}
function LoadError({ message }: { message: string }) { return <div role="alert" className="rounded-lg border border-destructive/40 p-4 text-sm">{message}</div>; }
function dataError(resource: string, error: { message: string; code?: string; details?: string; hint?: string }) {
  console.error(`[teacher-pages] ${resource} query failed`, { message: error.message, code: error.code, details: error.details, hint: error.hint });
  return `Could not load ${resource} for your assignments. The data may not be available to teacher accounts yet.`;
}

export async function TeacherResourcePage({ resource }: { resource: Resource }) {
  const scope = await getTeacherScope();
  const header = headings[resource];
  if (!scope.success) return <div className="space-y-6 p-6"><PageHeader title={header.title} description={header.description} /><LoadError message={scope.message} /></div>;
  const { supabase, classes, batches, students, enrollments, batchEnrollments } = scope;
  const classIds = classes.map((row) => String(row.id));
  const assignedBatchIds = batches.map((row) => String(row.id));

  if (resource === "students") {
    const studentRows = students.map((student) => {
      const enrollment = enrollments.find((row) => row.student_id === student.id);
      const membership = batchEnrollments.find((row) => row.student_id === student.id);
      const batch = batches.find((row) => row.id === membership?.batch_id);
      const classId = enrollment?.class_id ?? batch?.class_id;
      const classRow = classes.find((row) => row.id === classId);
      const assignedClass = teacherLabel(classRow, "—");
      const assignedBatch = teacherLabel(batch, "—");
      return [visibleValue(student, ["full_name", "name", "student_name"]), visibleValue(enrollment, ["roll_number", "student_roll_number"]), assignedClass, assignedBatch, visibleValue(student, ["school_name"])];
    });
    return <div className="space-y-6 p-6"><PageHeader title={header.title} description={`${header.description} ${scope.yearName}.`} /><Grid columns={["Student", "Roll number", "Class", "Batch", "School"]} data={studentRows} empty="No students are enrolled in your current assignments." /></div>;
  }

  if (resource === "batches") {
    const data = batches.map((batch) => {
      const classRow = classes.find((row) => row.id === batch.class_id);
      const assignment = scope.assignments.find((row) => row.batch_id === batch.id && row.status === "active");
      return [teacherLabel(batch, "Unnamed batch"), teacherLabel(classRow, "—"), scope.yearName, visibleValue(assignment, ["assigned_at"]), visibleValue(assignment, ["status"])];
    });
    return <div className="space-y-6 p-6"><PageHeader title={header.title} description={header.description} /><Grid columns={["Batch", "Class", "Academic year", "Assigned", "Status"]} data={data} empty="You have no active batch assignments for the current academic year." /></div>;
  }

  if (resource === "results") {
    if (!students.length) return <div className="space-y-6 p-6"><PageHeader title={header.title} description={header.description} /><Grid columns={["Student", "Exam", "Marks", "Status"]} data={[]} empty="No results are available for your current assignments." /></div>;
    const result = await supabase.from("results").select("*").in("student_id", students.map((student) => String(student.id)));
    if (result.error) return <div className="space-y-6 p-6"><PageHeader title={header.title} description={header.description} /><LoadError message={dataError("results", result.error)} /></div>;
    const [classExams, batchExams] = await Promise.all([
      classIds.length ? supabase.from("exams").select("*").in("class_id", classIds) : Promise.resolve({ data: [], error: null }),
      assignedBatchIds.length ? supabase.from("exams").select("*").in("batch_id", assignedBatchIds) : Promise.resolve({ data: [], error: null }),
    ]);
    if (classExams.error || batchExams.error) {
      const error = (classExams.error ?? batchExams.error)!;
      return <div className="space-y-6 p-6"><PageHeader title={header.title} description={header.description} /><LoadError message={dataError("exam details", error)} /></div>;
    }
    const examRows = [...new Map([...classExams.data, ...batchExams.data].map((row) => [String((row as TeacherRow).id), row as TeacherRow])).values()];
    const resultRows = (result.data as TeacherRow[]).map((row) => {
      const student = students.find((item) => item.id === row.student_id);
      const exam = examRows.find((item) => item.id === row.exam_id);
      return [visibleValue(student, ["full_name", "name"]), teacherLabel(exam, "—"), `${visibleValue(row, ["marks", "score"])}/${visibleValue(row, ["total_marks", "max_marks"])}`, visibleValue(row, ["status", "published_at"])];
    });
    return <div className="space-y-6 p-6"><PageHeader title={header.title} description={header.description} /><Grid columns={["Student", "Exam", "Marks", "Status"]} data={resultRows} empty="No results are available for your current assignments." /></div>;
  }

  const table = resource === "attendance" ? "attendance" : "exams";
  const classQuery = classIds.length ? supabase.from(table).select("*").in("class_id", classIds) : Promise.resolve({ data: [], error: null });
  const batchQuery = assignedBatchIds.length ? supabase.from(table).select("*").in("batch_id", assignedBatchIds) : Promise.resolve({ data: [], error: null });
  const [classResult, batchResult] = await Promise.all([classQuery, batchQuery]);
  if (classResult.error || batchResult.error) {
    const error = (classResult.error ?? batchResult.error)!;
    return <div className="space-y-6 p-6"><PageHeader title={header.title} description={header.description} /><LoadError message={dataError(table, error)} /></div>;
  }
  const records = [...new Map([...classResult.data, ...batchResult.data].map((row) => [String((row as TeacherRow).id), row as TeacherRow])).values()];
  const data = records.map((row) => {
    const classRow = classes.find((item) => item.id === row.class_id);
    const batch = batches.find((item) => item.id === row.batch_id);
    if (resource === "attendance") {
      const student = students.find((item) => item.id === row.student_id);
      return [visibleValue(row, ["date", "attendance_date", "created_at"]), visibleValue(student, ["full_name", "name"]), teacherLabel(classRow ?? batch, "—"), visibleValue(row, ["status", "attendance_status"])];
    }
    return [teacherLabel(row, "Unnamed exam"), teacherLabel(classRow ?? batch, "—"), visibleValue(row, ["exam_date", "date", "scheduled_at"]), visibleValue(row, ["total_marks", "max_marks"]), visibleValue(row, ["status"])];
  });
  const columns = resource === "attendance" ? ["Date", "Student", "Class / batch", "Status"] : ["Exam", "Class / batch", "Date", "Total marks", "Status"];
  return <div className="space-y-6 p-6"><PageHeader title={header.title} description={header.description} /><Grid columns={columns} data={data} empty={`No ${resource} are available for your current assignments.`} /></div>;
}
