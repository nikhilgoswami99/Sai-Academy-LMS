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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{student ? student.name : "Student details"}</DialogTitle>
          <DialogDescription>
            {student ? "Student details" : "No student selected."}
          </DialogDescription>
        </DialogHeader>

        {student && <div className="grid gap-4 sm:grid-cols-2">
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
        </div>}
      </DialogContent>
    </Dialog>
  );
}
