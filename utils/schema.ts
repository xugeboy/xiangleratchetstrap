import { Blog } from "@/types/blog";
import { Product } from "@/types/product";
import { ProductCategory } from "@/types/productCategory";
import { BreadcrumbItem } from "@/types/breadcrumbItem";
import { Faq } from "@/types/faq";
import { defaultUrlPrefix } from "@/middleware";

// --- Configuration (Consider moving to environment variables) ---
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const SITE_NAME = process.env.NEXT_PUBLIC_ORGANIZATION_NAME;
const ORGANIZATION_NAME = process.env.NEXT_PUBLIC_ORGANIZATION_NAME;
const ORGANIZATION_LOGO_URL = process.env.NEXT_PUBLIC_LOGO_URL;

// --- Helper Functions ---

// Removed fallback article section inference; use Strapi-provided articleSection only

// Removed hardcoded FAQ generation for articles. FAQs now come from Strapi associations.

/**
 * Base function to generate common Organization Schema
 */
function getOrganizationSchema(lang: string, type?:string ,name?: string) {
  let url = SITE_URL;
  if (lang !== defaultUrlPrefix && lang !== undefined) {
    url =  `${SITE_URL}/${lang}`;
  }
  const schema: Record<string, unknown> = {
    "@type": type ? type : "Organization",
    name: name ? name : ORGANIZATION_NAME,
  };
  if (type !== 'Person') {
    schema.url = url;
    schema.logo = {
      "@type": "ImageObject",
      "url": ORGANIZATION_LOGO_URL
    };
  }
  return schema;
}

/**
 * Generates WebSite Schema
 */
function getWebSiteSchema(lang: string,slug?: string) {
  let url = SITE_URL;

  const langPath = (lang && lang !== defaultUrlPrefix) ? `/${lang}` : '';
  const slugPath = slug ? `/${slug}` : '';
  
  url = `${SITE_URL}${langPath}${slugPath}`;
  
  return {
    "@type": "WebSite",
    url: url,
    name: SITE_NAME,
    inLanguage: lang,
  };
}

/**
 * Generates Article Schema from Strapi Blog Data
 */
function generateArticleSchema(lang: string, article: Blog, slug: string, faqsForArticle?: Faq[]) {
  let url = `${SITE_URL}/blogs/${slug}`;

  if (lang !== defaultUrlPrefix && lang !== undefined) {
    url =  `${SITE_URL}/${lang}/blogs/${slug}`;
  }
  const coverImage = article.cover_image;

  // Use provided keywords or extract from SEO description/title
  const keywords = article.keywords;

  // Use provided word count or estimate from content
  const wordCount = article.wordCount || 
    (article.content ? 
      JSON.stringify(article.content).split(/\s+/).length : 2500);

  // Use provided reading time or estimate (average 200 words per minute)
  const timeRequired = article.readingTime || `PT${Math.ceil(wordCount / 200)}M`;

  // Use article section from Strapi
  const articleSection = article.articleSection;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: article.seo_title,
    description: article.seo_description,
    image: {
      "@type": "ImageObject",
      url: coverImage.url,
      width: 1200,
      height: 1200,
      caption: article.seo_title,
    },
    author: getOrganizationSchema(lang,"Person","Dustin Xu"),
    publisher: getOrganizationSchema(lang),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    keywords: keywords,
    articleSection: articleSection,
    inLanguage: lang === defaultUrlPrefix ? "en" : lang,
    isAccessibleForFree: true,
    wordCount: wordCount,
    timeRequired: timeRequired
  };

  // If FAQs are provided, embed them into Article as mainEntity (list of Questions)
  if (faqsForArticle && faqsForArticle.length > 0) {
    schema.mainEntity = faqsForArticle.map(faq => ({
      "@type": "Question",
      name: faq.Question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.TextAnswer
      }
    }));
  }

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
function generateProductSchema(lang: string, product: Product, slug: string) {
  let url = `${SITE_URL}/products/${slug}`;
  if (lang !== defaultUrlPrefix && lang !== undefined) {
    url =  `${SITE_URL}/${lang}/products/${slug}`;
  }
  const featuredImage = product.featured_image;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id":`${url}#product`,
    name: product.name,
    description: product.seo_description,
    sku: product.code,
    url: url,
    image: product.gallery?.map(img => img.url) || [featuredImage.url],
    additionalProperty: [
      {
        "@type": "PropertyValue",
        "name": "Breaking Strength",
        "value": product.assembly_break_strength
      },
      {
        "@type": "PropertyValue",
        "name": "Width",
        "value": product.width
      }
    ],
    brand: {
      "@type": "Brand",
      "name": "XiangleRatchetStrap"
    },
    offers: {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": 1,     
      "availability": "https://schema.org/InStock",
      "url": url,
      "seller": {
          "@type": "Organization",
          "name": "XiangleRatchetStrap"
        }
    }
  };

  // Cleanup undefined properties
  Object.keys(schema).forEach(
    (key) => schema[key] === undefined && delete schema[key]
  );
  if (
    schema.image &&
    Object.keys(schema.image).length === 1 &&
    schema.image[0]["@type"]
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
    item: item.href, // URL for the breadcrumb item
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itemListElement,
  };
}

/**
 * Generates FAQPage Schema from FAQ data
 */
