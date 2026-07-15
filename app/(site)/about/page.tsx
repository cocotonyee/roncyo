import { AppLink } from "@/components/AppLink";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "About Roncyo — Free Online Games",
  description:
    "Roncyo publishes and distributes free online games and mobile titles. Play instantly in your browser or find our apps on the stores you already use.",
  path: "/about",
  keywords: ["Roncyo games", "game publisher", "free online games"],
});

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:px-12">
      <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase">
        About
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
        A home for free online games
      </h1>
      <p className="mt-6 text-base leading-relaxed text-[var(--color-muted)]">
        {site.brand} is a games destination by {site.legalName}. We publish browser playables and
        mobile titles — with a catalog built for quick sessions, clear categories, and instant play
        when games support the web.
      </p>
      <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
        The site is supported by advertising so players can keep games free. See our{" "}
        <AppLink href="/privacy-policy" className="underline hover:text-[var(--color-foreground)]">
          Privacy Policy
        </AppLink>{" "}
        and{" "}
        <AppLink href="/cookie-policy" className="underline hover:text-[var(--color-foreground)]">
          Cookie Policy
        </AppLink>{" "}
        for how ads work on {site.domain}.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <AppLink
          href="/games"
          className="inline-flex rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-black"
        >
          Browse games
        </AppLink>
        <AppLink
          href="/support"
          className="inline-flex rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-foreground)]"
        >
          Support
        </AppLink>
      </div>
    </section>
  );
}
