import { PageHeader } from "@/components/dashboard/pageHeader";
import { StatCard } from "@/components/dashboard/statCard";
import { getTeacherContext } from "@/lib/auth/teacher";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Layers, Users, CalendarDays } from "lucide-react";

type Row = Record<string, unknown>;
const rows = (x: unknown): Row[] => Array.isArray(x) ? x as Row[] : [];
const value = (r: Row | undefined, ...keys: string[]) => { for (const k of keys) if (typeof r?.[k] === "string") return r[k] as string; return "—"; };
function DataTable({ title, headers, data }: { title: string; headers: string[]; data: string[][] }) {
  return <section className="space-y-3 rounded-xl border bg-card p-4"><h2 className="font-semibold">{title}</h2>{!data.length ? <p className="py-4 text-sm text-muted-foreground">No records to show.</p> : <Table><TableHeader><TableRow>{headers.map((h) => <TableHead key={h}>{h}</TableHead>)}</TableRow></TableHeader><TableBody>{data.map((row, i) => <TableRow key={i}>{row.map((cell, j) => <TableCell key={j}>{cell}</TableCell>)}</TableRow>)}</TableBody></Table>}</section>;
}
export default async function TeacherPage() {
  const context = await getTeacherContext();
  if (!context) return null;
  const { supabase, teacher } = context;
  const [yearsResult, assignmentsResult] = await Promise.all([
    supabase.from("academic_years").select("id,name,academic_year,year,is_current").eq("is_current", true),
    supabase.from("teacher_assignments").select("id,teacher_id,batch_id,class_id,academic_year_id,assigned_at,unassigned_at,status").eq("teacher_id", teacher.id).order("assigned_at", { ascending: false }),
  ]);
  const years = rows(yearsResult.data);
  const assignments = rows(assignmentsResult.data);
  const currentYear = years[0];
  const active = assignments.filter((a) => a.status === "active" && !a.unassigned_at && (!currentYear || a.academic_year_id === currentYear.id));
  const classIds = [...new Set(active.map((a) => a.class_id).filter((id): id is string => typeof id === "string"))];
  const batchIds = [...new Set(active.map((a) => a.batch_id).filter((id): id is string => typeof id === "string"))];
  const [classesResult, batchesResult, classEnrollmentsResult, batchEnrollmentsResult] = await Promise.all([
    classIds.length ? supabase.from("classes").select("id,name,class_name").in("id", classIds) : Promise.resolve({ data: [] }),
    batchIds.length ? supabase.from("batches").select("id,name,batch_name,class_id").in("id", batchIds) : Promise.resolve({ data: [] }),
    classIds.length && currentYear ? supabase.from("student_enrollments").select("student_id,class_id,academic_year_id,status,roll_number").in("class_id", classIds).eq("academic_year_id", String(currentYear.id)).eq("status", "active") : Promise.resolve({ data: [] }),
    batchIds.length ? supabase.from("student_batch_enrollments").select("student_id,batch_id,status,left_at").in("batch_id", batchIds).eq("status", "active") : Promise.resolve({ data: [] }),
  ]);
  const classes = rows(classesResult.data), batches = rows(batchesResult.data);
  const classEnrollments = rows(classEnrollmentsResult.data), batchEnrollments = rows(batchEnrollmentsResult.data).filter((e) => !e.left_at);
  const studentIds = [...new Set([...classEnrollments, ...batchEnrollments].map((e) => e.student_id).filter((id): id is string => typeof id === "string"))];
  const [studentsResult, enrollmentsResult] = await Promise.all([
    studentIds.length ? supabase.from("students").select("id,full_name,school_name").in("id", studentIds) : Promise.resolve({ data: [] }),
    studentIds.length && currentYear ? supabase.from("student_enrollments").select("student_id,class_id,academic_year_id,roll_number,status").in("student_id", studentIds).eq("academic_year_id", String(currentYear.id)) : Promise.resolve({ data: [] }),
  ]);
  const students = rows(studentsResult.data), enrollments = rows(enrollmentsResult.data);
  const studentData = students.map((s) => {
    const enrollment = enrollments.find((e) => e.student_id === s.id && e.status === "active");
    const classRow = classes.find((c) => c.id === enrollment?.class_id) ?? batches.find((b) => b.class_id === enrollment?.class_id);
    return [value(s, "full_name"), value(enrollment, "roll_number"), value(classRow, "name", "class_name", "batch_name"), value(s, "school_name")];
  });
  const classData = classes.map((c) => [value(c, "name", "class_name"), "Class"]);
  const batchData = batches.map((b) => [value(b, "name", "batch_name"), "Batch"]);
  const yearsLabel = value(currentYear, "name", "academic_year", "year");
  return <div className="space-y-6 p-6"><PageHeader title={`Welcome, ${value(teacher as Row, "full_name")}`} description={`Teacher dashboard · ${yearsLabel === "—" ? "Current academic year unavailable" : yearsLabel}`} />
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><StatCard title="Assigned classes" value={classIds.length} icon={BookOpen} /><StatCard title="Assigned batches" value={batchIds.length} icon={Layers} /><StatCard title="Accessible students" value={studentIds.length} icon={Users} /><StatCard title="Academic year" value={yearsLabel} icon={CalendarDays} /></div>
    <div className="grid gap-6 xl:grid-cols-2"><DataTable title="My Classes and Batches" headers={["Assignment", "Type"]} data={[...classData, ...batchData]} /><DataTable title="My Students" headers={["Student", "Roll number", "Class / batch", "School"]} data={studentData} /></div>
    <div className="grid gap-6 xl:grid-cols-2"><DataTable title="My Assignments · active and history" headers={["Type", "Assigned", "Unassigned", "Status"]} data={assignments.map((a) => { const target = classes.find((c) => c.id === a.class_id) ?? batches.find((b) => b.id === a.batch_id); return [value(target, "name", "class_name", "batch_name"), value(a, "assigned_at"), value(a, "unassigned_at"), value(a, "status")]; })} /><section className="space-y-3 rounded-xl border bg-card p-4"><h2 className="font-semibold">My Profile</h2><dl className="grid grid-cols-2 gap-3 text-sm"><dt className="text-muted-foreground">Name</dt><dd>{value(teacher as Row, "full_name")}</dd><dt className="text-muted-foreground">Email</dt><dd>{value(teacher as Row, "email")}</dd><dt className="text-muted-foreground">Phone</dt><dd>{value(teacher as Row, "phone")}</dd><dt className="text-muted-foreground">Qualification</dt><dd>{value(teacher as Row, "qualification")}</dd><dt className="text-muted-foreground">Specialization</dt><dd>{value(teacher as Row, "specialization")}</dd></dl></section></div>
  </div>;
}
