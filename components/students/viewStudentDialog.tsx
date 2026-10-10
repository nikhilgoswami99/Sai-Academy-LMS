"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ViewStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: {
    id: string;
    name: string;
    className: string;
    batch: string;
    status: string;
  } | null;
}

export function ViewStudentDialog({
  open,
  onOpenChange,
  student,
}: ViewStudentDialogProps) {
  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{student.name}</DialogTitle>
          <DialogDescription>
            Student details
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">
              Student ID
            </p>
            <p className="font-medium">{student.id}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Class
            </p>
            <p className="font-medium">{student.className}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Batch
            </p>
            <p className="font-medium">{student.batch}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Status
            </p>
            <p className="font-medium">{student.status}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}