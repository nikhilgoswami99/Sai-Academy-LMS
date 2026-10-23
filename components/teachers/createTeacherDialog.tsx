"use client";

import { Plus } from "lucide-react";
import { BrandText } from "@/components/brandText";

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

export function CreateTeacherDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        <Plus aria-hidden="true" />
        Create Teacher
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-1rem)] overflow-y-auto sm:max-h-[90dvh] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Teacher</DialogTitle>
          <DialogDescription>
            <BrandText text="Add a teacher to SAI Academy." />
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="teacher-name">
              Full Name
            </label>
            <Input id="teacher-name" placeholder="Sachin Kumar" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="teacher-phone">
              Phone
            </label>
            <Input id="teacher-phone" type="tel" placeholder="9876543210" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="teacher-email">
              Email
            </label>
            <Input
              id="teacher-email"
              type="email"
              placeholder="teacher@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="teacher-id">
              Teacher ID
            </label>
            <Input id="teacher-id" placeholder="TCH001" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="teacher-subject">
              Subject
            </label>
            <Input id="teacher-subject" placeholder="Physics" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="teacher-qualification">
              Qualification
            </label>
            <Input id="teacher-qualification" placeholder="M.Sc. Physics" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="teacher-center">
              Center
            </label>
            <Input id="teacher-center" placeholder="Main Center" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select defaultValue="Active">
              <SelectTrigger className="w-full" aria-label="Status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
