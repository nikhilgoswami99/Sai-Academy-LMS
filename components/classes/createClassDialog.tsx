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

export function CreateClassDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        <Plus aria-hidden="true" />
        Create Class
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-1rem)] overflow-y-auto sm:max-h-[90dvh] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Class</DialogTitle>
          <DialogDescription>
            Add a new academic class to SAI Academy.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="class-name">
              Class Name
            </label>
            <Input id="class-name" placeholder="Class XI" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="class-id">
              Class ID
            </label>
            <Input id="class-id" placeholder="CLS003" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="class-subjects">
              Subjects
            </label>
            <Input
              id="class-subjects"
              placeholder="Physics, Chemistry, Mathematics"
            />
            <p className="text-xs text-muted-foreground">
              Enter subject names separated by commas.
            </p>
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

          <div className="sm:col-span-2">
            <Button className="w-full sm:w-auto">Create Class</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
