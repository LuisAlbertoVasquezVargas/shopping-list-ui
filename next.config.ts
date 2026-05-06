// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    position: "bottom-right", // Use the valid property or remove the block
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // Use a default for build-time validation
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/:path*`,
      },
    ];
  },
};

export default nextConfig;