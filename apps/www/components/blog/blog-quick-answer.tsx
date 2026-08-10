export function BlogQuickAnswer({ text }: { text: string }) {
  return (
    <aside className="border-l-2 border-[var(--color-accent)] bg-[var(--color-surface)] px-5 py-4">
      <p className="text-sm font-medium text-[var(--color-fg)]">Quick answer</p>
      <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">{text}</p>
    </aside>
  );
}
