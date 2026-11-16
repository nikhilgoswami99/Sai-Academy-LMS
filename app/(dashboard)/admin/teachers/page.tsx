import { PageHeader } from "@/components/dashboard/pageHeader";
import { TeacherTable } from "@/components/teachers/teacherTable";
import { listTeachers } from "./actions";

export default async function TeachersPage() {
  const result = await listTeachers();
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Teachers"
        description="Manage teachers at SAI Academy"
        action={null}
      />
      {!result.success ? <div role="alert" className="rounded-lg border border-destructive/40 p-4 text-sm">{result.message}</div> : <TeacherTable initialTeachers={result.teachers} />}
    </div>
  );
}
