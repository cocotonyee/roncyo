import type { BlogPost } from "@/lib/blog";

export function BlogPostHeader({ post }: { post: BlogPost }) {
  const meta = [
    post.date,
    post.category,
    post.readTime,
    post.author?.name ? `By ${post.author.name}` : null,
  ].filter(Boolean);

  return (
    <header>
      <p className="text-sm text-[var(--color-muted)]">{meta.join(" · ")}</p>
      <h1 className="mt-4 max-w-[22ch] font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tighter text-[var(--color-fg)] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
        {post.title}
      </h1>
      {post.description ? (
        <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
          {post.description}
        </p>
      ) : null}
    </header>
  );
}
