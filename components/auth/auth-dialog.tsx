"use client";

import { useState, type ReactElement } from "react";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { LoginForm } from "@/components/auth/login-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AuthDialogProps {
  trigger: ReactElement;
}

export function AuthDialog({ trigger }: AuthDialogProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"login" | "forgot-password">("login");

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) setView("login");
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 sm:max-w-md sm:p-8">
        <DialogTitle className="sr-only">
          {view === "login" ? "Sign in to SAI Academy" : "Reset your password"}
        </DialogTitle>
        {view === "login" ? (
          <LoginForm onForgotPassword={() => setView("forgot-password")} />
        ) : (
          <ForgotPasswordForm onBackToLogin={() => setView("login")} />
        )}
      </DialogContent>
    </Dialog>
  );
}
