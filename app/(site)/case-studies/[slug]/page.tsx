import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AutomationButton } from "@/components/automation/Button";
import { Breadcrumbs } from "@/components/automation/Breadcrumbs";
import { CtaBand, PageHero } from "@/components/automation/PageHero";
import { Reveal } from "@/components/automation/Reveal";
import { SeoCrossLinks } from "@/components/automation/SeoCrossLinks";
import { Section, SectionHeader } from "@/components/automation/Section";
import {
  caseStudyMetadata,
  getAllCaseStudySlugs,
  getCaseStudy,
  type CaseStudy,
} from "@/lib/case-studies";
import { getIndustry } from "@/lib/industries";
import { getService } from "@/lib/services";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case Study" };
  return caseStudyMetadata(study);
}

function caseStudyJsonLd(study: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.summary,
    datePublished: study.publishedAt,
    author: { "@id": `${absoluteUrl("/")}#organization` },
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
    about: study.industryLabel,
    url: absoluteUrl(`/case-studies/${study.slug}`),
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const industry = getIndustry(study.industry);
  const service = getService(study.serviceSlug);

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Case Studies", path: "/case-studies" },
    { name: study.title, path: `/case-studies/${study.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd(study)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems)) }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        eyebrow="Case Study"
        title={study.title}
        description={study.summary}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap gap-2 text-xs text-[var(--color-muted)]">
            <span className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5">
              {study.industryLabel}
            </span>
            <span className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5">
              {study.serviceLabel}
            </span>
            <span className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5">
              {study.location}
            </span>
            <span className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5">
              {study.timeline}
            </span>
          </div>

          <Reveal>
            <div className="mt-10 space-y-8">
              <div>
                <SectionHeader title="The challenge" />
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                  {study.challenge}
                </p>
              </div>
              <div>
                <SectionHeader title="What we built" />
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                  {study.solution}
                </p>
              </div>
              <div>
                <SectionHeader title="Results" />
                <ul className="mt-4 space-y-3">
                  {study.results.map((result) => (
                    <li
                      key={result}
                      className="panel-premium flex gap-3 p-4 text-sm leading-relaxed text-[var(--color-muted)]"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <SeoCrossLinks
              industries={industry ? [industry] : []}
              services={service ? [service] : []}
            />
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap gap-3">
              <AutomationButton href="/contact">Book a Free Consultation</AutomationButton>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] px-6 py-3.5 text-sm font-semibold text-[var(--color-foreground)] transition hover:bg-[var(--color-surface)]"
              >
                All case studies
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <Reveal>
        <CtaBand />
      </Reveal>
    </>
  );
}
