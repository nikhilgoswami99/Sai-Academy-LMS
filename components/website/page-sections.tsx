import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-secondary/60">
      <div aria-hidden="true" className="absolute -right-24 -top-28 -z-10 size-96 rounded-full border border-primary/10" />
      <div aria-hidden="true" className="absolute -right-10 -top-14 -z-10 size-64 rounded-full border border-primary/10" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-[1fr_auto] md:items-end lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>}
    </div>
  );
}

export function ContentCard({
  number,
  title,
  children,
}: {
  number?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
      {number && <p className="text-xs font-semibold tracking-[0.14em] text-primary">{number}</p>}
      <h3 className={`${number ? "mt-5" : ""} text-lg font-semibold tracking-tight`}>{title}</h3>
      <div className="mt-3 text-sm leading-6 text-muted-foreground">{children}</div>
    </article>
  );
}

export function PageContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 ${className}`}>{children}</div>;
}
