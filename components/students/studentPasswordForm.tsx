"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { changeStudentPassword } from "@/app/(dashboard)/student/profile/actions";

export function StudentPasswordForm() {
  const [password, setPassword] = useState("");
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
      const result = await changeStudentPassword({ password });
      if (!result.success) setMessage(result.message);
      else { setSaved(true); setPassword(""); }
    } catch {
      setMessage("Your password could not be changed. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return <form className="space-y-4" onSubmit={submit}>
    <p className="text-sm text-muted-foreground">Choose a new password for your next sign-in. Continue using your roll number to log in.</p>
    <div className="max-w-md space-y-1.5">
      <label htmlFor="student-new-password" className="text-sm font-medium">New password</label>
      <Input id="student-new-password" type="password" autoComplete="new-password" minLength={8} maxLength={1024} required value={password} onChange={(event) => setPassword(event.target.value)} />
    </div>
    {message && <p className="text-sm text-destructive" role="alert">{message}</p>}
    {saved && <p className="text-sm text-green-700" role="status">Password updated.</p>}
    <Button type="submit" disabled={saving}>{saving ? "Updating…" : "Change password"}</Button>
  </form>;
}
