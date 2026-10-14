"use client";

import { useEffect, useState } from "react";

import type { Exam } from "@/components/exams/examTypes";
import { examDateForInput } from "@/components/exams/examTypes";
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

interface EditExamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exam: Exam | null;
  onSave: (exam: Exam) => void;
}

export function EditExamDialog({
  open,
  onOpenChange,
  exam,
  onSave,
}: EditExamDialogProps) {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [date, setDate] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [status, setStatus] = useState<Exam["status"]>("Upcoming");

  useEffect(() => {
    if (open && exam) {
      setName(exam.name);
      setClassName(exam.className);
      setDate(examDateForInput(exam.date));
      setTotalMarks(String(exam.totalMarks));
      setStatus(exam.status);
    }
  }, [open, exam]);

  const handleSave = () => {
    if (!exam) return;

    onSave({ ...exam, name, className, date, totalMarks: Number(totalMarks), status });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-1rem)] overflow-y-auto sm:max-h-[90dvh] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Exam</DialogTitle>
          <DialogDescription>Update exam information.</DialogDescription>
        </DialogHeader>

        {exam ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-exam-name">
                Exam Name
              </label>
              <Input
                id="edit-exam-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-exam-id">
                Exam ID
              </label>
              <Input id="edit-exam-id" value={exam.id} readOnly />
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
              <label className="text-sm font-medium" htmlFor="edit-exam-date">
                Exam Date
              </label>
              <Input
                className="w-full min-w-0"
                id="edit-exam-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="edit-exam-marks">
                Total Marks
              </label>
              <Input
                id="edit-exam-marks"
                type="number"
                value={totalMarks}
                onChange={(event) => setTotalMarks(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={status}
                onValueChange={(value) => {
                  if (value === "Upcoming" || value === "Completed") setStatus(value);
                }}
              >
                <SelectTrigger className="w-full" aria-label="Status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No exam selected.</p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!exam}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
