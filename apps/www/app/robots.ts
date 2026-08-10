import type { MetadataRoute } from "next";
import { buildRobots, getSiteProfile } from "@goship/core";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const profile = getSiteProfile();
  if (profile) {
    const config = buildRobots(profile);
    return {
      rules: config.rules,
      sitemap: config.sitemap,
      host: profile.domain.replace(/^https?:\/\//, ""),
    };
  }

  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    `https://${site.domain}`;

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: site.domain,
  };
}
