import { PageHeader } from "@/components/dashboard/pageHeader";
import { ExamTable } from "@/components/exams/examTable";
import { CreateExamDialog } from "@/components/exams/createExamDialog";

export default function ExamsPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Exams"
        description="Manage academy exams and assessments"
        action={<CreateExamDialog></CreateExamDialog>}
      />

      <ExamTable />
    </div>
  );
}
