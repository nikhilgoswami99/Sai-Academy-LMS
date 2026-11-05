"use client";

import type { AdminStudentRecord } from "@/app/(dashboard)/admin/students/actions";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ViewStudentDialog({ open, onOpenChange, student }: { open: boolean; onOpenChange: (open: boolean) => void; student: AdminStudentRecord | null }) {
  const academic = student ? [
    ["Generated roll number", student.rollNumber], ["Class", student.className], ["Board", student.boardName],
    ["School", student.schoolName], ["Academic year", student.academicYear], ["Admission date", student.admissionDate],
    ["Learning mode", student.learningMode], ["Course", student.courseName], ["Admission status", student.admissionStatus],
    ["Account status", student.accountStatus],
  ] : [];
  const personal = student ? [
    ["Date of birth", student.dateOfBirth], ["Student contact", student.studentContact], ["Email", student.email],
    ["Father's name", student.fatherName], ["Mother's name", student.motherName], ["Parent occupation", student.parentOccupation],
    ["Parent education", student.parentEducation], ["Parent contact", student.parentContact],
    ["Last year's percentage", student.lastYearPercentage], ["Address", student.address], ["Admission source", student.admissionSource],
  ] : [];

  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[calc(100dvh-1rem)] overflow-y-auto sm:max-h-[90dvh] sm:max-w-3xl">
      <DialogHeader><DialogTitle>{student?.name ?? "Student details"}</DialogTitle><DialogDescription>Academic enrollment and personal information from the student record.</DialogDescription></DialogHeader>
      {student && <div className="space-y-6">
        <section><h3 className="mb-3 text-sm font-semibold">Academic and enrollment details</h3><div className="grid gap-3 sm:grid-cols-2">{academic.map(([label, value]) => <Info key={label} label={label} value={value} />)}</div></section>
        <section><h3 className="mb-3 text-sm font-semibold">Personal details</h3><div className="grid gap-3 sm:grid-cols-2">{personal.map(([label, value]) => <Info key={label} label={label} value={value} />)}</div>{student.profilePictureUrl && <img src={student.profilePictureUrl} alt={`${student.name} profile`} className="mt-4 size-20 rounded-full border object-cover" />}</section>
      </div>}
    </DialogContent>
  </Dialog>;
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0 rounded-lg border px-3 py-2.5"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 break-words text-sm font-medium">{value || "Not provided"}</p></div>;
}
