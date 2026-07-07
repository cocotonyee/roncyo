import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AutomationButton } from "@/components/automation/Button";
import { Breadcrumbs } from "@/components/automation/Breadcrumbs";
import { CtaBand, PageHero } from "@/components/automation/PageHero";
import { FaqSection } from "@/components/automation/FaqSection";
import { Reveal } from "@/components/automation/Reveal";
import { SeoCrossLinks } from "@/components/automation/SeoCrossLinks";
import { Section, SectionHeader } from "@/components/automation/Section";
import { getCaseStudiesByService } from "@/lib/case-studies";
import { serviceFaqs } from "@/lib/faqs";
import { getIndustry } from "@/lib/industries";
import {
  getAllServiceSlugs,
  getService,
  serviceMetadata,
  type ServicePage,
} from "@/lib/services";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service" };
  return serviceMetadata(service);
}

function serviceJsonLd(service: ServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@id": `${absoluteUrl("/")}#organization` },
    areaServed: [
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "New Zealand" },
    ],
    serviceType: service.seoKeyword,
    url: absoluteUrl(`/services/${service.slug}`),
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedIndustries = service.relatedIndustries
    .map((s) => getIndustry(s))
    .filter((i): i is NonNullable<typeof i> => i !== undefined);

  const relatedCaseStudies = getCaseStudiesByService(service.slug);
  const faqs = serviceFaqs[service.slug] ?? [];

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems)) }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        eyebrow="Services"
        title={service.headline}
        description={service.description}
      />

      <Section>
        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-[var(--color-muted)]">
            {service.intro}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeader title="Common use cases" />
            <ul className="mt-6 space-y-3">
              {service.useCases.map((item) => (
                <li
                  key={item}
                  className="panel-premium px-4 py-3 text-sm text-[var(--color-foreground)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeader title="Typical integrations" />
            <ul className="mt-6 flex flex-wrap gap-2">
              {service.integrations.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-sm text-[var(--color-muted)]"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-[var(--color-surface)]">
        <Reveal>
          <SectionHeader title="Outcomes" description="What local business owners actually care about." />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {service.outcomes.map((outcome, i) => (
            <Reveal key={outcome} delay={i * 70}>
              <div className="panel-premium p-6 text-sm leading-relaxed text-[var(--color-muted)]">
                {outcome}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <SeoCrossLinks
            industries={relatedIndustries}
            caseStudies={relatedCaseStudies}
          />
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10">
            <AutomationButton href="/contact">Book a Free Consultation</AutomationButton>
          </div>
        </Reveal>
      </Section>

      <FaqSection faqs={faqs} />

      <Reveal>
        <CtaBand />
      </Reveal>
    </>
  );
}
