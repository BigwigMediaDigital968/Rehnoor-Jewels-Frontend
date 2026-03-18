import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // ✅ FIX 1 — Added plus.unsplash.com (was missing, caused the crash)
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      // Add any other image hosts here as needed
    ],
  },
};

export default nextConfig;
