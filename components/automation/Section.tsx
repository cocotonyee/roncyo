import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-5 py-20 sm:px-8 lg:px-12 lg:py-28 ${className}`.trim()}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl";

  return (
    <div className={alignClass}>
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-[0.16em] text-[var(--color-accent)] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">{description}</p>
      ) : null}
    </div>
  );
}
