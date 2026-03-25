import type { Metadata } from "next";
import Link from "next/link";
import { ContentPanel, InnerPage, PageIntro } from "@/components/InnerPage";
import { Prose } from "@/components/Prose";
import { games } from "@/lib/games";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description: `Support hub for all ${site.brand} games.`,
};

export default function SupportHubPage() {
  return (
    <InnerPage glow="forest">
      <PageIntro
        eyebrow="Support"
        title="Help center"
        lead={`Questions about a ${site.brand} game? Start with the title’s page — or email us directly.`}
        tone="teal"
      />
      <ContentPanel className="mb-8">
        <div className="flex flex-col gap-4 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--color-roncy-muted)]">Primary support email</p>
            <a
              href={`mailto:${site.emails.support}`}
              className="mt-1 inline-block font-[family-name:var(--font-display)] text-xl font-extrabold text-[var(--color-roncy-teal2)] hover:text-[var(--color-roncy-teal)]"
            >
              {site.emails.support}
            </a>
          </div>
          <p className="rounded-full border border-[var(--color-roncy-border)] bg-[var(--color-roncy-surface)] px-4 py-2 text-sm font-semibold text-[var(--color-roncy-text)]">
            Typical reply: <span className="text-[var(--color-roncy-navy)]">2–3 business days</span>
          </p>
        </div>
      </ContentPanel>
      <h2 className="mb-5 font-[family-name:var(--font-display)] text-lg font-extrabold text-[var(--color-roncy-navy)]">
        Games
      </h2>
      <ul className="mb-10 flex flex-col gap-3">
        {games.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/games/${g.slug}/support`}
              className="flex items-center justify-between gap-4 rounded-[18px] border-2 border-[var(--color-roncy-border)] bg-white px-5 py-4 font-semibold text-[var(--color-roncy-navy)] shadow-sm transition hover:border-[var(--color-roncy-teal)] hover:shadow-[0_8px_28px_rgba(0,212,200,0.12)]"
            >
              <span>{g.title}</span>
              <span className="text-[var(--color-roncy-teal2)]">FAQ →</span>
            </Link>
          </li>
        ))}
      </ul>
      <ContentPanel>
        <Prose contained={false}>
          <h2 className="!mt-0">Data deletion</h2>
          <p>
            To request deletion of personal data, see our <Link href="/data-deletion">Data deletion</Link>{" "}
            page or email{" "}
            <a href={`mailto:${site.emails.support}`}>{site.emails.support}</a> with the subject line{" "}
            <strong>Data Deletion Request</strong>.
          </p>
          <h2>Common topics</h2>
          <ul>
            <li>Refunds are handled by the store where you purchased (Apple, Google, etc.).</li>
            <li>Include device model, OS version, and steps to reproduce for bug reports.</li>
            <li>
              Privacy questions should go to{" "}
              <a href={`mailto:${site.emails.privacy}`}>{site.emails.privacy}</a>.
            </li>
          </ul>
        </Prose>
      </ContentPanel>
    </InnerPage>
  );
}