function generateFAQSchema(lang: string, faqs: Faq[], slug: string, entityType: 'product' | 'blog' = 'product') {
  if (!faqs || faqs.length === 0) return null;

  const basePath = entityType === 'product' ? 'products' : 'blogs';
  let url = `${SITE_URL}/${basePath}/${slug}`;
  if (lang !== defaultUrlPrefix && lang !== undefined) {
    url =  `${SITE_URL}/${lang}/${basePath}/${slug}`;
  }
  const mainEntity = faqs.map(faq => ({
    "@type": "Question",
    "name": faq.Question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.TextAnswer
    }
  }));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(entityType === 'product' ? {
      "subjectOf": {
        "@type": "Product",
        "@id":`${url}#product`,
      }
    } : {
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      }
    }),
    "mainEntity": mainEntity
  };
}

// --- Main Schema Generation Function ---

// Define available schema types
export type SchemaType =
  | "Article"
  | "Product"
  | "BreadcrumbList"
  | "CollectionPage" 
  | "WebSite"
  | "Organization"
  | "FAQPage";

interface GenerateSchemaProps {
  lang?: string;
  type: SchemaType;
  data?: Blog | Product | ProductCategory; // The specific Strapi data (Blog, product.)
  slug?: string; // Needed for constructing URLs for Article/Product
  breadcrumbItems?: BreadcrumbItem[]; // Specific for BreadcrumbList
  faqs?: Faq[]; // Specific for FAQPage
  entityType?: 'product' | 'blog'; // For FAQPage URL/subject
}

/**
 * Generates the JSON-LD object for the specified schema type.
 */
export function generateSchema(props: GenerateSchemaProps): object | null {
  const { lang, type, data, slug, breadcrumbItems, faqs, entityType } = props;

  try {
    switch (type) {
      case "Article":
        if (!slug || !data) return null;
        return generateArticleSchema(lang, data as Blog, slug, faqs);
      case "Product":
        if (!slug || !data) return null;
        return generateProductSchema(lang, data as Product, slug);
      case "BreadcrumbList":
        if (!breadcrumbItems) return null;
        return generateBreadcrumbSchema(breadcrumbItems);
      case "FAQPage":
        if (!faqs) return null;
        return generateFAQSchema(lang, faqs, slug, entityType);
      case "CollectionPage":
        if (!data) {
            return null;
        }
        return generateCollectionPageSchema(lang, data as ProductCategory, slug);
      case "WebSite":
        return getWebSiteSchema(lang, slug);
      case "Organization":
        return getOrganizationSchema(lang);
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
 * Generates CollectionPage Schema from Strapi ProductCategory Data
 */
function generateCollectionPageSchema(lang: string, category: ProductCategory, slug: string) {
  if (!category) return null;

  let url = `${SITE_URL}/categories/${slug}`;
  
  if (lang !== defaultUrlPrefix && lang !== undefined) {
    url =  `${SITE_URL}/${lang}/categories/${slug}`;
  }

  const categoryImage = category.featured_image

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage", // Could also be ItemList if primarily listing products
    name: category.name,
    description: category.seo_description,
    url: url,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website` // Reference the WebSite @id
    },
    image: categoryImage ? {
      "@type": "ImageObject",
      url: categoryImage.url,
      width: 1200,
      height: 1200,
      caption: category.name,
    } : undefined,
  };

  // Cleanup undefined properties
  Object.keys(schema).forEach(
    (key) => schema[key] === undefined && delete schema[key]
  );
  if (schema.image && !schema.image.url) delete schema.image;
  // if (schema.mainEntity && schema.mainEntity.itemListElement.length === 0) delete schema.mainEntity;


  return schema;
}

/**
 * Helper to embed schema JSON-LD into Next.js Metadata object
 * Can accept a single schema object or an array
 */
/**
 * Helper to embed schema JSON-LD into Next.js Metadata object's script tag content
 * Can accept a single schema object or an array
 */
export function embedSchema(
  schema: object | (object | null)[] | null
): string | undefined { // Return undefined if nothing to embed
  if (!schema) {
    return undefined;
  }

  // Filter out any null or undefined schemas if an array is passed
  const schemas = Array.isArray(schema)
    ? schema.filter((s): s is object => s !== null && s !== undefined)
    : [schema];

  if (schemas.length === 0) {
    return undefined; // Nothing valid to embed
  }

  // Determine the final JSON-LD structure
  let ldJson: object;
  if (schemas.length === 1) {
    // If only one schema, use it directly (ensure it has @context)
    ldJson = schemas[0].hasOwnProperty('@context')
      ? schemas[0]
      : { "@context": "https://schema.org", ...schemas[0] };
  } else {
    // If multiple schemas, wrap them in a @graph array
    // Ensure each item in the graph does *not* have its own @context
    const graphItems = schemas.map(s => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ['@context']: context, ...rest } = s; // Remove @context from individual items
        return rest;
    });
    ldJson = {
      "@context": "https://schema.org",
      "@graph": graphItems,
    };
  }

  try {
    // Stringify the final JSON-LD object
    return JSON.stringify(ldJson, null, 2); // Pretty print for readability in source
  } catch (error) {
      console.error("Error stringifying JSON-LD schema:", error);
      return undefined; // Return undefined on error
  }
}