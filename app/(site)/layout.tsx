import type { Metadata } from "next";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import { AdSenseScript } from "@/components/AdSenseScript";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { organizationJsonLd } from "@/lib/seo";
import { professionalServiceJsonLd, webSiteJsonLd } from "@/lib/structured-data";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  other: {
    "ai-content": absoluteUrl("/llms.txt"),
  },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const structuredData = [organizationJsonLd(), professionalServiceJsonLd(), webSiteJsonLd()];

  return (
    <>
      <AdSenseScript />
      {structuredData.map((schema) => (
        <script
          key={String(schema["@id"] ?? schema["@type"])}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <SiteHeader />
      <div className="flex min-h-0 flex-1 flex-col pt-16">
        <main className="flex-1">{children}</main>
        <AdSenseBanner />
        {site.showFooter ? <SiteFooter /> : null}
      </div>
    </>
  );
}
