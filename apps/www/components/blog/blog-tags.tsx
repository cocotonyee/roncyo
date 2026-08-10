import { AppLink } from "@/components/AppLink";

export function BlogTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="mt-10 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <AppLink
            href={`/blog?q=${encodeURIComponent(tag)}`}
            className="border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-muted)] transition hover:border-[var(--color-fg)] hover:text-[var(--color-fg)]"
          >
            {tag}
          </AppLink>
        </li>
      ))}
    </ul>
  );
}
