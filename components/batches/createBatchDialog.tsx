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

export function CreateBatchDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        <Plus aria-hidden="true" />
        Create Batch
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-1rem)] overflow-y-auto sm:max-h-[90dvh] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Batch</DialogTitle>
          <DialogDescription>
            Add a new student batch to SAI Academy.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="batch-name">
              Batch Name
            </label>
            <Input id="batch-name" placeholder="Class XII - A" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="batch-id">
              Batch ID
            </label>
            <Input id="batch-id" placeholder="BAT004" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Class</label>
            <Select>
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
            <label className="text-sm font-medium">Assigned Teacher</label>
            <Select>
              <SelectTrigger className="w-full" aria-label="Assigned Teacher">
                <SelectValue placeholder="Select teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sachin Kumar">Sachin Kumar</SelectItem>
                <SelectItem value="Hemant Kumar">Hemant Kumar</SelectItem>
                <SelectItem value="Amit Sharma">Amit Sharma</SelectItem>
              </SelectContent>
            </Select>
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

          <div className="flex items-end sm:justify-end">
            <Button className="w-full sm:w-auto">Create Batch</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
