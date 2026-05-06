// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    // buildActivity is often still supported, but appIsrStatus is the culprit here
    buildActivity: false,
  },
  // Ensure your rewrites are still there if you're using them
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // next.config.ts
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/:path*`,
      },
    ];
  },
};

export default nextConfig;