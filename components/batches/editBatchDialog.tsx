"use client";

import { useEffect, useState } from "react";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditBatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  batch: Batch | null;
  onSave: (batch: Batch) => void;
}

export function EditBatchDialog({
  open,
  onOpenChange,
  batch,
  onSave,
}: EditBatchDialogProps) {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [status, setStatus] = useState<Batch["status"]>("Active");

  useEffect(() => {
    if (open && batch) {
      setName(batch.name);
      setClassName(batch.className);
      setTeacher(batch.teacher);
      setStatus(batch.status);
    }
  }, [open, batch]);

  const handleSave = () => {
    if (!batch) return;

    onSave({ ...batch, name, className, teacher, status });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-1rem)] overflow-y-auto sm:max-h-[90dvh] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Batch</DialogTitle>
          <DialogDescription>Update batch information.</DialogDescription>
        </DialogHeader>

        {batch ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-batch-name">
                Batch Name
              </label>
              <Input
                id="edit-batch-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-batch-id">
                Batch ID
              </label>
              <Input id="edit-batch-id" value={batch.id} readOnly />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Class</label>
              <Select value={className} onValueChange={(value) => value && setClassName(value)}>
                <SelectTrigger className="w-full" aria-label="Class">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="XI">Class XI</SelectItem>
                  <SelectItem value="XII">Class XII</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Assigned Teacher</label>
              <Select value={teacher} onValueChange={(value) => value && setTeacher(value)}>
                <SelectTrigger className="w-full" aria-label="Assigned Teacher">
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sachin Kumar">Sachin Kumar</SelectItem>
                  <SelectItem value="Hemant Kumar">Hemant Kumar</SelectItem>
                  <SelectItem value="Amit Sharma">Amit Sharma</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Students</label>
              <Input value={batch.students} readOnly aria-label="Student count" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={status}
                onValueChange={(value) => {
                  if (value === "Active" || value === "Inactive") setStatus(value);
                }}
              >
                <SelectTrigger className="w-full" aria-label="Status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No batch selected.</p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!batch}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
