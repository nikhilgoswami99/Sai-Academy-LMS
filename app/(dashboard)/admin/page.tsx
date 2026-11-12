import { BookOpen, UserRound, Users } from "lucide-react";
import { PageHeader } from "@/components/dashboard/pageHeader";
import { StatCard } from "@/components/dashboard/statCard";
import { getAdminDashboardSummary } from "@/app/(dashboard)/admin/students/actions";

export default async function AdminDashboard() {
  const summary = await getAdminDashboardSummary();
  return <div className="space-y-6 p-6">
    <PageHeader title="Dashboard" description="Overview of current SAI Academy student and course records." />
    {!summary.success && <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive" role="alert">{summary.message}</p>}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Active students" value={summary.activeStudents ?? "Unavailable"} icon={Users} description="Students with an active enrollment and account" />
      <StatCard title="Current-year students" value={summary.currentYearStudents ?? "Unavailable"} icon={Users} description="Active enrollments in the current academic year" />
      <StatCard title="Crash Course enrollments" value={summary.crashCourseEnrollments ?? "Unavailable"} icon={BookOpen} description="Current-year active course records" />
      <StatCard title="Active teachers" value={summary.activeTeachers ?? "Unavailable"} icon={UserRound} description={summary.activeTeachers === null ? "Teacher records are unavailable" : "Active teacher records"} />
    </div>
    <section className="rounded-xl border bg-card p-5">
      <div className="mb-4"><h2 className="font-semibold">Current-year students by class</h2><p className="mt-1 text-sm text-muted-foreground">Based on active student enrollments.</p></div>
      {summary.classCounts.length ? <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{summary.classCounts.map(({ className, count }) => <div key={className} className="flex items-center justify-between rounded-lg border px-4 py-3"><span className="text-sm font-medium">{className}</span><span className="text-sm text-muted-foreground">{count} students</span></div>)}</div> : <p className="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">{summary.success ? "No current-year student enrollments are available." : "Class totals are unavailable until database access is restored."}</p>}
    </section>
  </div>;
}
