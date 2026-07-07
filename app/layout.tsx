import type { Metadata } from "next";
import { RoiifyAdLayout } from "@/components/RoiifyBanner";
import { RoiifyScript } from "@/components/RoiifyScript";
import { buildPageMetadata, SEO_KEYWORDS } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import "./globals.css";

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
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "32x12" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x65" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body className="shell">
        <RoiifyScript />
        <div className="shell__main">
          <RoiifyAdLayout>
            <main className="content">{children}</main>
          </RoiifyAdLayout>
        </div>
      </body>
    </html>
  );
}
