"use client";

import type { ClassRecord } from "@/components/classes/classTypes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classRecord: ClassRecord | null;
  onConfirm: () => void;
}

export function DeleteClassDialog({
  open,
  onOpenChange,
  classRecord,
  onConfirm,
}: DeleteClassDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Class?</DialogTitle>
          {classRecord ? (
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">{classRecord.name}</span>?
              {" "}This action cannot be undone.
            </DialogDescription>
          ) : (
            <DialogDescription>No class selected.</DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={!classRecord}
          >
            Delete Class
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
