"use client";

import type { ClassRecord } from "@/components/classes/classTypes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ViewClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classRecord: ClassRecord | null;
}

export function ViewClassDialog({
  open,
  onOpenChange,
  classRecord,
}: ViewClassDialogProps) {
  const details = classRecord
    ? [
        ["Class ID", classRecord.id],
        ["Class Name", classRecord.name],
        ["Subjects", String(classRecord.subjects)],
        ["Students", String(classRecord.students)],
        ["Status", classRecord.status],
      ]
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {classRecord ? classRecord.name : "Class details"}
          </DialogTitle>
          <DialogDescription>
            {classRecord ? "Class information" : "No class selected."}
          </DialogDescription>
        </DialogHeader>

        {classRecord && (
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
