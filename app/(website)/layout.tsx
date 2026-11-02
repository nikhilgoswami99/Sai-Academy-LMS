import type { ReactNode } from "react";
import { SiteNav } from "@/components/landing/siteNav";
import { WebsiteFooter } from "@/components/website/website-footer";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      {children}
      <WebsiteFooter />
    </div>
  );
}
