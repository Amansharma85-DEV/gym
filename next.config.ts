import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/gym",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
