"use client";

import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import { Batch } from "@/components/batches/batchTypes";
import { DeleteBatchDialog } from "@/components/batches/deleteBatchDialog";
import { EditBatchDialog } from "@/components/batches/editBatchDialog";
import { ViewBatchDialog } from "@/components/batches/viewBatchDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const initialBatches: Batch[] = [
  {
    id: "BAT001",
    name: "Class XII - A",
    className: "XII",
    teacher: "Sachin Kumar",
    students: 32,
    status: "Active",
  },
  {
    id: "BAT002",
    name: "Class XII - B",
    className: "XII",
    teacher: "Hemant Kumar",
    students: 28,
    status: "Active",
  },
  {
    id: "BAT003",
    name: "Class XI - A",
    className: "XI",
    teacher: "Amit Sharma",
    students: 30,
    status: "Active",
  },
];

export function BatchTable() {
  const [batches, setBatches] = useState<Batch[]>(initialBatches);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleSaveBatch = (updatedBatch: Batch) => {
    setBatches((currentBatches) =>
      currentBatches.map((batch) =>
        batch.id === updatedBatch.id ? updatedBatch : batch
      )
    );
    setSelectedBatch(updatedBatch);
  };

  const handleConfirmDelete = () => {
    if (!selectedBatch) return;

    setBatches((currentBatches) =>
      currentBatches.filter((batch) => batch.id !== selectedBatch.id)
    );
    setDeleteOpen(false);
    setSelectedBatch(null);
  };

  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Batch</TableHead>
            <TableHead>Batch ID</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {batches.map((batch) => (
            <TableRow key={batch.id}>
              <TableCell className="font-medium">{batch.name}</TableCell>
              <TableCell>{batch.id}</TableCell>
              <TableCell>{batch.className}</TableCell>
              <TableCell>{batch.teacher}</TableCell>
              <TableCell>{batch.students}</TableCell>
              <TableCell>{batch.status}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Actions for ${batch.name}`}
                      />
                    }
                  >
                    <MoreHorizontal aria-hidden="true" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedBatch(batch);
                        setViewOpen(true);
                      }}
                    >
                      View Batch
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedBatch(batch);
                        setEditOpen(true);
                      }}
                    >
                      Edit Batch
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => {
                        setSelectedBatch(batch);
                        setDeleteOpen(true);
                      }}
                    >
                      Delete Batch
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ViewBatchDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        batch={selectedBatch}
      />
      <EditBatchDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        batch={selectedBatch}
        onSave={handleSaveBatch}
      />
      <DeleteBatchDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        batch={selectedBatch}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
