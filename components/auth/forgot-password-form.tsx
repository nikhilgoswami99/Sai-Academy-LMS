"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) {
      setError("Enter your email address.");
      return;
    }
    if (!validateEmail(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center" role="status" aria-live="polite">
        <CheckCircle2 aria-hidden="true" className="mx-auto size-10 text-brand-green" />
        <h2 className="mt-5 text-2xl font-semibold tracking-tight">Request received</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          This is a frontend-only confirmation for <span className="font-medium text-foreground">{email.trim()}</span>. Email delivery and password reset are not implemented yet.
        </p>
        <Button type="button" onClick={onBackToLogin} className="mt-7 h-11 w-full">
          <ArrowLeft aria-hidden="true" className="size-4" /> Back to login
        </Button>
      </div>
    );
  }

  return (
    <div>
      <header className="mb-6">
        <button
          type="button"
          onClick={onBackToLogin}
          className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft aria-hidden="true" className="size-4" /> Back to login
        </button>
        <h2 className="text-2xl font-semibold tracking-tight">Forgot your password?</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Enter the email address associated with your account.</p>
      </header>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="space-y-2">
          <label htmlFor="forgot-email" className="text-sm font-medium">Email address</label>
          <Input
            id="forgot-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => { setEmail(event.target.value); setError(""); }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "forgot-email-error" : undefined}
            className="h-11 px-3"
          />
          {error && <p id="forgot-email-error" className="text-sm text-destructive" role="alert">{error}</p>}
        </div>
        <Button type="submit" className="h-11 w-full text-sm font-semibold">Continue</Button>
      </form>
    </div>
  );
}
