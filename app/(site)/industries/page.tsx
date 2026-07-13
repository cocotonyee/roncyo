import Link from "next/link";
import { Breadcrumbs } from "@/components/automation/Breadcrumbs";
import { CtaBand, PageHero } from "@/components/automation/PageHero";
import { Reveal } from "@/components/automation/Reveal";
import { Section, SectionHeader } from "@/components/automation/Section";
import { industries } from "@/lib/industries";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata, itemListJsonLd, SEO_KEYWORDS } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Industries — AI Automation for Local Businesses",
  description:
    "Custom AI automation for dentists, electricians, plumbers, accountants, and professional services in Australia and New Zealand.",
  path: "/industries",
  keywords: [
    ...SEO_KEYWORDS,
    "AI Automation for Dentists",
    "AI Automation for Electricians",
    "AI Automation for Plumbers",
    "AI Automation for Accountants",
  ],
});

export default function IndustriesPage() {
  const itemList = itemListJsonLd(
    industries.map((i) => ({
      name: i.title,
      url: absoluteUrl(`/industries/${i.slug}`),
    })),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
      />
      <PageHero
        eyebrow="Industries"
        title="Automation for your industry"
        description="We specialise in local service businesses — with workflows that match how you actually operate."
      />

      <Section>
        <div className="grid gap-5 sm:grid-cols-2">
          {industries.map((industry, i) => (
            <Reveal key={industry.slug} delay={i * 70}>
              <Link
                href={`/industries/${industry.slug}`}
                className="panel-premium group block h-full p-8 no-underline"
              >
                <h2 className="text-xl font-semibold text-[var(--color-foreground)] transition group-hover:text-[var(--color-accent-hover)]">
                  {industry.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {industry.description}
                </p>
                <p className="mt-4 text-sm font-medium text-[var(--color-accent-hover)]">
                  Explore automations
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
            title="Don't see your industry?"
            description="Most repetitive workflows follow the same patterns — follow-ups, documents, data entry, and reminders. We'll map yours on a free call."
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
