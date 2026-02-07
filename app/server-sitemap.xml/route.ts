// app/[lang]/server-sitemap.xml/route.ts
import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { getAllProductSlug } from "@/services/api/product";
import { getAllBlogSlug } from "@/services/api/blog";
import { getAllCategorySlug } from "@/services/api/productCategory";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL;

export async function GET(
) {

  const fields: Array<{
    loc: string;
    lastmod?: string;
    changefreq?: string;
    priority?: number;
  }> = [];

  const currentDate = new Date().toISOString();

  // --- Static Routes ---
  const staticRoutes = [
    "",
    "about-us",
    "contact-us",
    "business-solutions",
    "faq",
    "request-quote",
    "download-catalog",
    "custom-print",
    "custom-print/online-builder",
    "custom-print/screen-print",
    "custom-print/full-design",
    "request-quote",
    "blogs",
    "tools",
    "tools/cbm-calculator",
    "tools/angle-efficiency-calculator",
    "tools/cargo-securing-calculator",
    "tools/cargo-specific-recommender",
    "fly-fish-retractable-ratchet-strap",
  ];

  staticRoutes.forEach((route) => {
    fields.push({
      loc: `${siteUrl}/${route}`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: route === "/" ? 1.0 : 0.8,
    });
  });

  // Products
  const products = await getAllProductSlug();
  products.forEach((product) => {
    fields.push({
      loc: `${siteUrl}/products/${product.slug}`,
      lastmod: new Date(
        product.updatedAt || product.publishedAt || currentDate
      ).toISOString(),
      changefreq: "weekly" as const,
      priority: 0.8,
    });
  });

  // Categories
  const categories = await getAllCategorySlug();
  categories.forEach((category) => {
    fields.push({
      loc: `${siteUrl}/categories/${category.slug}`,
      lastmod: new Date(
        category.updatedAt || category.publishedAt || currentDate
      ).toISOString(),
      changefreq: "monthly" as const,
      priority: 0.9,
    });
  });

  // Blogs
  const blogs = await getAllBlogSlug();
  blogs.forEach((blog) => {
    fields.push({
      loc: `${siteUrl}/blogs/${blog.slug}`,
      lastmod: new Date(
        blog.updatedAt || blog.publishedAt || currentDate
      ).toISOString(),
      changefreq: "monthly" as const,
      priority: 0.9,
    });
  });

  return getServerSideSitemap(fields as ISitemapField[]);
}
