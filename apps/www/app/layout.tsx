import type { Metadata } from "next";
import { Geist, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.brand} - ${site.tagline}`,
    template: `%s · ${site.brand}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.brand,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1 pt-16">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
