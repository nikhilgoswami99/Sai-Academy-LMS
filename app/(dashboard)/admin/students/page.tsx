import { StudentTable } from "@/components/students/studentsTable";
import { StudentToolbar } from "@/components/students/studentToolbar";
import { PageHeader } from "../../../../components/dashboard/pageHeader";

export default function StudentsPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Students"
        description="Manage students enrolled at SAI Academy"
      />
      <StudentToolbar></StudentToolbar>
      <StudentTable></StudentTable>
    </div>
    
  );
}