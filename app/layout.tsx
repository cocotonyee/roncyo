import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RoiifyAdLayout } from "@/components/RoiifyBanner";
import { RoiifyScript } from "@/components/RoiifyScript";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { buildPageMetadata, organizationJsonLd, SEO_KEYWORDS } from "@/lib/seo";
import { professionalServiceJsonLd, webSiteJsonLd } from "@/lib/structured-data";
import { site, absoluteUrl } from "@/lib/site";
import "./globals.css";

const display = Inter({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  ...buildPageMetadata({
    title: `${site.brand} — AI Business Automation Studio`,
    description: site.tagline,
    path: "/",
    keywords: [...SEO_KEYWORDS],
  }),
  title: {
    default: `${site.brand} — AI Business Automation Studio`,
    template: `%s | ${site.brand}`,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  other: {
    "ai-content": absoluteUrl("/llms.txt"),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = [organizationJsonLd(), professionalServiceJsonLd(), webSiteJsonLd()];

  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`}>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM site information" />
        <link rel="alternate" type="text/plain" href="/ai.txt" title="AI crawler information" />
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-hidden font-sans">
        <RoiifyScript />
        {structuredData.map((schema) => (
          <script
            key={String(schema["@id"] ?? schema["@type"])}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <SiteHeader />
        <div className="flex min-h-0 flex-1 flex-col pt-16">
          <RoiifyAdLayout>
            <main className="flex-1">{children}</main>
          </RoiifyAdLayout>
          {site.showFooter ? <SiteFooter /> : null}
        </div>
      </body>
    </html>
  );
}
