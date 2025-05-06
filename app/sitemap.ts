import type { MetadataRoute } from "next";

// This file is kept for backward compatibility
// The actual sitemap implementation is now split into multiple files:
// - sitemap-index.ts: The main sitemap index file
// - sitemaps/[locale]-[type]/route.ts: Individual sitemap files for each locale and content type

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Return a redirect entry to the sitemap index
  return [
    {
      url: process.env.NEXT_PUBLIC_SITE_URL + "/sitemap-index.xml",
      lastModified: new Date(),
    },
  ];
}
