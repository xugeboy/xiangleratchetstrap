import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
  },
  i18n: {
    locales: ['en-US', 'en-GB', 'en-CA', 'en-AU', 'de-DE', 'fr-FR', 'es-ES'],
    defaultLocale: 'en-US',
    localeDetection: false, 
  },
};

export default nextConfig;
