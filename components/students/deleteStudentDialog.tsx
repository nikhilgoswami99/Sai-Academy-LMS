"use client";

import type { Student } from "@/components/students/editStudentDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function DeleteStudentDialog({ open, onOpenChange, student, busy, onConfirm }: { open: boolean; onOpenChange: (open: boolean) => void; student: Student | null; busy: boolean; onConfirm: () => void }) {
  const active = student?.accountStatus.toLowerCase() === "active";
  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{active ? "Deactivate student account?" : "Reactivate student account?"}</DialogTitle>
        <DialogDescription>
          {student ? <>{active ? "This prevents" : "This restores"} sign-in for <span className="font-medium text-foreground">{student.name}</span>. Student details, roll number, and historical enrollments remain in the database.</> : "No student selected."}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>Cancel</Button>
        <Button variant={active ? "destructive" : "default"} onClick={onConfirm} disabled={!student || busy}>{busy ? "Updating…" : active ? "Deactivate account" : "Reactivate account"}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>;
}
