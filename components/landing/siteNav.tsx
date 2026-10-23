"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "Our approach" },
  { href: "#workspace", label: "Product tour" },
  { href: "#features", label: "Platform" },
  { href: "#how-it-works", label: "How it works" },
];

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#30251d]/10 bg-[#f8f5ef]/90 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="brand-wordmark text-[1.35rem] font-bold tracking-[0.04em] text-[#24211e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a64e2d] focus-visible:ring-offset-4"
          onClick={closeMenu}
        >
          SAI ACADEMY
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="landing-nav-link text-[13px] font-medium text-[#645e57] transition-colors hover:text-[#a64e2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a64e2d]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/login" className="landing-button landing-button-dark">
            Sign in <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-[#30251d]/15 text-[#24211e] transition hover:bg-[#eee8de] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a64e2d] md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`overflow-hidden border-t border-[#30251d]/10 bg-[#f8f5ef] px-5 transition-[max-height,opacity,padding] duration-200 ease-out md:hidden ${menuOpen ? "max-h-64 py-4 opacity-100" : "pointer-events-none max-h-0 py-0 opacity-0"}`}
        onKeyDown={(event) => {
          if (event.key === "Escape") closeMenu();
        }}
      >
          <div className="mx-auto flex max-w-[1320px] flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 text-sm font-medium text-[#48423c] transition hover:bg-[#eee8de] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a64e2d]"
              >
                {link.label}
              </a>
            ))}
            <Link href="/login" onClick={closeMenu} className="landing-button landing-button-dark mt-2 justify-center">
              Sign in <span aria-hidden="true">↗</span>
            </Link>
          </div>
      </nav>
    </header>
  );
}
