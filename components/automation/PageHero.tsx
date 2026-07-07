import type { ReactNode } from "react";

type HeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  variant?: "light" | "dark";
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  variant = "dark",
}: HeroProps) {
  if (variant === "light") {
    return (
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)] px-5 pt-16 pb-20 sm:px-8 lg:px-12 lg:pt-24 lg:pb-28">
        <div className="mx-auto max-w-4xl">
          {eyebrow ? (
            <p className="text-xs font-semibold tracking-[0.16em] text-[var(--color-accent)] uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
              {description}
            </p>
          ) : null}
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className="hero-dark relative overflow-hidden border-b border-white/10 px-5 pt-16 pb-20 sm:px-8 lg:px-12 lg:pt-24 lg:pb-28">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-glow pointer-events-none absolute -top-24 left-1/2 size-[480px] -translate-x-1/2 rounded-full" aria-hidden />
      <div className="relative mx-auto max-w-4xl">
        {eyebrow ? (
          <p className="text-xs font-semibold tracking-[0.16em] text-[var(--color-accent)] uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{description}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export { HomeHero, CtaBand } from "@/components/automation/HomeSections";
