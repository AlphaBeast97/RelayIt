import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.clerk.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
