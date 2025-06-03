import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.launchuicomponents.com", // ✅ REMOVE 'https://' here
        port: "",
        pathname: "/**",
      },
    ],
  },
  /* other config options */
};

export default nextConfig;
