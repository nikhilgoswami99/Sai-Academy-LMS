"use client";

import type { Batch } from "@/components/batches/batchTypes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteBatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  batch: Batch | null;
  onConfirm: () => void;
}

export function DeleteBatchDialog({
  open,
  onOpenChange,
  batch,
  onConfirm,
}: DeleteBatchDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Batch?</DialogTitle>
          {batch ? (
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">{batch.name}</span>?
              {" "}This action cannot be undone.
            </DialogDescription>
          ) : (
            <DialogDescription>No batch selected.</DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={!batch}
          >
            Delete Batch
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
