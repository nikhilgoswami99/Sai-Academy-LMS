"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  CalendarDays,
  Check,
  Gift,
  QrCode,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { saveEnrollmentRequest } from "./actions";

const tokens = [
  {
    id: 1,
    classes: "XII",
    months: 4,
    feePerSubject: 1100,
    totalFee: 1100 * 4,
    discount: 50,
    payment: "One-time payment",
    includes: [
      "Crash course access",
      "Weekly revision sessions",
      "Practice worksheets",
    ],
  },
  {
    id: 2,
    classes: "XI",
    months: 5,
    feePerSubject: 1100,
    totalFee: 1100 * 5,
    discount: 50,
    payment: "2 monthly payments",
    includes: [
      "Crash course access",
      "Weekly revision sessions",
      "Practice worksheets",
    ],
  },
  {
    id: 3,
    classes: "X",
    months: 4,
    feePerSubject: 750,
    totalFee: 750 * 4,
    discount: 50,
    payment: "3 monthly payments",
    includes: [
      "Crash course access",
      "Small-group classes",
      "Practice worksheets",
    ],
  },
  {
    id: 4,
    classes: "IX",
    months: 5,
    feePerSubject: 750,
    totalFee: 750 * 5,
    discount: 50,
    payment: "4 monthly payments",
    includes: [
      "Crash course access",
      "Small-group classes",
      "Mock tests and feedback",
    ],
  },
  {
    id: 5,
    classes: "VI, VII, VIII",
    months: 5,
    feePerSubject: 750,
    totalFee: 750 * 5,
    discount: 50,
    payment: "5 monthly payments",
    includes: [
      "Crash course access",
      "Small-group classes",
      "Mock tests and feedback",
    ],
  },
  {
    id: 6,
    classes: "III, IV, V",
    months: 5,
    feePerSubject: 625,
    totalFee: 625 * 5,
    discount: 50,
    payment: "Flexible payment plan",
    includes: [
      "Full crash course access",
      "Small-group classes",
      "Mock tests and personal feedback",
    ],
  },
] as const;

const tokenAccents = [
  "from-sky-500/15 to-blue-500/5 text-sky-700",
  "from-violet-500/15 to-indigo-500/5 text-violet-700",
  "from-emerald-500/15 to-teal-500/5 text-emerald-700",
  "from-amber-500/15 to-orange-500/5 text-amber-700",
  "from-rose-500/15 to-pink-500/5 text-rose-700",
  "from-blue-600/15 to-cyan-500/5 text-blue-700",
];

type GiftToken = (typeof tokens)[number];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function calculateFee(token: GiftToken, subjectCount: number) {
  const courseFee = subjectCount * token.totalFee;
  const total = courseFee * (token.discount / 100);
  const discountAmount = courseFee - total;

  return {
    courseFee,
    discountAmount,
    total,
  };
}

function GiftTokenDetails({
  token,
  subjectCount,
}: {
  token: GiftToken;
  subjectCount: number;
}) {
  const { courseFee, discountAmount, total } = calculateFee(
    token,
    subjectCount,
  );

  return (
    <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-hidden rounded-3xl border-0 bg-transparent p-0 shadow-2xl sm:max-w-xl">
      <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain rounded-3xl bg-card">
        <div className="relative overflow-hidden bg-brand-blue px-6 py-7 text-white sm:px-8 sm:py-9">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-20 size-56 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute -right-2 -top-12 size-40 rounded-full border border-white/10"
          />
          <div className="relative pr-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/90">
              <Sparkles aria-hidden="true" size={14} />
              Crash Course • Fee structure
            </span>
            <DialogHeader className="mt-4 gap-2 text-left">
              <DialogTitle className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Class {token.classes}
              </DialogTitle>
              <DialogDescription className="text-sm leading-6 text-white/75">
                Sample pricing for the Crash Course. Final fees and inclusions
                are confirmed by the academy.
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <div className="rounded-2xl border border-brand-blue/10 bg-background/70 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Fees to pay
                </p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {formatCurrency(total)}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-green/10 px-3 py-2 text-sm font-bold text-brand-green">
                <BadgePercent aria-hidden="true" size={17} />
                {token.discount}% payable
              </span>
            </div>
            <div className="mt-5 space-y-3 border-t border-border/70 pt-4 text-sm">
              <div className="flex justify-between gap-4 text-muted-foreground">
                <span>Monthly fee per subject</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(token.feePerSubject)}
                </span>
              </div>
              <div className="flex justify-between gap-4 text-muted-foreground">
                <span>
                  {subjectCount} subjects course fee for {token.months} months
                </span>
                <span className="font-medium text-foreground">
                  {formatCurrency(courseFee)}
                </span>
              </div>
              <div className="flex justify-between gap-4 text-muted-foreground">
                <span>Savings</span>
                <span className="font-medium text-brand-green">
                  −{formatCurrency(discountAmount)}
                </span>
              </div>
              <div className="flex justify-between gap-4 border-t border-border/70 pt-3 font-semibold text-foreground">
                <span>Fees to pay</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                Duration
              </p>
              <p className="mt-2 font-semibold text-foreground">
                {token.months} months
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                Payment plan
              </p>
              <p className="mt-2 font-semibold text-foreground">
                {token.payment}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold tracking-tight text-foreground">
              What’s included
            </h4>
            <ul className="mt-3 space-y-3">
              {token.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                >
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                    <Check aria-hidden="true" size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="rounded-xl bg-secondary/60 p-4 text-xs leading-5 text-muted-foreground">
            These are sample values for preview purposes only and are not an
            official offer or confirmed academy fee.
          </p>

          <Link
            href="/admissions"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-brand-red px-5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-brand-red/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            Enquire about this plan <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </div>
    </DialogContent>
  );
}

