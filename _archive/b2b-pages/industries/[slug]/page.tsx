import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AutomationButton } from "@/components/automation/Button";
import { Breadcrumbs } from "@/components/automation/Breadcrumbs";
import { PageHero } from "@/components/automation/PageHero";
import { FaqSection } from "@/components/automation/FaqSection";
import { Reveal } from "@/components/automation/Reveal";
import { SeoCrossLinks } from "@/components/automation/SeoCrossLinks";
import { Section, SectionHeader } from "@/components/automation/Section";
import { getCaseStudiesByIndustry } from "@/lib/case-studies";
import { industryFaqs } from "@/lib/faqs";
import { getAllIndustrySlugs, getIndustry, industryMetadata } from "@/lib/industries";
import { services } from "@/lib/services";
import { breadcrumbJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return { title: "Industry" };
  return industryMetadata(industry);
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relatedCaseStudies = getCaseStudiesByIndustry(industry.slug);
  const relatedServices = services
    .filter((s) => s.relatedIndustries.includes(industry.slug))
    .slice(0, 3);

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.title, path: `/industries/${industry.slug}` },
  ];
  const faqs = industryFaqs[industry.slug] ?? [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems)) }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        eyebrow="Industries"
        title={industry.headline}
        description={industry.description}
      />

      <Section>
        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-[var(--color-muted)]">
            {industry.seoIntro}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <SectionHeader title="Common pain points" />
              <ul className="mt-6 space-y-3">
                {industry.pains.map((pain) => (
                  <li
                    key={pain}
                    className="panel-premium flex gap-3 p-4 text-sm leading-relaxed text-[var(--color-muted)]"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    {pain}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <SectionHeader title="What we automate" />
              <ul className="mt-6 space-y-3">
                {industry.automations.map((item) => (
                  <li
                    key={item}
                    className="panel-premium px-4 py-3 text-sm text-[var(--color-foreground)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-[var(--color-surface)]">
        <Reveal>
          <SectionHeader
            title="Outcomes"
            description="Results local owners care about — not buzzwords."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {industry.outcomes.map((outcome, i) => (
            <Reveal key={outcome} delay={i * 70}>
              <div className="panel-premium p-6 text-sm leading-relaxed text-[var(--color-muted)]">
                {outcome}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <SeoCrossLinks
            services={relatedServices}
            caseStudies={relatedCaseStudies}
          />
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap gap-3">
            <AutomationButton href="/contact">Book a Free Consultation</AutomationButton>
            {relatedCaseStudies[0] ? (
              <Link
                href={`/case-studies/${relatedCaseStudies[0].slug}`}
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] px-6 py-3.5 text-sm font-semibold text-[var(--color-foreground)] transition hover:bg-[var(--color-bg)]"
              >
                See a case study
              </Link>
            ) : null}
          </div>
        </Reveal>
      </Section>

      <FaqSection faqs={faqs} />
    </>
  );
}
