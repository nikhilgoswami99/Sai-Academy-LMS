"use client";

import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/dashboard/pageHeader";
import { CreateExamDialog } from "@/components/exams/createExamDialog";
import { DeleteExamDialog } from "@/components/exams/deleteExamDialog";
import { EditExamDialog } from "@/components/exams/editExamDialog";
import type { Exam } from "@/components/exams/examTypes";
import { formatExamDate } from "@/components/exams/examTypes";
import { ViewExamDialog } from "@/components/exams/viewExamDialog";
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

const initialExams: Exam[] = [
  {
    id: "EXM001",
    name: "Monthly Test - September",
    className: "XII",
    date: "15 Sep 2026",
    totalMarks: 70,
    status: "Completed",
  },
  {
    id: "EXM002",
    name: "Unit Test - September",
    className: "XI",
    date: "20 Sep 2026",
    totalMarks: 50,
    status: "Upcoming",
  },
  {
    id: "EXM003",
    name: "Monthly Test - October",
    className: "XII",
    date: "10 Oct 2026",
    totalMarks: 70,
    status: "Upcoming",
  },
];

export function ExamTable() {
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleCreateExam = (exam: Exam) => {
    setExams((currentExams) => [...currentExams, exam]);
  };

  const handleSaveExam = (updatedExam: Exam) => {
    setExams((currentExams) =>
      currentExams.map((exam) => (exam.id === updatedExam.id ? updatedExam : exam))
    );
    setSelectedExam(updatedExam);
  };

  const handleConfirmDelete = () => {
    if (!selectedExam) return;

    setExams((currentExams) =>
      currentExams.filter((exam) => exam.id !== selectedExam.id)
    );
    setDeleteOpen(false);
    setSelectedExam(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Exams"
        description="Manage academy exams and assessments"
        action={<CreateExamDialog onCreate={handleCreateExam} />}
      />

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exam</TableHead>
              <TableHead>Exam ID</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total Marks</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell className="font-medium">{exam.name}</TableCell>
                <TableCell>{exam.id}</TableCell>
                <TableCell>{exam.className}</TableCell>
                <TableCell>{formatExamDate(exam.date)}</TableCell>
                <TableCell>{exam.totalMarks}</TableCell>
                <TableCell>{exam.status}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Actions for ${exam.name}`}
                        />
                      }
                    >
                      <MoreHorizontal aria-hidden="true" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedExam(exam);
                          setViewOpen(true);
                        }}
                      >
                        View Exam
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedExam(exam);
                          setEditOpen(true);
                        }}
                      >
                        Edit Exam
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          setSelectedExam(exam);
                          setDeleteOpen(true);
                        }}
                      >
                        Delete Exam
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ViewExamDialog
          open={viewOpen}
          onOpenChange={setViewOpen}
          exam={selectedExam}
        />
        <EditExamDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          exam={selectedExam}
          onSave={handleSaveExam}
        />
        <DeleteExamDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          exam={selectedExam}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
}
