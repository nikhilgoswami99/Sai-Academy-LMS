import { BarChart3, BookOpen, CircleCheck, MessagesSquare } from "lucide-react";
import { PageContainer, PageHero, SectionHeading } from "@/components/website/page-sections";

const stages = [
  { icon: BookOpen, title: "Learning activity", detail: "See the academic work that supports progress." },
  { icon: BarChart3, title: "Assessment", detail: "Understand results in the context of each learning journey." },
  { icon: MessagesSquare, title: "Next steps", detail: "Use clear feedback to guide what comes next." },
];

export default function ResultsPage() {
  return (
    <main>
      <PageHero eyebrow="Results and progress" title="Progress is more than a number." description="Assessment helps learners and educators understand what is going well and where more support or practice can make a difference." />
      <PageContainer>
        <SectionHeading eyebrow="A wider view" title="Make room for the whole learning story" description="Results are most useful when they are considered alongside effort, understanding, and the next opportunity to grow." />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {stages.map(({ icon: Icon, title, detail }, index) => (
            <article key={title} className="relative rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
              <div className="flex items-center justify-between"><span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary"><Icon aria-hidden="true" size={20} /></span><span className="text-xs font-semibold tracking-[0.14em] text-muted-foreground">0{index + 1}</span></div>
              <h2 className="mt-5 text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-brand-green/20 bg-accent p-6 sm:p-8">
          <div className="flex items-start gap-4"><CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-green" /><div><h2 className="font-semibold text-accent-foreground">Academic information is handled with care</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-accent-foreground/80">Individual student records are shared through the academy’s authorized channels. This public page provides an overview of the academy’s approach to learning and assessment.</p></div></div>
        </div>
      </PageContainer>
    </main>
  );
}
