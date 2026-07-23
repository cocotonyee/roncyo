import { AppLink } from "@/components/AppLink";
import { CtaButton } from "@/components/CtaButton";
import { offerings } from "@/lib/offerings";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Services",
  description:
    "Roncyo services: custom websites, game development, AI automation, Ronfax cloud fax, and SaaS tools.",
  path: "/services",
  keywords: ["Roncyo services", "custom games", "AI automation", "Ronfax", "SaaS"],
});

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
      <p className="text-xs font-semibold tracking-[0.16em] text-[var(--color-accent)] uppercase">
        Services
      </p>
      <h1 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-5xl">
        Everything we build
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">
        Pick a line of work and tell us what you need. We scope fixed deliveries for websites,
        games, automation, Ronfax, and custom SaaS.
      </p>

      <div className="mt-16 space-y-16">
        {offerings.map((item) => (
          <section
            key={item.slug}
            id={item.slug}
            className="scroll-mt-28 border-t border-[var(--color-border)] pt-12"
          >
            <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase">
              {item.eyebrow}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-foreground)]">
              {item.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
              {item.summary}
            </p>
            <ul className="mt-6 space-y-2">
              {item.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-[var(--color-muted)]">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {point}
                </li>
              ))}
            </ul>
            <AppLink
              href={`/contact?interest=${encodeURIComponent(item.title)}`}
              className="mt-8 inline-flex text-sm font-semibold text-[var(--color-foreground)] underline-offset-4 hover:text-[var(--color-accent-hover)] hover:underline"
            >
              {item.ctaLabel} →
            </AppLink>
          </section>
        ))}
      </div>

      <div className="mt-20 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-12 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-foreground)]">
          Have a brief ready?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-muted)]">
          Send project details and we&apos;ll follow up with scope and next steps.
        </p>
        <div className="mt-8 flex justify-center">
          <CtaButton href="/contact">Start a project</CtaButton>
        </div>
      </div>
    </div>
  );
}
