import type { BlogFaqItem } from "@/lib/blog";

export function BlogFaq({ items }: { items: BlogFaqItem[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-12 border-t border-[var(--color-border)] pt-10">
      <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-fg)]">FAQ</h2>
      <dl className="mt-6 space-y-6">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="text-sm font-medium text-[var(--color-fg)]">{item.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
