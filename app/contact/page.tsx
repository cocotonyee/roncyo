import type { Metadata } from "next";
import Link from "next/link";
import { ContentPanel, InnerPage, PageIntro } from "@/components/InnerPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.brand} — support, business, and privacy.`,
};

const channels = [
  {
    title: "Support",
    email: site.emails.support,
    body: "Player help, bugs, account or data questions.",
    icon: "🎮",
    tint: "#D4F7F5",
  },
  {
    title: "Privacy & legal",
    email: site.emails.privacy,
    body: "Privacy policy questions and data requests.",
    icon: "🔒",
    tint: "#F3E8FF",
  },
  {
    title: "Business & general",
    email: site.emails.hello,
    body: "Partnerships, licensing, and other non-support topics.",
    icon: "✉️",
    tint: "#FFF3CC",
  },
  {
    title: "Legal notices",
    email: site.emails.legal,
    body: "Formal notices and terms-related correspondence.",
    icon: "📜",
    tint: "#FFE8E8",
  },
] as const;

export default function ContactPage() {
  return (
    <InnerPage glow="coralSky">
      <PageIntro
        eyebrow="Contact"
        title="Get in touch"
        lead="We respond to most messages within 2–3 business days. Include your platform (iOS, Android, web) and game name when reporting an issue."
        tone="teal"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {channels.map((c) => (
          <a
            key={c.title}
            href={`mailto:${c.email}`}
            className="group rounded-[24px] border-2 border-[var(--color-roncy-border)] bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-[var(--color-roncy-teal)] hover:shadow-[0_20px_48px_rgba(0,212,200,0.12)]"
          >
            <div
              className="mb-4 flex size-12 items-center justify-center rounded-2xl text-2xl transition group-hover:scale-105"
              style={{ background: c.tint }}
            >
              {c.icon}
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[var(--color-roncy-navy)]">
              {c.title}
            </h2>
            <p className="mt-2 font-[family-name:var(--font-display)] text-sm font-bold text-[var(--color-roncy-teal2)] group-hover:text-[var(--color-roncy-teal)]">
              {c.email}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-roncy-muted)]">{c.body}</p>
          </a>
        ))}
      </div>
      <ContentPanel className="mt-10">
        <p className="text-center text-sm text-[var(--color-roncy-muted)]">
          Prefer the hub? Visit{" "}
          <Link href="/support" className="font-semibold text-[var(--color-roncy-teal2)] hover:underline">
            Support
          </Link>{" "}
          or{" "}
          <Link
            href="/data-deletion"
            className="font-semibold text-[var(--color-roncy-teal2)] hover:underline"
          >
            Data deletion
          </Link>
          .
        </p>
      </ContentPanel>
    </InnerPage>
  );
}
