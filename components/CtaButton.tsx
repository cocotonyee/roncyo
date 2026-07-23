import { AppLink } from "@/components/AppLink";
import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variants = {
  primary: `${base} bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent-hover)] hover:shadow-[0_0_28px_rgba(3,216,203,0.28)] focus-visible:outline-[var(--color-accent)]`,
  secondary: `${base} border border-[var(--color-border)] bg-[var(--color-panel)] text-[var(--color-foreground)] hover:border-[var(--color-foreground)] focus-visible:outline-[var(--color-foreground)]`,
  ghost: `${base} text-[var(--color-muted)] hover:text-[var(--color-foreground)]`,
} as const;

type Props = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
};

export function CtaButton({ href, children, variant = "primary", className = "" }: Props) {
  return (
    <AppLink href={href} className={`${variants[variant]} ${className}`.trim()}>
      {children}
    </AppLink>
  );
}
