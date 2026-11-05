"use client";

import { useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldPath } from "react-hook-form";
import { Plus, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getStudentAdmissionOptions, createStudentAdmission, type AdmissionOption } from "@/app/(dashboard)/admin/students/actions";
import { studentAdmissionSchema, type StudentAdmissionFormInput, type StudentAdmissionInput } from "@/lib/validation/student";

type Options = { classes: AdmissionOption[]; boards: AdmissionOption[]; academicYears: AdmissionOption[] };

function localDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function CreateStudentDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Options | null>(null);
  const [optionsError, setOptionsError] = useState("");
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [createdRollNumber, setCreatedRollNumber] = useState("");
  const optionsRequest = useRef(0);
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<StudentAdmissionFormInput, unknown, StudentAdmissionInput>({
    resolver: zodResolver(studentAdmissionSchema),
    defaultValues: { fullName: "", studentContact: "", schoolName: "", classId: "", boardId: "", academicYearId: "", cityCode: "", learningMode: undefined, admissionDate: localDate() },
  });

  function loadOptions() {
    const requestId = ++optionsRequest.current;
    setLoadingOptions(true);
    setOptionsError("");
    getStudentAdmissionOptions().then((result) => {
      if (requestId !== optionsRequest.current) return;
      if (result.success) {
        setOptions({ classes: result.classes, boards: result.boards, academicYears: result.academicYears });
        if (!result.classes.length || !result.boards.length || !result.academicYears.length) {
          setOptionsError("Classes, boards, or academic years are missing in Supabase. Add them before creating an admission.");
        }
      } else {
        setOptions(null);
        setOptionsError(result.message);
      }
    }).catch(() => {
      if (requestId === optionsRequest.current) setOptionsError("Admission options could not be loaded. Check your connection and try again.");
    }).finally(() => { if (requestId === optionsRequest.current) setLoadingOptions(false); });
  }

  async function submit(values: StudentAdmissionInput) {
    setSubmitting(true);
    setNotice(null);
    setCreatedRollNumber("");
    try {
      const result = await createStudentAdmission(values);
      if (!result.success) {
        if (result.fieldErrors) {
          for (const [name, messages] of Object.entries(result.fieldErrors)) {
            if (messages?.[0]) setError(name as FieldPath<StudentAdmissionInput>, { type: "server", message: messages[0] });
          }
        }
        setNotice({ tone: "error", text: result.message });
        return;
      }

      setCreatedRollNumber(result.rollNumber);
      setNotice({ tone: "success", text: "Student admission completed successfully." });
      router.refresh();
      reset({ fullName: "", studentContact: "", schoolName: "", classId: "", boardId: "", academicYearId: "", cityCode: "", learningMode: undefined, admissionDate: localDate() });
    } catch {
      setNotice({ tone: "error", text: "The request could not be confirmed. Check with the academy administrator before retrying." });
    } finally {
      setSubmitting(false);
    }
  }

  function close(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) loadOptions();
    if (!nextOpen) {
      optionsRequest.current += 1;
      setLoadingOptions(false);
      setNotice(null);
      setCreatedRollNumber("");
    }
  }

  const blocked = loadingOptions || submitting || !options || Boolean(optionsError);
  const field = <T extends FieldPath<StudentAdmissionInput>>(name: T) => ({
    ...register(name),
    "aria-invalid": Boolean(errors[name]),
  });
  const message = <T extends FieldPath<StudentAdmissionInput>>(name: T) => errors[name]?.message as string | undefined;
  const selectClass = "h-9 w-full rounded-md border border-input bg-background px-3 text-sm";

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogTrigger render={<Button />}><Plus aria-hidden="true" />Add Student</DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-1rem)] overflow-y-auto sm:max-h-[90dvh] sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
        <DialogDescription>Enter the account and enrollment details. The student can complete personal and family details after signing in. The initial password will be the student contact number.</DialogDescription>
        </DialogHeader>

        {loadingOptions && <p className="rounded-lg border p-3 text-sm text-muted-foreground" role="status">Loading classes, boards, academic years, and the active Crash Course…</p>}
        {optionsError && <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive" role="alert">{optionsError}</p>}
        {notice && <div className={`rounded-lg border p-3 text-sm ${notice.tone === "success" ? "border-green-600/30 bg-green-50 text-green-900" : "border-destructive/30 bg-destructive/5 text-destructive"}`} role={notice.tone === "success" ? "status" : "alert"}>
          <p>{notice.text}</p>
          {createdRollNumber && <p className="mt-2 text-lg font-bold">Generated roll number: <span className="font-mono">{createdRollNumber}</span></p>}
        </div>}

        <form className="space-y-6" onSubmit={handleSubmit(submit)} noValidate>
          <Section title="Student details">
            <Field label="Full name" error={message("fullName")}><Input {...field("fullName")} autoComplete="name" placeholder="Student full name" /></Field>
            <Field label="Student contact" error={message("studentContact")}><Input {...field("studentContact")} type="tel" autoComplete="tel" placeholder="Phone number (also initial password)" /></Field>
            <Field label="School name" error={message("schoolName")}><Input {...field("schoolName")} placeholder="School name" /></Field>
          </Section>

          <Section title="Academic and admission details">
            <Field label="Class" error={message("classId")}><select {...field("classId")} className={selectClass}><option value="">Select class</option>{options?.classes.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></Field>
            <Field label="Board" error={message("boardId")}><select {...field("boardId")} className={selectClass}><option value="">Select board</option>{options?.boards.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></Field>
            <Field label="Academic year" error={message("academicYearId")}><select {...field("academicYearId")} className={selectClass}><option value="">Select academic year</option>{options?.academicYears.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></Field>
            <Field label="Admission date" error={message("admissionDate")}><Input {...field("admissionDate")} type="date" /></Field>
            <Field label="City code" error={message("cityCode")}><Input {...field("cityCode")} maxLength={3} placeholder="DEL" onChange={(event) => { event.target.value = event.target.value.toUpperCase(); void field("cityCode").onChange(event); }} /></Field>
            <Field label="Learning mode" error={message("learningMode")}><select {...field("learningMode")} className={selectClass}><option value="">Select learning mode</option><option value="online">Online</option><option value="offline">Offline</option></select></Field>
            <p className="text-sm text-muted-foreground sm:col-span-2">Course: <strong>Active Crash Course</strong> (assigned automatically). Roll number is generated by the database.</p>
          </Section>

          <Button type="submit" className="w-full" disabled={blocked}>
            {submitting && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
            {submitting ? "Creating admission…" : "Create Student Admission"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return <fieldset className="grid gap-4 rounded-xl border p-4 sm:grid-cols-2"><legend className="px-1 text-sm font-semibold">{title}</legend>{children}</fieldset>;
}
function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return <div className="space-y-1.5"><label className="block space-y-1.5 text-sm font-medium">{label}{children}</label>{error && <p className="text-xs font-normal text-destructive" role="alert">{error}</p>}</div>;
}
