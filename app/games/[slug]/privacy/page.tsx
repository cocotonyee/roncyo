import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, ContentPanel, HeroBand, InnerPage } from "@/components/InnerPage";
import { LegalUpdatedBadge } from "@/components/LegalUpdated";
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
  if (!game) return { title: "Privacy" };
  return {
    title: `${game.title} — Privacy`,
    description: `Privacy information specific to ${game.title}.`,
    openGraph: {
      title: `Privacy — ${game.title}`,
      url: absoluteUrl(`/games/${slug}/privacy`),
    },
  };
}

export default async function GamePrivacyPage({ params }: Props) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const childrenLine = game.childrenTargeted
    ? "This game may appeal to younger players. We do not knowingly collect personal information from children under 13 without verifiable parental consent where required."
    : "This game is not directed at children under 13 for the purpose of collecting their personal information.";

  return (
    <InnerPage glow="vault">
      <HeroBand tone="coral">
        <Breadcrumb
          light
          items={[
            { href: "/games", label: "Games" },
            { href: `/games/${game.slug}`, label: game.title },
            { label: "Privacy" },
          ]}
        />
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.25rem)] font-black tracking-tight text-white">
          {game.title} — Privacy addendum
        </h1>
      </HeroBand>

      <ContentPanel>
        <LegalUpdatedBadge />
        <Prose contained={false}>
          <p>
            This page describes privacy practices specific to {game.title}, published by {site.brand}. It
            supplements our company Privacy Policy at{" "}
            <Link href="/privacy-policy">{site.domain}/privacy-policy</Link>. If anything here
            conflicts with the company policy, the more specific description on this page applies to
            this game.
          </p>
          <h2>Data collected by this game</h2>
          <p>
            {game.collectsPersonalData
              ? "This game may process personal or device-related data as described below."
              : "This game is designed to minimize personal data collection. See below for details."}
          </p>
          <ul>
            <li>Gameplay metrics (such as session length or level progress) used to improve the product</li>
            <li>Diagnostic and crash data to fix technical issues</li>
            {game.sdks.some((s) => /admob|ads/i.test(s)) && (
              <li>Advertising-related data processed by our ad partners as disclosed in-app</li>
            )}
          </ul>
          <h2>Third-party SDKs in this game</h2>
          <p>The following SDKs or services are integrated in this build (update this list per release):</p>
          <ul>
            {game.sdks.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <h2>Children&apos;s privacy</h2>
          <p>{childrenLine}</p>
          <h2>Contact</h2>
          <p>
            Questions about this addendum:{" "}
            <a href={`mailto:${site.emails.privacy}`}>{site.emails.privacy}</a>
          </p>
        </Prose>
      </ContentPanel>
    </InnerPage>
  );
}
