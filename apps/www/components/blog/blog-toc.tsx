import type { BlogHeading } from "@/lib/blog";

export function BlogToc({ headings }: { headings: BlogHeading[] }) {
  if (headings.length === 0) return null;
  return (
    <nav aria-label="Table of contents" className="mb-10 lg:mb-0">
      <p className="text-sm font-medium text-[var(--color-fg)]">Contents</p>
      <ul className="mt-4 space-y-2.5 border-l border-[var(--color-border)]">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block border-l-2 border-transparent py-0.5 text-sm leading-snug text-[var(--color-muted)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-fg)] ${
                h.depth === 3 ? "pl-5" : "pl-3"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
