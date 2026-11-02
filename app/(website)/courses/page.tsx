import Link from "next/link";
import { ArrowUpRight, Atom, BookOpen, Calculator, Languages, Shapes } from "lucide-react";
import { PageContainer, PageHero, SectionHeading } from "@/components/website/page-sections";

const subjects = [
  { slug: "mathematics", name: "Mathematics", detail: "Build understanding through ideas, patterns, and practice.", icon: Calculator },
  { slug: "science", name: "Science", detail: "Explore the world through observation and thoughtful questions.", icon: Atom },
  { slug: "languages", name: "Languages", detail: "Develop clear communication, reading, and expression.", icon: Languages },
  { slug: "humanities", name: "Humanities", detail: "Connect history, society, and the stories that shape us.", icon: BookOpen },
];

export default function CoursesPage() {
  return (
    <main>
      <PageHero eyebrow="Courses" title="Build knowledge that lasts." description="Explore the subject areas that make up a strong academic foundation. Each course page gives learners a place to find their next step." />
      <PageContainer>
        <SectionHeading eyebrow="Explore subjects" title="A broad foundation, built step by step" description="Choose a subject to see its learning overview." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {subjects.map(({ slug, name, detail, icon: Icon }, index) => (
            <Link key={slug} href={`/courses/${slug}`} className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary"><Icon aria-hidden="true" size={21} /></span>
                <span className="text-xs font-semibold tracking-[0.14em] text-muted-foreground">0{index + 1}</span>
              </div>
              <h2 className="mt-6 text-xl font-semibold tracking-tight">{name}</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{detail}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">Explore subject <ArrowUpRight aria-hidden="true" size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-muted p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-start gap-4"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-card text-brand-green"><Shapes aria-hidden="true" size={19} /></span><div><h2 className="font-semibold">Learning is connected</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">Subjects come together through steady practice, good questions, and guidance.</p></div></div>
          <span className="text-sm font-medium text-primary">Learn with purpose</span>
        </div>
      </PageContainer>
    </main>
  );
}
