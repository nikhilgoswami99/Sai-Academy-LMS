import { PageHeader } from "@/components/dashboard/pageHeader";
import { ClassTable } from "@/components/classes/classTable";

export default function ClassesPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Classes"
        description="Manage academic classes at SAI Academy"
      />

      <ClassTable />
    </div>
  );
}