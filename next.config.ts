import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        // Current Supabase project
        protocol: "https",
        hostname: "qpwjijggfbsryqomftls.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        // Previous Supabase project (images still referenced in DB)
        protocol: "https",
        hostname: "zndkwkrpygehazqcpxyo.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
