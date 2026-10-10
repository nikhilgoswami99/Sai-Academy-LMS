"use client";

import { Plus } from "lucide-react";

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

export function CreateExamDialog() {
  return (
    <Dialog>
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
            <label className="text-sm font-medium">Exam Name</label>
            <Input placeholder="e.g. Monthly Test - October" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Class</label>

            <Select>
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
            <Input className="w-full min-w-0" id="exam-date" type="date" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Total Marks</label>
            <Input type="number" placeholder="70" min="1" />
          </div>

          <Button className="w-full">Create Exam</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
