"use client";

import type { Exam } from "@/components/exams/examTypes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteExamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exam: Exam | null;
  onConfirm: () => void;
}

export function DeleteExamDialog({
  open,
  onOpenChange,
  exam,
  onConfirm,
}: DeleteExamDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Exam?</DialogTitle>
          {exam ? (
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">{exam.name}</span>?
              {" "}This action cannot be undone.
            </DialogDescription>
          ) : (
            <DialogDescription>No exam selected.</DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={!exam}>
            Delete Exam
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
