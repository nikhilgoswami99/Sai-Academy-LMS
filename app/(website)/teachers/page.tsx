import { BookOpenCheck, MessagesSquare, Sparkles, UsersRound } from "lucide-react";
import { PageContainer, PageHero, SectionHeading } from "@/components/website/page-sections";

const roles = [
  { icon: BookOpenCheck, title: "Subject guidance", detail: "Clear explanations help learners build confidence with new ideas." },
  { icon: MessagesSquare, title: "Open conversations", detail: "Questions and discussion make learning an active process." },
  { icon: Sparkles, title: "Encouraging progress", detail: "Small steps forward deserve attention and thoughtful feedback." },
];

export default function TeachersPage() {
  return (
    <main>
      <PageHero eyebrow="Our teachers" title="Guidance makes learning personal." description="Educators bring subjects to life, notice how learners are progressing, and help each student find a way forward." />
      <PageContainer>
        <SectionHeading eyebrow="The people behind the learning" title="Teaching with care and purpose" description="A strong learning environment grows from the everyday work of listening, explaining, encouraging, and reviewing progress." />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {roles.map(({ icon: Icon, title, detail }) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
              <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary"><Icon aria-hidden="true" size={20} /></span>
              <h2 className="mt-5 text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-primary/15 bg-secondary/70 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4"><span className="flex size-12 items-center justify-center rounded-full bg-card text-brand-green"><UsersRound aria-hidden="true" size={21} /></span><div><h2 className="font-semibold">A connected academy community</h2><p className="mt-1 text-sm text-muted-foreground">Students, educators, and families each contribute to learning.</p></div></div>
          <p className="text-sm font-medium text-primary">Together, we make progress visible.</p>
        </div>
      </PageContainer>
    </main>
  );
}
