import { BookOpenCheck, HeartHandshake, Lightbulb, ShieldCheck } from "lucide-react";
import { PageContainer, PageHero, SectionHeading } from "@/components/website/page-sections";

const principles = [
  { icon: BookOpenCheck, title: "Learning with purpose", description: "A clear academic structure helps learners focus on progress, one step at a time." },
  { icon: HeartHandshake, title: "People at the centre", description: "Students, families, and educators each play an important part in a supportive learning community." },
  { icon: Lightbulb, title: "Room to grow", description: "Good learning makes space for questions, practice, curiosity, and new confidence." },
  { icon: ShieldCheck, title: "Care and responsibility", description: "Academic information deserves thoughtful handling and clear, responsible access." },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero eyebrow="About SAI Academy" title="A steady foundation for every learner." description="Learning is strongest when people, teaching, and progress stay connected. SAI Academy brings those parts together in a clear and supportive academic experience." />
      <PageContainer>
        <SectionHeading eyebrow="What guides us" title="A thoughtful way to learn" description="These principles shape how the academy supports learners and the people who guide them." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {principles.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
              <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary"><Icon aria-hidden="true" size={20} /></span>
              <h2 className="mt-5 text-lg font-semibold tracking-tight">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-2xl bg-primary p-7 text-primary-foreground sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">Our approach</p>
          <p className="mt-4 max-w-3xl text-xl font-medium leading-8 sm:text-2xl">When learners know where they are and what comes next, they can move forward with confidence.</p>
        </div>
      </PageContainer>
    </main>
  );
}
