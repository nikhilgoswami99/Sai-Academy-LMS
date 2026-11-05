import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageContainer, PageHero } from "@/components/website/page-sections";
import { GiftTokenFees } from "./gift-token-fees";

export default function CoursePage() {
  return (
    <main>
      <PageHero
        eyebrow="Explore the course"
        title="Crash Course"
        description="Choose a gift token to explore its fee details."
        compact
      >
        <Link
          href="/courses"
          className="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft aria-hidden="true" size={16} /> All courses
        </Link>
      </PageHero>
      <PageContainer className="pt-8 sm:pt-10 lg:pt-12">
        <GiftTokenFees />
      </PageContainer>
    </main>
  );
}
