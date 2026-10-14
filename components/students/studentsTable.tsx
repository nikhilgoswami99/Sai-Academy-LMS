"use client";

import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import { EditStudentDialog, type Student } from "@/components/students/editStudentDialog";
import { DeleteStudentDialog } from "@/components/students/deleteStudentDialog";
import { ViewStudentDialog } from "@/components/students/viewStudentDialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialStudents: Student[] = [
  {
    id: "STU001",
    name: "Rahul Sharma",
    className: "XII",
    batch: "A",
    status: "Active",
  },
  {
    id: "STU002",
    name: "Priya Singh",
    className: "XI",
    batch: "B",
    status: "Active",
  },
  {
    id: "STU003",
    name: "Aman Verma",
    className: "XII",
    batch: "A+",
    status: "Active",
  },
];

export function StudentTable() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleSaveStudent = (updatedStudent: Student) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    setSelectedStudent(updatedStudent);
  };

  const handleConfirmDelete = () => {
    if (!selectedStudent) return;

    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== selectedStudent.id)
    );
    setDeleteOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Student ID</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>

              <TableCell>{student.id}</TableCell>

              <TableCell>{student.className}</TableCell>

              <TableCell>{student.batch}</TableCell>

              <TableCell>{student.status}</TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Actions for ${student.name}`}
                      />
                    }
                  >
                    <MoreHorizontal aria-hidden="true" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedStudent(student);
                        setViewOpen(true);
                      }}
                    >
                      View Student
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedStudent(student);
                        setEditOpen(true);
                      }}
                    >
                      Edit Student
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => {
                        setSelectedStudent(student);
                        setDeleteOpen(true);
                      }}
                    >
                      Delete Student
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ViewStudentDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        student={selectedStudent}
      />
      <EditStudentDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        student={selectedStudent}
        onSave={handleSaveStudent}
      />
      <DeleteStudentDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        student={selectedStudent}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
