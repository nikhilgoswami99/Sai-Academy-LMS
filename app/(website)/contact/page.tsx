import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, MessageCircle } from "lucide-react";
import { PageContainer, PageHero, SectionHeading } from "@/components/website/page-sections";

const destinations = [
  { href: "/admissions", icon: GraduationCap, title: "Admissions", detail: "Find out how to discuss enrollment and available options." },
  { href: "/courses", icon: BookOpen, title: "Courses", detail: "Explore the subjects and learning areas on the website." },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero eyebrow="Contact SAI Academy" title="We’re here to help you find the right next step." description="Whether you are exploring enrollment or looking for information about learning, start with the topic that best matches your question." />
      <PageContainer>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary"><MessageCircle aria-hidden="true" size={21} /></span>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight">How can we guide you?</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">For current contact details and office hours, please use the academy’s official communication channels.</p>
          </div>
          <div>
            <SectionHeading eyebrow="Quick links" title="Choose a place to start" />
            <div className="mt-5 space-y-3">
              {destinations.map(({ href, icon: Icon, title, detail }) => (
                <Link key={href} href={href} className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary"><Icon aria-hidden="true" size={20} /></span>
                  <span className="min-w-0 flex-1"><span className="block font-semibold">{title}</span><span className="mt-1 block text-sm leading-5 text-muted-foreground">{detail}</span></span>
                  <ArrowRight aria-hidden="true" size={17} className="shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
