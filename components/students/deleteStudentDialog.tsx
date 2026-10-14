"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Student } from "@/components/students/editStudentDialog";

interface DeleteStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
  onConfirm: () => void;
}

export function DeleteStudentDialog({
  open,
  onOpenChange,
  student,
  onConfirm,
}: DeleteStudentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Student?</DialogTitle>

          {student ? (
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                {student.name}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          ) : (
            <DialogDescription>No student selected.</DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button variant="destructive" onClick={onConfirm} disabled={!student}>
            Delete Student
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
