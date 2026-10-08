"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function StudentToolbar() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Input
        placeholder="Search students..."
        className="sm:max-w-sm"
      />

      <Button>
        <Plus />
        Add Student
      </Button>
    </div>
  );
}