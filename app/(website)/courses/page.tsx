import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CoursesPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
      <article className="relative flex min-h-[28vh] w-[90%] flex-col justify-center overflow-hidden rounded-3xl border border-border bg-card px-5 py-4 shadow-[0_24px_70px_-30px_rgba(16,47,104,0.3)] sm:px-7 sm:py-6 lg:px-9 lg:py-8">
        <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-secondary/70" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-5xl">
          <div className="mb-6 flex items-center justify-start">
            <Image
              src="/academy-logo.png"
              alt="SAI Academy logo"
              width={136}
              height={136}
              className="shrink-0"
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-brand-red">आओ</span>{" "}
            <span className="text-brand-blue">REVISE</span>{" "}
            <span className="text-brand-red">करें</span>
          </h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.17em] text-brand-blue sm:text-base">
            Crash Course
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Revisit key concepts, strengthen your understanding, and prepare for your upcoming examinations.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              nativeButton={false}
              variant="outline"
              size="lg"
              render={<Link href="/courses/crash-course" />}
              className="h-12 rounded-md border-brand-blue/40 px-6 text-sm font-semibold text-brand-blue transition duration-200 hover:-translate-y-0.5 hover:border-brand-blue hover:bg-brand-blue hover:text-white"
            >
              Details
            </Button>
          </div>
        </div>
      </article>
    </main>
  );
}
