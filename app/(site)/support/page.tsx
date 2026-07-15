import { AppLink } from "@/components/AppLink";
import { games } from "@/lib/games";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Support Center",
  description: `Get help with ${site.brand} games and apps. Per-title support pages and email contact.`,
  path: "/support",
  keywords: ["game support", "help center", "Roncyo support"],
});

export default function SupportHubPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-12">
      <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase">
        Support
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-foreground)] sm:text-4xl">
        Help center
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted)]">
        Pick a title for FAQs and troubleshooting, or email us at{" "}
        <a
          href={`mailto:${site.emails.support}`}
          className="font-medium text-[var(--color-foreground)] underline"
        >
          {site.emails.support}
        </a>
        .
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <li key={game.slug}>
            <AppLink
              href={`/games/${game.slug}/support`}
              className="block rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 transition hover:border-[var(--color-accent)]"
            >
              <span className="text-2xl" aria-hidden>
                {game.cardEmoji}
              </span>
              <h2 className="mt-3 text-base font-semibold text-[var(--color-foreground)]">
                {game.title}
              </h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">Support & privacy →</p>
            </AppLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
