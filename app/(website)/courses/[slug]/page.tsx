import Link from "next/link";
import { ArrowLeft, BookOpenCheck, Compass, Lightbulb } from "lucide-react";
import { PageContainer, PageHero } from "@/components/website/page-sections";

function formatTitle(slug: string) {
  return slug.split("-").filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const title = formatTitle(slug);

  return (
    <main>
      <PageHero eyebrow="Course overview" title={title} description={`A clear, steady approach to learning ${title.toLowerCase()} through strong foundations, guided practice, and thoughtful review.`}>
        <Link href="/courses" className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><ArrowLeft aria-hidden="true" size={16} /> All courses</Link>
      </PageHero>
      <PageContainer>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm"><span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary"><Compass aria-hidden="true" size={20} /></span><h2 className="mt-5 font-semibold">Start with the foundations</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Connect new ideas to the knowledge learners already have.</p></article>
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm"><span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary"><Lightbulb aria-hidden="true" size={20} /></span><h2 className="mt-5 font-semibold">Learn through practice</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Use questions and regular practice to deepen understanding.</p></article>
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm"><span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary"><BookOpenCheck aria-hidden="true" size={20} /></span><h2 className="mt-5 font-semibold">Review and keep growing</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Reflect on progress and identify the next learning step.</p></article>
        </div>
        <p className="mt-8 rounded-xl border border-border bg-muted p-5 text-sm leading-6 text-muted-foreground">Course availability and class details are shared by the academy.</p>
      </PageContainer>
    </main>
  );
}
