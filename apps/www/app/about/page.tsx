import { CtaButton } from "@/components/CtaButton";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "About",
  description: `About ${site.brand} - a digital product studio operated by ${site.legalName}.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:px-12">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tighter text-[var(--color-fg)] sm:text-5xl">
        Building small things that matter.
      </h1>
      <div className="mt-8 space-y-5 text-base leading-relaxed text-[var(--color-muted)]">
        <p>
          {site.brand} is a digital product studio operated by {site.legalName}. We create useful
          software for the world: websites, tools, games, extensions, and focused SaaS experiments.
        </p>
        <p>
          We are not a traditional software sales company. We are closer to a tiny startup studio:
          ship small products, learn from real usage, and let winners grow into independent brands
          when they earn it.
        </p>
        <p>The mother site is for trust and orientation. The products do the earning.</p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <CtaButton href="/products">See products</CtaButton>
        <CtaButton href="/contact" variant="secondary">
          Contact
        </CtaButton>
      </div>
    </section>
  );
}
