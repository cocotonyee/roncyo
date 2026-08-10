import { experiments } from "@/lib/experiments";
import { withReferral } from "@/lib/outbound";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Labs",
  description: "Experiments and shipping notes from the Roncyo product studio.",
  path: "/labs",
});

export default function LabsPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:px-12">
      <p className="text-xs font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase">
        Labs
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-[var(--color-fg)] sm:text-5xl">
        Experiments in public.
      </h1>
      <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)]">
        Most ideas start here — under the mother brand — before any independent domain. We watch
        impressions, clicks, signups, and payments.
      </p>

      <ol className="mt-14 space-y-0 border-y border-[var(--color-border)]">
        {experiments.map((item) => (
          <li
            key={`${item.year}-${item.name}`}
            className="grid gap-2 border-b border-[var(--color-border)] py-8 last:border-b-0 sm:grid-cols-[88px_1fr_auto] sm:items-baseline"
          >
            <span className="font-[family-name:var(--font-display)] text-sm text-[var(--color-muted)]">
              {item.year}
            </span>
            <div>
              {item.href ? (
                <a
                  href={withReferral(item.href)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-fg)] hover:text-[var(--color-accent)]"
                >
                  ● {item.name}
                </a>
              ) : (
                <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-fg)]">
                  ● {item.name}
                </p>
              )}
              <p className="mt-2 text-sm text-[var(--color-muted)]">{item.blurb}</p>
            </div>
            <span className="text-xs tracking-wide text-[var(--color-accent)] uppercase">
              {item.status}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
