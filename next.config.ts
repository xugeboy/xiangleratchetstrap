import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com']
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
