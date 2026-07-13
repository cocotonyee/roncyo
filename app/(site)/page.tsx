import { AppLink } from "@/components/AppLink";
import { AutomationMarquee } from "@/components/automation/Marquee";
import { CtaBand, HomeHero } from "@/components/automation/PageHero";
import { FaqSection } from "@/components/automation/FaqSection";
import { Reveal } from "@/components/automation/Reveal";
import { Section, SectionHeader } from "@/components/automation/Section";
import { homeIndustries, howItWorks } from "@/lib/automation";
import { globalFaqs } from "@/lib/faqs";
import { getCitiesByCountry } from "@/lib/locations";
import { services } from "@/lib/services";
import { buildPageMetadata, faqJsonLd, SEO_KEYWORDS } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Roncyo — AI Business Automation for Local Businesses in Australia & NZ",
  description:
    "Custom AI automation for local businesses in Australia and New Zealand. Eliminate repetitive work with workflow, email, browser, spreadsheet, PDF, and reporting automation. Free consultation.",
  path: "/",
  keywords: [...SEO_KEYWORDS],
});

export default function HomePage() {
  const homeFaqs = globalFaqs.slice(0, 4);
  const auCities = getCitiesByCountry("au");
  const nzCities = getCitiesByCountry("nz");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaqs)) }}
      />

      <HomeHero />

      <Section id="services">
        <Reveal>
          <SectionHeader
            eyebrow="What we automate"
            title="Practical automation — not hype"
            description="We wire together the tools you already use so repetitive work happens automatically."
            align="center"
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((card, i) => (
            <Reveal key={card.slug} delay={i * 80}>
              <AppLink
                href={`/services/${card.slug}`}
                className="panel-premium group block h-full p-6 no-underline"
              >
                <div className="panel-icon" aria-hidden>
                  {card.icon}
                </div>
                <h3 className="mt-5 text-base font-semibold text-[var(--color-foreground)] transition group-hover:text-[var(--color-accent-hover)]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {card.description}
                </p>
              </AppLink>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="overflow-hidden bg-[var(--color-surface)]">
        <Reveal>
          <SectionHeader
            eyebrow="Typical automations"
            title="The tasks we remove from your week"
            align="center"
          />
        </Reveal>
        <div className="mt-10">
          <AutomationMarquee />
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="How it works"
            title="From call to live automation"
            align="center"
          />
        </Reveal>
        <div className="relative mt-16">
          <div className="timeline-line hidden lg:block" aria-hidden />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, i) => (
              <Reveal key={step.step} delay={i * 100} className="h-full">
                <article className="panel-premium relative h-full p-6 lg:pt-8">
                  <span className="relative z-10 inline-flex size-10 items-center justify-center rounded-full bg-[var(--color-foreground)] text-sm font-semibold text-[var(--color-bg)] ring-4 ring-[var(--color-bg)]">
                    {step.step}
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-[var(--color-foreground)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {step.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-[var(--color-surface)]">
        <Reveal>
          <SectionHeader
            eyebrow="Industries"
            title="Built for local service businesses"
            description="AI automation for dentists, electricians, plumbers, accountants, and professional services across Australia and New Zealand."
            align="center"
          />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {homeIndustries.map((industry, i) => (
            <Reveal key={industry.href} delay={i * 80}>
              <AppLink
                href={industry.href}
                className="panel-premium group block h-full p-6 no-underline"
              >
                <h3 className="text-lg font-semibold text-[var(--color-foreground)] transition group-hover:text-[var(--color-accent-hover)]">
                  {industry.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--color-muted)]">
                  View automations
                  <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </AppLink>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface)]">
        <Reveal>
          <SectionHeader
            eyebrow="Locations"
            title="Serving Australia & New Zealand"
            description="Remote delivery to businesses in every major city."
            align="center"
          />
        </Reveal>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {[...auCities, ...nzCities].map((city, i) => (
            <Reveal key={city.slug} delay={i * 40}>
              <AppLink
                href={`/locations/${city.slug}`}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)] no-underline transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
              >
                {city.title}
              </AppLink>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
            <AppLink href="/locations" className="text-[var(--color-accent-hover)] underline">
              View all locations
            </AppLink>
          </p>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-3xl">
              Business process automation for Australia &amp; New Zealand
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
              Roncyo helps local businesses automate repetitive tasks — without replacing the
              software you already trust. Whether you need email follow-ups for your electrical
              contracting business in Auckland, document chasing for your accounting firm in
              Sydney, or patient recalls for your dental practice in Melbourne, we build custom
              workflows delivered in days, not months.{" "}
              <AppLink href="/locations" className="text-[var(--color-accent-hover)] underline">
                View locations
              </AppLink>
              ,{" "}
              <AppLink href="/case-studies" className="text-[var(--color-accent-hover)] underline">
                see case studies
              </AppLink>
              , or{" "}
              <AppLink href="/contact" className="text-[var(--color-accent-hover)] underline">
                book a free consultation
              </AppLink>
              .
            </p>
          </div>
        </Reveal>
      </Section>

      <FaqSection faqs={homeFaqs} />

      <Reveal>
        <CtaBand />
      </Reveal>
    </>
  );
}
