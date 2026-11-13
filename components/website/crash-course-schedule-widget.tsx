"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { CalendarDays, X } from "lucide-react";

export function CrashCourseScheduleWidget({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function closePanel() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && isOpen) {
      closePanel();
    }
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      className="fixed bottom-4 right-4 z-40 flex w-[min(26rem,calc(100vw_-_2rem))] flex-col items-end gap-2 sm:bottom-6 sm:right-6 sm:gap-3"
    >
      <section
        id="crash-course-schedule-panel"
        aria-labelledby="crash-course-schedule-panel-title"
        hidden={!isOpen}
        className="max-h-[75svh] w-full overflow-y-auto rounded-2xl border border-border bg-background/95 p-2.5 shadow-[0_24px_70px_-24px_rgba(16,47,104,0.48)] backdrop-blur-xl sm:p-3"
      >
        <header className="mb-3 flex items-center justify-between gap-3">
          <h2
            id="crash-course-schedule-panel-title"
            className="text-sm font-bold text-brand-blue"
          >
            Crash course schedule
          </h2>
          <button
            type="button"
            aria-label="Close crash course schedule"
            onClick={closePanel}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X aria-hidden="true" size={17} />
          </button>
        </header>
        {children}
      </section>

      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="crash-course-schedule-panel"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-brand-red px-3 py-2 text-xs font-bold text-white shadow-[0_10px_28px_-10px_rgba(165,31,43,0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-red/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 sm:px-4 sm:py-2.5 sm:text-sm"
      >
        <CalendarDays aria-hidden="true" className="size-4 sm:size-[17px]" />
        <span className="sm:hidden">Course dates</span>
        <span className="hidden sm:inline">Crash course dates</span>
        <span className="crash-schedule-dot size-2 rounded-full bg-amber-300" />
      </button>
    </div>
  );
}
