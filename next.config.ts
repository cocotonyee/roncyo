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
      /* Legacy B2B marketing routes → games hub */
      { source: "/services", destination: "/games", permanent: false },
      { source: "/services/:path*", destination: "/games", permanent: false },
      { source: "/industries", destination: "/games", permanent: false },
      { source: "/industries/:path*", destination: "/games", permanent: false },
      { source: "/case-studies", destination: "/games", permanent: false },
      { source: "/case-studies/:path*", destination: "/games", permanent: false },
      { source: "/locations", destination: "/games", permanent: false },
      { source: "/locations/:path*", destination: "/games", permanent: false },
      { source: "/contact", destination: "/support", permanent: false },
      { source: "/press", destination: "/about", permanent: true },
      /* Legacy game aliases */
      { source: "/games/kitty-merge", destination: "/games/mochi-cats", permanent: true },
      { source: "/games/kitty-merge/support", destination: "/games/mochi-cats/support", permanent: true },
      { source: "/games/kitty-merge/privacy", destination: "/games/mochi-cats/privacy", permanent: true },
      { source: "/games/sample-puzzle", destination: "/games/cozy-cat-block-puzzle", permanent: true },
      { source: "/games/sample-puzzle/support", destination: "/games/cozy-cat-block-puzzle/support", permanent: true },
      { source: "/games/sample-puzzle/privacy", destination: "/games/cozy-cat-block-puzzle/privacy", permanent: true },
      { source: "/games/mochi-drop", destination: "/games/mochi-cats", permanent: true },
      { source: "/games/mochi-drop/support", destination: "/games/mochi-cats/support", permanent: true },
      { source: "/games/mochi-drop/privacy", destination: "/games/mochi-cats/privacy", permanent: true },
    ];
  },
};

export default nextConfig;
