import type { CSSProperties } from "react";
import Link from "next/link";
import { CozyButton, PawIcon, SectionEyebrow } from "@/components/CozyUI";
import { Reveal } from "@/components/Reveal";
import { featuredGameCards, games } from "@/lib/games";
import { site } from "@/lib/site";

const PHILOSOPHY = [
  { icon: "🍃", title: "Cozy & Relaxing", desc: "Gentle pacing and warm worlds you can unwind in." },
  { icon: "💛", title: "Charming & Cute", desc: "Adorable characters and soft art that spark joy." },
  { icon: "⭐", title: "Quality First", desc: "Polished feel, fair design, and thoughtful details." },
  { icon: "🐾", title: "Player Focused", desc: "Built around how you actually want to play." },
] as const;

const STATS = [
  { icon: "🎮", value: `${games.length}`, label: "Games Released" },
  { icon: "😊", value: "1M+", label: "Happy Players" },
  { icon: "🐱", value: "50K+", label: "Community Members" },
  { icon: "⭐", value: "20+", label: "Team Members" },
] as const;

export default function HomePage() {
  return (
    <div className="bg-[var(--color-cozy-cream)]">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-8 pb-14 min-[960px]:px-[52px] min-[960px]:pt-12 min-[960px]:pb-20">
        <div
          className="pointer-events-none absolute -top-20 right-0 size-[420px] rounded-full bg-[var(--color-cozy-sage)] opacity-30 blur-[80px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 size-[300px] rounded-full bg-[var(--color-cozy-peach)] opacity-40 blur-[70px]"
          aria-hidden
        />

        <div className="relative z-[1] mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 min-[960px]:grid-cols-[1fr_1.1fr_280px] min-[960px]:gap-8">
          <div className="min-[960px]:pt-6">
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.1] font-black tracking-tight text-[var(--color-cozy-brown)]">
              We Create Cozy Games that Warm Your Heart
            </h1>
            <p className="mt-5 max-w-md text-base leading-[1.75] text-[var(--color-cozy-brown-muted)]">
              {site.brand} is a game studio crafting charming, relaxing experiences for mobile and
              browser — perfect for a cozy break anytime.
            </p>
            <div className="mt-8">
              <CozyButton href="/games">
                <PawIcon className="size-4" />
                Explore Our Games
              </CozyButton>
            </div>
          </div>

          <div
            className="animate-roncy-float relative mx-auto flex aspect-[4/3] w-full max-w-[520px] items-center justify-center rounded-[32px] border-[3px] border-white/80 bg-gradient-to-br from-[#FFE8DC] via-[#FFF5E8] to-[#D4E8D0] p-8 shadow-[0_20px_60px_rgba(93,64,55,0.12)] min-[960px]:max-w-none"
            style={{ "--roncy-dur": "5s" } as CSSProperties}
          >
            <div className="absolute top-6 right-8 rounded-[20px] border-4 border-[var(--color-cozy-brown)]/20 bg-white/90 p-3 shadow-lg">
              <div className="h-[120px] w-[68px] rounded-xl bg-gradient-to-b from-[#A8C69F] to-[#7A9A72] p-2">
                <div className="grid grid-cols-2 gap-1">
                  {["🟨", "🟩", "🟦", "🟧", "🟪", "⬜"].map((c, i) => (
                    <span key={i} className="flex aspect-square items-center justify-center rounded text-[10px]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-[72px] leading-none">🐱👑🧙</div>
              <p className="mt-3 font-[family-name:var(--font-display)] text-sm font-extrabold text-[var(--color-cozy-brown)]/80">
                Playful cats · Cozy puzzles
              </p>
            </div>
            <span className="absolute bottom-6 left-8 text-4xl" aria-hidden>
              🧩
            </span>
            <span className="absolute top-10 left-12 text-3xl" aria-hidden>
              ✨
            </span>
          </div>

          <aside className="rounded-[28px] border-2 border-[var(--color-cozy-brown)]/8 bg-[var(--color-cozy-card)] p-6 shadow-[0_12px_40px_rgba(93,64,55,0.06)] min-[960px]:p-5">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-black text-[var(--color-cozy-brown)]">
              Our Philosophy
            </h2>
            <ul className="mt-5 flex flex-col gap-4">
              {PHILOSOPHY.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-base">
                    {p.icon}
                  </span>
                  <div>
                    <div className="text-sm font-extrabold text-[var(--color-cozy-brown)]">{p.title}</div>
                    <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-cozy-brown-muted)]">
                      {p.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Featured games */}
      <section className="px-5 py-14 min-[960px]:px-[52px] min-[960px]:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionEyebrow>Featured Games</SectionEyebrow>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-[var(--color-cozy-brown)]">
                Pick your next cozy adventure
              </h2>
            </div>
            <div className="hidden gap-2 min-[640px]:flex" aria-hidden>
              <span className="flex size-10 items-center justify-center rounded-full border-2 border-[var(--color-cozy-brown)]/15 bg-white text-[var(--color-cozy-brown)]">
                ←
              </span>
              <span className="flex size-10 items-center justify-center rounded-full border-2 border-[var(--color-cozy-brown)]/15 bg-white text-[var(--color-cozy-brown)]">
                →
              </span>
            </div>
          </div>

          <div className="mt-10 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {featuredGameCards.map((card, i) => {
              const inner = (
                <>
                  <div
                    className="flex aspect-[4/5] flex-col items-center justify-center rounded-[24px] p-4"
                    style={{ background: card.color }}
                  >
                    <span className="text-[56px]">{card.emoji}</span>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-[var(--color-cozy-brown)]">
                        {card.title}
                      </h3>
                      <span className="mt-1 inline-block rounded-full bg-[var(--color-cozy-cream)] px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-[var(--color-cozy-brown-muted)] uppercase">
                        {card.genre}
                      </span>
                    </div>
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        card.href
                          ? "bg-[var(--color-cozy-terracotta)] text-white"
                          : "border-2 border-[var(--color-cozy-brown)]/15 bg-white text-[var(--color-cozy-brown)]/40"
                      }`}
                    >
                      →
                    </span>
                  </div>
                </>
              );

              return (
                <Reveal key={card.slug} delayMs={i * 50} className="w-[200px] shrink-0 min-[640px]:w-[220px]">
                  {card.href ? (
                    <Link
                      href={card.href}
                      className="block rounded-[28px] border-2 border-[var(--color-cozy-brown)]/8 bg-white p-4 transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(93,64,55,0.1)]"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div className="rounded-[28px] border-2 border-dashed border-[var(--color-cozy-brown)]/15 bg-white/60 p-4 opacity-80">
                      {inner}
                      <p className="mt-2 text-center text-[10px] font-bold text-[var(--color-cozy-brown-muted)] uppercase">
                        Coming soon
                      </p>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* About + stats */}
      <section className="px-5 pb-20 min-[960px]:px-[52px]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 min-[960px]:grid-cols-2 min-[960px]:gap-16">
          <Reveal>
            <SectionEyebrow>About {site.brand}</SectionEyebrow>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.25rem)] font-black text-[var(--color-cozy-brown)]">
              Small studio, big warmth
            </h2>
            <p className="mt-4 text-base leading-[1.8] text-[var(--color-cozy-brown-muted)]">
              We are a {site.country}-based team making games that feel like a soft blanket — cute
              characters, gentle mechanics, and worlds you will want to revisit.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex font-[family-name:var(--font-display)] text-sm font-extrabold text-[var(--color-cozy-terracotta)] underline decoration-[var(--color-cozy-terracotta)]/30 underline-offset-4 hover:decoration-[var(--color-cozy-terracotta)]"
            >
              Learn More About Us →
            </Link>
            <div className="mt-10 flex justify-center rounded-[28px] bg-[var(--color-cozy-peach)]/50 p-8 text-[80px] leading-none min-[960px]:justify-start">
              🐱🐱🐱
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delayMs={i * 60}>
                  <div className="rounded-[24px] border-2 border-[var(--color-cozy-brown)]/8 bg-white p-5 text-center shadow-[0_8px_24px_rgba(93,64,55,0.05)]">
                    <span className="text-2xl">{s.icon}</span>
                    <div className="mt-2 font-[family-name:var(--font-display)] text-2xl font-black text-[var(--color-cozy-brown)]">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-[var(--color-cozy-brown-muted)]">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delayMs={120}>
              <div className="rounded-[28px] border-2 border-[var(--color-cozy-brown)]/8 bg-[var(--color-cozy-card)] p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-black text-[var(--color-cozy-brown)]">
                  Stay Updated
                </h3>
                <p className="mt-2 text-sm text-[var(--color-cozy-brown-muted)]">
                  Get cozy news and launch updates in your inbox.
                </p>
                <form
                  className="mt-4 flex flex-col gap-3 min-[480px]:flex-row"
                  action={`mailto:${site.emails.hello}?subject=Newsletter`}
                  method="get"
                >
                  <input
                    type="email"
                    name="body"
                    placeholder="Enter your email"
                    className="min-w-0 flex-1 rounded-full border-2 border-[var(--color-cozy-brown)]/12 bg-white px-5 py-3 text-sm text-[var(--color-cozy-brown)] outline-none placeholder:text-[var(--color-cozy-brown-muted)]/60 focus:border-[var(--color-cozy-terracotta)]"
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--color-cozy-terracotta)] px-6 py-3 font-[family-name:var(--font-display)] text-sm font-extrabold text-white shadow-[0_8px_24px_rgba(229,142,115,0.3)] transition hover:-translate-y-0.5"
                  >
                    <span aria-hidden>😴</span>
                    Subscribe
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
