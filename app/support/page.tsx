import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/automation/PageHero";
import { Reveal } from "@/components/automation/Reveal";
import { Section, SectionHeader } from "@/components/automation/Section";
import { games } from "@/lib/games";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Support Center",
  description: `Get help with ${site.brand} apps. Support hub with per-app FAQ, contact, and troubleshooting.`,
  path: "/support",
  keywords: ["app support", "help center", "FAQ"],
});

export default function SupportHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Help center"
        description={`Questions about a ${site.brand} app? Start with the title's support page — or email us directly.`}
        variant="dark"
      />

      <Section>
        <Reveal>
          <div className="panel-premium flex flex-col gap-4 p-6 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--color-muted)]">Primary support email</p>
              <a
                href={`mailto:${site.emails.support}`}
                className="mt-1 inline-block text-xl font-semibold text-[var(--color-foreground)] hover:text-[var(--color-accent-hover)]"
              >
                {site.emails.support}
              </a>
            </div>
            <p className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-muted)]">
              Typical reply: <span className="font-semibold text-[var(--color-foreground)]">2–3 business days</span>
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12">
            <SectionHeader title="Apps" />
          </div>
        </Reveal>
        <ul className="mt-6 flex flex-col gap-3">
          {games.map((g, i) => (
            <Reveal key={g.slug} delay={100 + i * 60}>
              <li>
                <Link
                  href={`/games/${g.slug}/support`}
                  className="panel-premium flex items-center justify-between gap-4 px-5 py-4 font-semibold text-[var(--color-foreground)] no-underline"
                >
                  <span>{g.title}</span>
                  <span className="text-[var(--color-accent-hover)]">FAQ →</span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          <div className="panel-premium mt-10 p-6 text-sm leading-relaxed text-[var(--color-muted)]">
            <h2 className="text-base font-semibold text-[var(--color-foreground)]">Data deletion</h2>
            <p className="mt-2">
              To request deletion of personal data, see our{" "}
              <Link href="/data-deletion" className="font-medium text-[var(--color-foreground)] underline">
                Data deletion
              </Link>{" "}
              page or email{" "}
              <a href={`mailto:${site.emails.support}`} className="underline">
                {site.emails.support}
              </a>{" "}
              with the subject line <strong>Data Deletion Request</strong>.
            </p>
            <h2 className="mt-6 text-base font-semibold text-[var(--color-foreground)]">Common topics</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Refunds are handled by the store where you purchased (Apple, Google, etc.).</li>
              <li>Include device model, OS version, and steps to reproduce for bug reports.</li>
              <li>
                Privacy questions:{" "}
                <a href={`mailto:${site.emails.privacy}`} className="underline">
                  {site.emails.privacy}
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
