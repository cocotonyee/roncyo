import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AutomationButton } from "@/components/automation/Button";
import { Breadcrumbs } from "@/components/automation/Breadcrumbs";
import { CtaBand, PageHero } from "@/components/automation/PageHero";
import { FaqSection } from "@/components/automation/FaqSection";
import { Reveal } from "@/components/automation/Reveal";
import { SeoCrossLinks } from "@/components/automation/SeoCrossLinks";
import { Section, SectionHeader } from "@/components/automation/Section";
import { homeIndustries } from "@/lib/automation";
import { industries } from "@/lib/industries";
import {
  getAllLocationSlugs,
  getCitiesByCountry,
  getCountryForCity,
  getLocation,
  locationJsonLd,
  locationMetadata,
  type LocationPage,
} from "@/lib/locations";
import { services } from "@/lib/services";
import { breadcrumbJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return { title: "Location" };
  return locationMetadata(location);
}

function cityCardsForCountry(location: LocationPage) {
  return getCitiesByCountry(location.country);
}

export default async function LocationDetailPage({ params }: Props) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const country = getCountryForCity(location);
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    ...(location.type === "city" && country
      ? [{ name: country.title, path: `/locations/${country.slug}` }]
      : []),
    { name: location.title, path: `/locations/${location.slug}` },
  ];

  const cityCards = location.type === "country" ? cityCardsForCountry(location) : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationJsonLd(location)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems)) }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        eyebrow="Locations"
        title={location.headline}
        description={location.description}
      />

      <Section>
        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-[var(--color-muted)]">
            {location.seoIntro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {location.highlights.map((item, i) => (
            <Reveal key={item} delay={i * 60}>
              <div className="panel-premium p-5 text-sm leading-relaxed text-[var(--color-muted)]">
                {item}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {location.type === "country" ? (
        <Section className="bg-[var(--color-surface)]">
          <Reveal>
            <SectionHeader
              title={`Cities in ${location.title}`}
              description={`Business automation for local businesses in ${location.countryName}.`}
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cityCards.map((city, i) => (
              <Reveal key={city.slug} delay={i * 70}>
                <Link
                  href={`/locations/${city.slug}`}
                  className="panel-premium group block h-full p-6 no-underline"
                >
                  <h3 className="text-lg font-semibold text-[var(--color-foreground)] transition group-hover:text-[var(--color-accent-hover)]">
                    {city.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    {city.seoKeyword}
                    <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <Section className={location.type === "country" ? "" : "bg-[var(--color-surface)]"}>
        <Reveal>
          <SectionHeader
            title="Industries we automate"
            description="Custom workflows for local service businesses."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeIndustries.map((industry, i) => (
            <Reveal key={industry.href} delay={i * 50}>
              <Link
                href={industry.href}
                className="panel-premium block p-5 text-sm font-medium text-[var(--color-foreground)] no-underline transition hover:text-[var(--color-accent-hover)]"
              >
                {industry.title} →
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <SeoCrossLinks
            services={services.slice(0, 3)}
            industries={industries.slice(0, 3)}
          />
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10">
            <AutomationButton href="/contact">Book a Free Consultation</AutomationButton>
          </div>
        </Reveal>
      </Section>

      <FaqSection faqs={location.faqs} />

      <Reveal>
        <CtaBand />
      </Reveal>
    </>
  );
}
