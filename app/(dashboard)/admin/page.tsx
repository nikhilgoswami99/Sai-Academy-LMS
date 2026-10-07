import { Users, UserRound, Layers, BookOpen } from "lucide-react";

import { PageHeader } from "../../../components/dashboard/pageHeader";
import { StatCard } from "../../../components/dashboard/statCard";

export default function AdminDashboard() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Dashboard"
        description="Overview of SAI Academy"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={248}
          icon={Users}
          description="Active students"
        />

        <StatCard
          title="Teachers"
          value={18}
          icon={UserRound}
          description="Active teachers"
        />

        <StatCard
          title="Batches"
          value={24}
          icon={Layers}
          description="Active batches"
        />

        <StatCard
          title="Classes"
          value={8}
          icon={BookOpen}
          description="Current classes"
        />
      </div>
    </div>
  );
}