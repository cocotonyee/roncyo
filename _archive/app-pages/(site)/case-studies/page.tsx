import Link from "next/link";
import { Breadcrumbs } from "@/components/automation/Breadcrumbs";
import { CtaBand, PageHero } from "@/components/automation/PageHero";
import { Reveal } from "@/components/automation/Reveal";
import { Section, SectionHeader } from "@/components/automation/Section";
import { caseStudies } from "@/lib/case-studies";
import { buildPageMetadata, SEO_KEYWORDS } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Case Studies — Business Automation Results",
  description:
    "Real automation outcomes for dental practices, electricians, accountants, and plumbers in Australia and New Zealand. See what's possible before you book a consultation.",
  path: "/case-studies",
  keywords: [...SEO_KEYWORDS, "automation case study", "business automation results"],
});

export default function CaseStudiesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ]}
      />

      <PageHero
        eyebrow="Case Studies"
        title="Automation that pays for itself"
        description="Anonymised results from local businesses we've helped. Use these as a starting point — every project is scoped to your workflow."
      />

      <Section>
        <div className="grid gap-5 sm:grid-cols-2">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 70}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="panel-premium group block h-full p-8 no-underline"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-muted)]">
                  <span className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5">
                    {study.industryLabel}
                  </span>
                  <span className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5">
                    {study.serviceLabel}
                  </span>
                  <span>{study.location}</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-[var(--color-foreground)] transition group-hover:text-[var(--color-accent-hover)]">
                  {study.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {study.summary}
                </p>
                <p className="mt-4 text-sm font-medium text-[var(--color-accent-hover)]">
                  Read case study
                  <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface)]">
        <Reveal>
          <SectionHeader
            title="Want results like these?"
            description="Book a free consultation. We'll map your repetitive tasks and show you what to automate first."
            align="center"
          />
        </Reveal>
      </Section>

      <Reveal>
        <CtaBand />
      </Reveal>
    </>
  );
}
