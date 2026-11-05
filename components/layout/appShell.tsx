import type { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "./appSidebar";
import { AppHeader } from "./appHeader";
import type { UserRole } from "@/configuration/navigation";

interface AppShellProps {
  children: ReactNode;
  role?: UserRole;
}

export function AppShell({ children, role = "admin" }: AppShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar role={role} />

      <div className="flex min-h-screen flex-1 flex-col">
        <AppHeader />

        <main className="flex-1">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
