"use client";

import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import type { ClassRecord } from "@/components/classes/classTypes";
import { DeleteClassDialog } from "@/components/classes/deleteClassDialog";
import { EditClassDialog } from "@/components/classes/editClassDialog";
import { ViewClassDialog } from "@/components/classes/viewClassDialog";
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

const initialClasses: ClassRecord[] = [
  {
    id: "CLS001",
    name: "Class XI",
    subjects: 3,
    students: 86,
    status: "Active",
  },
  {
    id: "CLS002",
    name: "Class XII",
    subjects: 3,
    students: 94,
    status: "Active",
  },
];

export function ClassTable() {
  const [classes, setClasses] = useState<ClassRecord[]>(initialClasses);
  const [selectedClass, setSelectedClass] = useState<ClassRecord | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleSaveClass = (updatedClass: ClassRecord) => {
    setClasses((currentClasses) =>
      currentClasses.map((classRecord) =>
        classRecord.id === updatedClass.id ? updatedClass : classRecord
      )
    );
    setSelectedClass(updatedClass);
  };

  const handleConfirmDelete = () => {
    if (!selectedClass) return;

    setClasses((currentClasses) =>
      currentClasses.filter((classRecord) => classRecord.id !== selectedClass.id)
    );
    setDeleteOpen(false);
    setSelectedClass(null);
  };

  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Class</TableHead>
            <TableHead>Class ID</TableHead>
            <TableHead>Subjects</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {classes.map((classRecord) => (
            <TableRow key={classRecord.id}>
              <TableCell className="font-medium">{classRecord.name}</TableCell>
              <TableCell>{classRecord.id}</TableCell>
              <TableCell>{classRecord.subjects}</TableCell>
              <TableCell>{classRecord.students}</TableCell>
              <TableCell>{classRecord.status}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Actions for ${classRecord.name}`}
                      />
                    }
                  >
                    <MoreHorizontal aria-hidden="true" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedClass(classRecord);
                        setViewOpen(true);
                      }}
                    >
                      View Class
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedClass(classRecord);
                        setEditOpen(true);
                      }}
                    >
                      Edit Class
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => {
                        setSelectedClass(classRecord);
                        setDeleteOpen(true);
                      }}
                    >
                      Delete Class
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ViewClassDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        classRecord={selectedClass}
      />
      <EditClassDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        classRecord={selectedClass}
        onSave={handleSaveClass}
      />
      <DeleteClassDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        classRecord={selectedClass}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
