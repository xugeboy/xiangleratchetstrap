import type { Metadata } from "next";
import { Blog } from "@/types/blog";
import { Product } from "@/types/product";
import { ProductCategory } from "@/types/productCategory";
import { BreadcrumbItem } from "@/types/breadcrumbItem";

// --- Configuration (Consider moving to environment variables) ---
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;
const ORGANIZATION_NAME = process.env.NEXT_PUBLIC_ORGANIZATION_NAME;
const ORGANIZATION_LOGO_URL = process.env.NEXT_PUBLIC_LOGO_URL;

// --- Helper Functions ---

/**
 * Base function to generate common Organization Schema
 */
function getOrganizationSchema() {
  return {
    "@type": "Organization",
    name: ORGANIZATION_NAME,
    url: SITE_URL,
    logo: ORGANIZATION_LOGO_URL,
  };
}

/**
 * Generates WebSite Schema
 */
function getWebSiteSchema() {
  return {
    "@type": "WebSite",
    url: SITE_URL,
    name: SITE_NAME,
    publisher: getOrganizationSchema(), // Nest Organization
  };
}

/**
 * Generates Article Schema from Strapi Blog Data
 */
function generateArticleSchema(article: Blog, slug: string) {
  const url = `${SITE_URL}/blogs/${slug}`; // Adjust path as needed
  const coverImage = article.cover_image;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article", // or BlogPosting
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: article.seo_title,
    description: article.seo_description, // Use excerpt if available
    image: {
      "@type": "ImageObject",
      url: coverImage.url,
      width: 1200,
      height: 1200,
      caption: article.seo_title,
    },
    author: getOrganizationSchema(),
    publisher: getOrganizationSchema(),
    datePublished: article.publishedAt, // Should be ISO 8601 format
    dateModified: article.updatedAt || article.publishedAt, // Use updatedAt if available
  };

  // Remove undefined properties
  Object.keys(schema).forEach(
    (key) => schema[key] === undefined && delete schema[key]
  );
  if (
    schema.image &&
    Object.keys(schema.image).length === 1 &&
    schema.image["@type"]
  )
    delete schema.image; // Cleanup empty image object
  if (
    schema.author &&
    Object.keys(schema.author).length === 1 &&
    schema.author["@type"]
  )
    delete schema.author; // Cleanup empty author object

  return schema;
}

/**
 * Generates Product Schema from Strapi Product Data
 */
function generateProductSchema(product: Product, slug: string) {
  const url = `${SITE_URL}/products/${slug}`; // Adjust path as needed
  const featuredImage = product.featured_image;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seo_description,
    sku: product.code,
    url: url,
    image: {
      "@type": "ImageObject",
      url: featuredImage.url,
      width: 1200,
      height: 1200,
      caption: product.name,
    },
  };

  // Cleanup undefined properties
  Object.keys(schema).forEach(
    (key) => schema[key] === undefined && delete schema[key]
  );
  if (
    schema.image &&
    Object.keys(schema.image).length === 1 &&
    schema.image["@type"]
  )
    delete schema.image;
  return schema;
}

/**
 * Generates BreadcrumbList Schema
 * items: Array of { name: string, path: string } // path should be absolute URL
 */
function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  if (!items || items.length === 0) {
    return null;
  }

  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.path, // URL for the breadcrumb item
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itemListElement,
  };
}

// --- Main Schema Generation Function ---

// Define available schema types
export type SchemaType =
  | "Article"
  | "Product"
  | "BreadcrumbList"
  | "WebSite"
  | "Organization";

interface GenerateSchemaProps {
  type: SchemaType;
  data?: Blog | Product | ProductCategory; // The specific Strapi data (Blog, product.)
  slug?: string; // Needed for constructing URLs for Article/Product
  breadcrumbItems?: BreadcrumbItem[]; // Specific for BreadcrumbList
}

/**
 * Generates the JSON-LD object for the specified schema type.
 */
export function generateSchema(props: GenerateSchemaProps): object | null {
  const { type, data, slug, breadcrumbItems } = props;

  try {
    switch (type) {
      case "Article":
        if (!slug || !data) return null;
        return generateArticleSchema(data as Blog, slug);
      case "Product":
        if (!slug || !data) return null;
        return generateProductSchema(data as Product, slug);
      case "BreadcrumbList":
        if (!breadcrumbItems) return null;
        return generateBreadcrumbSchema(breadcrumbItems);
      case "WebSite":
        return getWebSiteSchema();
      case "Organization":
        return getOrganizationSchema();
      default:
        console.warn(`Schema type "${type}" not recognized.`);
        return null;
    }
  } catch (error) {
    console.error(`Error generating schema type "${type}":`, error);
    return null; // Prevent errors from breaking metadata generation
  }
}

/**
 * Helper to embed schema JSON-LD into Next.js Metadata object
 * Can accept a single schema object or an array
 */
export function embedSchema(
  schema: object | (object | null)[] | null
): string | null {
  if (!schema) {
    return undefined;
  }

  const schemas = Array.isArray(schema)
    ? schema.filter((s) => s !== null)
    : [schema];

  if (schemas.length === 0) {
    return undefined;
  }

  // If multiple schemas, wrap them in a graph
  const ldJson =
    schemas.length > 1
      ? {
          "@context": "https://schema.org",
          "@graph": schemas,
        }
      : schemas[0];

  return JSON.stringify(ldJson, null, 2);
}
