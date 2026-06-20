import type { Metadata } from "next";
import { Nunito, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { RoiifyBanner } from "@/components/RoiifyBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ROIIFY_SDK_URL } from "@/lib/roiify";
import { buildPageMetadata, organizationJsonLd } from "@/lib/seo";
import { site, absoluteUrl } from "@/lib/site";
import "./globals.css";

const display = Nunito({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  ...buildPageMetadata({
    title: `${site.brand} — ${site.tagline}`,
    description: `${site.brand} is a professional app and game publishing platform. Browse mobile games, web demos, publisher profiles, support, and compliance documentation.`,
    path: "/",
    keywords: ["app publishing platform", "game distribution", "mobile app store"],
  }),
  title: {
    default: `${site.brand} — ${site.tagline}`,
    template: `%s | ${site.brand}`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgLd = organizationJsonLd();

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-dvh flex-col overflow-x-hidden font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <SiteHeader />
        <main className="flex-1 pt-[72px]">{children}</main>
        {/* Site-wide Roiify banner — root layout wraps every app route (incl. 404) */}
        <RoiifyBanner />
        <SiteFooter />
        <Script src={ROIIFY_SDK_URL} strategy="afterInteractive" />
      </body>
    </html>
  );
}
