import { ArrowUpRight, BookOpen, Compass, GraduationCap, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type AcademicProgram = {
  name: string;
  description: string;
  icon: LucideIcon;
};

const academicPrograms: AcademicProgram[] = [
  {
    name: "B Batch",
    description:
      "An engaging learning program designed to build strong academic foundations and develop essential subject knowledge.",
    icon: BookOpen,
  },
  {
    name: "A Batch",
    description:
      "A structured academic program focused on conceptual understanding, regular practice, and continuous learning improvement.",
    icon: Compass,
  },
  {
    name: "A++ Batch",
    description:
      "An advanced learning program designed to provide deeper subject knowledge, focused guidance, and enhanced academic preparation.",
    icon: Sparkles,
  },
  {
    name: "C Batch",
    description:
      "A supportive learning program that encourages consistent practice, concept clarity, and steady academic progress.",
    icon: GraduationCap,
  },
];

export function AcademicPrograms() {
  return (
    <section id="courses" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-330 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="landing-kicker">ACADEMIC PROGRAMS</p>
          <h2 className="mt-5 text-4xl font-medium leading-tight tracking-tighter text-foreground sm:text-5xl">
            Find the Right Learning Path
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Explore the academic programs offered at SAI Academy.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {academicPrograms.map(({ name, description, icon: Icon }) => (
            <article
              key={name}
              className="group flex h-full min-h-64 flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-border/80 hover:shadow-lg sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="mt-1 size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                />
              </div>
              <h3 className="mt-7 text-lg font-semibold text-foreground">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
