import { LEGAL_LAST_UPDATED } from "@/lib/legal";

export function LegalUpdatedBadge() {
  return (
    <p className="mb-8 flex flex-wrap items-center gap-2 text-sm">
      <span className="rounded-full border border-[var(--color-roncy-border)] bg-[var(--color-roncy-surface)] px-3 py-1 font-semibold text-[var(--color-roncy-muted)]">
        Last updated
      </span>
      <span className="font-[family-name:var(--font-display)] font-extrabold text-[var(--color-roncy-navy)]">
        {LEGAL_LAST_UPDATED}
      </span>
    </p>
  );
}
