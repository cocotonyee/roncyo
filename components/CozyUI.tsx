import Link from "next/link";
import type { ReactNode } from "react";

export function PawIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="6" cy="7" r="2.5" />
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="18" cy="7" r="2.5" />
      <circle cx="9" cy="12" r="2" />
      <circle cx="15" cy="12" r="2" />
      <ellipse cx="12" cy="18" rx="5" ry="4" />
    </svg>
  );
}

export function CozyButton({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "light" | "sage";
  className?: string;
  external?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-[family-name:var(--font-display)] text-sm font-extrabold transition hover:-translate-y-0.5";
  const variants = {
    primary:
      "bg-[var(--color-cozy-terracotta)] px-7 py-3.5 text-white shadow-[0_8px_24px_rgba(0,210,106,0.35)] hover:shadow-[0_12px_32px_rgba(0,210,106,0.45)]",
    outline:
      "border-2 border-[var(--color-cozy-brown)]/15 bg-white px-6 py-3 text-[var(--color-cozy-brown)] hover:border-[var(--color-cozy-brown)]/30 hover:bg-[var(--color-cozy-surface)]",
    light:
      "border-2 border-white/40 bg-white/10 px-6 py-3 text-white hover:bg-white/20",
    sage:
      "bg-[var(--color-cozy-sage)] px-6 py-3 text-white hover:bg-[#003d6b]",
  };
  const cls = `${base} ${variants[variant]} ${className}`;
  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function SectionEyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className={`mb-3 inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.12em] uppercase ${
        light ? "text-white/70" : "text-[var(--color-cozy-brown-muted)]"
      }`}
    >
      <PawIcon className="size-3.5 text-[var(--color-cozy-terracotta)]" />
      {children}
    </div>
  );
}
