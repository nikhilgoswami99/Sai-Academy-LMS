import { ArrowUpRight, BookOpen, Compass, Lightbulb, UsersRound } from "lucide-react";
import { PageContainer, PageHero, SectionHeading } from "@/components/website/page-sections";

const moments = [
  { title: "Ideas in motion", category: "Classroom learning", icon: Lightbulb, style: "bg-secondary" },
  { title: "Learning together", category: "Academy community", icon: UsersRound, style: "bg-accent" },
  { title: "A world of questions", category: "Curiosity and discovery", icon: Compass, style: "bg-muted" },
  { title: "Finding a new perspective", category: "Reading and reflection", icon: BookOpen, style: "bg-secondary" },
];

export default function GalleryPage() {
  return (
    <main>
      <PageHero eyebrow="Gallery" title="A glimpse of learning in action." description="An academy is shaped by the everyday moments of discovery, collaboration, and progress that happen along the way." />
      <PageContainer>
        <SectionHeading eyebrow="Around the academy" title="Small moments, meaningful progress" description="A visual collection of the learning experiences and shared moments that make an academy community." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {moments.map(({ title, category, icon: Icon, style }, index) => (
            <article key={title} className={`group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-2xl border border-border p-6 sm:min-h-80 sm:p-8 ${style}`}>
              <span className="absolute -right-10 -top-10 size-48 rounded-full border border-primary/10 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              <span className="absolute -right-1 -top-1 size-28 rounded-full border border-primary/10" aria-hidden="true" />
              <div className="relative flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">{category}</span><span className="text-xs text-muted-foreground">0{index + 1}</span></div>
              <div className="relative flex items-end justify-between gap-4"><div><span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-card text-primary shadow-sm"><Icon aria-hidden="true" size={21} /></span><h2 className="text-xl font-semibold tracking-tight">{title}</h2></div><ArrowUpRight aria-hidden="true" size={19} className="mb-1 text-primary" /></div>
            </article>
          ))}
        </div>
      </PageContainer>
    </main>
  );
}
