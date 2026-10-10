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

export function CreateStudentDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        <Plus aria-hidden="true" />
        Add Student
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-1rem)] overflow-y-auto sm:max-h-[90dvh] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
          <DialogDescription>
            Add a new student to SAI Academy.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Personal Information */}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Full Name
              </label>
              <Input placeholder="Rahul Sharma" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Phone
              </label>
              <Input placeholder="9876543210" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Email
              </label>
              <Input
                type="email"
                placeholder="student@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="student-dob">
                Date of Birth
              </label>
              <Input className="w-full min-w-0" id="student-dob" type="date" />
            </div>
          </div>

          {/* Academic Information */}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Class
              </label>

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
              <label className="text-sm font-medium">
                Batch
              </label>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="BAT001">
                    Class XII - A
                  </SelectItem>
                  <SelectItem value="BAT002">
                    Class XII - B
                  </SelectItem>
                  <SelectItem value="BAT003">
                    Class XI - A
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                School
              </label>
              <Input placeholder="School name" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Board
              </label>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select board" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="CBSE">CBSE</SelectItem>
                  <SelectItem value="ICSE">ICSE</SelectItem>
                  <SelectItem value="UP">UP Board</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Academy Information */}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Student ID
              </label>
              <Input placeholder="STU001" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="student-admission-date">
                Admission Date
              </label>
              <Input
                className="w-full min-w-0"
                id="student-admission-date"
                type="date"
              />
            </div>
          </div>

          <Button className="w-full">
            Create Student
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
