import type { Metadata } from "next";
import Link from "next/link";
import { ContentPanel, InnerPage, PageIntro } from "@/components/InnerPage";
import { Prose } from "@/components/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data Deletion",
  description: `Request deletion of personal data held by ${site.brand}.`,
};

export default function DataDeletionPage() {
  const mail = `mailto:${site.emails.support}?subject=${encodeURIComponent("Data Deletion Request")}`;
  return (
    <InnerPage glow="rose">
      <PageIntro
        eyebrow="Privacy"
        title="Request data deletion"
        lead={`${site.brand} respects your right to control personal data associated with our games and websites.`}
        tone="coral"
      />
      <ContentPanel className="mb-8 border-[var(--color-roncy-teal)]/30 bg-gradient-to-br from-[var(--color-roncy-surface)] to-white text-center">
        <p className="text-sm font-semibold text-[var(--color-roncy-muted)]">Fastest way to start</p>
        <a
          href={mail}
          className="mt-4 inline-flex rounded-full bg-[var(--color-roncy-teal)] px-8 py-4 font-[family-name:var(--font-display)] text-base font-extrabold text-white shadow-[0_12px_36px_rgba(0,212,200,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(0,212,200,0.45)]"
        >
          Email a deletion request →
        </a>
        <p className="mt-4 text-xs text-[var(--color-roncy-muted)]">
          Subject line: <strong className="text-[var(--color-roncy-text)]">Data Deletion Request</strong>
        </p>
      </ContentPanel>
      <ContentPanel>
        <Prose contained={false}>
          <h2 className="!mt-0">How to submit a request</h2>
          <p>
            Email{" "}
            <a href={mail}>
              <strong>{site.emails.support}</strong>
            </a>{" "}
            with the subject line <strong>Data Deletion Request</strong>.
          </p>
          <p>Please include:</p>
          <ul>
            <li>Your name or in-game username (if applicable)</li>
            <li>The game or app name</li>
            <li>Device type and platform (iOS, Android, web)</li>
            <li>Registered email or account ID associated with the game (if any)</li>
          </ul>
          <p>
            We aim to process requests within <strong>30 days</strong> and will confirm when deletion
            is complete where possible.
          </p>
          <h2>What we delete</h2>
          <p>
            Upon verification, we delete personal data we hold in our systems that is associated with
            your request, including identifiable analytics or support records we control directly.
          </p>
          <h2>What may be retained</h2>
          <p>
            Some information may be kept where required by law (for example, limited transaction
            records). Data held only by platform providers (Apple, Google, etc.) must be requested
            through those platforms&apos; own tools where applicable.
          </p>
          <h2>Privacy contact</h2>
          <p>
            Questions about this process:{" "}
            <a href={`mailto:${site.emails.privacy}`}>{site.emails.privacy}</a>
            {" · "}
            <Link href="/privacy-policy" className="font-semibold">
              Privacy Policy
            </Link>
          </p>
        </Prose>
      </ContentPanel>
    </InnerPage>
  );
}
