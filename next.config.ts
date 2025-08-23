import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://bpcghheadless.wpenginepowered.com/media/**')],
  },
};

export default nextConfig;
