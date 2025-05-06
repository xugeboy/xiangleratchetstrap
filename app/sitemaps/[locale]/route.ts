import type { MetadataRoute } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getAllProductSlugByLocale } from '@/services/api/product';
import { getAllBlogSlugByLocale } from '@/services/api/blog';
import { getAllCategorySlugByLocale } from '@/services/api/productCategory';
import { localePrefixMap, defaultLocaleKey } from '@/middleware';

// Base URL from environment variable
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://xiangleratchetstrap.com";

// Static routes that should be included in the sitemap
const staticRoutes = [
  "/",
  "/about-us",
  "/contact-us",
  "/business-solutions",
  "/faq",
  "/request-quote",
  "/download-catalog",
  "/blogs",
];

// Helper function to generate URL with locale prefix
function getLocalizedUrl(path: string, locale: string): string {
  const defaultLocale = localePrefixMap[defaultLocaleKey];
  // For default locale, don't include prefix in URL (based on middleware logic)
  if (locale === defaultLocale) {
    return `${BASE_URL}${path}`;
  }
  return `${BASE_URL}/${locale}${path}`;
}

// Generate sitemap XML string
function generateSitemapXml(entries: MetadataRoute.Sitemap): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
  xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  
  for (const entry of entries) {
    xml += '  <url>\n';
    xml += `    <loc>${entry.url}</loc>\n`;
    
    if (entry.lastModified) {
      const lastmod = entry.lastModified instanceof Date 
        ? entry.lastModified.toISOString() 
        : entry.lastModified;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
    }
    
    if (entry.changeFrequency) {
      xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`;
    }
    
    if (entry.priority !== undefined) {
      xml += `    <priority>${entry.priority}</priority>\n`;
    }
    
    // Add alternate language links
    if (entry.alternates && entry.alternates.languages) {
      for (const [lang, url] of Object.entries(entry.alternates.languages)) {
        xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />\n`;
      }
    }
    
    xml += '  </url>\n';
  }
  
  xml += '</urlset>';
  return xml;
}

// Generate sitemap for a specific locale
async function generateLocaleSitemap(locale: string): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  
  // 1. Add static routes
  for (const route of staticRoutes) {
    // Create alternates for all locales
    const alternateLanguages: Record<string, string> = {};
    Object.entries(localePrefixMap).forEach(([localeKey, localePrefix]) => {
      alternateLanguages[localeKey] = getLocalizedUrl(route, localePrefix);
    });
    
    entries.push({
      url: getLocalizedUrl(route, locale),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '/' ? 1.0 : 0.8,
      alternates: {
        languages: alternateLanguages
      },
    });
  }
  
  // 2. Add products
  try {
    const products = await getAllProductSlugByLocale(locale);
    if (products && products.length > 0) {
      for (const product of products) {
        const productPath = `/products/${product.slug}`;
        
        // For simplicity, we're only adding the current locale as an alternate
        // In a more complete implementation, you would fetch products for all locales
        // and create proper alternates
        const alternateLanguages: Record<string, string> = {};
        alternateLanguages[locale] = getLocalizedUrl(productPath, locale);
        
        entries.push({
          url: getLocalizedUrl(productPath, locale),
          lastModified: new Date(product.updatedAt || product.publishedAt),
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: alternateLanguages
          },
        });
      }
    }
  } catch (error) {
    console.error(`Error fetching products for locale ${locale}:`, error);
  }
  
  // 3. Add categories
  try {
    const categories = await getAllCategorySlugByLocale(locale);
    if (categories && categories.length > 0) {
      for (const category of categories) {
        const categoryPath = `/categories/${category.slug}`;
        
        const alternateLanguages: Record<string, string> = {};
        alternateLanguages[locale] = getLocalizedUrl(categoryPath, locale);
        
        entries.push({
          url: getLocalizedUrl(categoryPath, locale),
          lastModified: new Date(category.updatedAt || category.publishedAt),
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: alternateLanguages
          },
        });
      }
    }
  } catch (error) {
    console.error(`Error fetching categories for locale ${locale}:`, error);
  }
  
  // 4. Add blogs
  try {
    const blogs = await getAllBlogSlugByLocale(locale);
    if (blogs && blogs.length > 0) {
      for (const blog of blogs) {
        const blogPath = `/blogs/${blog.slug}`;
        
        const alternateLanguages: Record<string, string> = {};
        alternateLanguages[locale] = getLocalizedUrl(blogPath, locale);
        
        entries.push({
          url: getLocalizedUrl(blogPath, locale),
          lastModified: new Date(blog.updatedAt || blog.publishedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: alternateLanguages
          },
        });
      }
    }
  } catch (error) {
    console.error(`Error fetching blogs for locale ${locale}:`, error);
  }
  
  return entries;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { locale: string } }
): Promise<NextResponse> {
  const locale = params.locale;
  
  // Validate locale
  if (!Object.values(localePrefixMap).includes(locale)) {
    return new NextResponse('Invalid locale', { status: 400 });
  }
  
  // Generate sitemap for this locale
  const entries = await generateLocaleSitemap(locale);
  
  // Generate XML and return with proper content type
  const xml = generateSitemapXml(entries);
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
