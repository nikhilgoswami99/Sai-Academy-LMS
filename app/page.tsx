import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { SiteNav } from "@/components/landing/siteNav";
import { AcademicPrograms } from "@/components/landing/academic-programs";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { CrashCourseScheduleNote } from "@/components/website/crash-course-schedule-note";
import { CrashCourseScheduleWidget } from "@/components/website/crash-course-schedule-widget";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="landing-page min-h-screen overflow-hidden bg-background text-foreground">
        <section id="home" className="landing-hero relative isolate scroll-mt-24 overflow-hidden">
          <div className="landing-hero-grain pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-32 top-16 size-72 rounded-full bg-white/50 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-20 bottom-0 size-80 rounded-full bg-sky-100/60 blur-3xl" aria-hidden="true" />
          <div className="relative z-10 mx-auto grid min-h-[calc(100svh-5rem)] max-w-330 items-center gap-12 px-5 pb-14 pt-2 sm:px-8 sm:pb-16 sm:pt-4 md:grid-cols-[1.08fr_0.92fr] md:gap-8 lg:gap-14 lg:px-12 lg:pb-20 lg:pt-8">
            <div className="relative z-10 max-w-3xl">
              <p className="hero-reveal mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/70 sm:text-xs">
                <span className="h-px w-9 bg-brand-red" aria-hidden="true" /> Building futures through education
              </p>
              <h1 aria-label="25+ Years of Experience and Excellence" className="hero-reveal hero-reveal-delay-1 font-bold leading-[0.98] tracking-[-0.055em] text-foreground">
                <span aria-hidden="true" className="block text-[clamp(5rem,11vw,8.5rem)]">25<span>+</span></span>
                <span aria-hidden="true" className="mt-2 block max-w-3xl text-[clamp(2.25rem,4.6vw,4.25rem)]">Years of Experience and Excellence</span>
              </h1>
              <p className="hero-reveal hero-reveal-delay-2 mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-7 sm:text-lg sm:leading-8">
                Empowering students through quality education, dedicated guidance, and a commitment to academic excellence.
              </p>
              <div className="hero-reveal hero-reveal-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button nativeButton={false} size="lg" render={<Link href="/courses" />} className="h-12 rounded-md bg-brand-blue px-6 text-sm font-semibold text-white shadow-sm focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2">
                  Explore Courses <ArrowUpRight aria-hidden="true" size={16} />
                </Button>
                <Button nativeButton={false} variant="outline" size="lg" render={<Link href="/admissions" />} className="h-12 rounded-md border-brand-blue/40 bg-white/70 px-6 text-sm font-semibold text-brand-blue shadow-sm focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2">
                  Enquire Now
                </Button>
              </div>
              <p className="hero-reveal hero-reveal-delay-3 mt-8 flex items-center gap-2 text-xs font-medium text-muted-foreground sm:text-sm">
                <Check aria-hidden="true" className="size-4 text-brand-red" /> A welcoming place to learn, grow, and thrive.
              </p>
            </div>

            <div className="hero-art-reveal relative mx-auto flex min-h-[410px] w-full max-w-[480px] items-center justify-center px-3 sm:min-h-[470px] md:ml-auto md:px-0">
              <div className="pointer-events-none absolute left-1/2 top-1/2 size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80" aria-hidden="true" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 size-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-blue/10" aria-hidden="true" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-blue/25 via-sky-300/20 to-transparent blur-2xl" aria-hidden="true" />
              <Image
                src="/academy-logo.png"
                alt="SAI Academy"
                width={420}
                height={420}
                sizes="(max-width: 640px) 78vw, (max-width: 768px) 52vw, 42vw"
                priority
                className="relative z-10 h-auto w-[min(78vw,320px)] object-contain drop-shadow-[0_24px_45px_rgba(16,47,104,0.16)] transition-transform duration-300 hover:scale-[1.03] sm:w-[min(52vw,390px)] md:w-[min(42vw,420px)]"
              />
            </div>
          </div>
        </section>

        <AcademicPrograms />

        <section id="approach" className="scroll-mt-24 border-y border-border/40 bg-secondary">
          <div className="mx-auto grid max-w-330 gap-8 px-5 py-20 sm:px-8 sm:py-24 md:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-28"><div><p className="landing-kicker">Our approach</p><h2 className="mt-5 max-w-md text-4xl font-medium leading-tight tracking-tighter sm:text-5xl">Learning with <span className="landing-italic text-brand-blue">care and purpose.</span></h2></div><div className="max-w-2xl md:pt-8"><p className="text-base leading-7 text-muted-foreground">A supportive learning environment pairs clear teaching with steady guidance, helping students strengthen understanding and grow in confidence.</p><div className="mt-8 border-t border-border/60 pt-5 text-sm font-medium text-foreground">Quality education · Dedicated guidance · Academic excellence</div></div></div>
        </section>

        <section id="contact" className="scroll-mt-24 bg-brand-blue text-white">
          <div className="mx-auto flex max-w-330 flex-col gap-8 px-5 py-16 sm:px-8 sm:py-20 md:flex-row md:items-end md:justify-between lg:px-12 lg:py-24"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">Admissions</p><h2 className="mt-4 text-4xl font-medium leading-tight tracking-tighter sm:text-5xl">Take the next step in your learning journey.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-white/80">Talk with our team about admissions and find the right program for your student.</p></div><Button nativeButton={false} size="lg" render={<Link href="/admissions" />} className="h-12 shrink-0 rounded-md bg-white px-6 text-sm font-semibold text-brand-blue shadow-sm">Enquire now <ArrowUpRight aria-hidden="true" size={16} /></Button></div>
        </section>

        <footer className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-330 px-5 pb-7 pt-10 sm:px-8 lg:px-12"><div className="grid gap-8 border-b border-primary-foreground/15 pb-8 sm:grid-cols-[1fr_auto] sm:items-start"><div className="max-w-sm"><Link href="/" className="brand-wordmark text-xl font-bold tracking-wide">SAI ACADEMY</Link><p className="mt-3 text-sm leading-6 text-primary-foreground/70">Quality education and dedicated guidance for every learner.</p></div><nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-primary-foreground/80"><Link className="landing-footer-link" href="/courses">Courses</Link><Link className="landing-footer-link" href="/teachers">Teachers</Link><Link className="landing-footer-link" href="/contact">Contact</Link><AuthDialog trigger={<button type="button" className="landing-footer-link">Login</button>} /></nav></div><div className="flex flex-col gap-2 pt-4 text-[10px] text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between"><span>© SAI ACADEMY</span><span>Learning, with intention.</span></div></div>
        </footer>
      </main>
      <CrashCourseScheduleWidget>
        <CrashCourseScheduleNote compact />
      </CrashCourseScheduleWidget>
    </>
  );
}
