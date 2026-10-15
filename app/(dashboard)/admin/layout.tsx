import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/appShell";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <AppShell>{children}</AppShell>;
}