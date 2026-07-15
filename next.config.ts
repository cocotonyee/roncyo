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
      /* Platform site — no public game catalog / play arcade */
      { source: "/games", destination: "/", permanent: false },
      { source: "/categories", destination: "/docs", permanent: false },
      { source: "/categories/:path*", destination: "/docs", permanent: false },
      { source: "/play", destination: "/", permanent: false },
      { source: "/play/:path*", destination: "/", permanent: false },
      /* Legacy B2B marketing routes → platform home */
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
      /* Legacy game aliases → compliance pages */
      { source: "/games/kitty-merge", destination: "/games/mochi-cats/privacy", permanent: true },
      {
        source: "/games/kitty-merge/support",
        destination: "/games/mochi-cats/support",
        permanent: true,
      },
      {
        source: "/games/kitty-merge/privacy",
        destination: "/games/mochi-cats/privacy",
        permanent: true,
      },
      {
        source: "/games/sample-puzzle",
        destination: "/games/cozy-cat-block-puzzle/privacy",
        permanent: true,
      },
      {
        source: "/games/sample-puzzle/support",
        destination: "/games/cozy-cat-block-puzzle/support",
        permanent: true,
      },
      {
        source: "/games/sample-puzzle/privacy",
        destination: "/games/cozy-cat-block-puzzle/privacy",
        permanent: true,
      },
      { source: "/games/mochi-drop", destination: "/games/mochi-cats/privacy", permanent: true },
      {
        source: "/games/mochi-drop/support",
        destination: "/games/mochi-cats/support",
        permanent: true,
      },
      {
        source: "/games/mochi-drop/privacy",
        destination: "/games/mochi-cats/privacy",
        permanent: true,
      },
      /* Former catalog detail pages → privacy addendum */
      { source: "/games/mochi-cats", destination: "/games/mochi-cats/privacy", permanent: false },
      {
        source: "/games/cozy-cat-block-puzzle",
        destination: "/games/cozy-cat-block-puzzle/privacy",
        permanent: false,
      },
      { source: "/games/gravity-ball", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
