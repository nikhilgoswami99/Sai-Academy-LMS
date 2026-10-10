"use client";

import { Upload } from "lucide-react";

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

export function UploadResultsDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        <Upload aria-hidden="true" />
        Upload Results
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Results</DialogTitle>
          <DialogDescription>
            Upload the results of an offline academy exam.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Class</label>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="XI">Class XI</SelectItem>
                <SelectItem value="XII">Class XII</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Exam</label>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select exam" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="EXM001">
                  Monthly Test - September
                </SelectItem>
                <SelectItem value="EXM002">
                  Unit Test - September
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Result File
            </label>

            <Input type="file" accept=".csv,.xlsx,.xls" />
            <p className="text-xs text-muted-foreground">
              Supported formats: CSV, XLS, XLSX
            </p>
          </div>

          <Button className="w-full">
            <Upload />
            Upload Results
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
