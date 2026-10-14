import { PageHeader } from "@/components/dashboard/pageHeader";
import { BatchTable } from "@/components/batches/batchTable";
import { CreateBatchDialog } from "@/components/batches/createBatchDialog";

export default function BatchesPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Batches"
        description="Manage student batches at SAI Academy"
        action={<CreateBatchDialog />}
      />

      <BatchTable />
    </div>
  );
}
