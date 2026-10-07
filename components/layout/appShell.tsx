import type { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "./appSidebar";
import { AppHeader } from "./appHeader";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <AppHeader />

        <main className="flex-1">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}