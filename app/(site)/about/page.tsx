import { AppLink } from "@/components/AppLink";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "About Roncyo Open Platform",
  description:
    "Roncyo Open Platform gives developers documentation and commercial rails to distribute and monetize digital products.",
  path: "/about",
  keywords: ["Roncyo", "open platform", "developer platform"],
});

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:px-12">
      <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase">
        About
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
        An open platform for developers
      </h1>
      <p className="mt-6 text-base leading-relaxed text-[var(--color-muted)]">
        {site.brand} ({site.legalName}) runs a developer-facing platform for{" "}
        <strong className="font-semibold text-[var(--color-foreground)]">building</strong>,{" "}
        <strong className="font-semibold text-[var(--color-foreground)]">distributing</strong>, and{" "}
        <strong className="font-semibold text-[var(--color-foreground)]">monetizing</strong> digital
        products with advertising.
      </p>
      <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
        This website is the public Open Platform home: product introduction and partner docs —
        analogous in role to a “for developers” portal, not a consumer content feed.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <AppLink
          href="/docs"
          className="inline-flex rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-black"
        >
          Developer docs
        </AppLink>
        <AppLink
          href="/support"
          className="inline-flex rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-foreground)]"
        >
          Contact us
        </AppLink>
      </div>
    </section>
  );
}
