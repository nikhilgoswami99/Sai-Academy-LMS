import { PageHeader } from "../../../../components/dashboard/pageHeader";

export default function FeesPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Fees"
        description="Manage student fee records at SAI Academy"
      />

      <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
        Fee records will appear here.
      </div>
    </div>
  );
}
