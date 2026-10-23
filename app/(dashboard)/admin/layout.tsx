import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/appShell";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { redirect } from "next/navigation";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const currentUser = await getCurrentUser();

  if (!currentUser.authenticated) redirect("/login");
  if (!currentUser.authorized) redirect("/login");

  return <AppShell>{children}</AppShell>;
}
