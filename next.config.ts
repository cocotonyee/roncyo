import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/games/sample-puzzle", destination: "/games/kitty-merge", permanent: true },
      { source: "/games/sample-puzzle/support", destination: "/games/kitty-merge/support", permanent: true },
      { source: "/games/sample-puzzle/privacy", destination: "/games/kitty-merge/privacy", permanent: true },
      { source: "/games/mochi-drop", destination: "/games/kitty-merge", permanent: true },
      { source: "/games/mochi-drop/support", destination: "/games/kitty-merge/support", permanent: true },
      { source: "/games/mochi-drop/privacy", destination: "/games/kitty-merge/privacy", permanent: true },
    ];
  },
};

export default nextConfig;
