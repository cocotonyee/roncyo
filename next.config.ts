import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.roncyo.com" }],
        destination: "https://roncyo.com/:path*",
        permanent: true,
      },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/terms", destination: "/terms-of-service", permanent: true },
      /* Old catalog / play routes */
      { source: "/games", destination: "/", permanent: false },
      { source: "/categories", destination: "/docs", permanent: false },
      { source: "/categories/:path*", destination: "/docs", permanent: false },
      { source: "/play", destination: "/", permanent: false },
      { source: "/play/:path*", destination: "/", permanent: false },
      { source: "/docs/publishing", destination: "/docs/distribution", permanent: true },
      { source: "/apps", destination: "/docs", permanent: false },
      /* Legacy B2B → Open Platform */
      { source: "/services", destination: "/", permanent: false },
      { source: "/services/:path*", destination: "/", permanent: false },
      { source: "/industries", destination: "/", permanent: false },
      { source: "/industries/:path*", destination: "/", permanent: false },
      { source: "/case-studies", destination: "/", permanent: false },
      { source: "/case-studies/:path*", destination: "/", permanent: false },
      { source: "/locations", destination: "/", permanent: false },
      { source: "/locations/:path*", destination: "/", permanent: false },
      { source: "/contact", destination: "/support", permanent: false },
      { source: "/press", destination: "/about", permanent: true },
      /* Aliases first, then generic /games → /apps */
      { source: "/games/kitty-merge", destination: "/apps/mochi-cats/privacy", permanent: true },
      {
        source: "/games/kitty-merge/support",
        destination: "/apps/mochi-cats/support",
        permanent: true,
      },
      {
        source: "/games/kitty-merge/privacy",
        destination: "/apps/mochi-cats/privacy",
        permanent: true,
      },
      {
        source: "/games/sample-puzzle",
        destination: "/apps/cozy-cat-block-puzzle/privacy",
        permanent: true,
      },
      {
        source: "/games/sample-puzzle/support",
        destination: "/apps/cozy-cat-block-puzzle/support",
        permanent: true,
      },
      {
        source: "/games/sample-puzzle/privacy",
        destination: "/apps/cozy-cat-block-puzzle/privacy",
        permanent: true,
      },
      { source: "/games/mochi-drop", destination: "/apps/mochi-cats/privacy", permanent: true },
      {
        source: "/games/mochi-drop/support",
        destination: "/apps/mochi-cats/support",
        permanent: true,
      },
      {
        source: "/games/mochi-drop/privacy",
        destination: "/apps/mochi-cats/privacy",
        permanent: true,
      },
      { source: "/games/gravity-ball", destination: "/", permanent: true },
      {
        source: "/games/:slug/privacy",
        destination: "/apps/:slug/privacy",
        permanent: true,
      },
      {
        source: "/games/:slug/support",
        destination: "/apps/:slug/support",
        permanent: true,
      },
      { source: "/games/:slug", destination: "/apps/:slug/privacy", permanent: true },
    ];
  },
};

export default nextConfig;
