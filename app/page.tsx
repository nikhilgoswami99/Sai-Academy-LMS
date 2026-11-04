import Link from "next/link";
import { ArrowUpRight, BookOpen, Check, GraduationCap } from "lucide-react";
import { SiteNav } from "@/components/landing/siteNav";
import { AcademicPrograms } from "@/components/landing/academic-programs";
import { AuthDialog } from "@/components/auth/auth-dialog";
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
          <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-330 items-center gap-12 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-[1.08fr_0.92fr] md:gap-8 lg:gap-14 lg:px-12 lg:py-20">
            <div className="relative z-10 max-w-3xl">
              <p className="hero-reveal mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/70 sm:text-xs">
                <span className="h-px w-9 bg-brand-red" aria-hidden="true" /> Building futures through education
              </p>
              <h1 aria-label="25+ Years of Experience and Excellence" className="hero-reveal hero-reveal-delay-1 font-bold leading-[0.98] tracking-[-0.055em] text-foreground">
                <span aria-hidden="true" className="block text-[clamp(5rem,11vw,8.5rem)]">25<span className="text-brand-red">+</span></span>
                <span aria-hidden="true" className="mt-2 block max-w-3xl text-[clamp(2.25rem,4.6vw,4.25rem)]">Years of Experience and Excellence</span>
              </h1>
              <p className="hero-reveal hero-reveal-delay-2 mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-7 sm:text-lg sm:leading-8">
                Empowering students through quality education, dedicated guidance, and a commitment to academic excellence.
              </p>
              <div className="hero-reveal hero-reveal-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button nativeButton={false} size="lg" render={<Link href="/courses" />} className="h-12 rounded-md bg-brand-blue px-6 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-brand-blue/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2">
                  Explore Courses <ArrowUpRight aria-hidden="true" size={16} />
                </Button>
                <Button nativeButton={false} variant="outline" size="lg" render={<Link href="/admissions" />} className="h-12 rounded-md border-brand-blue/40 bg-white/70 px-6 text-sm font-semibold text-brand-blue shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-blue hover:bg-brand-blue hover:text-white hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2">
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
              <div className="hero-art-float relative z-10 flex min-h-[340px] w-full max-w-[390px] flex-col justify-between rounded-[2rem] border border-white/90 bg-white/75 p-6 shadow-[0_32px_90px_-38px_rgba(16,47,104,0.28)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 sm:min-h-[390px] sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/15 bg-white/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-foreground/80 sm:text-[11px]">
                    <span className="size-1.5 rounded-full bg-brand-red" aria-hidden="true" /> The SAI Academy story
                  </span>
                  <span className="flex size-10 items-center justify-center rounded-full bg-sky-50 text-brand-blue"><GraduationCap aria-hidden="true" size={20} /></span>
                </div>
                <div className="relative py-8 text-center">
                  <div className="pointer-events-none absolute left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-100/70 blur-2xl" aria-hidden="true" />
                  <BookOpen aria-hidden="true" className="relative mx-auto size-12 text-brand-blue" strokeWidth={1.4} />
                  <p className="relative mt-4 font-serif text-2xl italic tracking-tight text-foreground sm:text-3xl">Learning with purpose</p>
                  <p className="relative mt-2 text-xs text-muted-foreground">A tradition of guidance and growth</p>
                </div>
                <div className="grid grid-cols-2 divide-x divide-border border-t border-border pt-5">
                  <div className="pr-4"><p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">25<span className="text-brand-red">+</span></p><p className="mt-1 text-[11px] leading-5 text-muted-foreground sm:text-xs">Years of experience</p></div>
                  <div className="pl-5">
                     <p className="mt-1 text-[11px] leading-5 text-muted-foreground sm:text-xs">Classes</p>
                    <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">III to XII</p>
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AcademicPrograms />

        <section id="approach" className="scroll-mt-24 border-y border-border/40 bg-secondary">
          <div className="mx-auto grid max-w-330 gap-8 px-5 py-20 sm:px-8 sm:py-24 md:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-28"><div><p className="landing-kicker">Our approach</p><h2 className="mt-5 max-w-md text-4xl font-medium leading-tight tracking-tighter sm:text-5xl">Learning with <span className="landing-italic text-brand-blue">care and purpose.</span></h2></div><div className="max-w-2xl md:pt-8"><p className="text-base leading-7 text-muted-foreground">A supportive learning environment pairs clear teaching with steady guidance, helping students strengthen understanding and grow in confidence.</p><div className="mt-8 border-t border-border/60 pt-5 text-sm font-medium text-foreground">Quality education · Dedicated guidance · Academic excellence</div></div></div>
        </section>

        <section id="contact" className="scroll-mt-24 bg-brand-blue text-white">
          <div className="mx-auto flex max-w-330 flex-col gap-8 px-5 py-16 sm:px-8 sm:py-20 md:flex-row md:items-end md:justify-between lg:px-12 lg:py-24"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">Admissions</p><h2 className="mt-4 text-4xl font-medium leading-tight tracking-tighter sm:text-5xl">Take the next step in your learning journey.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-white/80">Talk with our team about admissions and find the right program for your student.</p></div><Button nativeButton={false} size="lg" render={<Link href="/admissions" />} className="h-12 shrink-0 rounded-md bg-white px-6 text-sm font-semibold text-brand-blue shadow-sm transition hover:-translate-y-0.5 hover:bg-white/90">Enquire now <ArrowUpRight aria-hidden="true" size={16} /></Button></div>
        </section>

        <footer className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-330 px-5 pb-7 pt-10 sm:px-8 lg:px-12"><div className="grid gap-8 border-b border-primary-foreground/15 pb-8 sm:grid-cols-[1fr_auto] sm:items-start"><div className="max-w-sm"><Link href="/" className="brand-wordmark text-xl font-bold tracking-wide">SAI ACADEMY</Link><p className="mt-3 text-sm leading-6 text-primary-foreground/70">Quality education and dedicated guidance for every learner.</p></div><nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-primary-foreground/80"><Link className="landing-footer-link" href="/courses">Courses</Link><Link className="landing-footer-link" href="/teachers">Teachers</Link><Link className="landing-footer-link" href="/contact">Contact</Link><AuthDialog trigger={<button type="button" className="landing-footer-link">Login</button>} /></nav></div><div className="flex flex-col gap-2 pt-4 text-[10px] text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between"><span>© SAI ACADEMY</span><span>Learning, with intention.</span></div></div>
        </footer>
      </main>
    </>
  );
}
