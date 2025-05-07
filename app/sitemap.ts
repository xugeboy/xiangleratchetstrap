import type { MetadataRoute } from "next";
import { localePrefixMap } from '@/middleware'; // Ensure this path is correct

// This file is kept for backward compatibility
// The actual sitemap implementation is now split into multiple files:
// - sitemap-index.ts: The main sitemap index file
// - sitemaps/[locale]-[type]/route.ts: Individual sitemap files for each locale and content type

// Base URL from environment variable
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://xiangleratchetstrap.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add one sitemap per locale
  // Assuming localePrefixMap's values are the locale codes like 'en', 'zh'
  for (const locale of Object.values(localePrefixMap)) {
    sitemapEntries.push({
      // The path should match your dynamic route in app/sitemaps/[locale]/route.ts
      // That route likely generates /sitemaps/en, /sitemaps/zh, not /sitemaps/en.xml
      url: `${BASE_URL}/sitemaps/${locale}`, 
      lastModified: new Date(),
    });
  }

  return sitemapEntries;
}
