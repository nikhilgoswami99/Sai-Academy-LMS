"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import type { Exam } from "@/components/exams/examTypes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateExamDialogProps {
  onCreate: (exam: Exam) => void;
}

export function CreateExamDialog({ onCreate }: CreateExamDialogProps) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [date, setDate] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [status, setStatus] = useState<Exam["status"]>("Upcoming");

  const handleCreate = () => {
    onCreate({ id, name, className, date, totalMarks: Number(totalMarks), status });
    setOpen(false);
    setId("");
    setName("");
    setClassName("");
    setDate("");
    setTotalMarks("");
    setStatus("Upcoming");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Plus aria-hidden="true" />
        Create Exam
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-1rem)] overflow-y-auto sm:max-h-[90dvh] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Exam</DialogTitle>
          <DialogDescription>Add a new offline academy exam.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="create-exam-name">
              Exam Name
            </label>
            <Input
              id="create-exam-name"
              placeholder="e.g. Monthly Test - October"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="create-exam-id">
              Exam ID
            </label>
            <Input
              id="create-exam-id"
              placeholder="EXM004"
              value={id}
              onChange={(event) => setId(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Class</label>
            <Select value={className} onValueChange={(value) => value && setClassName(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="XI">Class XI</SelectItem>
                <SelectItem value="XII">Class XII</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="exam-date">
              Exam Date
            </label>
            <Input
              className="w-full min-w-0"
              id="exam-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="exam-total-marks">
              Total Marks
            </label>
            <Input
              id="exam-total-marks"
              type="number"
              placeholder="70"
              value={totalMarks}
              onChange={(event) => setTotalMarks(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={status} onValueChange={(value) => {
              if (value === "Upcoming" || value === "Completed") setStatus(value);
            }}>
              <SelectTrigger className="w-full" aria-label="Status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" onClick={handleCreate}>
            Create Exam
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
