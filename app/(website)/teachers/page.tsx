import Image from "next/image";
import {
  BookOpenText,
  BriefcaseBusiness,
  GraduationCap,
  UserRound,
} from "lucide-react";
import {
  PageContainer,
  PageHero,
  SectionHeading,
} from "@/components/website/page-sections";

const teacherCards = [
  {
    id: "teacher-one",
    name: "SACHIN KUMAR",
    photo: "/teachers/SACHIN%20KUMAR.png",
    photoLabel: "Photo of Sachin Kumar",
    qualification: "Add qualification",
    experience: "Add teaching experience",
    subject: "Add subject taught",
    accent: "from-brand-blue/15 via-secondary to-brand-green/10",
  },
  {
    id: "teacher-two",
    name: "HEMANT KUMAR",
    photoLabel: "Photo of teacher 2",
    qualification: "Add qualification",
    experience: "Add teaching experience",
    subject: "Add subject taught",
    accent: "from-brand-green/15 via-secondary to-brand-blue/10",
  },
  {
    id: "teacher-three",
    name: "PRIYANKA MISHRA",
    photoLabel: "Photo of teacher 3",
    qualification: "Add qualification",
    experience: "Add teaching experience",
    subject: "Add subject taught",
    accent: "from-brand-red/10 via-secondary to-brand-blue/10",
  },
  {
    id: "teacher-four",
    name: "",
    photoLabel: "Photo of teacher 4",
    qualification: "Add qualification",
    experience: "Add teaching experience",
    subject: "Add subject taught",
    accent: "from-brand-blue/15 via-secondary to-brand-green/10",
  },
  {
    id: "teacher-five",
    name: "Add teacher name",
    photoLabel: "Photo of teacher 5",
    qualification: "Add qualification",
    experience: "Add teaching experience",
    subject: "Add subject taught",
    accent: "from-brand-green/15 via-secondary to-brand-blue/10",
  },
  {
    id: "teacher-six",
    name: "Add teacher name",
    photoLabel: "Photo of teacher 6",
    qualification: "Add qualification",
    experience: "Add teaching experience",
    subject: "Add subject taught",
    accent: "from-brand-red/10 via-secondary to-brand-blue/10",
  },
  {
    id: "teacher-seven",
    name: "Add teacher name",
    photoLabel: "Photo of teacher 7",
    qualification: "Add qualification",
    experience: "Add teaching experience",
    subject: "Add subject taught",
    accent: "from-brand-blue/15 via-secondary to-brand-green/10",
  },
  {
    id: "teacher-eight",
    name: "Add teacher name",
    photoLabel: "Photo of teacher 8",
    qualification: "Add qualification",
    experience: "Add teaching experience",
    subject: "Add subject taught",
    accent: "from-brand-green/15 via-secondary to-brand-blue/10",
  },
];

const teacherDetailFields = [
  { icon: GraduationCap, label: "Qualifications", field: "qualification" },
  { icon: BriefcaseBusiness, label: "Experience", field: "experience" },
  { icon: BookOpenText, label: "Subject", field: "subject" },
] as const;

export default function TeachersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Our teachers"
        title="Meet the educators behind every success."
        description="Get to know the educators who guide every question, build confidence, and help students make steady progress."
      />
      <PageContainer>
        <section aria-labelledby="teacher-list-heading">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="The people behind the learning"
              title="Teachers who bring every subject to life"
              description="Thoughtful guidance, clear explanations, and encouragement help every learner find their next step."
            />
            <div className="hidden items-center gap-2 pb-1 text-sm font-medium text-primary sm:flex">
              <span className="flex size-9 items-center justify-center rounded-full bg-secondary">
                <BookOpenText aria-hidden="true" className="size-4" />
              </span>
              Meet your mentors
            </div>
          </div>

          <h2 id="teacher-list-heading" className="sr-only">
            Teacher profiles
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teacherCards.map((teacher, index) => (
              <article
                key={teacher.id}
                className="group animate-in fade-in slide-in-from-bottom-2 overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-brand-blue/35 hover:shadow-xl motion-reduce:animate-none motion-reduce:transform-none motion-reduce:transition-none"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div
                  className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br ${teacher.accent}`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-10 -top-12 size-44 rounded-full border border-primary/10 transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-16 -left-8 size-44 rounded-full border border-primary/10 transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none"
                  />
                  <div
                    role={teacher.photo ? undefined : "img"}
                    aria-label={teacher.photo ? undefined : teacher.photoLabel}
                    className="relative size-56 overflow-hidden rounded-full border-4 border-card/80 bg-card/80 text-primary shadow-lg backdrop-blur-sm transition duration-300 group-hover:scale-[1.03] group-hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none sm:size-64"
                  >
                    {teacher.photo ? (
                      <Image
                        src={teacher.photo}
                        alt={teacher.photoLabel}
                        fill
                        sizes="(min-width: 640px) 256px, 224px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex size-full items-center justify-center">
                        <UserRound
                          aria-hidden="true"
                          className="size-12 stroke-[1.4] sm:size-14"
                        />
                      </span>
                    )}
                  </div>
                  {!teacher.photo && (
                    <span className="absolute bottom-4 left-4 rounded-full border border-border/60 bg-card/85 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur-sm">
                      Photo placeholder
                    </span>
                  )}
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                        Faculty member {index + 1}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                        {teacher.name}
                      </h3>
                    </div>
                  </div>

                  <dl className="mt-5 space-y-3 border-t border-border/70 pt-4">
                    {teacherDetailFields.map(({ icon: Icon, label, field }) => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary/80 text-primary">
                          <Icon aria-hidden="true" className="size-4" />
                        </span>
                        <div className="min-w-0">
                          <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                            {label}
                          </dt>
                          <dd className="truncate text-sm font-medium text-foreground">
                            {teacher[field]}
                          </dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-primary/15 bg-secondary/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="text-sm leading-6 text-muted-foreground">
            Teacher names, photos, qualifications, experience, and subjects are
            placeholders ready for the academy’s details.
          </p>
          <span className="shrink-0 text-sm font-semibold text-primary">
            Learning, with intention.
          </span>
        </div>
      </PageContainer>
    </main>
  );
}
