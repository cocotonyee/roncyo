import Link from "next/link";
import type { ReactNode } from "react";

const eyebrowTones = {
  teal: "text-[#0077cc] [&_.roncy-eyebrow-dot]:bg-[#0077cc]",
  navy: "text-[var(--color-roncy-navy)] [&_.roncy-eyebrow-dot]:bg-[var(--color-roncy-navy)]",
  yellow: "text-[#7A4F00] [&_.roncy-eyebrow-dot]:bg-[#7A4F00]",
  coral: "text-[#9f1239] [&_.roncy-eyebrow-dot]:bg-[var(--color-roncy-coral)]",
  muted: "text-[var(--color-roncy-muted)] [&_.roncy-eyebrow-dot]:bg-[var(--color-roncy-muted)]",
} as const;

export type EyebrowTone = keyof typeof eyebrowTones;

/** Background blob pairs — each route can pick a distinct mood */
export const innerPageGlows = {
  default: { top: "#009cff", bottom: "#00d26a", topOp: 0.18, botOp: 0.12 },
  lavender: { top: "#6366f1", bottom: "#009cff", topOp: 0.14, botOp: 0.13 },
  coralSky: { top: "#009cff", bottom: "#00d26a", topOp: 0.15, botOp: 0.12 },
  forest: { top: "#00d26a", bottom: "#009cff", topOp: 0.13, botOp: 0.14 },
  citrus: { top: "#ffdc00", bottom: "#009cff", topOp: 0.15, botOp: 0.11 },
  indigo: { top: "#6366f1", bottom: "#93c5fd", topOp: 0.12, botOp: 0.1 },
  storm: { top: "#64748b", bottom: "#009cff", topOp: 0.11, botOp: 0.1 },
  amber: { top: "#ffdc00", bottom: "#009cff", topOp: 0.14, botOp: 0.12 },
  rose: { top: "#009cff", bottom: "#6366f1", topOp: 0.14, botOp: 0.11 },
  mist: { top: "#94a3b8", bottom: "#009cff", topOp: 0.11, botOp: 0.1 },
  grape: { top: "#6366f1", bottom: "#00d26a", topOp: 0.12, botOp: 0.11 },
  pixel: { top: "#6366f1", bottom: "#ffdc00", topOp: 0.13, botOp: 0.12 },
  ocean: { top: "#009cff", bottom: "#00d26a", topOp: 0.15, botOp: 0.13 },
  vault: { top: "#002b50", bottom: "#009cff", topOp: 0.12, botOp: 0.1 },
} as const;

export type InnerPageGlow = keyof typeof innerPageGlows;

export function InnerPage({
  children,
  wide = false,
  glow = "default",
  className = "",
}: {
  children: ReactNode;
  /** Wider column for long legal copy */
  wide?: boolean;
  /** Page-specific ambient blobs (top-right + bottom-left) */
  glow?: InnerPageGlow;
  className?: string;
}) {
  const g = innerPageGlows[glow];
  return (
    <div
      className={`relative min-h-[50vh] overflow-hidden bg-[var(--color-cozy-surface)] pb-16 pt-10 md:pb-24 md:pt-14 ${className}`}
    >
      <div
        className="pointer-events-none absolute -top-28 right-[-80px] size-[400px] rounded-full blur-[72px]"
        style={{ backgroundColor: g.top, opacity: g.topOp }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-60px] left-[-60px] size-[320px] rounded-full blur-[72px]"
        style={{ backgroundColor: g.bottom, opacity: g.botOp }}
        aria-hidden
      />
      <div
        className={`relative z-[1] mx-auto px-5 lg:px-[52px] ${wide ? "max-w-5xl" : "max-w-3xl"}`}
      >
        {children}
      </div>
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  lead,
  tone = "teal",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: EyebrowTone;
}) {
  return (
    <header className="mb-10 md:mb-12">
      <div
        className={`mb-3 inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.15em] uppercase ${eyebrowTones[tone]}`}
      >
        <span className="roncy-eyebrow-dot size-2 shrink-0 rounded-full" aria-hidden />
        {eyebrow}
      </div>
      <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4.2vw,2.85rem)] font-black tracking-tight text-[var(--color-roncy-navy)]">
        {title}
      </h1>
      {lead ? (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-cozy-brown)]/85">
          {lead}
        </p>
      ) : null}
    </header>
  );
}

export function Breadcrumb({
  items,
  light = false,
}: {
  items: { href?: string; label: string }[];
  light?: boolean;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`mb-6 text-sm font-semibold ${light ? "text-white/70" : "text-[var(--color-roncy-muted)]"}`}
    >
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`}>
          {i > 0 && (
            <span className={`mx-2 ${light ? "text-white/35" : "text-[var(--color-roncy-border)]"}`}>
              /
            </span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className={
                light
                  ? "text-white hover:text-[var(--color-roncy-yellow)] hover:underline"
                  : "text-[var(--color-roncy-teal2)] hover:text-[var(--color-roncy-teal)] hover:underline"
              }
            >
              {item.label}
            </Link>
          ) : (
            <span className={light ? "text-white" : "text-[var(--color-roncy-text)]"}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function ContentPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[28px] border-2 border-[var(--color-roncy-border)] bg-white p-8 shadow-[0_20px_56px_rgba(15,23,42,0.07)] md:p-10 ${className}`}
    >
      {children}
    </div>
  );
}

const heroBandTones = {
  teal: "from-[#009cff] to-[#0077cc] shadow-[0_20px_48px_rgba(0,156,255,0.28)]",
  ocean: "from-[#009cff] to-[#002b50] shadow-[0_20px_48px_rgba(0,43,80,0.28)]",
  violet: "from-[#6366f1] to-[#009cff] shadow-[0_20px_48px_rgba(99,102,241,0.28)]",
  coral: "from-[#00d26a] to-[#009cff] shadow-[0_20px_48px_rgba(0,210,106,0.22)]",
} as const;

export type HeroBandTone = keyof typeof heroBandTones;

export function HeroBand({
  children,
  className = "",
  tone = "teal",
}: {
  children: ReactNode;
  className?: string;
  tone?: HeroBandTone;
}) {
  return (
    <div
      className={`mb-10 rounded-[28px] bg-gradient-to-br px-6 py-10 md:px-10 md:py-12 ${heroBandTones[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
