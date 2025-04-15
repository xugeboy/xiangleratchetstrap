import { Metadata, ResolvingMetadata } from "next";
import { generateSchema, embedSchema } from "@/utils/schema";
import { getBlogDetail,getAllBlogSlug } from "@/services/api/blog";
import { redirect } from "next/navigation";
interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
    const allBlogs = await getAllBlogSlug();
    return allBlogs.map((blog) => ({
      slug: blog.slug,
    }))
}
export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const slug = params.slug;
  const blogData = await getBlogSeoMeta(slug);

  if (!blogData || !blogData.content) {
    redirect("/404");
  }

  const { title, breadcrumbItems } = blogData;

  // Generate Schemas
  const articleSchema = generateSchema({
    type: "Article",
    data: article,
    slug,
  });
  const breadcrumbSchema = generateSchema({
    type: "BreadcrumbList",
    breadcrumbItems,
  });

  // Combine Schemas and Embed
  const schemaMetadata = embedSchema([articleSchema, breadcrumbSchema]); // Pass array to handle multiple schemas

  // Get previous metadata (optional, useful for inheriting layout metadata)
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: article.seo_title || article.title, // Use SEO fields from Strapi if available
    description: article.seo_description || article.excerpt,
    alternates: {
      // Add canonical URL
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${slug}`,
    },
    openGraph: {
      title: article.seo_title || article.title,
      description: article.seo_description || article.excerpt,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${slug}`,
      siteName: "Your Site Name", // From config or Strapi global settings
      images: article.cover_image?.data?.attributes
        ? [
            {
              url: article.cover_image.data.attributes.url.startsWith("http")
                ? article.cover_image.data.attributes.url
                : `${process.env.NEXT_PUBLIC_STRAPI_URL}${article.cover_image.data.attributes.url}`, // Ensure absolute URL
              width: article.cover_image.data.attributes.width || 1200, // Provide defaults
              height: article.cover_image.data.attributes.height || 630,
              alt:
                article.cover_image.data.attributes.alternativeText ||
                article.title,
            },
          ]
        : [], // Add fallback image if needed
      locale: "en_US", // Adjust as needed
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: article.author?.data?.attributes?.name
        ? [article.author.data.attributes.name]
        : undefined,
    },
    // twitter: { // Add Twitter card metadata if desired },
    other: {
      // <-- Embed the JSON-LD Schema here
      ...schemaMetadata, // Spread the generated schema object
      // ... any other custom meta tags
    },
  };
}

// ✅ SSR Blog Page
export default async function BlogPage({ params }: BlogPageProps) {
    const product = await getBlogDetail(params.slug);
  
    if (!product) {
      redirect("/404");
    }
  
    const breadcrumbs = generateProductBreadcrumbs(product);
  
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbs} />
        {/* Product content */}
        <div className="lg:grid lg:grid-cols-[40%_auto] lg:items-start lg:gap-x-8 py-8">
          {/* Image gallery */}
          <div>
            <ImageGallery images={product.gallery} />
            <RelatedArticles blogs={product.related_blogs} />
          </div>
  
          {/* Product info */}
          <ProductInfo product={product} />
        </div>
  
        {/* Product details */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Product details
          </h2>
          <Cav products={product.related_products} />
          <StatsSection />
          <QuoteForm />
        </div>
      </div>
    );
  }
  
