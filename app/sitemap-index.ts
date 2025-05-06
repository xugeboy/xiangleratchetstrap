import type { MetadataRoute } from 'next';
import { localePrefixMap } from '@/middleware';

// Base URL from environment variable
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://xiangleratchetstrap.com";

export default function sitemapIndex(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add one sitemap per locale
  for (const locale of Object.values(localePrefixMap)) {
    sitemapEntries.push({
      url: `${BASE_URL}/sitemaps/${locale}.xml`,
      lastModified: new Date(),
    });
  }

  return sitemapEntries;
}
