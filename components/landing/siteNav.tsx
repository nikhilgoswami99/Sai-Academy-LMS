"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { AuthDialog } from "@/components/auth/auth-dialog";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/teachers", label: "Teachers" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 12);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header
        onKeyDown={(event) => {
          if (event.key === "Escape") closeMenu();
        }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        {menuOpen && (
          <button
            type="button"
            aria-label="Close navigation menu"
            tabIndex={-1}
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px] lg:hidden"
          />
        )}

        <div
          className={`relative z-50 mx-auto flex min-h-[68px] max-w-[1400px] items-center justify-between gap-3 rounded-2xl border px-4 transition-[background-color,border-color,box-shadow] duration-300 sm:px-6 lg:px-7 ${
          scrolled
            ? "border-border/80 bg-card/95 shadow-[0_12px_40px_-18px_rgba(15,23,42,0.24)] backdrop-blur-xl"
            : "border-white/70 bg-card/85 shadow-[0_8px_32px_-18px_rgba(15,23,42,0.2)] backdrop-blur-xl"
          }`}
        >
          <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2 brand-wordmark text-base font-bold tracking-[0.02em] text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-lg"
          >
          <Image src="/academy-logo.png" alt="" width={52} height={52} priority />
          <span>SAI ACADEMY</span>
          </Link>

          <nav aria-label="Main navigation" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {links.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:px-3.5 ${
                  isActive ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          </nav>

          <div className="ml-auto hidden shrink-0 items-center gap-2 lg:flex">
          <AuthDialog
            trigger={
              <button type="button" className="rounded-md px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Login
              </button>
            }
          />
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 rounded-md bg-brand-red px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-red/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
          >
            Enquire Now <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
          </div>

          <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border/80 bg-card/75 text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          >
          {menuOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
          </button>
        </div>

        <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        onKeyDown={(event) => {
          if (event.key === "Escape") closeMenu();
        }}
        className={`absolute left-3 right-3 top-[calc(100%+0.5rem)] z-50 mx-auto max-h-[calc(100dvh-6rem)] max-w-[1400px] overflow-y-auto rounded-2xl border border-border/80 bg-card/95 p-3 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.3)] backdrop-blur-xl transition-[opacity,transform,visibility] duration-200 sm:left-5 sm:right-5 lg:hidden ${
          menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
        >
          <div className="flex flex-col gap-1">
          {links.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={closeMenu}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive ? "bg-secondary text-primary" : "text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
            <AuthDialog
              trigger={
                <button type="button" onClick={closeMenu} className="min-h-11 rounded-md border border-border bg-card px-4 text-sm font-semibold text-foreground transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  Login
                </button>
              }
            />
            <Link
              href="/admissions"
              onClick={closeMenu}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md bg-brand-red px-3 text-sm font-semibold text-white transition hover:bg-brand-red/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
            >
              Enquire Now <ArrowUpRight aria-hidden="true" size={14} />
            </Link>
          </div>
          </div>
        </nav>
      </header>
      <div aria-hidden="true" className="h-20 sm:h-[84px]" />
    </>
  );
}
