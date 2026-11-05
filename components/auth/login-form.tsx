"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithIdentifier } from "@/lib/auth/login";

type LoginErrors = { identifier?: string; password?: string };

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function LoginForm({ onForgotPassword }: { onForgotPassword: () => void }) {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    const nextErrors: LoginErrors = {};
    if (!identifier.trim()) nextErrors.identifier = "Enter your email address or student roll number.";
    else if (identifier.includes("@") && !validateEmail(identifier.trim())) nextErrors.identifier = "Enter a valid email address.";
    if (!password) nextErrors.password = "Enter your password.";
    setErrors(nextErrors);
    setNotice("");
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      const result = await signInWithIdentifier(identifier.trim(), password);
      if (!result.success) {
        setNotice(result.message);
        return;
      }

      router.replace(result.redirectTo);
      router.refresh();
    } catch {
      setNotice("We could not complete sign-in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <header className="mb-6 pr-8">
        <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Sign in to continue to your academy account.</p>
      </header>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="space-y-2">
          <label htmlFor="login-identifier" className="text-sm font-medium">Email or student roll number</label>
          <Input
            id="login-identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            placeholder="you@example.com or DEL2100125"
            value={identifier}
            onChange={(event) => {
              setIdentifier(event.target.value);
              setErrors((current) => ({ ...current, identifier: undefined }));
              setNotice("");
            }}
            aria-invalid={Boolean(errors.identifier)}
            aria-describedby={errors.identifier ? "login-identifier-error" : undefined}
            className="h-11 px-3"
          />
          {errors.identifier && <p id="login-identifier-error" className="text-sm text-destructive" role="alert">{errors.identifier}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="login-password" className="text-sm font-medium">Password</label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((current) => ({ ...current, password: undefined }));
                setNotice("");
              }}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "login-password-error" : undefined}
              className="h-11 px-3 pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((shown) => !shown)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-muted-foreground transition hover:text-foreground focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            >
              {showPassword ? <EyeOff aria-hidden="true" className="size-4" /> : <Eye aria-hidden="true" className="size-4" />}
            </button>
          </div>
          {errors.password && <p id="login-password-error" className="text-sm text-destructive" role="alert">{errors.password}</p>}
        </div>

        {notice && <p className="rounded-lg border border-border bg-muted p-3 text-sm leading-5 text-muted-foreground" role="status">{notice}</p>}

        <Button type="submit" disabled={loading} className="h-11 w-full text-sm font-semibold">
          {loading && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
