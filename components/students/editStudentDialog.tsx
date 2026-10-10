"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EditStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: {
    id: string;
    name: string;
    className: string;
    batch: string;
  } | null;
}

export function EditStudentDialog({
  open,
  onOpenChange,
  student,
}: EditStudentDialogProps) {
  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>
            Update student information.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Full Name
            </label>
            <Input defaultValue={student.name} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Class
            </label>
            <Input defaultValue={student.className} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Batch
            </label>
            <Input defaultValue={student.batch} />
          </div>

          <Button className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}