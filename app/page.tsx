import Link from "next/link";
import { AppStoreCard } from "@/components/AppStoreCard";
import { CozyButton } from "@/components/CozyUI";
import { games } from "@/lib/games";
import { site } from "@/lib/site";

const HIGHLIGHTS = [
  {
    title: "Verified publishers",
    desc: "Every app listing includes full legal entity details, support contacts, and compliance links.",
  },
  {
    title: "Multi-platform distribution",
    desc: "iOS, Android, web, Telegram Mini Apps — one catalog for all channels.",
  },
  {
    title: "Complete app profiles",
    desc: "Version info, ratings, features, privacy policies, and platform download links in one place.",
  },
  {
    title: "Enterprise-ready",
    desc: "Structured for store review, partner onboarding, and client publishing at scale.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="bg-[var(--color-cozy-cream)]">
      {/* Hero */}
      <section className="px-5 py-14 min-[960px]:px-[52px] min-[960px]:py-20">
        <div className="mx-auto max-w-3xl text-center min-[960px]:max-w-4xl">
          <p className="text-xs font-bold tracking-[0.14em] text-[var(--color-roncy-yellow)] uppercase">
            {site.brand} App Store
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.12] font-black tracking-tight text-white">
            Publish and discover apps with confidence
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.75] text-white/85">
            A professional distribution platform for mobile and web applications.
            Each listing presents complete game information alongside verified publisher details —
            built for players, partners, and store compliance.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CozyButton href="/games">Browse App Store</CozyButton>
            <CozyButton href="/contact" variant="light">
              Partner with us
            </CozyButton>
          </div>
        </div>
      </section>

      {/* Apps */}
      <section className="px-5 pb-14 min-[960px]:px-[52px] min-[960px]:pb-18">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.12em] text-white/65 uppercase">Catalog</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2.25rem)] font-black text-white">
                Apps & games
              </h2>
            </div>
            <Link href="/games" className="text-sm font-bold text-[var(--color-roncy-yellow)] hover:underline">
              Browse catalog →
            </Link>
          </div>

          <ul className="mt-8 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {games.map((g) => (
              <li key={g.slug} className="w-[min(100%,280px)] shrink-0 min-[640px]:w-[300px]">
                <AppStoreCard game={g} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Platform highlights */}
      <section className="bg-[var(--color-cozy-sage)] px-5 py-14 min-[960px]:px-[52px] min-[960px]:py-18">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.12em] text-white/60 uppercase">Why {site.brand}</p>
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
      <section className="bg-[var(--color-cozy-cream)] px-5 py-14 min-[960px]:px-[52px] min-[960px]:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-white/20 bg-white p-8 text-center shadow-[0_8px_32px_rgba(0,43,80,0.12)] min-[960px]:p-12">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-black text-[var(--color-cozy-brown)]">
              Ready to list your app?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--color-cozy-brown-muted)]">
              We help publishers and clients launch on mobile, web, and Telegram with
              complete store pages, compliance documentation, and distribution support.
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
