import { CalendarDays, Clock3 } from "lucide-react";

const schedules = [
  {
    classes: "Classes X & XII",
    dateTime: "2026-11-16",
    date: "16th November",
  },
  {
    classes: "Classes IX, XI & III to VIII",
    dateTime: "2026-11-23",
    date: "23rd November",
  },
];

export function CrashCourseScheduleNote({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <aside
      aria-labelledby="crash-course-schedule-title"
      className="crash-schedule-note relative isolate overflow-hidden rounded-2xl border border-amber-300/80 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-5 shadow-[0_18px_50px_-28px_rgba(165,31,43,0.5)] sm:rounded-3xl sm:p-7"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-20 size-56 rounded-full bg-amber-200/40 blur-3xl"
      />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-2">
          <span className="crash-schedule-dot size-2.5 rounded-full bg-brand-red" />
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red sm:text-xs">
            Important schedule
          </p>
        </div>
        <h2
          id="crash-course-schedule-title"
          className="mt-2 text-xl font-bold tracking-tight text-brand-blue sm:text-2xl"
        >
          Crash course classes starting soon
        </h2>

        <div
          className={`mt-5 grid gap-3 ${compact ? "grid-cols-1" : "md:grid-cols-2"}`}
        >
          {schedules.map((schedule) => (
            <div
              key={schedule.classes}
              className="rounded-xl border border-brand-red/15 bg-white/85 p-4 shadow-sm sm:p-5"
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground sm:text-base">
                <CalendarDays
                  aria-hidden="true"
                  className="shrink-0 text-brand-red"
                  size={18}
                />
                {schedule.classes}
              </p>
              <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-6 text-muted-foreground">
                <Clock3
                  aria-hidden="true"
                  className="shrink-0 text-brand-blue"
                  size={16}
                />
                Crash course classes will be starting from{" "}
                <time
                  dateTime={schedule.dateTime}
                  className="font-bold text-brand-red"
                >
                  {schedule.date}
                </time>
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
