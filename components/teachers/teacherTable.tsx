"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { assignTeacher, createTeacher, getTeacherOptions, updateTeacher } from "@/app/(dashboard)/admin/teachers/actions";
import { teacherFormSchema } from "@/lib/validation/teacher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Teacher = { id: string; fullName: string; email: string; phone: string; qualification: string; specialization: string; joiningDate: string; status: string; assignments: number };
type TeacherFormValues = z.input<typeof teacherFormSchema>;
const blankForm = { mode: "create" as const, fullName: "", email: "", password: "", phone: "", qualification: "", specialization: "", address: "", joiningDate: "" };
export function TeacherTable({ initialTeachers }: { initialTeachers: Teacher[] }) {
  const [teachers] = useState(initialTeachers);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [notice, setNotice] = useState("");
  const [options, setOptions] = useState<{ years: {id:string;label:string;current:boolean}[]; classes:{id:string;label:string}[]; batches:{id:string;label:string;academicYearId:string}[] } | null>(null);
  const [targetType, setTargetType] = useState<"class"|"batch">("class");
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: blankForm,
  });
  const filtered = useMemo(() => teachers.filter((t) => `${t.fullName} ${t.email} ${t.phone} ${t.qualification} ${t.specialization}`.toLowerCase().includes(query.toLowerCase())), [teachers, query]);
  const submit = handleSubmit(async (values) => {
    setNotice("");
    startTransition(async () => {
      try {
        const { mode, ...formValues } = values;
        const result = mode === "edit"
          ? await updateTeacher({ ...formValues, id: editing!.id })
          : await createTeacher(formValues);
        if (!result.success) { setNotice(result.message); return; }
        setNotice(mode === "edit" ? "Teacher updated." : "Teacher account created.");
        setOpen(false); setEditing(null); router.refresh();
      } catch {
        setNotice("The teacher form could not be submitted. Please try again.");
      }
    });
  }, () => setNotice("Please correct the highlighted fields and try again."));
  const openCreate = () => { setEditing(null); reset(blankForm); setNotice(""); setOpen(true); };
  const startEdit = (teacher: Teacher) => {
    setEditing(teacher);
    reset({ mode: "edit", fullName: teacher.fullName, email: teacher.email, password: "", phone: teacher.phone, qualification: teacher.qualification, specialization: teacher.specialization, address: "", joiningDate: teacher.joiningDate, status: teacher.status === "inactive" ? "inactive" : "active" });
    setNotice(""); setOpen(true);
  };
  const assign = (form: FormData) => startTransition(async () => {
    const result = await assignTeacher({ teacherId: form.get("teacherId"), academicYearId: form.get("academicYearId"), targetType: form.get("targetType"), targetId: form.get("targetId") });
    setNotice(result.success ? "Assignment added." : result.message);
    if (result.success) router.refresh();
  });
  const loadOptions = () => startTransition(async () => { const result = await getTeacherOptions(); if (result.success) setOptions(result); else setNotice(result.message); });
  const statusError = (errors as { status?: { message?: unknown } }).status?.message?.toString();
  return <section className="space-y-4 rounded-xl border bg-card p-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Input aria-label="Search teachers" placeholder="Search by name, email, phone, qualification…" value={query} onChange={(e) => setQuery(e.target.value)} className="max-w-sm" />
      <Button type="button" onClick={openCreate}>Create teacher</Button>
    </div>
    <details className="rounded-lg border p-3" onToggle={(e) => { if ((e.currentTarget as HTMLDetailsElement).open && !options) loadOptions(); }}><summary className="cursor-pointer text-sm font-medium">Assign a class or batch</summary><form action={assign} className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"><select name="teacherId" required className="h-9 rounded-lg border bg-background px-2" defaultValue=""><option value="" disabled>Select teacher</option>{teachers.map((t)=><option key={t.id} value={t.id}>{t.fullName}</option>)}</select><select name="academicYearId" required className="h-9 rounded-lg border bg-background px-2" defaultValue=""><option value="" disabled>Academic year</option>{options?.years.map((y)=><option key={y.id} value={y.id}>{y.label}{y.current?" · current":""}</option>)}</select><select name="targetType" className="h-9 rounded-lg border bg-background px-2" value={targetType} onChange={(e)=>setTargetType(e.target.value as "class"|"batch")}><option value="class">Class</option><option value="batch">Batch</option></select><select name="targetId" required className="h-9 rounded-lg border bg-background px-2" defaultValue=""><option value="" disabled>Select {targetType}</option>{(targetType==="class"?options?.classes:options?.batches)?.map((o)=><option key={o.id} value={o.id}>{o.label}</option>)}</select><Button type="submit" disabled={pending||!options}>Add assignment</Button></form></details>
    {notice && <p role="status" className="text-sm text-muted-foreground">{notice}</p>}
    {!teachers.length ? <p className="py-8 text-center text-sm text-muted-foreground">No teachers yet. Create the first teacher account.</p> : !filtered.length ? <p className="py-8 text-center text-sm text-muted-foreground">No teachers match your search.</p> : <Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Qualification</TableHead><TableHead>Specialization</TableHead><TableHead>Joining date</TableHead><TableHead>Status</TableHead><TableHead>Assignments</TableHead><TableHead /></TableRow></TableHeader><TableBody>{filtered.map((t) => <TableRow key={t.id}><TableCell className="font-medium">{t.fullName}</TableCell><TableCell>{t.email || "—"}</TableCell><TableCell>{t.phone}</TableCell><TableCell>{t.qualification || "—"}</TableCell><TableCell>{t.specialization || "—"}</TableCell><TableCell>{t.joiningDate || "—"}</TableCell><TableCell className="capitalize">{t.status}</TableCell><TableCell>{t.assignments}</TableCell><TableCell><Button variant="outline" size="sm" onClick={() => startEdit(t)}>Edit</Button></TableCell></TableRow>)}</TableBody></Table>}
    {open && <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="teacher-form-title"><form onSubmit={submit} noValidate className="max-h-[90vh] w-full max-w-2xl space-y-4 overflow-y-auto rounded-xl border bg-background p-6 shadow-xl"><h2 id="teacher-form-title" className="text-lg font-semibold">{editing ? "Edit teacher" : "Create teacher"}</h2><div className="grid gap-3 sm:grid-cols-2">
      <Field name="fullName" label="Full name" register={register} error={errors.fullName?.message?.toString()} /><Field name="email" label="Email" type="email" register={register} error={errors.email?.message?.toString()} /><Field name="phone" label="Phone" type="tel" register={register} error={errors.phone?.message?.toString()} />{!editing && <Field name="password" label="Initial password" type="password" register={register} error={errors.password?.message?.toString()} />}<Field name="qualification" label="Qualification" register={register} error={errors.qualification?.message?.toString()} /><Field name="specialization" label="Specialization" register={register} error={errors.specialization?.message?.toString()} /><Field name="joiningDate" label="Joining date" type="date" register={register} error={errors.joiningDate?.message?.toString()} /><Field name="address" label="Address" register={register} error={errors.address?.message?.toString()} />{editing && <label className="space-y-1 text-sm">Status<select {...register("status")} className="h-9 w-full rounded-lg border bg-background px-2"><option value="active">Active</option><option value="inactive">Inactive</option></select>{statusError && <span className="block text-xs text-destructive">{statusError}</span>}</label>}
    </div><p className="text-xs text-muted-foreground">Teacher login uses the email and initial password provided here.</p>{notice && <p className="text-sm text-destructive" role="alert">{notice}</p>}<div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => { setOpen(false); setEditing(null); }}>Cancel</Button><Button type="submit" disabled={pending}>{pending ? "Saving…" : editing ? "Save changes" : "Create account"}</Button></div></form></div>}
  </section>;
}
function Field({ name, label, type = "text", register, error }: { name: "fullName" | "email" | "password" | "phone" | "qualification" | "specialization" | "address" | "joiningDate"; label: string; type?: string; register: UseFormRegister<TeacherFormValues>; error?: string }) { return <label className="space-y-1 text-sm">{label}<Input {...register(name)} type={type} aria-invalid={Boolean(error)} />{error && <span className="block text-xs text-destructive">{error}</span>}</label>; }
