"use client";

import { CreateStudentDialog } from "@/components/students/createStudentDialog";

export function StudentToolbar() {
  return (
    <div className="flex justify-end">
      <CreateStudentDialog />
    </div>
  );
}
