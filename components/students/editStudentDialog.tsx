"use client";

import { useEffect, useState } from "react";

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

export interface Student {
  id: string;
  name: string;
  className: string;
  batch: string;
  status: string;
}

interface EditStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
  onSave: (student: Student) => void;
}

export function EditStudentDialog({
  open,
  onOpenChange,
  student,
  onSave,
}: EditStudentDialogProps) {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [batch, setBatch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (open && student) {
      setName(student.name);
      setClassName(student.className);
      setBatch(student.batch);
      setStatus(student.status);
    }
  }, [open, student]);

  const handleSave = () => {
    if (!student) return;

    onSave({ ...student, name, className, batch, status });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>
            Update the student&apos;s information.
          </DialogDescription>
        </DialogHeader>

        {student ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium" htmlFor="edit-student-name">
                Full Name
              </label>
              <Input
                id="edit-student-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-student-id">
                Student ID
              </label>
              <Input id="edit-student-id" value={student.id} readOnly />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-student-class">
                Class
              </label>
              <Input
                id="edit-student-class"
                value={className}
                onChange={(event) => setClassName(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-student-batch">
                Batch
              </label>
              <Input
                id="edit-student-batch"
                value={batch}
                onChange={(event) => setBatch(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={status} onValueChange={(value) => value && setStatus(value)}>
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
          <p className="text-sm text-muted-foreground">No student selected.</p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!student}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
