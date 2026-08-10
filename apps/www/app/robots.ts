import type { MetadataRoute } from "next";
import { buildRobots, getSiteProfile } from "@goship/core";

export default function robots(): MetadataRoute.Robots {
  const profile = getSiteProfile();
  if (!profile) {
    return {
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://roncyo.com/sitemap.xml",
    };
  }

  const config = buildRobots(profile);
  return {
    rules: config.rules,
    sitemap: config.sitemap,
  };
}
