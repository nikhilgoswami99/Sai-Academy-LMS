import { Plus, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

export function QuickActions() {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div>
        <h2 className="text-base font-semibold">Quick Actions</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Common actions for academy management.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button>
          <Plus />
          Add Student
        </Button>

        <Button variant="outline">
          <Plus />
          Add Teacher
        </Button>

        <Button variant="outline">
          <Plus />
          Create Batch
        </Button>

        <Button variant="outline">
          <Upload />
          Upload Results
        </Button>
      </div>
    </div>
  );
}