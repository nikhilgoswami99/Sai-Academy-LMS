"use client";

import { Input } from "@/components/ui/input";
import { CreateStudentDialog } from "@/components/students/createStudentDialog";

export function StudentToolbar() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Input
        placeholder="Search students..."
        className="sm:max-w-sm"
      />

      <CreateStudentDialog />
    </div>
  );
}