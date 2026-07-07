import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variants = {
  primary: `${base} bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent-hover)] hover:shadow-[0_0_24px_rgba(3,216,203,0.35)] focus-visible:outline-[var(--color-accent)]`,
  secondary: `${base} border border-[var(--color-border)] bg-[var(--color-panel)] text-[var(--color-foreground)] hover:border-[var(--color-foreground)] focus-visible:outline-[var(--color-foreground)]`,
  "hero-secondary": `${base} border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/10 focus-visible:outline-white`,
  ghost: `${base} text-[var(--color-muted)] hover:text-[var(--color-foreground)]`,
} as const;

type Props = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
};

export function AutomationButton({
  href,
  children,
  variant = "primary",
  className = "",
}: Props) {
  return (
    <Link href={href} className={`${variants[variant]} ${className}`.trim()}>
      {children}
    </Link>
  );
}
