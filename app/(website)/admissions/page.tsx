import Link from "next/link";
import { ArrowRight, ClipboardList, MessageCircle, School } from "lucide-react";
import { PageContainer, PageHero, SectionHeading } from "@/components/website/page-sections";

const steps = [
  { icon: MessageCircle, title: "Speak with the academy", detail: "Ask about current availability, learning pathways, and the right next step." },
  { icon: ClipboardList, title: "Understand the requirements", detail: "The academy team can explain the information and documents needed for enrollment." },
  { icon: School, title: "Plan the start", detail: "Once details are confirmed, prepare for a supported transition into learning." },
];

export default function AdmissionsPage() {
  return (
    <main>
      <PageHero eyebrow="Admissions" title="A clear first step starts a new journey." description="Choosing an academy is an important decision. The admissions team can help families understand available options and the enrollment process." />
      <PageContainer>
        <SectionHeading eyebrow="Getting started" title="A simple path to explore enrollment" description="The academy can confirm current openings, requirements, and important dates directly with each family." />
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, detail }, index) => (
            <li key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
              <div className="flex items-center justify-between"><span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary"><Icon aria-hidden="true" size={20} /></span><span className="text-xs font-semibold tracking-[0.14em] text-muted-foreground">STEP 0{index + 1}</span></div>
              <h2 className="mt-5 text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-col gap-5 rounded-2xl bg-primary p-7 text-primary-foreground sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div><p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">Questions about joining?</p><h2 className="mt-2 text-xl font-semibold">Start with a conversation.</h2></div>
          <Link href="/contact" className="inline-flex w-fit items-center gap-2 rounded-lg bg-card px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Visit contact page <ArrowRight aria-hidden="true" size={16} /></Link>
        </div>
      </PageContainer>
    </main>
  );
}
