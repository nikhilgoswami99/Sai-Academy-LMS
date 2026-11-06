"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { navigation, type UserRole } from "../../configuration/navigation";

export function AppSidebar({ role = "admin" }: { role?: UserRole }) {
  const items = navigation[role];
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <div className="flex items-center gap-3 px-1 py-1">
          <Image
            src="/academy-logo.png"
            alt="SAI Academy logo"
            width={44}
            height={44}
            className="shrink-0"
            priority
          />
          <div className="min-w-0">
            <h1 className="brand-wordmark text-base font-semibold tracking-tight text-sidebar-primary">SAI ACADEMY</h1>
            <p className="text-xs text-sidebar-foreground/60">
              Management System
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-3 py-5">
          <SidebarGroupLabel className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider">
            Management
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname === item.url || pathname.startsWith(`${item.url}/`)}
                    size="lg"
                    className="my-0.5 rounded-lg px-3"
                    render={<Link href={item.url} aria-current={pathname === item.url ? "page" : undefined} />}
                  >
                    <item.icon className="text-sidebar-primary" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
