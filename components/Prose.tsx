import type { ReactNode } from "react";

const base =
  "space-y-4 text-[var(--color-roncy-muted)] leading-relaxed [&_h1]:font-[family-name:var(--font-display)] [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:tracking-tight [&_h1]:text-[var(--color-roncy-text)] [&_h2]:mt-10 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-[var(--color-roncy-text)] [&_h2:first-child]:mt-0 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[var(--color-roncy-text)] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_a]:font-semibold [&_a]:text-[var(--color-roncy-teal2)] [&_a]:underline-offset-2 hover:[&_a]:text-[var(--color-roncy-teal)] hover:[&_a]:underline [&_strong]:text-[var(--color-roncy-text)] [&_hr]:my-10 [&_hr]:border-[var(--color-roncy-border)]";

const contain = "mx-auto max-w-3xl";

export function Prose({
  children,
  className = "",
  contained = true,
}: {
  children: ReactNode;
  className?: string;
  /** When false, use inside ContentPanel (full width of parent) */
  contained?: boolean;
}) {
  return <div className={`${base} ${contained ? contain : ""} ${className}`.trim()}>{children}</div>;
}
