import { AppLink } from "@/components/AppLink";
import type { BlogPost } from "@/lib/blog";

export function BlogRelated({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="mt-16 border-t border-[var(--color-border)] pt-12">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-3xl">
        Related Journal
      </h2>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <AppLink
              href={`/blog/${post.slug}`}
              className="group block h-full border border-[var(--color-border)] p-5 transition hover:border-[var(--color-fg)]"
            >
              <p className="text-xs text-[var(--color-muted)]">
                {post.date}
                {post.readTime ? ` · ${post.readTime}` : ""}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--color-fg)] transition group-hover:text-[var(--color-accent)]">
                {post.title}
              </h3>
            </AppLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
