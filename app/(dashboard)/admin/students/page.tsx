import { StudentTable } from "@/components/students/studentsTable";
import { StudentToolbar } from "@/components/students/studentToolbar";
import { PageHeader } from "../../../../components/dashboard/pageHeader";
import { getAdminStudents } from "@/app/(dashboard)/admin/students/actions";

export default async function StudentsPage() {
  const result = await getAdminStudents();
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Students"
        description="Manage students enrolled at SAI Academy"
      />
      <StudentToolbar />
      <StudentTable students={result.success ? result.students : []} error={result.success ? undefined : result.message} />
    </div>
    
  );
}