function EnrollStepDialog({
  token,
  subjectCount,
  onClose,
}: {
  token: GiftToken;
  subjectCount: number;
  onClose: () => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [consent, setConsent] = useState(false);
  const juniorClassOptions =
    token.id >= 5 ? token.classes.split(",").map((grade) => grade.trim()) : [];
  const [student, setStudent] = useState({
    fullName: "",
    phone: "",
    school: "",
    classGroup: token.id >= 5 ? "" : token.classes,
    board: "",
    academicYear: "",
    cityCode: "",
    learningMode: "",
  });

  async function continueToPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setSaveError("");
    try {
      const result = await saveEnrollmentRequest({
        tokenId: token.id,
        classGroup: student.classGroup,
        subjectCount,
        fullName: student.fullName,
        phone: student.phone,
        school: student.school,
        board: student.board,
        academicYear: student.academicYear,
        cityCode: student.cityCode,
        learningMode: student.learningMode,
        consent,
      });
      if (!result.success) {
        setSaveError(result.message);
        return;
      }
      setStep(2);
    } catch {
      setSaveError("We couldn't save the enrollment details. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-5 sm:max-w-2xl sm:p-7">
      <DialogHeader className="pr-8 text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-red">
          Enrollment · Step {step} of 2
        </p>
        <DialogTitle className="text-xl sm:text-2xl">
          {step === 1 ? "Student details" : "Payment QR codes"}
        </DialogTitle>
        <DialogDescription>
          {step === 1
            ? `Enter the student details for the Class ${token.classes} gift token.`
            : "Scan the QR code for the student’s class group to make payment."}
        </DialogDescription>
      </DialogHeader>

      {step === 1 ? (
        <form onSubmit={continueToPayment} className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <EnrollField label="Student full name">
              <input
                required
                autoComplete="name"
                value={student.fullName}
                onChange={(event) =>
                  setStudent({ ...student, fullName: event.target.value })
                }
                className={enrollInputClass}
              />
            </EnrollField>
            <EnrollField label="Student contact number">
              <input
                required
                type="tel"
                autoComplete="tel"
                value={student.phone}
                onChange={(event) =>
                  setStudent({ ...student, phone: event.target.value })
                }
                className={enrollInputClass}
              />
            </EnrollField>
            <EnrollField label="School name">
              <input
                required
                value={student.school}
                onChange={(event) =>
                  setStudent({ ...student, school: event.target.value })
                }
                className={enrollInputClass}
              />
            </EnrollField>
            <EnrollField label="Class">
              {token.id >= 5 ? (
                <select
                  required
                  value={student.classGroup}
                  onChange={(event) =>
                    setStudent({ ...student, classGroup: event.target.value })
                  }
                  className={enrollInputClass}
                >
                  <option value="">Choose class</option>
                  {juniorClassOptions.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  readOnly
                  value={student.classGroup}
                  className={`${enrollInputClass} bg-muted`}
                />
              )}
            </EnrollField>
            <EnrollField label="Board">
              <input
                required
                placeholder="e.g. CBSE"
                value={student.board}
                onChange={(event) =>
                  setStudent({ ...student, board: event.target.value })
                }
                className={enrollInputClass}
              />
            </EnrollField>
            <EnrollField label="Academic year">
              <input
                required
                placeholder="e.g. 2026–27"
                value={student.academicYear}
                onChange={(event) =>
                  setStudent({ ...student, academicYear: event.target.value })
                }
                className={enrollInputClass}
              />
            </EnrollField>
            <EnrollField label="City code">
              <input
                required
                maxLength={3}
                placeholder="e.g. DEL"
                value={student.cityCode}
                onChange={(event) =>
                  setStudent({
                    ...student,
                    cityCode: event.target.value.toUpperCase(),
                  })
                }
                className={enrollInputClass}
              />
            </EnrollField>
            <EnrollField label="Learning mode">
              <select
                required
                value={student.learningMode}
                onChange={(event) =>
                  setStudent({ ...student, learningMode: event.target.value })
                }
                className={enrollInputClass}
              >
                <option value="">Choose mode</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </EnrollField>
          </div>
          <label className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
            <input required type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 size-4 shrink-0 accent-brand-blue" />
            I agree to share these details with SAI Academy to process this enrollment request.
          </label>
          {saveError && <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{saveError}</p>}
          <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-md border border-border px-4 text-sm font-semibold hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="min-h-11 rounded-md bg-brand-blue px-5 text-sm font-semibold text-white hover:bg-brand-blue/90 disabled:cursor-wait disabled:opacity-70"
            >
              {saving ? "Saving details…" : "Continue to payment"}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <p className="rounded-lg bg-secondary/60 px-4 py-3 text-sm leading-5">
            Select the QR code that matches the student’s class:{" "}
            <strong>Class {student.classGroup || token.classes}</strong>.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <PaymentQrPlaceholder title="Classes IX, X, XI, XII" />
            <PaymentQrPlaceholder title="Classes III to VIII" />
          </div>
          <p className="rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm leading-6">
            After payment, send the payment receipt on WhatsApp to{" "}
            <strong className="whitespace-nowrap">+91 98765 43210</strong>{" "}
            <span className="text-muted-foreground">
              (dummy number—update before launch)
            </span>
            .
          </p>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="min-h-11 rounded-md border border-border px-4 text-sm font-semibold hover:bg-muted"
            >
              Back to details
            </button>
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-md bg-brand-blue px-5 text-sm font-semibold text-white hover:bg-brand-blue/90"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </DialogContent>
  );
}

const enrollInputClass =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

function EnrollField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium">
      {label}
      {children}
    </label>
  );
}

function PaymentQrPlaceholder({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-border p-3 text-center">
      <p className="min-h-10 text-sm font-semibold leading-5">{title}</p>
      <div
        role="img"
        aria-label={`${title} payment QR code image placeholder`}
        className="mx-auto mt-2 flex aspect-square w-full max-w-52 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/40 text-muted-foreground"
      >
        <QrCode aria-hidden="true" size={54} strokeWidth={1.4} />
        <span className="px-3 text-xs">QR image goes here</span>
      </div>
    </div>
  );
}

export function GiftTokenFees() {
  const [selectedToken, setSelectedToken] = useState<GiftToken>(tokens[0]);
  const [subjectCounts, setSubjectCounts] = useState<Record<number, number>>(
    {},
  );
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [enrollToken, setEnrollToken] = useState<GiftToken>(tokens[0]);
  const [enrollSubjectCount, setEnrollSubjectCount] = useState(1);
  const getSubjectCount = (token: GiftToken) => subjectCounts[token.id] ?? 1;

  return (
    <section aria-labelledby="gift-token-heading">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
          Choose your plan
        </p>
        <h2
          id="gift-token-heading"
          className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Gift token plans
        </h2>
        <div className="mt-1 flex flex-wrap items-center gap-2.5">
          <h3 className="text-base font-semibold tracking-tight text-brand-red sm:text-lg">
            Gift Token 1
          </h3>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-amber-800">
            <span aria-hidden="true" className="text-sm leading-none">
              🪔
            </span>
            Diwali Offer
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
          Available from 6th Nov to 11th Nov. Select a class group to view its
          fee details.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {tokens.map((token, index) => {
          const subjectCount = getSubjectCount(token);
          const { courseFee, total } = calculateFee(token, subjectCount);

          return (
            <article
              key={token.id}
              style={{ animationDelay: `${index * 70}ms` }}
              className="group relative isolate overflow-hidden rounded-3xl border border-border/80 bg-card p-5 text-left text-foreground shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-brand-blue/40 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none animate-in fade-in slide-in-from-bottom-2 sm:p-5"
            >
              <span
                aria-hidden="true"
                className="absolute -right-8 -top-10 -z-10 size-36 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-green/5 transition-transform duration-500 group-hover:scale-125"
              />
              <span
                className={`flex size-10 items-center justify-center rounded-xl bg-gradient-to-br ${tokenAccents[index]} transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105 motion-reduce:transform-none`}
              >
                <Gift aria-hidden="true" size={20} />
              </span>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-amber-800">
                <span aria-hidden="true" className="text-sm leading-none">
                  🪔
                </span>
                Diwali Offer
              </span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <CalendarDays aria-hidden="true" size={13} />
                6th Nov – 11th Nov
              </span>
              <span className="mt-3 flex flex-wrap items-start justify-between gap-2">
                <span className="text-lg font-bold tracking-tight">
                  Class {token.classes}
                </span>
                <span className="rounded-full bg-brand-green/10 px-2.5 py-1 text-xs font-bold text-brand-green">
                  {token.discount}% Discount
                </span>
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {token.months} months
              </span>
              <label
                htmlFor={`subjects-${token.id}`}
                className="mt-2 block text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground"
              >
                Number of subjects
              </label>
              <select
                id={`subjects-${token.id}`}
                value={subjectCount}
                onChange={(event) =>
                  setSubjectCounts((current) => ({
                    ...current,
                    [token.id]: Number(event.target.value),
                  }))
                }
                className="mt-1 h-10 w-full cursor-pointer rounded-md border border-border bg-card px-3 text-sm font-medium text-foreground outline-none transition focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue/30"
              >
                {Array.from({ length: 5 }, (_, index) => index + 1).map(
                  (count) => (
                    <option key={count} value={count}>
                      {count} {count === 1 ? "subject" : "subjects"}
                    </option>
                  ),
                )}
              </select>
              <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                Course Monthly fee per subject
              </span>
              <span className="mt-1 block text-sm font-medium text-foreground">
                {formatCurrency(token.feePerSubject)}
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="min-w-0 rounded-lg bg-muted/50 px-2.5 py-2">
                  <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
                    Course fee
                  </span>
                  <span className="mt-0.5 block truncate text-sm font-medium text-muted-foreground line-through">
                    {formatCurrency(courseFee)}
                  </span>
                </div>
                <div className="min-w-0 rounded-lg bg-brand-green/5 px-2.5 py-2">
                  <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
                    Fees to pay
                  </span>
                  <span className="mt-0.5 block truncate text-lg font-bold tracking-tight text-foreground">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
              <div className="mt-3 space-y-1 rounded-lg border border-amber-200 bg-amber-50/70 px-3 py-2.5 text-[11px] leading-4 text-muted-foreground sm:text-xs sm:leading-5">
                <p>
                  Note:- <br /> 1. ARK course students pay ₹100 per student as
                  photocopy amount separately at the office.
                </p>
                <p>
                  2. ARK course students pay A+ fees of ₹100 per student per
                  month separately at the office.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedToken(token);
                    setDetailsOpen(true);
                  }}
                  className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-md bg-brand-blue px-3 text-xs font-semibold uppercase tracking-[0.08em] text-white shadow-sm transition-colors hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 sm:flex-none sm:gap-2 sm:px-4 sm:tracking-[0.12em]"
                >
                  Details
                  <ArrowRight aria-hidden="true" size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEnrollToken(token);
                    setEnrollSubjectCount(subjectCount);
                    setEnrollOpen(true);
                  }}
                  className="inline-flex min-h-10 flex-1 items-center justify-center rounded-md bg-brand-red px-3 text-xs font-semibold uppercase tracking-[0.08em] text-white shadow-sm transition-colors hover:bg-brand-red/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 sm:flex-none sm:px-4 sm:tracking-[0.12em]"
                >
                  Enroll Now
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-8 rounded-xl border border-border bg-secondary/60 px-5 py-4 text-center text-sm font-medium leading-6 text-foreground">
        Gift Token 2 will be applicable after 12th of november. The diwali offer
        is valid till 11th of november
      </p>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        {detailsOpen && (
          <GiftTokenDetails
            token={selectedToken}
            subjectCount={getSubjectCount(selectedToken)}
          />
        )}
      </Dialog>
      <Dialog open={enrollOpen} onOpenChange={setEnrollOpen}>
        {enrollOpen && (
          <EnrollStepDialog
            token={enrollToken}
            subjectCount={enrollSubjectCount}
            onClose={() => setEnrollOpen(false)}
          />
        )}
      </Dialog>
    </section>
  );
}
