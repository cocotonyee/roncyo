import { AppLink } from "@/components/AppLink";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Roncyo — Game & Site Publishing Platform",
  description:
    "Roncyo is a publishing and distribution platform for games and websites — monetize with ads, keep ownership of your IP. Docs for partners, not a public play catalog.",
  path: "/",
  keywords: [
    "game publishing platform",
    "HTML5 game distribution",
    "website monetization",
    "ad distribution",
    "game publisher platform",
    "Roncyo",
  ],
});

const pillars = [
  {
    title: "Publish",
    body: "Bring web games, mobile titles, or content sites. We handle partner-facing listing and compliance URLs when needed.",
  },
  {
    title: "Distribute",
    body: "Place approved inventory with traffic and demand partners under clear commercial terms — not a public player arcade.",
  },
  {
    title: "Monetize",
    body: "Fill with authorized ads, maintain ads.txt, and share revenue per your agreement.",
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
            {site.brand} Platform
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-5xl lg:text-6xl">
            Publish. Distribute.
            <br />
            Monetize with ads.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            {site.tagline} Roncyo is a partner platform for studios and site owners — this site is
            introduction and documentation, not a free-play game portal.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <AppLink
              href="/docs"
              className="inline-flex rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[var(--color-accent-hover)]"
            >
              Read the docs
            </AppLink>
            <AppLink
              href="/support"
              className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-6 py-3 text-sm font-semibold text-[var(--color-foreground)] transition hover:border-[var(--color-foreground)]"
            >
              Contact partnerships
            </AppLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
          Built for publishers
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted)] sm:text-base">
          Three jobs. One commercial relationship.
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
            Start with the docs
          </h2>
          <p className="mt-3 max-w-xl text-sm text-[var(--color-muted)]">
            Overview, publishing requirements, ads &amp; revenue, ads.txt, and technical integration.
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
