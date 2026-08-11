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
          {site.brand} is a digital product studio operated by {site.legalName}. We research ideas,
          build focused digital products, and turn small opportunities into independent businesses.
        </p>
        <p>
          DestCard, RonFax, and other tools are where users interact and revenue is created. Roncyo
          provides the foundation: product thinking, design, engineering, experimentation, and brand
          trust.
        </p>
        <p>
          The mother site is for orientation and trust. The{" "}
          <a
            href="/blog"
            className="text-[var(--color-fg)] underline-offset-4 transition hover:text-[var(--color-accent)] hover:underline"
          >
            Journal
          </a>{" "}
          records how products are discovered, shipped, and grown.
        </p>
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
