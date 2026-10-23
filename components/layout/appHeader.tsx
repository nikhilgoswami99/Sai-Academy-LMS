"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, LoaderCircle, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { signOut } from "@/lib/auth/logout";

export function AppHeader() {
  const router = useRouter();
  const logoutInProgress = useRef(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  async function handleLogout() {
    if (logoutInProgress.current) return;

    logoutInProgress.current = true;
    setLoggingOut(true);
    setLogoutError("");

    try {
      const result = await signOut();
      if (!result.success) {
        setLogoutError(result.message);
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setLogoutError("We could not sign you out. Please try again.");
    } finally {
      logoutInProgress.current = false;
      setLoggingOut(false);
    }
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b  px-4">
      <SidebarTrigger className="cursor-pointer" />

      <Separator orientation="vertical" className="h-6" />

      <div className="flex flex-1 items-center">
        <h1 className="brand-wordmark text-sm font-semibold">SAI ACADEMY</h1>
      </div>

      <Button variant="ghost" size="icon" aria-label="Notifications">
        <Bell className="h-4 w-4" />
      </Button>

      <Button
        variant="destructive"
        className="font-medium"
        onClick={handleLogout}
        disabled={loggingOut}
        aria-label="Log out of SAI ACADEMY"
      >
        {loggingOut ? (
          <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
        ) : (
          <LogOut aria-hidden="true" className="size-4" />
        )}
        {loggingOut ? "Signing out…" : "Log out"}
      </Button>
      {logoutError && (
        <p className="max-w-56 text-xs text-destructive" role="alert">
          {logoutError}
        </p>
      )}
    </header>
  );
}
