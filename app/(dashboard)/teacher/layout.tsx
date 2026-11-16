import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { AppShell } from "@/components/layout/appShell";
import { getTeacherContext } from "@/lib/auth/teacher";

export default async function TeacherLayout({ children }: { children: ReactNode }) {
  await connection();
  const context = await getTeacherContext();
  if (!context) redirect("/");
  return <AppShell role="teacher">{children}</AppShell>;
}
