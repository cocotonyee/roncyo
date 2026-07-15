import { AppLink } from "@/components/AppLink";
import { docPages, docsIndex } from "@/lib/docs";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: docsIndex.title,
  description: docsIndex.description,
  path: "/docs",
  keywords: ["Roncyo docs", "developer documentation", "open platform docs"],
});

export default function DocsIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-12">
      <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase">
        Docs
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-foreground)] sm:text-4xl">
        {docsIndex.title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted)] sm:text-base">
        {docsIndex.description}
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {docPages.map((doc) => (
          <li key={doc.slug}>
            <AppLink
              href={`/docs/${doc.slug}`}
              className="block h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6 transition hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
            >
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">{doc.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {doc.description}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent-hover)]">
                Read →
              </span>
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
