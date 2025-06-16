import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      }
    ]
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  }
};

const withNextIntl = createNextIntlPlugin(
  './i18n/request.ts'
);

export default withNextIntl(nextConfig);
