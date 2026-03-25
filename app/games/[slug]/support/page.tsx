import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, ContentPanel, HeroBand, InnerPage } from "@/components/InnerPage";
import { Prose } from "@/components/Prose";
import { getAllSlugs, getGameBySlug } from "@/lib/games";
import { site, absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return { title: "Support" };
  return {
    title: `${game.title} — Support`,
    description: `Support and FAQ for ${game.title}.`,
    openGraph: {
      title: `Support — ${game.title}`,
      url: absoluteUrl(`/games/${slug}/support`),
    },
  };
}

export default async function GameSupportPage({ params }: Props) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  return (
    <InnerPage glow="ocean">
      <HeroBand tone="ocean">
        <Breadcrumb
          light
          items={[
            { href: "/games", label: "Games" },
            { href: `/games/${game.slug}`, label: game.title },
            { label: "Support" },
          ]}
        />
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.25rem)] font-black tracking-tight text-white">
          Support — {game.title}
        </h1>
        <p className="mt-3 max-w-xl text-sm text-white/85">
          FAQs and how to reach us for this title. Include device model and OS version in bug reports.
        </p>
      </HeroBand>

      <ContentPanel className="mb-8">
        <p className="text-sm font-semibold text-[var(--color-roncy-muted)]">Email</p>
        <a
          href={`mailto:${site.emails.support}`}
          className="mt-1 inline-block font-[family-name:var(--font-display)] text-xl font-extrabold text-[var(--color-roncy-teal2)] hover:text-[var(--color-roncy-teal)]"
        >
          {site.emails.support}
        </a>
        <p className="mt-3 text-sm text-[var(--color-roncy-muted)]">
          <strong className="text-[var(--color-roncy-text)]">Response time:</strong> 2–3 business days
        </p>
      </ContentPanel>

      <ContentPanel>
        <Prose contained={false}>
          <h2 className="!mt-0">Frequently asked questions</h2>
          <h3>The game crashes on startup. What should I do?</h3>
          <p>
            Force-quit the app and restart your device. If it continues, uninstall and reinstall. If
            the problem persists, email us with your device and OS version.
          </p>
          <h3>I lost my progress. Can it be restored?</h3>
          <p>{game.progressNote}</p>
          <h3>How do I request a refund?</h3>
          <p>
            Purchases through Apple are managed by Apple; purchases through Google are managed by
            Google. For other channels, contact us with your receipt details.
          </p>
          <h3>How do I delete my data?</h3>
          <p>
            Submit a request via our <Link href="/data-deletion">data deletion</Link> page or email{" "}
            <a href={`mailto:${site.emails.support}`}>{site.emails.support}</a> with the subject{" "}
            <strong>Data Deletion Request</strong>.
          </p>
          <h2>Known issues</h2>
          <p>{game.knownIssues ?? "No known issues listed at this time."}</p>
          <h2>Report a bug</h2>
          <p>
            Email <a href={`mailto:${site.emails.support}`}>{site.emails.support}</a> with subject
            line: <strong>{game.title} — Bug report</strong>. Include steps to reproduce and a
            screenshot if possible.
          </p>
        </Prose>
      </ContentPanel>
    </InnerPage>
  );
}
