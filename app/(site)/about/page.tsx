import { CtaButton } from "@/components/CtaButton";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "About",
  description: `About ${site.brand} (${site.legalName}) — a studio for websites, games, AI automation, Ronfax, and SaaS.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:px-12">
      <p className="text-xs font-semibold tracking-[0.16em] text-[var(--color-accent)] uppercase">
        About
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-5xl">
        A product studio with shipping DNA
      </h1>
      <p className="mt-6 text-base leading-relaxed text-[var(--color-muted)]">
        {site.brand} is operated by {site.legalName}. We build websites, games, AI automation,
        Ronfax cloud fax, and other SaaS tools for teams that want clear scope and real delivery —
        not slide decks.
      </p>
      <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
        Whether you need a branded site, a custom casual game, an ops workflow automated, or a
        focused SaaS MVP, we take briefs from inquiry to launch.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <CtaButton href="/contact">Work with us</CtaButton>
        <CtaButton href="/services" variant="secondary">
          Browse services
        </CtaButton>
      </div>
    </section>
  );
}
