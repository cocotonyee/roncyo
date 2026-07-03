import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      /* Canonical host: apex only (Roiify / SEO expect roncyo.com, not www) */
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.roncyo.com" }],
        destination: "https://roncyo.com/:path*",
        permanent: true,
      },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/games/kitty-merge", destination: "/games/mochi-cats", permanent: true },
      { source: "/games/kitty-merge/support", destination: "/games/mochi-cats/support", permanent: true },
      { source: "/games/kitty-merge/privacy", destination: "/games/mochi-cats/privacy", permanent: true },
      { source: "/games/kitty-merge/play", destination: "/games/mochi-cats", permanent: true },
      { source: "/games/sample-puzzle", destination: "/games/cozy-cat-block-puzzle", permanent: true },
      { source: "/games/sample-puzzle/support", destination: "/games/cozy-cat-block-puzzle/support", permanent: true },
      { source: "/games/sample-puzzle/privacy", destination: "/games/cozy-cat-block-puzzle/privacy", permanent: true },
      { source: "/games/mochi-drop", destination: "/games/mochi-cats", permanent: true },
      { source: "/games/mochi-drop/support", destination: "/games/mochi-cats/support", permanent: true },
      { source: "/games/mochi-drop/privacy", destination: "/games/mochi-cats/privacy", permanent: true },
      { source: "/games/mochi-drop/play", destination: "/games/mochi-cats", permanent: true },
    ];
  },
};

export default nextConfig;
