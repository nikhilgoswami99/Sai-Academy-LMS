"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Search } from "lucide-react";
import type { AdminStudentRecord } from "@/app/(dashboard)/admin/students/actions";
import { setAdminStudentActive } from "@/app/(dashboard)/admin/students/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EditStudentDialog, type Student } from "@/components/students/editStudentDialog";
import { DeleteStudentDialog } from "@/components/students/deleteStudentDialog";
import { ViewStudentDialog } from "@/components/students/viewStudentDialog";

type Props = { students: AdminStudentRecord[]; error?: string };

export function StudentTable({ students, error }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<AdminStudentRecord | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState("");

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return students;
    return students.filter((student) =>
      `${student.name} ${student.rollNumber} ${student.studentContact}`.toLowerCase().includes(query),
    );
  }, [search, students]);

  async function updateStatus() {
    if (!selectedStudent || busy) return;
    setBusy(true);
    setActionError("");
    try {
      const result = await setAdminStudentActive(selectedStudent.id, selectedStudent.accountStatus.toLowerCase() !== "active");
      if (!result.success) {
        setActionError(result.message);
        return;
      }
      setStatusOpen(false);
      router.refresh();
    } catch {
      setActionError("Account status could not be updated. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const studentForDialog: Student | null = selectedStudent ? { ...selectedStudent } : null;

  return <section className="space-y-4 rounded-xl border bg-card p-4 sm:p-5" aria-label="Student records">
    <div className="relative max-w-md">
      <Search aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input value={search} onChange={(event) => setSearch(event.target.value)} className="pl-9" placeholder="Search name, roll number, or contact" aria-label="Search students by name, roll number, or contact" />
    </div>
    {error && <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive" role="alert">{error}</p>}
    {actionError && <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive" role="alert">{actionError}</p>}

    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader><TableRow>
          <TableHead>Student</TableHead><TableHead>Roll number</TableHead><TableHead>Class</TableHead><TableHead>School</TableHead><TableHead>Board</TableHead><TableHead>Contact</TableHead><TableHead>Course</TableHead><TableHead>Admission</TableHead><TableHead>Account</TableHead><TableHead className="w-12" />
        </TableRow></TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="min-w-40 font-medium">{student.name}</TableCell>
              <TableCell className="font-mono text-xs">{student.rollNumber || "—"}</TableCell>
              <TableCell>{student.className || "—"}</TableCell>
              <TableCell className="min-w-36">{student.schoolName || "—"}</TableCell>
              <TableCell>{student.boardName || "—"}</TableCell>
              <TableCell className="whitespace-nowrap">{student.studentContact || "—"}</TableCell>
              <TableCell>{student.courseName || "—"}</TableCell>
              <TableCell className="capitalize">{student.admissionStatus}</TableCell>
              <TableCell className="capitalize">{student.accountStatus}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={`Actions for ${student.name}`} />}><MoreHorizontal aria-hidden="true" /></DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => { setSelectedStudent(student); setViewOpen(true); }}>View student</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setSelectedStudent(student); setEditOpen(true); }}>Edit personal details</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className={student.accountStatus.toLowerCase() === "active" ? "text-destructive" : ""} onClick={() => { setSelectedStudent(student); setActionError(""); setStatusOpen(true); }}>
                      {student.accountStatus.toLowerCase() === "active" ? "Deactivate account" : "Reactivate account"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {filteredStudents.length === 0 && <TableRow><TableCell colSpan={10} className="h-28 text-center text-sm text-muted-foreground">{error ? "Student records are unavailable." : search ? "No students match this search." : "No student records are available yet."}</TableCell></TableRow>}
        </TableBody>
      </Table>
    </div>

    <ViewStudentDialog open={viewOpen} onOpenChange={setViewOpen} student={selectedStudent} />
    <EditStudentDialog key={`${selectedStudent?.id ?? "none"}-${editOpen}`} open={editOpen} onOpenChange={setEditOpen} student={studentForDialog} />
    <DeleteStudentDialog open={statusOpen} onOpenChange={setStatusOpen} student={studentForDialog} busy={busy} onConfirm={updateStatus} />
  </section>;
}
