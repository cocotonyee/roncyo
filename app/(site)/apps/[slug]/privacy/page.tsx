import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, ContentPanel, HeroBand, InnerPage } from "@/components/InnerPage";
import { LegalUpdatedBadge } from "@/components/LegalUpdated";
import { Prose } from "@/components/Prose";
import { getAllSlugs, getGameBySlug } from "@/lib/games";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = getGameBySlug(slug);
  if (!app) return { title: "Privacy" };
  return buildPageMetadata({
    title: `${app.title} Privacy`,
    description: `Privacy practices for ${app.title} on ${site.brand}.`,
    path: `/apps/${slug}/privacy`,
    noIndex: true,
  });
}

export default async function AppPrivacyPage({ params }: Props) {
  const { slug } = await params;
  const app = getGameBySlug(slug);
  if (!app) notFound();

  const childrenLine = app.childrenTargeted
    ? "This product may appeal to younger users. We do not knowingly collect personal information from children under 13 without verifiable parental consent where required."
    : "This product is not directed at children under 13 for the purpose of collecting their personal information.";

  return (
    <InnerPage glow="vault">
      <HeroBand tone="coral">
        <Breadcrumb
          light
          items={[
            { href: "/support", label: "Support" },
            { label: app.title },
            { label: "Privacy" },
          ]}
        />
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.25rem)] font-black tracking-tight text-white">
          {app.title} — Privacy
        </h1>
      </HeroBand>

      <ContentPanel>
        <LegalUpdatedBadge />
        <Prose contained={false}>
          <p>
            This page describes privacy practices for {app.title}, operated in connection with{" "}
            {site.brand}. It supplements our Privacy Policy at{" "}
            <Link href="/privacy-policy">{site.domain}/privacy-policy</Link>. If anything here
            conflicts with the company policy, the more specific description on this page applies.
          </p>
          <h2>Data collected by this product</h2>
          <p>
            {app.collectsPersonalData
              ? "This product may process personal or device-related data as described below."
              : "This product is designed to minimize personal data collection. See below for details."}
          </p>
          <ul>
            <li>Usage metrics used to improve the product</li>
            <li>Diagnostic and crash data to fix technical issues</li>
            {app.sdks.some((s) => /admob|ads/i.test(s)) && (
              <li>Advertising-related data processed by ad partners as disclosed in the product</li>
            )}
          </ul>
          <h2>Third-party SDKs</h2>
          <p>The following SDKs or services may be integrated (update per release):</p>
          <ul>
            {app.sdks.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <h2>Children&apos;s privacy</h2>
          <p>{childrenLine}</p>
          <h2>Contact</h2>
          <p>
            Questions:{" "}
            <a href={`mailto:${site.emails.privacy}`}>{site.emails.privacy}</a>
          </p>
        </Prose>
      </ContentPanel>
    </InnerPage>
  );
}
