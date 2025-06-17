import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // ← skift til dit faktiske domæne
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8056',
        pathname: '/admin/files/**',
      },
    ],
  },
};

export default nextConfig;
