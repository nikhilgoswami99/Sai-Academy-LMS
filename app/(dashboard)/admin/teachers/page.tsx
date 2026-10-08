import { PageHeader } from "@/components/dashboard/pageHeader";
import { TeacherTable } from "@/components/teachers/teacherTable";

export default function TeachersPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Teachers"
        description="Manage teachers at SAI Academy"
      />

      <TeacherTable />
    </div>
  );
}