"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Batch } from "@/components/batches/batchTypes";

interface ViewBatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  batch: Batch | null;
}

export function ViewBatchDialog({
  open,
  onOpenChange,
  batch,
}: ViewBatchDialogProps) {
  const details = batch
    ? [
        ["Batch ID", batch.id],
        ["Batch Name", batch.name],
        ["Class", `Class ${batch.className}`],
        ["Assigned Teacher", batch.teacher],
        ["Students", String(batch.students)],
        ["Status", batch.status],
      ]
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{batch ? batch.name : "Batch details"}</DialogTitle>
          <DialogDescription>
            {batch ? "Batch information" : "No batch selected."}
          </DialogDescription>
        </DialogHeader>

        {batch && (
          <div className="grid gap-4 sm:grid-cols-2">
            {details.map(([label, value]) => (
              <div key={label}>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
