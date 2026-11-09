"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
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

function getDiscountRate(token: GiftToken) {
  return token.discount;
}

function calculateFee(token: GiftToken, subjectCount: number) {
  const chargeableSubjects = token.id >= 3 ? Math.min(subjectCount, 4) : subjectCount;
  const courseFee = chargeableSubjects * token.totalFee;
  const discountRate = getDiscountRate(token);
  const total = courseFee * (1 - discountRate / 100);
  const discountAmount = courseFee - total;

  return {
    courseFee,
    discountAmount,
    total,
    discountRate,
  };
}

function GiftTokenDetails({
  token,
  subjectCount,
}: {
  token: GiftToken;
  subjectCount: number;
}) {
  const { courseFee, discountAmount, total, discountRate } = calculateFee(
    token,
    subjectCount,
  );
  const chargedSubjectCount =
    token.id >= 3 ? Math.min(subjectCount, 4) : subjectCount;

  return (
    <DialogContent
      closeButtonClassName="text-white hover:bg-white/20 hover:text-white"
      className="max-h-[calc(100dvh-2rem)] overflow-hidden rounded-3xl border-0 bg-transparent p-0 shadow-2xl sm:max-w-2xl"
    >
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
              Gift Token 1 • Crash Course
            </span>
            <DialogHeader className="mt-4 gap-2 text-left">
              <DialogTitle className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Class {token.classes}
              </DialogTitle>
              <DialogDescription className="text-sm leading-6 text-white/75">
                This is आओ REVISE करें crash course fees. <br/>
                It includes Acads + C.C + T.S+ I.Q + O.C
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="space-y-5 p-4 sm:space-y-6 sm:p-8">
          <div className="rounded-2xl border border-brand-blue/10 bg-background/70 p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Fees to pay
                </p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {formatCurrency(total)}
                </p>
              </div>
              <div className="inline-flex w-fit shrink-0 flex-col items-start rounded-xl bg-brand-green/10 px-3 py-2 text-left text-brand-green sm:items-end sm:self-auto sm:text-right">
                <span className="inline-flex items-center gap-1.5 text-sm font-bold">
                  <BadgePercent aria-hidden="true" size={17} />
                  {100 - discountRate}% payable
                </span>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-amber-800">
                  <span aria-hidden="true" className="text-sm leading-none">
                    🪔
                  </span>
                  Diwali Offer
                </span>
                <span className="mt-1 text-[12px] leading-4">
                  Applicable till 11th of November 2026
                </span>
              </div>
            </div>
            <div className="mt-5 space-y-3 border-t border-border/70 pt-4 text-sm">
              <div className="flex flex-col gap-1 text-muted-foreground sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <span>Monthly fee per subject</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(token.feePerSubject)}
                </span>
              </div>
              <div className="flex flex-col gap-1 text-muted-foreground sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <span>
                  Course fee for {subjectCount}{" "}
                  {subjectCount === 1 ? "subject" : "subjects"}
                  {chargedSubjectCount < subjectCount &&
                    ` (${chargedSubjectCount} charged)`}{" "}
                  over {token.months} months
                </span>
                <span className="font-medium text-foreground">
                  {formatCurrency(courseFee)}
                </span>
              </div>
              <div className="flex flex-col gap-1 text-muted-foreground sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <span>Savings</span>
                <span className="font-medium text-brand-green">
                  −{formatCurrency(discountAmount)}
                </span>
              </div>
              <div className="flex flex-col gap-1 border-t border-border/70 pt-3 font-semibold text-foreground sm:flex-row sm:items-start sm:justify-between sm:gap-4">
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
              <span className="text-brand-red">आओ</span>{" "}
              <span className="text-brand-blue">REVISE</span>{" "}
              <span className="text-brand-red">करें</span>
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Crash Course includes
            </p>
            <ul className="mt-3 space-y-3">
              {[
                "Academics (B-Batch)",
                "Crash Course (C.C)",
                "Test Series (T.S)",
                "Important Questions (I.Q)",
                "Online Content (O.C)",
              ].map((item) => (
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
        </div>
      </div>
    </DialogContent>
  );
}

function EnrollStepDialog({
  token,
  subjectCount,
  onClose,
  onDone,
}: {
  token: GiftToken;
  subjectCount: number;
  onClose: () => void;
  onDone: () => void;
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
    subjectNames: "",
    referralSource: "",
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
        subjectNames: student.subjectNames,
        referralSource: student.referralSource,
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
        <>
        <p className="rounded-lg border border-brand-red/20 bg-brand-red/5 px-4 py-3 text-sm font-medium text-brand-red">
          Inform your friends and get assured gifts.
        </p>
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
            <EnrollField
              label={
                <span className="whitespace-nowrap">
                  How do you know <span className="brand-wordmark font-bold">SAI ACADEMY</span>?
                </span>
              }
            >
              <input
                required
                value={student.referralSource}
                onChange={(event) =>
                  setStudent({ ...student, referralSource: event.target.value })
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
            <EnrollField label="Subject names">
              <input
                required
                placeholder="e.g. Mathematics, Physics, Chemistry"
                value={student.subjectNames}
                onChange={(event) =>
                  setStudent({ ...student, subjectNames: event.target.value })
                }
                className={enrollInputClass}
              />
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
        </>
      ) : (
        <div className="space-y-4">
          <p className="rounded-lg bg-secondary/60 px-4 py-3 text-sm leading-5">
            Select the QR code that matches the student’s class:{" "}
            <strong>Class {student.classGroup || token.classes}</strong>.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <PaymentQrPlaceholder
              title="Classes IX, X, XI, XII"
              paymentNumber="9839709827"
            />
            <PaymentQrPlaceholder
              title="Classes III to VIII"
              paymentNumber="6393330437"
            />
          </div>
          <p className="rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm leading-6">
            After payment, send the payment receipt on WhatsApp to{" "}
            <a
              href="https://wa.me/916393330437"
              target="_blank"
              rel="noreferrer"
              className="whitespace-nowrap font-semibold text-brand-red underline-offset-4 hover:underline"
            >
              +91 63933 30437
            </a>
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
              onClick={onDone}
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
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium">
      {label}
      {children}
    </label>
  );
}

function PaymentQrPlaceholder({
  title,
  paymentNumber,
}: {
  title: string;
  paymentNumber: string;
}) {
  const [imageAvailable, setImageAvailable] = useState(true);
  const imageSrc = title === "Classes IX, X, XI, XII"
    ? "/payment-qr/classes-ix-xii.png.jpeg"
    : "/payment-qr/classes-iii-viii.png.jpeg";

  return (
    <div className="rounded-xl border border-border p-3 text-center">
      <p className="min-h-10 text-sm font-semibold leading-5">{title}</p>
      <div
        role="img"
        aria-label={`${title} payment QR code image placeholder`}
        className="relative mx-auto mt-2 flex aspect-square w-full max-w-52 flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-dashed border-border bg-muted/40 text-muted-foreground"
      >
        {imageAvailable ? (
          <Image
            src={imageSrc}
            alt={`${title} payment QR code`}
            fill
            sizes="208px"
            className="object-contain p-2"
            onError={() => setImageAvailable(false)}
          />
        ) : (
          <>
            <QrCode aria-hidden="true" size={54} strokeWidth={1.4} />
            <span className="px-3 text-xs">Add QR image to {imageSrc}</span>
          </>
        )}
      </div>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        You can pay your fees using this number:
        <br />
        <span className="font-semibold text-brand-red">{paymentNumber}</span>
      </p>
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
  const [showEnrollmentConfirmation, setShowEnrollmentConfirmation] =
    useState(false);
  const [confirmationSecondsRemaining, setConfirmationSecondsRemaining] =
    useState(30);
  const getSubjectCount = (token: GiftToken) => subjectCounts[token.id] ?? 1;

  useEffect(() => {
    if (!showEnrollmentConfirmation) return;
    const expiresAt = Date.now() + 30_000;
    const interval = window.setInterval(() => {
      const secondsRemaining = Math.max(
        0,
        Math.ceil((expiresAt - Date.now()) / 1000),
      );
      setConfirmationSecondsRemaining(secondsRemaining);
      if (secondsRemaining === 0) setShowEnrollmentConfirmation(false);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [showEnrollmentConfirmation]);

  return (
    <section aria-labelledby="gift-token-heading">
      <p className="mb-5 w-fit rounded-lg border border-brand-red/20 bg-brand-red/5 px-4 py-3 text-sm font-medium text-brand-red">
        Inform your friends and get assured gifts.
      </p>
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

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {tokens.map((token, index) => {
          const subjectCount = getSubjectCount(token);
          const { courseFee, total } = calculateFee(token, subjectCount);

          return (
            <article
              key={token.id}
              style={{ animationDelay: `${index * 70}ms` }}
              className="group relative isolate w-full min-w-0 overflow-hidden rounded-3xl border border-border/80 bg-card p-5 text-left text-foreground shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-brand-blue/40 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none animate-in fade-in slide-in-from-bottom-2 sm:p-5"
            >
              {token.months === 5 && (
                <p className="mb-3 rounded-lg border border-brand-red/20 bg-brand-red/5 px-3 py-2 text-xs leading-5 text-brand-red">
                  Note – This includes your present / next session classes in
                  March.
                </p>
              )}
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
                  {getDiscountRate(token)}% Discount
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
                {Array.from({ length: token.id >= 3 ? 6 : 5 }, (_, index) => index + 1).map(
                  (count) => (
                    <option key={count} value={count}>
                      {count} {count === 1 ? "subject" : "subjects"}
                    </option>
                  ),
                )}
              </select>
              {token.id === 3 || token.id === 4 ? (
                <p className="mt-2 rounded-lg border border-brand-green/20 bg-brand-green/5 px-3 py-2 text-xs leading-5 text-muted-foreground">
                  Note: Hindi and AI are free for Classes IX and X.
                </p>
              ) : token.id >= 5 ? (
                <p className="mt-2 rounded-lg border border-brand-green/20 bg-brand-green/5 px-3 py-2 text-xs leading-5 text-muted-foreground">
                  Note: Hindi, Sanskrit, AI, and the English Speaking course are free for Class VIII and below.
                </p>
              ) : null}
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
                  2. ARK course students pay A+ fees of ₹100 per subject separately at the office.
                </p>
                <p>
                  3. New Students will have to pay RS 100 registration fee at the office.
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
        Gift Token 2 will start from 12th November with increased fees.
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
            onDone={() => {
              setEnrollOpen(false);
              setConfirmationSecondsRemaining(30);
              setShowEnrollmentConfirmation(true);
            }}
          />
        )}
      </Dialog>
      {showEnrollmentConfirmation && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/50 p-4 sm:p-6">
          <div
            className="max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-brand-green/20 bg-card px-5 py-7 text-center text-foreground shadow-2xl sm:px-8 sm:py-9"
          >
            <span
              aria-hidden="true"
              className="mx-auto flex size-20 items-center justify-center rounded-full bg-brand-green text-white sm:size-24"
            >
              <Check aria-hidden="true" size={52} strokeWidth={3} />
            </span>
            <h2
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="mt-5 text-xl font-bold tracking-tight sm:text-2xl"
            >
              Enrollment confirmed
            </h2>
            <p className="mt-3 text-sm leading-6 sm:text-base">
              You have successfully enrolled for the crash course. You will get
              your login credentials after 12th of November. We will message you
              about the payment confirmation within 24 hours.
            </p>
            <p
              aria-live="off"
              className="mt-5 inline-flex items-center rounded-full bg-brand-green/10 px-4 py-2 text-sm font-semibold text-brand-green"
            >
              Closing in{" "}
              <span className="mx-1 tabular-nums">
                {confirmationSecondsRemaining}
              </span>{" "}
              seconds
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
