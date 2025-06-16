import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withNextIntl(analyzer(nextConfig));
