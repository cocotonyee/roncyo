import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GoShip Site SDK — logic layer only; UI stays in this app.
  // Linked via packages/goship-core → ../../GoShip/site/packages/core
  transpilePackages: ["@goship/core"],
  async redirects() {
    return [
      {
        source: "/terms",
        destination: "/terms-of-service",
        permanent: true,
      },
      {
        source: "/journal",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/journal/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/labs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/labs/:path*",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
