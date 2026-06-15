import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1920],
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "motion"],
  },
};

export default config;
