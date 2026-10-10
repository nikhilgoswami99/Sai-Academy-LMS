import { PageHeader } from "@/components/dashboard/pageHeader";
import { ResultTable } from "@/components/results/resultTable";
import { UploadResultsDialog } from "@/components/results/uploadResultsDialog";

export default function ResultsPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Results"
        description="Manage and upload student exam results"
        action={<UploadResultsDialog />}
      />

      <ResultTable />
    </div>
  );
}
