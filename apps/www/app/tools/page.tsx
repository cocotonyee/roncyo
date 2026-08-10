import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Tools",
  description: "Small utilities incubated under the Roncyo studio.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:px-12">
      <p className="text-xs font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase">
        Tools
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-[var(--color-fg)] sm:text-5xl">
        Utilities in incubation.
      </h1>
      <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)]">
        New tools will live under <code className="text-[var(--color-fg)]">/tools/*</code> while we
        test demand. PictureKit and other utilities will land here as sub-apps in this monorepo.
      </p>
      <p className="mt-8 text-sm text-[var(--color-accent)]">Nothing public yet — check back soon.</p>
    </section>
  );
}
