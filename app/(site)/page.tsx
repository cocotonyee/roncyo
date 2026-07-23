import { AppLink } from "@/components/AppLink";
import { CtaButton } from "@/components/CtaButton";
import { offerings } from "@/lib/offerings";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Roncyo — Websites, Games, AI Automation & SaaS",
  description: site.tagline,
  path: "/",
  keywords: [
    "Roncyo",
    "custom website development",
    "custom game development",
    "AI automation",
    "Ronfax",
    "SaaS studio",
  ],
});

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div
          className="pointer-events-none absolute inset-0 animate-[fadeIn_1.2s_ease-out]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 10% -20%, rgba(3,216,203,0.22), transparent 55%), radial-gradient(ellipse 50% 45% at 95% 10%, rgba(3,216,203,0.1), transparent 50%), linear-gradient(180deg, transparent 60%, var(--color-surface))",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <p className="text-sm font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase animate-[fadeUp_0.7s_ease-out]">
            {site.brand}
          </p>
          <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-6xl lg:text-7xl animate-[fadeUp_0.85s_ease-out]">
            Build what you need.
            <span className="block text-[var(--color-muted)]">Ship what works.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg animate-[fadeUp_1s_ease-out]">
            {site.tagline} From branded sites and custom games to AI workflows, Ronfax, and SaaS —
            we design and deliver for teams ready to order.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 animate-[fadeUp_1.15s_ease-out]">
            <CtaButton href="/contact">Start a project</CtaButton>
            <CtaButton href="/services" variant="secondary">
              View services
            </CtaButton>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-[var(--color-accent)] uppercase">
            What we do
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
            Five lines. One studio.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
            Tell us what you need — we scope, build, and support. Ideal for custom game commissions
            and SaaS builds with a clear brief.
          </p>
        </div>

        <ul className="mt-14 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {offerings.map((item, index) => (
            <li key={item.slug} className="group py-8 sm:py-10">
              <div className="grid gap-4 sm:grid-cols-[120px_1fr_auto] sm:items-baseline sm:gap-8">
                <p className="font-[family-name:var(--font-display)] text-sm text-[var(--color-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-foreground)] transition group-hover:text-[var(--color-accent-hover)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.summary}
                  </p>
                </div>
                <AppLink
                  href={`/contact?interest=${encodeURIComponent(item.title)}`}
                  className="text-sm font-semibold text-[var(--color-foreground)] underline-offset-4 transition hover:text-[var(--color-accent-hover)] hover:underline sm:justify-self-end"
                >
                  {item.ctaLabel} →
                </AppLink>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-20 sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-12">
          <div className="max-w-xl">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-foreground)]">
              Ready to commission?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
              Share your brief for a custom game, website, automation workflow, or SaaS product.
              We reply within one business day.
            </p>
          </div>
          <CtaButton href="/contact">Contact {site.brand}</CtaButton>
        </div>
      </section>
    </>
  );
}
