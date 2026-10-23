import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/appShell";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { redirect } from "next/navigation";
import { connection } from "next/server";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  await connection();
  const currentUser = await getCurrentUser();

  if (!currentUser.authenticated) redirect("/login");
  if (!currentUser.authorized) redirect("/login");

  return <AppShell>{children}</AppShell>;
}
