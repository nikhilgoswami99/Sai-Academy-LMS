"use client";

import { Bell} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b  px-4">
      <SidebarTrigger className="cursor-pointer" />

      <Separator orientation="vertical" className="h-6" />

      <div className="flex flex-1 items-center">
        <h1 className="text-sm font-semibold">SAI ACADEMY</h1>
      </div>

      <Button variant="ghost" size="icon" aria-label="Notifications">
        <Bell className="h-4 w-4" />
      </Button>

      <Button variant="ghost" className="font-medium">
        Admin
      </Button>
    </header>
  );
}