import { AppLink } from "@/components/AppLink";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "About Roncyo",
  description:
    "Roncyo is a publishing and monetization platform for games and websites — partner documentation and distribution, not a public play catalog.",
  path: "/about",
  keywords: ["Roncyo", "game publishing platform", "site monetization"],
});

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:px-12">
      <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase">
        About
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
        A platform for publishers
      </h1>
      <p className="mt-6 text-base leading-relaxed text-[var(--color-muted)]">
        {site.brand} ({site.legalName}) helps studios and site owners{" "}
        <strong className="font-semibold text-[var(--color-foreground)]">publish</strong>,{" "}
        <strong className="font-semibold text-[var(--color-foreground)]">distribute</strong>, and{" "}
        <strong className="font-semibold text-[var(--color-foreground)]">monetize</strong> with
        advertising.
      </p>
      <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
        This website is the platform introduction and documentation hub. It is{" "}
        <strong className="font-semibold text-[var(--color-foreground)]">not</strong> a consumer game
        directory or instant-play arcade.
      </p>
      <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
        Compliance pages for specific titles (privacy / support) may still live under{" "}
        <code className="text-[var(--color-foreground)]">/games/…</code> when a store or Mini App
        requires a public URL.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <AppLink
          href="/docs"
          className="inline-flex rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-black"
        >
          Read docs
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
