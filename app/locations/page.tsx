import Link from "next/link";
import { Breadcrumbs } from "@/components/automation/Breadcrumbs";
import { CtaBand, PageHero } from "@/components/automation/PageHero";
import { Reveal } from "@/components/automation/Reveal";
import { Section, SectionHeader } from "@/components/automation/Section";
import {
  getCitiesByCountry,
  locations,
  type LocationPage,
} from "@/lib/locations";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata, itemListJsonLd, SEO_KEYWORDS } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Locations — AI Automation Across Australia & New Zealand",
  description:
    "Custom business automation for local businesses in Sydney, Melbourne, Brisbane, Perth, Adelaide, Auckland, Wellington, and Christchurch.",
  path: "/locations",
  keywords: [
    ...SEO_KEYWORDS,
    "business automation Sydney",
    "business automation Melbourne",
    "business automation Brisbane",
    "business automation Perth",
    "business automation Adelaide",
    "business automation Auckland",
    "business automation Wellington",
    "business automation Christchurch",
  ],
});

function LocationCard({ location }: { location: LocationPage }) {
  return (
    <Link
      href={`/locations/${location.slug}`}
      className="panel-premium group block h-full p-6 no-underline"
    >
      <h3 className="text-lg font-semibold text-[var(--color-foreground)] transition group-hover:text-[var(--color-accent-hover)]">
        {location.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
        {location.description}
      </p>
      <p className="mt-4 text-sm font-medium text-[var(--color-accent-hover)]">
        View automations
        <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
          →
        </span>
      </p>
    </Link>
  );
}

export default function LocationsPage() {
  const auCities = getCitiesByCountry("au");
  const nzCities = getCitiesByCountry("nz");
  const allCities = locations.filter((l) => l.type === "city");

  const itemList = itemListJsonLd(
    allCities.map((c) => ({
      name: `Business automation ${c.title}`,
      url: absoluteUrl(`/locations/${c.slug}`),
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
          { name: "Locations", path: "/locations" },
        ]}
      />

      <PageHero
        eyebrow="Locations"
        title="AI automation across Australia & New Zealand"
        description="Custom business automation for local service businesses — delivered remotely to your city."
      />

      <Section>
        <Reveal>
          <SectionHeader
            title="Australia"
            description="Business automation for Australian cities — Sydney, Melbourne, Brisbane, Perth, and Adelaide."
          />
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <Link
              href="/locations/australia"
              className="panel-premium group block h-full border-2 border-[var(--color-accent)]/20 p-6 no-underline"
            >
              <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
                All of Australia
              </h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Nationwide remote delivery
                <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </Link>
          </Reveal>
          {auCities.map((city, i) => (
            <Reveal key={city.slug} delay={(i + 1) * 60}>
              <LocationCard location={city} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface)]">
        <Reveal>
          <SectionHeader
            title="New Zealand"
            description="Business automation for Kiwi businesses — Auckland, Wellington, and Christchurch."
          />
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <Link
              href="/locations/new-zealand"
              className="panel-premium group block h-full border-2 border-[var(--color-accent)]/20 p-6 no-underline"
            >
              <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
                All of New Zealand
              </h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Nationwide remote delivery
                <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </Link>
          </Reveal>
          {nzCities.map((city, i) => (
            <Reveal key={city.slug} delay={(i + 1) * 60}>
              <LocationCard location={city} />
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
