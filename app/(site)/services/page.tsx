import Link from "next/link";
import { Breadcrumbs } from "@/components/automation/Breadcrumbs";
import { CtaBand, PageHero } from "@/components/automation/PageHero";
import { Reveal } from "@/components/automation/Reveal";
import { Section, SectionHeader } from "@/components/automation/Section";
import { benefits, serviceOutcomes } from "@/lib/automation";
import { services } from "@/lib/services";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata, itemListJsonLd, SEO_KEYWORDS } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Services — AI Workflow & Business Process Automation",
  description:
    "AI workflow automation, email automation, browser automation, spreadsheet automation, PDF automation, and reporting automation for local businesses in Australia and New Zealand.",
  path: "/services",
  keywords: [
    ...SEO_KEYWORDS,
    "Email Automation",
    "Browser Automation",
    "Spreadsheet Automation",
    "PDF Automation",
    "Reporting Automation",
  ],
});

export default function ServicesPage() {
  const itemList = itemListJsonLd(
    services.map((s) => ({
      name: s.title,
      url: absoluteUrl(`/services/${s.slug}`),
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
          { name: "Services", path: "/services" },
        ]}
      />
      <PageHero
        eyebrow="Services"
        title="Custom automation for repetitive business tasks"
        description="We build AI workflow automation tailored to your business — integrated with the tools you already use."
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceOutcomes.map((outcome, i) => (
            <Reveal key={outcome} delay={i * 60}>
              <div className="panel-premium p-6 text-base font-medium text-[var(--color-foreground)]">
                {outcome}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface)]">
        <Reveal>
          <SectionHeader
            title="What we build"
            description="Every project is custom — scoped to your workflow."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 50}>
              <Link
                href={`/services/${service.slug}`}
                className="panel-premium group block h-full p-6 no-underline"
              >
                <div className="panel-icon" aria-hidden>
                  {service.icon}
                </div>
                <h3 className="mt-5 text-base font-semibold text-[var(--color-foreground)] transition group-hover:text-[var(--color-accent-hover)]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {service.description}
                </p>
                <p className="mt-4 text-sm font-medium text-[var(--color-accent-hover)]">
                  Learn more
                  <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader title="Why owners choose Roncyo" align="center" />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 80}>
              <article className="panel-premium h-full p-6">
                <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {benefit.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Reveal>
        <CtaBand />
      </Reveal>
    </>
  );
}
