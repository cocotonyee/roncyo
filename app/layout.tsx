import type { Metadata } from "next";
import { Nunito, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { RoiifyBanner } from "@/components/RoiifyBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ROIIFY_SDK_URL } from "@/lib/roiify";
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
  title: {
    default: `${site.brand} — ${site.tagline}`,
    template: `%s — ${site.brand}`,
  },
  description: `${site.brand} — professional app publishing platform. Browse apps, publisher info, support, and compliance documentation.`,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.brand,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-dvh flex-col overflow-x-hidden font-sans">
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
