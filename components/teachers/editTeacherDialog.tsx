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
import type { Teacher } from "@/components/teachers/teacherTypes";

interface EditTeacherDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher: Teacher | null;
  onSave: (teacher: Teacher) => void;
}

export function EditTeacherDialog({
  open,
  onOpenChange,
  teacher,
  onSave,
}: EditTeacherDialogProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [qualification, setQualification] = useState("");
  const [center, setCenter] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (open && teacher) {
      setName(teacher.name);
      setPhone(teacher.phone ?? "");
      setEmail(teacher.email ?? "");
      setSubject(teacher.subject);
      setQualification(teacher.qualification ?? "");
      setCenter(teacher.center ?? "");
      setStatus(teacher.status);
    }
  }, [open, teacher]);

  const handleSave = () => {
    if (!teacher) return;

    onSave({
      ...teacher,
      name,
      phone,
      email,
      subject,
      qualification,
      center,
      status,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-1rem)] overflow-y-auto sm:max-h-[90dvh] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Teacher</DialogTitle>
          <DialogDescription>Update teacher information.</DialogDescription>
        </DialogHeader>

        {teacher ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-teacher-name">
                Full Name
              </label>
              <Input
                id="edit-teacher-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-teacher-phone">
                Phone
              </label>
              <Input
                id="edit-teacher-phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-teacher-email">
                Email
              </label>
              <Input
                id="edit-teacher-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-teacher-id">
                Teacher ID
              </label>
              <Input id="edit-teacher-id" value={teacher.id} readOnly />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-teacher-subject">
                Subject
              </label>
              <Input
                id="edit-teacher-subject"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-teacher-qualification">
                Qualification
              </label>
              <Input
                id="edit-teacher-qualification"
                value={qualification}
                onChange={(event) => setQualification(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-teacher-center">
                Center
              </label>
              <Input
                id="edit-teacher-center"
                value={center}
                onChange={(event) => setCenter(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={status}
                onValueChange={(value) => value && setStatus(value)}
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
          <p className="text-sm text-muted-foreground">No teacher selected.</p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!teacher}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
