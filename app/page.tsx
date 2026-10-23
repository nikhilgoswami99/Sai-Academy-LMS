import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  ClipboardCheck,
  GraduationCap,
  Layers3,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { SiteNav } from "@/components/landing/siteNav";
import { AcademicWorkspace } from "@/components/landing/academicWorkspace";

const platformAreas = [
  {
    number: "01",
    title: "People, thoughtfully organized",
    description:
      "Keep student and teacher information together, with the context an academy team needs to stay coordinated.",
    icon: UsersRound,
  },
  {
    number: "02",
    title: "A clear academic structure",
    description:
      "Bring classes and batches into a shared view so day-to-day academic planning has a natural home.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Assessment with context",
    description:
      "Keep examinations and results connected to the wider academic picture, not scattered across separate records.",
    icon: ClipboardCheck,
  },
];

const steps = [
  ["01", "Set the structure", "Organize learners, teachers, classes, and batches around the academy."],
  ["02", "Coordinate the work", "Keep teaching plans and academic activities connected to their groups."],
  ["03", "Review progress", "Bring examinations and results into view to support thoughtful follow-up."],
];

export default function Home() {
  return (
    <main className="landing-page min-h-screen overflow-hidden bg-[#f8f5ef] text-[#24211e]">
      <SiteNav />

      <section id="home" className="landing-hero relative scroll-mt-24">
        <div className="landing-hero-grain pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[690px] max-w-[1320px] items-center gap-14 px-5 pb-20 pt-16 sm:px-8 md:grid-cols-[1.02fr_0.98fr] md:pb-24 md:pt-20 lg:min-h-[760px] lg:gap-20 lg:px-12">
          <div className="landing-enter relative z-10 max-w-[650px]">
            <p className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a64e2d]">
              <span className="h-px w-8 bg-[#a64e2d]" /> A clearer view of academy life
            </p>
            <h1 className="max-w-[700px] text-[clamp(3.55rem,7.6vw,7.2rem)] font-medium leading-[0.94] tracking-[-0.065em] text-[#24211e]">
              Every learner deserves a <span className="landing-italic text-[#a64e2d]">clearer path.</span>
            </h1>
            <p className="mt-8 max-w-[510px] text-base leading-7 text-[#665f57] sm:text-lg sm:leading-8">
              <span className="brand-wordmark">SAI ACADEMY</span> brings academic administration, classroom coordination, examinations, results, and student progress into one organized experience.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/login" className="landing-button landing-button-accent">
                Sign in to your academy <ArrowUpRight aria-hidden="true" size={16} />
              </Link>
              <a href="#about" className="landing-text-link">
                Explore the platform <ArrowDown aria-hidden="true" size={15} />
              </a>
            </div>
            <div className="mt-14 flex items-center gap-4 border-t border-[#30251d]/15 pt-5 text-xs text-[#756d64] sm:mt-16">
              <span className="brand-wordmark text-sm font-bold tracking-wide text-[#30251d]">SAI ACADEMY</span>
              <span className="h-4 w-px bg-[#30251d]/20" />
              <span>Learning, with intention.</span>
            </div>
          </div>

          <div className="landing-visual relative mx-auto w-full max-w-[540px] md:ml-auto">
            <div className="landing-orbit landing-orbit-one" aria-hidden="true" />
            <div className="landing-orbit landing-orbit-two" aria-hidden="true" />
            <div className="relative z-10 rounded-[2rem] border border-[#fff]/70 bg-[#eee8de] p-3 shadow-[0_30px_90px_-45px_rgba(68,47,31,0.42)] sm:p-5">
              <div className="overflow-hidden rounded-[1.5rem] bg-[#fbfaf7]">
                <div className="flex items-center justify-between border-b border-[#30251d]/10 px-5 py-4 sm:px-7">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a64e2d]">Academic overview</p>
                    <p className="mt-1 text-sm font-medium text-[#30251d]">A connected view</p>
                  </div>
                  <span className="rounded-full border border-[#30251d]/10 px-3 py-1 text-[10px] text-[#746b61]">Illustrative</span>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs text-[#80776d]">One place for the moving parts</p>
                      <p className="mt-2 text-2xl font-medium tracking-tight text-[#30251d] sm:text-3xl">Learning in view<span className="text-[#b35a35]">.</span></p>
                    </div>
                    <div className="mb-1 flex size-11 items-center justify-center rounded-full bg-[#f3e6d5] text-[#9d4f30]">
                      <BookOpen aria-hidden="true" size={19} strokeWidth={1.6} />
                    </div>
                  </div>

                  <div className="mt-7 grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { label: "People", icon: UsersRound },
                      { label: "Classes", icon: GraduationCap },
                      { label: "Results", icon: ClipboardCheck },
                    ].map(({ label, icon: Icon }, index) => (
                      <div key={label} className={`rounded-2xl p-3 sm:p-4 ${index === 1 ? "bg-[#a64e2d] text-white" : "bg-[#f3f0e9] text-[#514a42]"}`}>
                        <Icon aria-hidden="true" size={17} strokeWidth={1.6} />
                        <p className="mt-5 text-[11px] font-medium sm:text-xs">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#30251d]/10 p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-[#484139]">Academic rhythm</p>
                      <span className="text-[10px] text-[#8b8177]">Sample view</span>
                    </div>
                    <div className="mt-5 space-y-4">
                      {[
                        ["Classroom planning", "bg-[#bd7447]", "w-[78%]"],
                        ["Assessment records", "bg-[#d6aa70]", "w-[58%]"],
                        ["Progress review", "bg-[#52645a]", "w-[68%]"],
                      ].map(([label, color, width]) => (
                        <div key={label}>
                          <div className="mb-2 flex justify-between text-[10px] text-[#746b61] sm:text-[11px]">
                            <span>{label}</span><span>In focus</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-[#eeeae2]"><div className={`h-full rounded-full ${color} ${width}`} /></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="landing-note absolute -bottom-5 -left-4 z-20 flex items-center gap-3 rounded-2xl border border-[#30251d]/10 bg-[#fffdf8] px-4 py-3 shadow-lg sm:-left-9 sm:px-5">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#e7eee4] text-[#536752]"><Check aria-hidden="true" size={17} /></span>
              <span><span className="block text-[10px] uppercase tracking-[0.12em] text-[#847b71]">Thoughtfully connected</span><span className="mt-0.5 block text-xs font-medium text-[#38332e]">From class to progress</span></span>
            </div>
            <p className="absolute -right-1 -top-7 text-[10px] uppercase tracking-[0.2em] text-[#8f7f6b] sm:-right-7">An academy, in rhythm</p>
          </div>
        </div>
        <a href="#about" aria-label="Scroll to the platform introduction" className="landing-scroll-cue absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#8a8177] md:flex">
          Scroll to explore <ArrowDown aria-hidden="true" size={13} />
        </a>
      </section>

      <section id="about" className="scroll-mt-24 border-t border-[#30251d]/10 bg-[#f1ede5]">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 sm:px-8 sm:py-28 md:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-36">
          <div>
            <p className="landing-kicker">01 / Our approach</p>
            <h2 className="mt-6 max-w-md text-4xl font-medium leading-[1.06] tracking-[-0.05em] sm:text-5xl">
              Good learning needs <span className="landing-italic text-[#a64e2d]">good structure.</span>
            </h2>
          </div>
          <div className="max-w-[650px] md:pt-10">
            <p className="text-xl leading-8 tracking-[-0.02em] text-[#48423c] sm:text-2xl sm:leading-9">
              An academy brings together people, teaching, schedules, and moments of progress. <span className="brand-wordmark">SAI ACADEMY</span> is being shaped to make those parts easier to see and manage together.
            </p>
            <p className="mt-6 max-w-xl leading-7 text-[#716960]">
              A considered academic workspace can help teams spend less time searching for context and more time supporting the learning in front of them.
            </p>
            <div className="mt-10 flex items-center gap-4 border-t border-[#30251d]/15 pt-5 text-xs text-[#81776d]">
              <span className="h-px w-10 bg-[#b05a38]" /> Organized for the whole academic year
            </div>
          </div>
        </div>
      </section>

      <AcademicWorkspace />

      <section id="features" className="scroll-mt-24 bg-[#fbfaf7]">
        <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="landing-kicker">02 / The platform</p>
              <h2 className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.05em] sm:text-6xl">
                The details of academy life, <span className="landing-italic text-[#a64e2d]">in conversation.</span>
              </h2>
            </div>
            <p className="max-w-sm pb-1 text-sm leading-6 text-[#716960]">
              A connected foundation for the information and activities that shape an academic experience.
            </p>
          </div>

          <div className="mt-16 grid border-t border-[#30251d]/15 md:grid-cols-[1fr_0.82fr]">
            <div className="divide-y divide-[#30251d]/12">
              {platformAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <article key={area.number} className="landing-feature-row group grid gap-4 py-7 sm:grid-cols-[60px_1fr_32px] sm:items-start sm:gap-6 sm:py-9">
                    <span className="pt-1 text-[11px] tracking-[0.14em] text-[#a64e2d]">{area.number}</span>
                    <div>
                      <div className="flex items-center gap-3">
                        <Icon aria-hidden="true" className="text-[#a64e2d]" size={18} strokeWidth={1.5} />
                        <h3 className="text-lg font-medium tracking-[-0.025em] text-[#30251d] sm:text-xl">{area.title}</h3>
                      </div>
                      <p className="mt-3 max-w-lg text-sm leading-6 text-[#716960]">{area.description}</p>
                    </div>
                    <ArrowUpRight aria-hidden="true" size={17} className="hidden text-[#a64e2d] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block" />
                  </article>
                );
              })}
            </div>

            <div className="relative mt-8 flex min-h-[350px] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-[#292823] p-7 text-[#f8f5ef] sm:p-9 md:ml-12 md:mt-0 lg:min-h-[430px] lg:p-11">
              <div className="absolute right-0 top-0 h-56 w-56 translate-x-1/3 -translate-y-1/3 rounded-full border border-[#e9b47b]/20" aria-hidden="true" />
              <div className="absolute right-8 top-8 h-40 w-40 rounded-full border border-[#e9b47b]/15" aria-hidden="true" />
              <div className="relative">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#d8a06b]">Built around the work</span>
                <p className="mt-8 max-w-sm text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl">People. Places. Progress.</p>
              </div>
              <div className="relative mt-12 space-y-0">
                {[
                  ["01", "Learners & teachers"],
                  ["02", "Classes & batches"],
                  ["03", "Examinations & results"],
                ].map(([index, label]) => (
                  <div key={index} className="flex items-center justify-between border-t border-white/15 py-4">
                    <span className="text-[10px] text-[#d8a06b]">{index}</span>
                    <span className="text-sm text-white/85">{label}</span>
                    <ArrowRight aria-hidden="true" size={14} className="text-white/40" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-5 text-[11px] text-[#8a8177]">The platform is evolving; specific workflows may vary as the academy continues to build.</p>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 border-y border-[#30251d]/10 bg-[#e9e1d5]">
        <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="landing-kicker">03 / How it works</p>
              <h2 className="mt-6 max-w-sm text-4xl font-medium leading-[1.06] tracking-[-0.05em] sm:text-5xl">A steady rhythm for the <span className="landing-italic text-[#a64e2d]">school year.</span></h2>
            </div>
            <p className="max-w-lg pt-4 text-base leading-7 text-[#716960] md:pt-12">
              Start with the academic foundations, bring the everyday activity into view, then use the information gathered to guide the next conversation.
            </p>
          </div>
          <ol className="mt-16 grid border-t border-[#30251d]/20 md:grid-cols-3">
            {steps.map(([number, title, description], index) => (
              <li key={number} className={`relative border-b border-[#30251d]/20 py-7 md:border-b-0 md:py-8 ${index > 0 ? "md:border-l md:pl-7 lg:pl-10" : "md:pr-7 lg:pr-10"} ${index < 2 ? "md:pr-7 lg:pr-10" : ""}`}>
                <span className="text-xs tracking-[0.15em] text-[#a64e2d]">{number}</span>
                <h3 className="mt-7 text-xl font-medium tracking-[-0.03em] text-[#30251d]">{title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-[#716960]">{description}</p>
                <span aria-hidden="true" className="absolute right-0 top-8 hidden h-px w-8 bg-[#a64e2d]/50 md:block lg:w-12" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#302e29] text-[#f8f5ef]">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 sm:px-8 sm:py-28 md:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-36">
          <div>
            <p className="landing-kicker landing-kicker-light">04 / For the academy community</p>
            <h2 className="mt-6 max-w-md text-4xl font-medium leading-[1.05] tracking-[-0.05em] sm:text-5xl">A shared foundation. <span className="landing-italic text-[#e5ad77]">Different perspectives.</span></h2>
          </div>
          <div className="divide-y divide-white/15 border-y border-white/15">
            {[
              ["01", "Academy leadership", "A broader view of the academic structure and the activities that keep it moving."],
              ["02", "Teaching teams", "A clearer place to understand classes, batches, and assessment context."],
              ["03", "Learners", "An academy experience designed to keep learning and progress at the centre."],
            ].map(([number, title, description]) => (
              <div key={number} className="grid gap-3 py-6 sm:grid-cols-[40px_1fr_1fr] sm:items-start sm:gap-5 sm:py-7">
                <span className="text-[10px] tracking-[0.15em] text-[#e5ad77]">{number}</span>
                <h3 className="text-base font-medium">{title}</h3>
                <p className="text-sm leading-6 text-white/60">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7]">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 sm:px-8 sm:py-28 md:grid-cols-[0.72fr_1.28fr] md:items-center lg:px-12 lg:py-36">
          <div>
            <p className="landing-kicker">05 / Progress, with context</p>
            <h2 className="mt-6 max-w-md text-4xl font-medium leading-[1.06] tracking-[-0.05em] sm:text-5xl">See the learning <span className="landing-italic text-[#a64e2d]">around the result.</span></h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#716960]">
              Assessment information matters most when it sits alongside the class, subject, and learning journey it belongs to.
            </p>
          </div>
          <div className="relative rounded-[1.75rem] border border-[#30251d]/10 bg-[#f3f0e9] p-5 sm:p-8 lg:p-10">
            <div className="absolute right-5 top-5 text-[9px] uppercase tracking-[0.16em] text-[#8b8177] sm:right-8 sm:top-8">Illustrative example · fictional</div>
            <div className="flex flex-col justify-between gap-5 border-b border-[#30251d]/12 pb-6 pt-8 sm:flex-row sm:items-end sm:pt-5">
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#a64e2d]">Academic snapshot</span>
                <h3 className="mt-2 text-2xl font-medium tracking-[-0.04em] text-[#30251d]">A term taking shape</h3>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e8e1d6] px-3 py-1.5 text-[10px] text-[#675f55]"><CalendarDays aria-hidden="true" size={13} /> Sample term</span>
            </div>
            <div className="grid gap-6 py-6 sm:grid-cols-[1fr_0.9fr] sm:gap-10">
              <div className="space-y-4">
                {[
                  ["Mathematics", "Class XI · Unit review", "#ae6741"],
                  ["Physics", "Class XI · Assessment", "#617461"],
                  ["English", "Class XI · Term plan", "#c69a5c"],
                ].map(([subject, detail, color]) => (
                  <div key={subject} className="flex items-center gap-3 border-b border-[#30251d]/10 pb-4 last:border-0 last:pb-0">
                    <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
                    <div><p className="text-xs font-medium text-[#3f3932]">{subject}</p><p className="mt-1 text-[10px] text-[#8b8177]">{detail}</p></div>
                    <ArrowUpRight aria-hidden="true" className="ml-auto text-[#9b8f82]" size={14} />
                  </div>
                ))}
              </div>
              <div className="flex min-h-40 flex-col justify-between rounded-2xl bg-[#302e29] p-5 text-[#f8f5ef] sm:min-h-0">
                <div className="flex items-start justify-between"><span className="text-[10px] uppercase tracking-[0.14em] text-white/55">A connected view</span><ClipboardCheck aria-hidden="true" className="text-[#e5ad77]" size={17} /></div>
                <div className="mt-8">
                  <p className="text-2xl font-medium tracking-[-0.04em]">Context helps.</p>
                  <p className="mt-2 max-w-[220px] text-xs leading-5 text-white/55">A sample, fictional view of how academic details can sit together.</p>
                </div>
              </div>
            </div>
            <p className="border-t border-[#30251d]/12 pt-4 text-[10px] leading-5 text-[#8b8177]">This visual is illustrative only and contains no real learner records or academy results.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#30251d]/10 bg-[#ede6db]">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-[70px_0.8fr_1.2fr] md:items-start lg:px-12">
          <ShieldCheck aria-hidden="true" className="text-[#a64e2d]" size={27} strokeWidth={1.4} />
          <h2 className="text-2xl font-medium leading-tight tracking-[-0.04em] sm:text-3xl">Academic information deserves <span className="landing-italic text-[#a64e2d]">care.</span></h2>
          <p className="max-w-xl text-sm leading-7 text-[#716960] md:pt-1">
            Student and academic details should be handled responsibly and seen by the people who need them for their role. <span className="brand-wordmark">SAI ACADEMY</span> is built around that principle; always follow your academy’s access policies.
          </p>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-[#a64e2d] text-[#fff8ee]">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-9 px-5 py-20 sm:px-8 sm:py-24 md:flex-row md:items-end md:justify-between lg:px-12 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f0c9a5]">A thoughtful place to begin</p>
            <h2 className="mt-5 text-4xl font-medium leading-[1.04] tracking-[-0.05em] sm:text-6xl">Make room for what matters: <span className="landing-italic">learning.</span></h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/75">Sign in to continue to your academy account and its academic workspace.</p>
          </div>
          <Link href="/login" className="landing-button landing-button-light shrink-0">
            Sign in to your academy <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>

      <footer className="bg-[#24231f] text-[#f8f5ef]">
        <div className="mx-auto max-w-[1320px] px-5 pb-8 pt-12 sm:px-8 lg:px-12">
          <div className="grid gap-10 border-b border-white/15 pb-10 sm:grid-cols-[1fr_auto] sm:items-start">
            <div className="max-w-sm">
              <Link href="/" className="brand-wordmark text-xl font-bold tracking-wide">SAI ACADEMY</Link>
              <p className="mt-4 text-sm leading-6 text-white/55">An organized academic experience, built around the people and progress that matter.</p>
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-3 text-xs text-white/65">
              <a className="landing-footer-link" href="#home">Home</a>
              <a className="landing-footer-link" href="#about">Our approach</a>
              <a className="landing-footer-link" href="#features">Platform</a>
              <a className="landing-footer-link" href="#how-it-works">How it works</a>
              <Link className="landing-footer-link" href="/login">Sign in</Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-5 text-[10px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <span className="brand-wordmark">© SAI ACADEMY</span>
            <span>Learning, with intention.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
