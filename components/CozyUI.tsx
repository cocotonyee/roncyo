import Link from "next/link";
import type { ReactNode } from "react";

export function PawIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <ellipse cx="6" cy="8" rx="2.2" ry="2.8" />
      <ellipse cx="12" cy="6" rx="2.2" ry="2.8" />
      <ellipse cx="18" cy="8" rx="2.2" ry="2.8" />
      <ellipse cx="9" cy="13" rx="2" ry="2.5" />
      <ellipse cx="15" cy="13" rx="2" ry="2.5" />
      <path d="M8 16c1.5 3 6.5 3 8 0 1.2 2.5 4.5 2.8 6.5 0.5-3.5-1.5-7-6.5-7s-7 3.5-6.5 7c2-0.3 5.3-0.5 6.5 0z" />
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
  variant?: "primary" | "outline" | "sage";
  className?: string;
  external?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-[family-name:var(--font-display)] text-sm font-extrabold transition hover:-translate-y-0.5";
  const variants = {
    primary:
      "bg-[var(--color-cozy-terracotta)] px-7 py-3.5 text-white shadow-[0_8px_24px_rgba(229,142,115,0.35)] hover:shadow-[0_12px_32px_rgba(229,142,115,0.45)]",
    outline:
      "border-2 border-[var(--color-cozy-brown)]/20 bg-white px-6 py-3 text-[var(--color-cozy-brown)] hover:border-[var(--color-cozy-brown)]/40 hover:bg-[var(--color-cozy-cream)]",
    sage:
      "bg-[var(--color-cozy-sage)] px-6 py-3 text-[var(--color-cozy-brown)] hover:bg-[#98b88f]",
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

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.12em] text-[var(--color-cozy-brown)]/70 uppercase">
      <PawIcon className="size-3.5 text-[var(--color-cozy-terracotta)]" />
      {children}
    </div>
  );
}
