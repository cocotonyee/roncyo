import { AppLink } from "@/components/AppLink";
import { GooglePlayBadge } from "@/components/GooglePlayBadge";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { storeApps } from "@/lib/store";

export const metadata = buildPageMetadata({
  title: "Support",
  description: `Support for ${site.brand} products and apps.`,
  path: "/support",
});

export default function SupportPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:px-12">
      <p className="text-xs font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase">
        Support
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-[var(--color-fg)]">
        How can we help?
      </h1>
      <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)]">
        Email{" "}
        <a
          href={`mailto:${site.emails.support}`}
          className="text-[var(--color-fg)] underline-offset-4 hover:underline"
        >
          {site.emails.support}
        </a>
        . Include your device model and OS version for app issues.
      </p>

      <div className="mt-12 border-t border-[var(--color-border)] pt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-fg)]">
          App support pages
        </h2>
        <ul className="mt-6 space-y-8">
          {storeApps.map((app) => (
            <li key={app.slug} className="space-y-3">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm">
                <span className="text-[var(--color-fg)]">{app.title}</span>
                <AppLink
                  href={`/apps/${app.slug}/support`}
                  className="text-[var(--color-muted)] underline-offset-4 hover:underline"
                >
                  Support
                </AppLink>
                <AppLink
                  href={`/apps/${app.slug}/privacy`}
                  className="text-[var(--color-muted)] underline-offset-4 hover:underline"
                >
                  Privacy
                </AppLink>
              </div>
              <GooglePlayBadge href={app.playStoreUrl} title={app.title} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
