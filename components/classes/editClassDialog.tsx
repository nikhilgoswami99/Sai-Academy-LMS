"use client";

import { useEffect, useState } from "react";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classRecord: ClassRecord | null;
  onSave: (classRecord: ClassRecord) => void;
}

export function EditClassDialog({
  open,
  onOpenChange,
  classRecord,
  onSave,
}: EditClassDialogProps) {
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState("");
  const [status, setStatus] = useState<ClassRecord["status"]>("Active");

  useEffect(() => {
    if (open && classRecord) {
      setName(classRecord.name);
      setSubjects(String(classRecord.subjects));
      setStatus(classRecord.status);
    }
  }, [open, classRecord]);

  const handleSave = () => {
    if (!classRecord) return;

    onSave({ ...classRecord, name, subjects: Number(subjects), status });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
          <DialogDescription>Update class information.</DialogDescription>
        </DialogHeader>

        {classRecord ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-class-name">
                Class Name
              </label>
              <Input
                id="edit-class-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-class-id">
                Class ID
              </label>
              <Input id="edit-class-id" value={classRecord.id} readOnly />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-class-subjects">
                Subjects
              </label>
              <Input
                id="edit-class-subjects"
                type="number"
                value={subjects}
                onChange={(event) => setSubjects(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Students</label>
              <Input value={classRecord.students} readOnly aria-label="Student count" />
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
          <p className="text-sm text-muted-foreground">No class selected.</p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!classRecord}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
