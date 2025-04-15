import { Metadata, ResolvingMetadata } from "next";
import { getProductBySlug, getAllProductSlug } from "@/services/api/product";
import { generateProductBreadcrumbs } from "@/utils/breadcrumbs";
import { redirect } from "next/navigation";
import Breadcrumb from "@/components/common/Breadcrumb";
import StatsSection from "@/components/common/StatsSection";
import QuoteForm from "@/components/forms/QuoteForm";
import Cav from "@/components/product/Cav";
import ImageGallery from "@/components/product/ImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedArticles from "@/components/product/RelatedArticles";
import { fetchAPI } from "@/utils/fetch-api";
import { generateSchema } from "@/utils/schema";
import { embedSchema } from "@/utils/schema";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// --- 环境变量 ---
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// --- 数据获取辅助函数 (获取页面和元数据所需的所有数据) ---
async function getPageData(slug: string) {
  // 获取数据 (确保选择所有需要的字段: title, excerpt, cover_image, author, publishedAt, etc.)
  const productData = await fetchAPI(`/getProductMetaDataBySlug/${slug}`);; // 假设返回 { data: { attributes: {...} } } 或 null

  if (!productData || !productData.data || !productData.data.attributes) {
    return null; // 文章未找到
  }

  // 生成面包屑数据
  const breadcrumbItems = [
    { name: 'Xiangle Ratchet Strap', path: siteUrl },
    { name: 'XRS Blogs', path: `${siteUrl}/blogs` },
    { name: productData.title, path: `${siteUrl}/blogs/${slug}` }, // 当前页面
  ];

  return { productData, breadcrumbItems };
}

// --- 动态生成 Metadata ---
export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata // 可以访问父级解析后的元数据
): Promise<Metadata> {
  const slug = params.slug;
  const pageData = await getPageData(slug);

  // --- 处理未找到的情况 ---
  if (!pageData) {
    // 可以返回一个简单的 404 元数据
    return {
      title: 'product not found',
      description: 'Sorry, the product you requested could not be found.',
      robots: { index: false },
    };
  }

  const { productData, breadcrumbItems } = pageData;

  // --- 准备元数据所需信息 ---
  const pageTitle = productData.seo_title || productData.title; // 优先使用 Strapi 中定义的 SEO 标题
  const pageDescription = productData.seo_description || productData.excerpt; // 优先 SEO 描述，然后是摘要
  const canonicalUrl = `${siteUrl}/blogs/${slug}`;
  const featured_image = productData.featured_image;
  const ogImageUrl = featured_image.url
  const ogImageAlt = pageTitle;

  // --- 生成 Schema ---
  const articleSchema = generateSchema({ type: 'Product', data: productData, slug });
  const breadcrumbSchema = generateSchema({ type: 'BreadcrumbList', breadcrumbItems });
  const schemaMetadata = embedSchema([articleSchema, breadcrumbSchema].filter(Boolean)); // 过滤掉可能为 null 的 schema

  // --- 返回页面特定的 Metadata ---
  return {
    // **覆盖核心元数据**
    title: pageTitle, // 会自动应用 layout.tsx 中的 title.template
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl, // 设置当前页面的规范链接
      // languages: { 'en-US': `${siteUrl}/en/blogs/${slug}` }, // 如果有英文版
    },

    // **覆盖 Open Graph 元数据**
    openGraph: {
      // 继承 layout 中的 siteName, locale
      title: pageTitle, // 使用页面标题
      description: pageDescription, // 使用页面描述
      url: canonicalUrl, // 使用页面的规范链接
      publishedTime: productData.publishedAt, // ISO 8601 格式
      modifiedTime: productData.updatedAt, // 更新时间或发布时间
      images: [ // 提供具体图片
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },

    // **覆盖 Twitter 卡片元数据 (可选, 否则继承 Open Graph)**
    twitter: {
      // card: 'summary_large_image', // 通常继承 layout
      title: pageTitle,
      description: pageDescription,
      // images: [ogImageUrl], // 通常继承 openGraph.images
      // creator: 作者的 Twitter Handle (如果 Strapi 有存)
    },

    // **覆盖或添加其他元数据**
    // robots: { index: true, follow: true }, // 通常继承 layout 的设置
    other: {
      ['og:type']: 'product',
      ...schemaMetadata, // 嵌入 Article 和 BreadcrumbList Schema
    },
  };
}

export async function generateStaticParams() {
  const allProducts = await getAllProductSlug();
  return allProducts.map((product) => ({
    slug: product.slug,
  }))
}

// ✅ SSR Product Page
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

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
