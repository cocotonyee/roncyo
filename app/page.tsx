import Link from "next/link";
import { AppStoreCard } from "@/components/AppStoreCard";
import { CozyButton } from "@/components/CozyUI";
import { games } from "@/lib/games";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: `${site.brand} App Store — Mobile Games & Web Apps`,
  description: `Discover and play mobile games, puzzle apps, and web demos on ${site.brand}. Verified publishers, instant demos, Google Play and Telegram downloads.`,
  path: "/",
  keywords: ["free mobile games", "play games online", "puzzle games", "casual games catalog"],
});

const HIGHLIGHTS = [
  {
    title: "Verified publishers",
    desc: "Every listing includes legal entity details, support contacts, and compliance links.",
  },
  {
    title: "Multi-platform distribution",
    desc: "iOS, Android, web, and Telegram Mini Apps — one catalog for every channel.",
  },
  {
    title: "Complete app profiles",
    desc: "Version info, features, privacy policies, and download links in one place.",
  },
  {
    title: "Enterprise-ready",
    desc: "Structured for store review, partner onboarding, and client publishing.",
  },
] as const;

function pickFeatured() {
  return games.filter((g) =>
    g.badges?.some((b) => b === "featured" || b === "editor-choice" || b === "new"),
  );
}

export default function HomePage() {
  const featured = pickFeatured();
  const featuredSlugs = new Set(featured.map((g) => g.slug));
  const catalog = games.filter((g) => !featuredSlugs.has(g.slug));

  return (
    <div className="bg-[var(--color-cozy-surface)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-cozy-sage)] via-[#003d6b] to-[var(--color-cozy-sage-dark)] px-5 pt-12 pb-20 min-[960px]:px-[52px] min-[960px]:pt-16 min-[960px]:pb-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(0,210,106,0.15) 0%, transparent 45%), radial-gradient(circle at 80% 60%, rgba(0,156,255,0.2) 0%, transparent 40%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center min-[960px]:max-w-4xl">
          <p className="text-xs font-bold tracking-[0.14em] text-[var(--color-roncy-yellow)] uppercase">
            {site.brand} App Store
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.12] font-black tracking-tight text-white">
            Publish and discover apps with confidence
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.75] text-white/85">
            A professional distribution platform for mobile and web applications — complete
            game profiles, verified publisher details, and store-ready compliance.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CozyButton href="/games">Browse App Store</CozyButton>
            <CozyButton href="/contact" variant="light">
              Partner with us
            </CozyButton>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="relative -mt-8 px-5 pb-14 min-[960px]:-mt-10 min-[960px]:px-[52px] min-[960px]:pb-18">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-[var(--color-cozy-brown)]/8 bg-white px-5 py-8 shadow-[0_12px_48px_rgba(0,43,80,0.08)] min-[960px]:px-8 min-[960px]:py-10">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--color-cozy-brown)]/8 pb-6">
            <div>
              <p className="text-xs font-bold tracking-[0.12em] text-[var(--color-cozy-brown-muted)] uppercase">
                Catalog
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-black text-[var(--color-cozy-brown)]">
                Apps & games
              </h2>
            </div>
            <Link
              href="/games"
              className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-cozy-surface)] px-4 py-2 text-sm font-bold text-[var(--color-cozy-brown)] transition hover:bg-[var(--color-cozy-peach)]"
            >
              View full catalog →
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="mt-8">
              <h3 className="text-xs font-bold tracking-[0.1em] text-[var(--color-cozy-brown-muted)] uppercase">
                Featured
              </h3>
              <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {featured.map((g) => (
                  <li key={g.slug}>
                    <AppStoreCard game={g} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {catalog.length > 0 ? (
            <div className={featured.length > 0 ? "mt-10" : "mt-8"}>
              {featured.length > 0 ? (
                <h3 className="text-xs font-bold tracking-[0.1em] text-[var(--color-cozy-brown-muted)] uppercase">
                  More apps
                </h3>
              ) : null}
              <ul
                className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${featured.length > 0 ? "mt-4" : ""}`}
              >
                {catalog.map((g) => (
                  <li key={g.slug}>
                    <AppStoreCard game={g} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {/* Platform highlights */}
      <section className="bg-[var(--color-cozy-sage)] px-5 py-14 min-[960px]:px-[52px] min-[960px]:py-18">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.12em] text-white/60 uppercase">
            Why {site.brand}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2.25rem)] font-black text-white">
            Built for professional app publishing
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm"
              >
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-white">
                  {h.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-cozy-surface)] px-5 py-14 min-[960px]:px-[52px] min-[960px]:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-[var(--color-cozy-brown)]/10 bg-white p-8 text-center shadow-[0_8px_32px_rgba(0,43,80,0.06)] min-[960px]:p-12">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-black text-[var(--color-cozy-brown)]">
              Ready to list your app?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--color-cozy-brown-muted)]">
              We help publishers and clients launch on mobile, web, and Telegram with complete
              store pages, compliance documentation, and distribution support.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <CozyButton href="/contact">Get in touch</CozyButton>
              <CozyButton href="/about" variant="outline">
                About {site.brand}
              </CozyButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
