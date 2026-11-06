import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/teachers", label: "Teachers" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
];

export function WebsiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-9 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 brand-wordmark text-sm font-bold tracking-wide text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Image src="/academy-logo.png" alt="" width={44} height={44} />
            SAI ACADEMY
          </Link>
          <p className="mt-2 text-xs text-muted-foreground">A thoughtful place to learn and grow.</p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-xs text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
