import type { Metadata } from "next";
import { Blog } from "@/types/blog";
import { Product } from "@/types/product";
import { ProductCategory } from "@/types/productCategory";

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
    potentialAction: {
      // Optional: For Sitelinks Search Box
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generates Article Schema from Strapi Blog Data
 */
function generateArticleSchema(article: StrapiBlogAttributes, slug: string) {
  const url = `${SITE_URL}/blogs/${slug}`; // Adjust path as needed
  const author = article.author?.data?.attributes;
  const coverImage = article.cover_image?.data?.attributes;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article", // or BlogPosting
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: article.title,
    description: article.excerpt || undefined, // Use excerpt if available
    image: coverImage
      ? {
          // Can be string URL or ImageObject
          "@type": "ImageObject",
          url: coverImage.url.startsWith("http")
            ? coverImage.url
            : `${process.env.NEXT_PUBLIC_STRAPI_URL}${coverImage.url}`, // Ensure absolute URL
          width: coverImage.width,
          height: coverImage.height,
          caption: coverImage.alternativeText || article.title,
        }
      : undefined,
    author: author
      ? {
          "@type": "Person", // Or Organization if applicable
          name: author.name || ORGANIZATION_NAME, // Fallback to org name if needed
          // url: author.url // If author has a profile URL
        }
      : getOrganizationSchema(), // Fallback to main Organization
    publisher: getOrganizationSchema(),
    datePublished: article.publishedAt, // Should be ISO 8601 format
    dateModified: article.updatedAt || article.publishedAt, // Use updatedAt if available
    // You might need a function to extract plain text from 'content' for 'articleBody'
    // articleBody: extractPlainText(article.content),
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
function generateProductSchema(product: StrapiProductAttributes, slug: string) {
  const url = `${SITE_URL}/products/${slug}`; // Adjust path as needed
  const primaryImage = product.images?.data?.[0]?.attributes;
  const brand = product.brand?.data?.attributes;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || undefined,
    sku: product.sku || undefined,
    url: url,
    image: primaryImage
      ? {
          "@type": "ImageObject",
          url: primaryImage.url.startsWith("http")
            ? primaryImage.url
            : `${process.env.NEXT_PUBLIC_STRAPI_URL}${primaryImage.url}`,
          width: primaryImage.width,
          height: primaryImage.height,
          caption: primaryImage.alternativeText || product.name,
        }
      : undefined,
    brand: brand
      ? {
          "@type": "Brand", // Or Organization
          name: brand.name,
        }
      : { "@type": "Brand", name: ORGANIZATION_NAME }, // Fallback brand
    offers:
      product.price && product.currency
        ? {
            // Basic Offer
            "@type": "Offer",
            priceCurrency: product.currency,
            price: product.price,
            url: url, // URL to the specific product page/offer
            availability: product.availability
              ? `https://schema.org/${product.availability}`
              : "https://schema.org/InStock", // Default to InStock if not specified
            seller: getOrganizationSchema(), // Your Organization
          }
        : undefined,
    // Add reviews, aggregateRating, etc. if available in Strapi data
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
  if (
    schema.brand &&
    Object.keys(schema.brand).length === 1 &&
    schema.brand["@type"]
  )
    delete schema.brand;
  if (
    schema.offers &&
    Object.keys(schema.offers).length === 1 &&
    schema.offers["@type"]
  )
    delete schema.offers;

  return schema;
}

/**
 * Generates BreadcrumbList Schema
 * items: Array of { name: string, path: string } // path should be absolute URL
 */
function generateBreadcrumbSchema(items: { name: string; path: string }[]) {
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
  data: any; // The specific Strapi data (article, product, breadcrumb items etc.)
  slug?: string; // Needed for constructing URLs for Article/Product
  breadcrumbItems?: { name: string; path: string }[]; // Specific for BreadcrumbList
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
        return generateArticleSchema(data as StrapiBlogAttributes, slug);
      case "Product":
        if (!slug || !data) return null;
        return generateProductSchema(data as StrapiProductAttributes, slug);
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
): Metadata["other"] {
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

  return {
    // Use a key that allows Next.js to handle the script tag
    'script[type="application/ld+json"]': (
      <script
        key="structured-data" // Add a key for React reconciliation
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson, null, 2) }} // Pretty print optional
      />
    ),
  };
}
