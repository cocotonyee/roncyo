import { AppLink } from "@/components/AppLink";
import { withReferral } from "@/lib/outbound";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

const styles: Record<Variant, string> = {
  primary:
    "rounded-none bg-[var(--color-fg)] text-[var(--color-bg)] hover:bg-[var(--color-accent)] active:scale-[0.98]",
  inverse:
    "rounded-none bg-white text-[#0a0a0a] hover:bg-[var(--color-accent)] hover:text-white active:scale-[0.98]",
  secondary:
    "rounded-none border border-[var(--color-border)] bg-transparent text-[var(--color-fg)] hover:border-[var(--color-fg)] active:scale-[0.98]",
  ghost:
    "rounded-none text-[var(--color-fg)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline",
};

export function CtaButton({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
}) {
  const className = `inline-flex items-center justify-center px-5 py-3 text-sm font-medium tracking-tight transition ${styles[variant]}`;
  const resolvedHref = external ? withReferral(href) : href;

  if (external) {
    return (
      <a
        href={resolvedHref}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <AppLink href={resolvedHref} className={className}>
      {children}
    </AppLink>
  );
}
