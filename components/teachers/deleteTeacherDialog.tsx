"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Teacher } from "@/components/teachers/teacherTypes";

interface DeleteTeacherDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher: Teacher | null;
  onConfirm: () => void;
}

export function DeleteTeacherDialog({
  open,
  onOpenChange,
  teacher,
  onConfirm,
}: DeleteTeacherDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Teacher?</DialogTitle>
          {teacher ? (
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">{teacher.name}</span>?
              {" "}This action cannot be undone.
            </DialogDescription>
          ) : (
            <DialogDescription>No teacher selected.</DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={!teacher}
          >
            Delete Teacher
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
