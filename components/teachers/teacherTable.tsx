"use client";

import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import { DeleteTeacherDialog } from "@/components/teachers/deleteTeacherDialog";
import { EditTeacherDialog } from "@/components/teachers/editTeacherDialog";
import type { Teacher as TeacherType } from "@/components/teachers/teacherTypes";
import { ViewTeacherDialog } from "@/components/teachers/viewTeacherDialog";
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

const initialTeachers: TeacherType[] = [
  {
    id: "TCH001",
    name: "Sachin Kumar",
    subject: "Physics",
    batches: 2,
    status: "Active",
  },
  {
    id: "TCH002",
    name: "Hemant Kumar",
    subject: "Mathematics",
    batches: 2,
    status: "Active",
  },
  {
    id: "TCH003",
    name: "Priyanka Mishra",
    subject: "Chemistry",
    batches: 2,
    status: "Active",
  },
];

export function TeacherTable() {
  const [teachers, setTeachers] = useState<TeacherType[]>(initialTeachers);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherType | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleSaveTeacher = (updatedTeacher: TeacherType) => {
    setTeachers((currentTeachers) =>
      currentTeachers.map((teacher) =>
        teacher.id === updatedTeacher.id ? updatedTeacher : teacher
      )
    );
    setSelectedTeacher(updatedTeacher);
  };

  const handleConfirmDelete = () => {
    if (!selectedTeacher) return;

    setTeachers((currentTeachers) =>
      currentTeachers.filter((teacher) => teacher.id !== selectedTeacher.id)
    );
    setDeleteOpen(false);
    setSelectedTeacher(null);
  };

  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Teacher</TableHead>
            <TableHead>Teacher ID</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Batches</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {teachers.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell className="font-medium">{teacher.name}</TableCell>
              <TableCell>{teacher.id}</TableCell>
              <TableCell>{teacher.subject}</TableCell>
              <TableCell>{teacher.batches}</TableCell>
              <TableCell>{teacher.status}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Actions for ${teacher.name}`}
                      />
                    }
                  >
                    <MoreHorizontal aria-hidden="true" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setViewOpen(true);
                      }}
                    >
                      View Teacher
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setEditOpen(true);
                      }}
                    >
                      Edit Teacher
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setDeleteOpen(true);
                      }}
                    >
                      Delete Teacher
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ViewTeacherDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        teacher={selectedTeacher}
      />
      <EditTeacherDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        teacher={selectedTeacher}
        onSave={handleSaveTeacher}
      />
      <DeleteTeacherDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        teacher={selectedTeacher}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
