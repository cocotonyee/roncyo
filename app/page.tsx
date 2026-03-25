import type { CSSProperties } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { games } from "@/lib/games";
import { site } from "@/lib/site";

const CARD_BACKGROUNDS = ["#FFD6A5", "#B5EAD7", "#C7CEEA"] as const;
const CARD_EMOJI = ["🧩", "🎮", "🚀"] as const;

function stackCards() {
  return Array.from({ length: 3 }, (_, i) => {
    const g = games[i];
    return {
      key: g?.slug ?? `placeholder-${i}`,
      title: g?.title ?? "Coming soon",
      meta: g ? `${g.platforms.join(" · ")} · Live` : "More titles in development",
      emoji: CARD_EMOJI[i] ?? "✨",
      bg: CARD_BACKGROUNDS[i] ?? "#E2E8F0",
    };
  });
}

export default function HomePage() {
  const cards = stackCards();
  const titleCount = Math.max(games.length, 1);

  return (
    <div className="bg-[var(--color-roncy-bg)]">
      {/* Hero */}
      <section className="relative grid min-h-[calc(100dvh-68px)] grid-cols-1 items-start gap-12 overflow-hidden px-5 pt-10 pb-16 min-[960px]:grid-cols-2 min-[960px]:items-end min-[960px]:gap-16 min-[960px]:px-[52px] min-[960px]:pt-14 min-[960px]:pb-20">
        <div
          className="pointer-events-none absolute rounded-full bg-[var(--color-roncy-yellow)] opacity-[0.18] blur-[60px]"
          style={{ width: 500, height: 500, top: -100, right: -80 }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute rounded-full bg-[var(--color-roncy-teal)] opacity-[0.18] blur-[60px]"
          style={{ width: 350, height: 350, bottom: 60, left: -60 }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute rounded-full bg-[var(--color-roncy-coral)] opacity-[0.12] blur-[60px]"
          style={{ width: 250, height: 250, top: 200, right: "30%" }}
          aria-hidden
        />

        <div
          className="animate-roncy-float pointer-events-none absolute top-[130px] right-[52%] z-[1] hidden min-[960px]:block"
          style={{ "--roncy-dur": "3.8s", "--roncy-rot": "20deg" } as CSSProperties}
          aria-hidden
        >
          <svg width="28" height="28" viewBox="0 0 28 28">
            <polygon points="14,2 26,10 26,18 14,26 2,18 2,10" fill="#FFD93D" opacity="0.9" />
          </svg>
        </div>
        <div
          className="animate-roncy-float pointer-events-none absolute top-[210px] right-[39%] z-[1] hidden min-[960px]:block"
          style={
            { "--roncy-dur": "4.5s", "--roncy-delay": "0.8s", "--roncy-rot": "-15deg" } as CSSProperties
          }
          aria-hidden
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <polygon points="10,1 18,7 18,13 10,19 2,13 2,7" fill="#00D4C8" opacity="0.8" />
          </svg>
        </div>
        <div
          className="animate-roncy-float pointer-events-none absolute top-[310px] right-[45%] z-[1] hidden min-[960px]:block"
          style={
            { "--roncy-dur": "5s", "--roncy-delay": "0.3s", "--roncy-rot": "35deg" } as CSSProperties
          }
          aria-hidden
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <polygon points="8,1 14,5 14,11 8,15 2,11 2,5" fill="#C084FC" opacity="0.7" />
          </svg>
        </div>

        <div className="relative z-[2] pb-4 min-[960px]:pb-16">
          <p
            className="animate-roncy-up mb-7 inline-flex rounded-full border-[1.5px] border-[#FFE082] bg-[#FFF9E6] px-4 py-1.5 text-xs font-bold text-[#92600A]"
            style={{ animationDelay: "0.1s" }}
          >
            {site.brand} — {site.tagline}
          </p>

          <h1
            className="animate-roncy-up font-[family-name:var(--font-display)] text-[clamp(2.75rem,5.5vw,4.75rem)] leading-[1.05] font-black tracking-[-0.08em] text-[var(--color-roncy-navy)]"
            style={{ animationDelay: "0.25s" }}
          >
            <span className="relative inline-block">
              <span className="relative z-[1]">{site.brand}</span>
              <span
                className="absolute right-0 bottom-1 left-0 -z-0 h-3 rounded bg-[var(--color-roncy-yellow)] opacity-70"
                aria-hidden
              />
            </span>
          </h1>

          <p
            className="animate-roncy-up mt-6 max-w-[440px] text-[17px] leading-[1.75] text-[var(--color-roncy-muted)]"
            style={{ animationDelay: "0.4s" }}
          >
            We build and publish mobile and browser games — games, support, and company info live
            here.
          </p>

          <div className="animate-roncy-up mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.55s" }}>
            <Link
              href="/games"
              className="font-[family-name:var(--font-display)] rounded-full bg-[var(--color-roncy-teal)] px-9 py-4 text-[15px] font-extrabold text-white shadow-[0_8px_32px_rgba(0,212,200,0.3)] transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(0,212,200,0.4)]"
            >
              Our games
            </Link>
            <Link
              href="/contact"
              className="font-[family-name:var(--font-display)] rounded-full border-2 border-[var(--color-roncy-border)] bg-transparent px-7 py-[15px] text-[15px] font-bold text-[var(--color-roncy-text)] transition hover:border-[var(--color-roncy-navy)] hover:bg-[var(--color-roncy-surface)]"
            >
              Contact us →
            </Link>
          </div>

          <div className="animate-roncy-up mt-12 flex flex-wrap gap-8" style={{ animationDelay: "0.7s" }}>
            <div>
              <div className="font-[family-name:var(--font-display)] text-[28px] font-black text-[var(--color-roncy-navy)]">
                {titleCount}+
              </div>
              <div className="mt-0.5 text-xs font-semibold text-[var(--color-roncy-muted)]">
                Live titles
              </div>
            </div>
            <div className="w-px bg-[var(--color-roncy-border)]" aria-hidden />
            <div>
              <div className="font-[family-name:var(--font-display)] text-[28px] font-black text-[var(--color-roncy-navy)]">
                100%
              </div>
              <div className="mt-0.5 text-xs font-semibold text-[var(--color-roncy-muted)]">
                Official pages
              </div>
            </div>
            <div className="w-px bg-[var(--color-roncy-border)]" aria-hidden />
            <div>
              <div className="font-[family-name:var(--font-display)] text-[28px] font-black text-[var(--color-roncy-navy)]">
                US
              </div>
              <div className="mt-0.5 text-xs font-semibold text-[var(--color-roncy-muted)]">
                {site.country}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-[2] hidden min-[960px]:flex min-[960px]:justify-center min-[960px]:pb-16">
          <div className="group relative h-[380px] w-[300px]">
            {cards.map((c, i) => (
              <div
                key={c.key}
                className={[
                  "absolute w-[240px] overflow-hidden rounded-[20px] shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-transform duration-300 roncy-ease",
                  i === 0 && "top-0 left-5 z-[1] -rotate-6 group-hover:-rotate-[10deg] group-hover:-translate-x-2",
                  i === 1 && "top-[30px] left-[55px] z-[2] rotate-[3deg] group-hover:rotate-6 group-hover:translate-x-2",
                  i === 2 &&
                    "top-[60px] left-5 z-[3] -rotate-1 shadow-[0_24px_64px_rgba(0,0,0,0.16)] group-hover:-translate-y-1",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div
                  className="flex aspect-square items-center justify-center text-[64px]"
                  style={{ background: c.bg }}
                >
                  {c.emoji}
                </div>
                <div className="bg-white px-[18px] py-3.5">
                  <div className="font-[family-name:var(--font-display)] text-sm font-extrabold text-[var(--color-roncy-navy)]">
                    {c.title}
                  </div>
                  <div className="mt-0.5 text-[11px] font-medium text-[var(--color-roncy-muted)]">
                    {c.meta}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yellow — features */}
      <section className="relative overflow-hidden bg-[var(--color-roncy-yellow)] px-5 py-16 min-[960px]:px-[52px] min-[960px]:py-20">
        <Reveal className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.15em] text-[#7A4F00] uppercase">
            <span className="size-2 shrink-0 rounded-full bg-[#7A4F00]" aria-hidden />
            Company
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.5vw,3rem)] font-black tracking-tight text-[var(--color-roncy-navy)]">
            Built for players
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#7A4F00]/90">
            A simple overview of who we are, what we make, and where to get help.
          </p>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-6xl gap-6 min-[640px]:grid-cols-2 min-[960px]:grid-cols-4">
          {[
            { icon: "⚡", bg: "#FFF3CC", name: "Official company site", desc: "A clear and public home for the Roncy brand." },
            { icon: "🎮", bg: "#D4F7F5", name: "Game catalog", desc: "Browse current titles and open each game page." },
            { icon: "🛟", bg: "#FFE8E8", name: "Support access", desc: "Find support pages and contact details quickly." },
            { icon: "✉️", bg: "#F3E8FF", name: "Contact channels", desc: "Business, player, and privacy emails in one place." },
          ].map((f, i) => (
            <Reveal key={f.name} delayMs={i * 70}>
              <div className="h-full rounded-[28px] border-[1.5px] border-white/90 bg-white/65 p-7 backdrop-blur-sm transition hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(0,0,0,0.1)]">
                <div
                  className="mb-5 flex size-[52px] items-center justify-center rounded-2xl text-2xl"
                  style={{ background: f.bg }}
                >
                  {f.icon}
                </div>
                <div className="font-[family-name:var(--font-display)] text-[17px] font-extrabold text-[var(--color-roncy-navy)]">
                  {f.name}
                </div>
                <p className="mt-2 text-[13px] leading-[1.7] text-[rgba(15,23,42,0.55)]">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Teal — pillars */}
      <section className="bg-[var(--color-roncy-teal)] px-5 py-16 min-[960px]:px-[52px] min-[960px]:py-20">
        <Reveal className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.15em] text-[#004F4C] uppercase">
            <span className="size-2 shrink-0 rounded-full bg-[#004F4C]" aria-hidden />
            Quick links
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.5vw,3rem)] font-black tracking-tight text-[var(--color-roncy-navy)]">
            Explore Roncy
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#004F4C]/85">
            Start with the section you need: support, legal information, or game pages.
          </p>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 min-[960px]:grid-cols-3">
          {[
            {
              tag: "Support",
              tagClass: "bg-[#FFF3CC] text-[#7A4F00]",
              icon: "💬",
              name: "Support",
              desc: "Help center and game-specific support pages.",
              href: "/support",
            },
            {
              tag: "Legal",
              tagClass: "bg-[#D4F7F5] text-[#005F5A]",
              icon: "📜",
              name: "Legal pages",
              desc: "Privacy policy, terms, and data deletion information.",
              href: "/privacy-policy",
            },
            {
              tag: "Products",
              tagClass: "bg-[#F3E8FF] text-[#5B21B6]",
              icon: "🕹️",
              name: "Game pages",
              desc: "Official pages for each published Roncy title.",
              href: "/games",
            },
          ].map((p, i) => (
            <Reveal key={p.name} delayMs={i * 80}>
              <Link
                href={p.href}
                className="block h-full rounded-[28px] bg-white p-8 shadow-sm transition hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(0,0,0,0.12)]"
              >
                <span
                  className={`mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-extrabold tracking-wide uppercase ${p.tagClass}`}
                >
                  {p.tag}
                </span>
                <span className="mb-4 block text-4xl">{p.icon}</span>
                <div className="font-[family-name:var(--font-display)] text-xl font-black text-[var(--color-roncy-navy)]">
                  {p.name}
                </div>
                <p className="mt-2 text-[13px] leading-[1.7] text-[var(--color-roncy-muted)]">{p.desc}</p>
                <span className="mt-6 inline-flex font-[family-name:var(--font-display)] text-xs font-extrabold text-[var(--color-roncy-teal2)]">
                  Open →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Games list */}
      <section id="games" className="px-5 py-20 min-[960px]:px-[52px]">
        <Reveal>
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.15em] text-[var(--color-roncy-teal2)] uppercase">
            <span className="size-2 shrink-0 rounded-full bg-[var(--color-roncy-teal2)]" aria-hidden />
            Games
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.5vw,3rem)] font-black tracking-tight text-[var(--color-roncy-navy)]">
            Our games
          </h2>
          <p className="mt-3 max-w-xl text-base text-[var(--color-roncy-muted)]">
            Open each game page for links, updates, and support details.
          </p>
        </Reveal>
        <div className="mx-auto mt-14 flex max-w-4xl flex-col gap-4">
          {games.map((g, idx) => (
            <Reveal key={g.slug} delayMs={idx * 70}>
              <Link
                href={`/games/${g.slug}`}
                className="group grid grid-cols-[48px_1fr_auto] items-center gap-6 rounded-[18px] border-2 border-[var(--color-roncy-border)] bg-white p-6 transition hover:border-[var(--color-roncy-teal)] hover:shadow-[0_8px_32px_rgba(0,212,200,0.1)] min-[640px]:grid-cols-[72px_1fr_auto_auto] min-[640px]:gap-7 min-[640px]:px-8 min-[640px]:hover:translate-x-1.5"
              >
                <span className="font-[family-name:var(--font-display)] text-[13px] font-black tracking-wide text-[var(--color-roncy-border)]">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[var(--color-roncy-navy)]">
                    {g.title}
                  </div>
                  <div className="mt-1 text-xs font-medium text-[var(--color-roncy-muted)]">
                    {g.platforms.join(" · ")} · {site.domain}/games/{g.slug}
                  </div>
                </div>
                <div className="hidden flex-wrap gap-2 min-[640px]:flex">
                  {g.platforms.slice(0, 2).map((p) => (
                    <span
                      key={p}
                      className="rounded-full border-[1.5px] border-[var(--color-roncy-border)] bg-[var(--color-roncy-surface)] px-3.5 py-1 text-[10px] font-bold tracking-wide text-[var(--color-roncy-muted)] uppercase"
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <span className="justify-self-end text-xl text-[var(--color-roncy-border)] transition group-hover:translate-x-1 group-hover:text-[var(--color-roncy-teal)]">
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About coral */}
      <section className="bg-[var(--color-roncy-coral)] px-5 py-20 min-[960px]:px-[52px]">
        <Reveal className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.15em] text-white/70 uppercase">
            <span className="size-2 shrink-0 rounded-full bg-white/70" aria-hidden />
            About
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.5vw,3rem)] font-black tracking-tight text-white">
            {site.brand}
          </h2>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-6xl items-center gap-12 min-[960px]:grid-cols-2 min-[960px]:gap-[72px]">
          <Reveal>
            <p className="text-base leading-[1.85] text-white/85">
              {site.brand} is a game studio based in the {site.country}, focused on{" "}
              <strong className="text-white">{site.tagline}</strong>.
            </p>
            <p className="mt-4 text-base leading-[1.85] text-white/85">
              We keep this site simple: game pages, support channels, and key company info.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex font-[family-name:var(--font-display)] text-sm font-extrabold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
            >
              About Roncy →
            </Link>
          </Reveal>
          <Reveal delayMs={100}>
            <div className="rounded-[28px] border-2 border-white/25 bg-white/15 p-10 backdrop-blur-sm">
              <div className="font-[family-name:var(--font-display)] text-xs font-extrabold tracking-[0.15em] text-white/60 uppercase">
                Highlights
              </div>
              <ul className="mt-8 flex flex-col gap-5 text-sm text-white/80">
                <li className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/20 text-lg">
                    ✓
                  </span>
                  <span>
                    <span className="font-bold text-white">Company profile</span>
                    <br />
                    Basic company details and official channels.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/20 text-lg">
                    ✓
                  </span>
                  <span>
                    <span className="font-bold text-white">Game directory</span>
                    <br />
                    Easy access to all live titles.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/20 text-lg">
                    ✓
                  </span>
                  <span>
                    <span className="font-bold text-white">Support & legal</span>
                    <br />
                    Clear links for help, privacy, and terms.
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact navy */}
      <section className="relative overflow-hidden bg-[var(--color-roncy-navy)] px-5 py-20 text-center min-[960px]:px-[52px] min-[960px]:py-24">
        <div
          className="pointer-events-none absolute rounded-full bg-[var(--color-roncy-teal)] opacity-[0.07] blur-[60px]"
          style={{ width: 400, height: 400, top: -100, left: -100 }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute rounded-full bg-[var(--color-roncy-yellow)] opacity-[0.07] blur-[60px]"
          style={{ width: 300, height: 300, bottom: -80, right: -80 }}
          aria-hidden
        />
        <Reveal className="relative z-[1]">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.15em] text-white/40 uppercase">
            <span className="size-2 shrink-0 rounded-full bg-white/40" aria-hidden />
            Contact
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.5vw,3rem)] font-black tracking-tight text-white">
            Contact Roncy
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/45">
            For support, business, or privacy requests, reach out here.
          </p>
        </Reveal>
        <Reveal className="relative z-[1]" delayMs={80}>
          <div className="mx-auto mt-14 max-w-[600px] rounded-[28px] border border-white/10 bg-white/5 px-8 py-14 backdrop-blur-sm min-[640px]:px-12">
            <a
              href={`mailto:${site.emails.hello}`}
              className="font-[family-name:var(--font-display)] block text-2xl font-black text-[var(--color-roncy-yellow)] transition hover:opacity-80 min-[480px]:text-[26px]"
            >
              {site.emails.hello}
            </a>
            <p className="mt-4 text-sm font-medium text-white/40">We usually reply within 2–3 business days.</p>
            <div className="my-7 h-px bg-white/10" />
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/support"
                className="font-[family-name:var(--font-display)] rounded-full border border-white/15 px-6 py-2.5 text-xs font-extrabold text-white/60 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                Support hub
              </Link>
              <Link
                href="/press"
                className="font-[family-name:var(--font-display)] rounded-full border border-white/15 px-6 py-2.5 text-xs font-extrabold text-white/60 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                Press
              </Link>
              <Link
                href="/privacy-policy"
                className="font-[family-name:var(--font-display)] rounded-full border border-white/15 px-6 py-2.5 text-xs font-extrabold text-white/60 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                Privacy
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
