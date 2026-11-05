"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { updateAdminStudent, type AdminStudentRecord } from "@/app/(dashboard)/admin/students/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export type Student = AdminStudentRecord;

type FormValues = Record<"fullName" | "studentContact" | "schoolName" | "dateOfBirth" | "profilePictureUrl" | "lastYearPercentage" | "fatherName" | "motherName" | "parentOccupation" | "parentEducation" | "parentContact" | "email" | "address" | "admissionSource", string>;

const fields: Array<{ name: keyof FormValues; label: string; type?: string }> = [
  { name: "fullName", label: "Student name" },
  { name: "studentContact", label: "Student contact", type: "tel" },
  { name: "schoolName", label: "School name" },
  { name: "dateOfBirth", label: "Date of birth", type: "date" },
  { name: "profilePictureUrl", label: "Profile picture URL", type: "url" },
  { name: "lastYearPercentage", label: "Last year's percentage", type: "number" },
  { name: "fatherName", label: "Father's name" },
  { name: "motherName", label: "Mother's name" },
  { name: "parentOccupation", label: "Parent occupation" },
  { name: "parentEducation", label: "Parent education" },
  { name: "parentContact", label: "Parent contact", type: "tel" },
  { name: "email", label: "Email", type: "email" },
  { name: "address", label: "Address" },
  { name: "admissionSource", label: "Admission source" },
];

function formValues(student: Student): FormValues {
  return {
    fullName: student.name,
    studentContact: student.studentContact,
    schoolName: student.schoolName,
    dateOfBirth: student.dateOfBirth,
    profilePictureUrl: student.profilePictureUrl,
    lastYearPercentage: student.lastYearPercentage,
    fatherName: student.fatherName,
    motherName: student.motherName,
    parentOccupation: student.parentOccupation,
    parentEducation: student.parentEducation,
    parentContact: student.parentContact,
    email: student.email,
    address: student.address,
    admissionSource: student.admissionSource,
  };
}

export function EditStudentDialog({ open, onOpenChange, student }: { open: boolean; onOpenChange: (open: boolean) => void; student: Student | null }) {
  const router = useRouter();
  const [values, setValues] = useState<FormValues | null>(() => student ? formValues(student) : null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!student || !values || saving) return;
    setSaving(true);
    setMessage("");
    setSaved(false);
    try {
      const result = await updateAdminStudent(student.id, values);
      if (!result.success) {
        setMessage(result.message);
        return;
      }
      setSaved(true);
      router.refresh();
    } catch {
      setMessage("Student details could not be saved. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[calc(100dvh-1rem)] overflow-y-auto sm:max-h-[90dvh] sm:max-w-3xl">
      <DialogHeader><DialogTitle>Edit student details</DialogTitle><DialogDescription>Update personal details. Roll number and academic enrollment history are managed separately and cannot be edited here.</DialogDescription></DialogHeader>
      {student && values && <form className="space-y-5" onSubmit={submit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5"><label className="text-sm font-medium" htmlFor="edit-student-roll">Generated roll number</label><Input id="edit-student-roll" value={student.rollNumber || "Not available"} readOnly /></div>
          {fields.map(({ name, label, type = "text" }) => <div className="space-y-1.5" key={name}>
            <label className="text-sm font-medium" htmlFor={`edit-student-${name}`}>{label}</label>
            <Input id={`edit-student-${name}`} type={type} min={type === "number" ? 0 : undefined} max={type === "number" ? 100 : undefined} step={type === "number" ? "0.01" : undefined} required={name === "fullName" || name === "studentContact" || name === "schoolName"} value={values[name]} onChange={(event) => setValues((current) => current ? { ...current, [name]: event.target.value } : current)} />
            {name === "studentContact" && <p className="text-xs text-muted-foreground">Changing this also updates the student&apos;s login phone. The password remains unchanged.</p>}
          </div>)}
        </div>
        {message && <p className="text-sm text-destructive" role="alert">{message}</p>}
        {saved && <p className="text-sm text-green-700" role="status">Student details saved.</p>}
        <DialogFooter><Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Close</Button><Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button></DialogFooter>
      </form>}
    </DialogContent>
  </Dialog>;
}
