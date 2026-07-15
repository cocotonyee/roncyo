import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
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
    title: `${site.brand} Open Platform — For Developers`,
    description: site.tagline,
    path: "/",
    keywords: ["open platform", "developer platform", "Roncyo developers", "Roncyo"],
  }),
  title: {
    default: `${site.brand} Open Platform — For Developers`,
    template: `%s | ${site.brand}`,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  other: {
    "ai-content": absoluteUrl("/llms.txt"),
    "google-adsense-account": "ca-pub-7172279368890576",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`}>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM site information" />
        <link rel="alternate" type="text/plain" href="/ai.txt" title="AI crawler information" />
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-hidden font-sans">{children}</body>
    </html>
  );
}
