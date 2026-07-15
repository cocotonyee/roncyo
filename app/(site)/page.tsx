import { AppLink } from "@/components/AppLink";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Roncyo Open Platform — For Developers",
  description:
    "Roncyo Open Platform: documentation and tools for developers to build, distribute, and monetize digital products with advertising.",
  path: "/",
  keywords: [
    "open platform",
    "developer platform",
    "Roncyo developers",
    "content distribution",
    "ad monetization API",
    "Roncyo",
  ],
});

const pillars = [
  {
    title: "Build",
    body: "Ship web apps, mobile apps, Mini Apps, or content sites. We give partners a clear path from onboarding to production.",
  },
  {
    title: "Distribute",
    body: "Connect approved inventory to traffic and demand partners under commercial terms you agree to up front.",
  },
  {
    title: "Monetize",
    body: "Enable authorized ads, publish ads.txt where required, and share revenue per your developer agreement.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 15% -10%, rgba(3,216,203,0.2), transparent), radial-gradient(ellipse 50% 40% at 100% 0%, rgba(3,216,203,0.08), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <p className="text-sm font-semibold tracking-[0.16em] text-[var(--color-accent)] uppercase">
            {site.brand} Open Platform
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-5xl lg:text-6xl">
            For developers.
            <br />
            Build. Distribute. Monetize.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            {site.tagline} Public site for introduction and docs — similar in role to a developer
            open platform, not an end-user feed or entertainment catalog.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <AppLink
              href="/docs"
              className="inline-flex rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[var(--color-accent-hover)]"
            >
              Read the docs
            </AppLink>
            <AppLink
              href="/docs/getting-started"
              className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-6 py-3 text-sm font-semibold text-[var(--color-foreground)] transition hover:border-[var(--color-foreground)]"
            >
              Getting started
            </AppLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
          Built for developers &amp; partners
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted)] sm:text-base">
          One platform relationship. Clear docs. Commercial distribution and ads.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {pillars.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6"
            >
              <h3 className="text-lg font-semibold text-[var(--color-foreground)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-foreground)]">
            Start in the docs
          </h2>
          <p className="mt-3 max-w-xl text-sm text-[var(--color-muted)]">
            Getting started, platform overview, distribution, monetization, ads.txt, and
            integration.
          </p>
          <AppLink
            href="/docs"
            className="mt-8 inline-flex rounded-full bg-[var(--color-foreground)] px-6 py-3 text-sm font-semibold text-[var(--color-bg)]"
          >
            Open documentation →
          </AppLink>
        </div>
      </section>
    </>
  );
}
