// app/[lang]/server-sitemap.xml/route.ts
import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { type NextRequest } from "next/server";
import { getAllProductSlugByLocale } from "@/services/api/product";
import { getAllBlogSlugByLocale } from "@/services/api/blog";
import { getAllCategorySlugByLocale } from "@/services/api/productCategory";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://xiangleratchetstrap.com";

export async function GET(
  req: NextRequest,
  { params }: { params: { lang: string } }
) {
  const lang = params.lang || "en";

  const fields: Array<{
    loc: string;
    lastmod?: string;
    changefreq?: string;
    priority?: number;
  }> = [];

  const currentDate = new Date().toISOString();

  // --- Static Routes ---
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

  staticRoutes.forEach((route) => {
    fields.push({
      loc: `${siteUrl}/${lang}${route}`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: route === "/" ? 1.0 : 0.8,
    });
  });

  // Products
  const products = await getAllProductSlugByLocale(lang);
  products.forEach((product) => {
    fields.push({
      loc: `${siteUrl}/${lang}/products/${product.slug}`,
      lastmod: new Date(
        product.updatedAt || product.publishedAt || currentDate
      ).toISOString(),
      changefreq: "monthly" as const,
      priority: 0.7,
    });
  });

  // Categories
  const categories = await getAllCategorySlugByLocale(lang);
  categories.forEach((category) => {
    fields.push({
      loc: `${siteUrl}/${lang}/categories/${category.slug}`,
      lastmod: new Date(
        category.updatedAt || category.publishedAt || currentDate
      ).toISOString(),
      changefreq: "monthly" as const,
      priority: 0.7,
    });
  });

  // Blogs
  const blogs = await getAllBlogSlugByLocale(lang);
  blogs.forEach((blog) => {
    fields.push({
      loc: `${siteUrl}/${lang}/blogs/${blog.slug}`,
      lastmod: new Date(
        blog.updatedAt || blog.publishedAt || currentDate
      ).toISOString(),
      changefreq: "monthly" as const,
      priority: 0.6,
    });
  });

  return getServerSideSitemap(fields as ISitemapField[]);
}
