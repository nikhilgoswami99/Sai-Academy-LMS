"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BookOpenCheck,
  CalendarDays,
  GraduationCap,
  Layers3,
  UsersRound,
} from "lucide-react";

const views = [
  {
    id: "learners",
    label: "Learners",
    title: "People, with context.",
    description: "A considered home for learner and teacher records.",
    icon: UsersRound,
    rows: [
      ["Learner records", "Contact & enrolment details", "Organized"],
      ["Teaching team", "Subjects & academy details", "Organized"],
      ["Academic groups", "Class and batch connections", "Connected"],
    ],
  },
  {
    id: "classes",
    label: "Classes",
    title: "The year, taking shape.",
    description: "See the academic structure around each learning group.",
    icon: Layers3,
    rows: [
      ["Class groups", "Subjects & class details", "Structured"],
      ["Batch groups", "Learners & assigned teachers", "Connected"],
      ["Teaching context", "Academic year overview", "In view"],
    ],
  },
  {
    id: "exams",
    label: "Examinations",
    title: "Assessment, in sequence.",
    description: "Keep examination details tied to the classes they serve.",
    icon: CalendarDays,
    rows: [
      ["Assessment plan", "Class XI · Term review", "Illustrative"],
      ["Examination details", "Subject & schedule context", "Illustrative"],
      ["Follow-up", "Results ready for review", "Illustrative"],
    ],
  },
  {
    id: "results",
    label: "Results",
    title: "Results, with perspective.",
    description: "Bring marks and academic context into the same conversation.",
    icon: BookOpenCheck,
    rows: [
      ["Subject results", "Mathematics · Sample term", "Example"],
      ["Class context", "Class XI · Assessment review", "Example"],
      ["Progress notes", "A prompt for follow-up", "Example"],
    ],
  },
];

export function AcademicWorkspace() {
  const [activeView, setActiveView] = useState(views[0]);
  const ActiveIcon = activeView.icon;

  return (
    <section
      id="workspace"
      aria-labelledby="workspace-title"
      className="scroll-mt-24 bg-[#fbfaf7]"
    >
      <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="grid gap-8 md:grid-cols-[0.76fr_1.24fr] md:items-end">
          <div>
            <p className="landing-kicker">A closer look / Product preview</p>
            <h2
              id="workspace-title"
              className="mt-6 max-w-md text-4xl font-medium leading-[1.05] tracking-[-0.05em] sm:text-5xl"
            >
              One academic story, <span className="landing-italic text-[#a64e2d]">many chapters.</span>
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-[#716960] md:pb-1">
            Explore an illustrative view of the academic areas SAI ACADEMY is designed to bring together. Select a chapter to see how the information can connect.
          </p>
        </div>

        <div className="landing-workspace mt-12 overflow-hidden rounded-[1.75rem] border border-[#30251d]/10 bg-[#f0ece4] p-3 shadow-[0_30px_90px_-55px_rgba(68,47,31,0.55)] sm:mt-16 sm:p-5 lg:rounded-[2rem] lg:p-7">
          <div className="grid overflow-hidden rounded-[1.25rem] bg-[#fffefa] lg:min-h-[420px] lg:grid-cols-[0.7fr_1.3fr] lg:rounded-[1.5rem]">
            <div className="flex flex-col justify-between border-b border-[#30251d]/10 p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-9">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a64e2d]">Academic workspace</p>
                    <p className="mt-1 text-xs text-[#82796f]">An illustrative product view</p>
                  </div>
                  <span className="brand-wordmark text-[11px] font-bold tracking-wide text-[#39342e]">SAI ACADEMY</span>
                </div>
                <div className="mt-8 flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#f3e7d8] text-[#a64e2d]">
                    <ActiveIcon aria-hidden="true" size={19} strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[#8a8177]">Selected area</p>
                    <p className="mt-1 text-xl font-medium tracking-[-0.04em] text-[#302e29]">{activeView.label}</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-2" aria-label="Choose an academic area">
                  {views.map((view) => (
                    <button
                      key={view.id}
                      type="button"
                      aria-pressed={activeView.id === view.id}
                      onClick={() => setActiveView(view)}
                      className={`rounded-full border px-3 py-2 text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a64e2d] focus-visible:ring-offset-2 ${activeView.id === view.id ? "border-[#302e29] bg-[#302e29] text-white" : "border-[#30251d]/15 bg-transparent text-[#665f57] hover:border-[#a64e2d]/50 hover:text-[#8d4328]"}`}
                    >
                      {view.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-8 border-t border-[#30251d]/10 pt-4 text-[10px] leading-5 text-[#8a8177]">
                Sample content only. This preview contains no real student or academy records.
              </div>
            </div>

            <div className="p-5 sm:p-7 lg:p-10">
              <div key={activeView.id} className="landing-workspace-panel h-full">
                <div className="flex flex-col justify-between gap-3 border-b border-[#30251d]/10 pb-6 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#a64e2d]">Inside the academy</p>
                    <h3 className="mt-2 text-2xl font-medium tracking-[-0.045em] text-[#302e29] sm:text-3xl">{activeView.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-[#7c7369]">{activeView.description}</p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#f1eee7] px-3 py-1.5 text-[10px] text-[#746b61]">
                    <GraduationCap aria-hidden="true" size={13} /> Academic overview
                  </span>
                </div>

                <div className="mt-5">
                  <div className="hidden grid-cols-[1fr_1.15fr_auto] gap-4 px-3 pb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9b9186] sm:grid">
                    <span>Area</span><span>Academic context</span><span>View</span>
                  </div>
                  <ul className="divide-y divide-[#30251d]/10">
                    {activeView.rows.map(([title, detail, state], index) => (
                      <li key={title} className="grid gap-2 py-4 sm:grid-cols-[1fr_1.15fr_auto] sm:items-center sm:gap-4 sm:px-3">
                        <span className="flex items-center gap-3 text-xs font-medium text-[#403a33]">
                          <span className={`flex size-7 items-center justify-center rounded-full text-[9px] ${index === 0 ? "bg-[#f3e7d8] text-[#a64e2d]" : "bg-[#f1eee7] text-[#72695e]"}`}>0{index + 1}</span>
                          {title}
                        </span>
                        <span className="pl-10 text-[11px] text-[#81776d] sm:pl-0">{detail}</span>
                        <span className="inline-flex w-fit items-center gap-1.5 pl-10 text-[10px] text-[#667361] sm:pl-0">
                          <span className="size-1.5 rounded-full bg-[#87957d]" /> {state}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-xl bg-[#f3f0e9] px-4 py-3">
                  <span className="text-[10px] text-[#756c62]">A connected view of academic life</span>
                  <ArrowUpRight aria-hidden="true" size={15} className="text-[#a64e2d]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
