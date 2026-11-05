"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateStudentPersonalProfile } from "@/app/(dashboard)/student/profile/actions";
import type { StudentPersonalProfile } from "@/lib/validation/student";

type ProfileValues = Record<keyof StudentPersonalProfile, string>;
const fields: { name: keyof ProfileValues; label: string; type?: string }[] = [
  { name: "email", label: "Email address", type: "email" },
  { name: "dateOfBirth", label: "Date of birth", type: "date" },
  { name: "profilePictureUrl", label: "Profile picture URL", type: "url" },
  { name: "fatherName", label: "Father's name" },
  { name: "motherName", label: "Mother's name" },
  { name: "parentOccupation", label: "Parent occupation" },
  { name: "parentEducation", label: "Parent education" },
  { name: "parentContact", label: "Parent contact", type: "tel" },
  { name: "address", label: "Address" },
];

export function StudentPersonalProfileForm({ initialValues }: { initialValues: ProfileValues }) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setMessage("");
    setSaved(false);
    try {
      const result = await updateStudentPersonalProfile(values);
      if (!result.success) setMessage(result.message);
      else {
        setSaved(true);
        router.refresh();
      }
    } catch {
      setMessage("Your profile could not be saved. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return <form className="space-y-5" onSubmit={submit}>
    <p className="text-sm text-muted-foreground">Complete these personal details after signing in. Your phone number and admission details are managed by the academy.</p>
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map(({ name, label, type = "text" }) => <div className="space-y-1.5" key={name}>
        <label htmlFor={`student-profile-${name}`} className="text-sm font-medium">{label}</label>
        <Input id={`student-profile-${name}`} type={type} value={values[name]} onChange={(event) => setValues((current) => ({ ...current, [name]: event.target.value }))} />
      </div>)}
    </div>
    <p className="text-xs text-muted-foreground">Profile picture uploads need an academy Supabase Storage bucket. Until one is configured, enter a direct image URL.</p>
    {message && <p className="text-sm text-destructive" role="alert">{message}</p>}
    {saved && <p className="text-sm text-green-700" role="status">Profile saved.</p>}
    <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save profile"}</Button>
  </form>;
}
