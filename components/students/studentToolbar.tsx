"use client";

import { CreateStudentDialog } from "@/components/students/createStudentDialog";
import { Button } from "@/components/ui/button";
import { migrateStudentAuthEmails, type StudentAuthMigrationResult } from "@/app/(dashboard)/admin/students/actions";
import { useState } from "react";

export function StudentToolbar() {
  const [migration, setMigration] = useState<StudentAuthMigrationResult | null>(null);
  const [busy, setBusy] = useState(false);

  async function runMigration(dryRun: boolean) {
    setBusy(true);
    try {
      setMigration(await migrateStudentAuthEmails(dryRun));
    } catch {
      setMigration({ success: false, dryRun, eligible: 0, alreadyMigrated: 0, migrated: 0, conflicts: 0, failed: 0, message: "Migration could not be completed. Review Supabase before retrying." });
    } finally {
      setBusy(false);
    }
  }

  const canRun = migration?.success && migration.dryRun && migration.conflicts === 0 && migration.failed === 0 && migration.eligible > 0;

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Button variant="outline" disabled={busy} onClick={() => runMigration(true)}>{busy ? "Checking…" : "Check student login migration"}</Button>
      {canRun && <Button disabled={busy} onClick={() => runMigration(false)}>{busy ? "Migrating…" : `Migrate ${migration.eligible} accounts`}</Button>}
      <CreateStudentDialog />
      {migration && <p className={`w-full text-right text-sm ${migration.success ? "text-muted-foreground" : "text-destructive"}`} role="status">
        {migration.message ?? (migration.dryRun
          ? `Dry run: ${migration.eligible} ready, ${migration.alreadyMigrated} already migrated, ${migration.conflicts} conflicts, ${migration.failed} failed.`
          : `Migration: ${migration.migrated} updated, ${migration.alreadyMigrated} already migrated, ${migration.conflicts} conflicts, ${migration.failed} failed.`)}
      </p>}
    </div>
  );
}
