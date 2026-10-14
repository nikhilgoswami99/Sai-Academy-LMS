"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Teacher } from "@/components/teachers/teacherTypes";

interface ViewTeacherDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher: Teacher | null;
}

export function ViewTeacherDialog({
  open,
  onOpenChange,
  teacher,
}: ViewTeacherDialogProps) {
  const details = teacher
    ? [
        ["Teacher ID", teacher.id],
        ["Subject", teacher.subject],
        ["Batches", String(teacher.batches)],
        ["Status", teacher.status],
        ["Phone", teacher.phone],
        ["Email", teacher.email],
        ["Qualification", teacher.qualification],
        ["Center", teacher.center],
      ].filter((detail): detail is [string, string] => Boolean(detail[1]))
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{teacher ? teacher.name : "Teacher details"}</DialogTitle>
          <DialogDescription>
            {teacher ? "Teacher information" : "No teacher selected."}
          </DialogDescription>
        </DialogHeader>

        {teacher && (
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
