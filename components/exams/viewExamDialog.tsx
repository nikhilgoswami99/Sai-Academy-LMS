"use client";

import type { Exam } from "@/components/exams/examTypes";
import { formatExamDate } from "@/components/exams/examTypes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ViewExamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exam: Exam | null;
}

export function ViewExamDialog({ open, onOpenChange, exam }: ViewExamDialogProps) {
  const details = exam
    ? [
        ["Exam ID", exam.id],
        ["Exam Name", exam.name],
        ["Class", `Class ${exam.className}`],
        ["Exam Date", formatExamDate(exam.date)],
        ["Total Marks", String(exam.totalMarks)],
        ["Status", exam.status],
      ]
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{exam ? exam.name : "Exam details"}</DialogTitle>
          <DialogDescription>
            {exam ? "Exam information" : "No exam selected."}
          </DialogDescription>
        </DialogHeader>

        {exam && (
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
