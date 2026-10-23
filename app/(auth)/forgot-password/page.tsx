"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ForgotPasswordPage() {
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

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-5 py-12 sm:px-8">
      <Link href="/" className="mb-8 text-lg font-bold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4">
        <span className="brand-wordmark">SAI ACADEMY</span>
      </Link>
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-9">
        {submitted ? (
          <div className="text-center" role="status" aria-live="polite">
            <CheckCircle2 aria-hidden="true" className="mx-auto size-10 text-neutral-800" />
            <h1 className="mt-5 text-2xl font-semibold tracking-tight">Request received</h1>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              This is a frontend-only confirmation for <span className="font-medium text-neutral-900">{email.trim()}</span>. Email delivery and password reset are not implemented yet.
            </p>
            <Link href="/login" className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-neutral-950 px-4 text-sm font-semibold text-white transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2">
              <ArrowLeft aria-hidden="true" className="size-4" />Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <Link href="/login" className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-600 transition hover:text-neutral-950 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900">
                <ArrowLeft aria-hidden="true" className="size-4" />Back to sign in
              </Link>
              <h1 className="mt-5 text-2xl font-semibold tracking-tight">Forgot your password?</h1>
              <p className="mt-2 text-sm leading-6 text-neutral-600">Enter the email address associated with your account.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email address</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => { setEmail(event.target.value); setError(""); }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "email-error" : undefined}
                  className="h-11 rounded-lg px-3"
                />
                {error && <p id="email-error" className="text-sm text-red-700" role="alert">{error}</p>}
              </div>
              <Button type="submit" className="h-11 w-full rounded-lg text-sm font-semibold">Continue</Button>
            </form>
          </>
        )}
      </div>
      <p className="mt-8 text-center text-xs text-neutral-500"><span className="brand-wordmark">SAI ACADEMY</span></p>
    </section>
  );
}
