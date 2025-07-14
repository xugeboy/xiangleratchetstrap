import { Metadata, ResolvingMetadata } from "next";
import { getProductBySlug, getAllProductSlug } from "@/services/api/product";
import { generateProductBreadcrumbs } from "@/utils/breadcrumbs";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common/Breadcrumb";
import StatsSection from "@/components/common/StatsSection";
import QuoteForm from "@/components/forms/QuoteForm";
import Cav from "@/components/product/Cav";
import ImageGallery from "@/components/product/ImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedArticles from "@/components/product/RelatedArticles";
import { generateSchema } from "@/utils/schema";
import { embedSchema } from "@/utils/schema";
import AlternatingContent from "@/components/product/AlternatingContent";
import { defaultUrlPrefix, localePrefixMap } from "@/middleware";
import VideoPlayer from "@/components/common/VideoPlayer";
import ProductDetailClient from "@/components/product/ProductDetailClient";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: {
    slug: string;
    lang: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

export async function generateStaticParams() {
  const allProducts = await getAllProductSlug();
  return allProducts.map((product) => ({
    slug: product.slug,
  }));
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug, lang } = await params;
  const currentLocale = lang;
  const productData = await getProductBySlug(slug, currentLocale);

  if (!productData) {
    notFound();
  }

  const pageTitle = productData.seo_title;
  const pageDescription = productData.seo_description;
  const featured_image = productData.featured_image;
  const ogImageUrl = featured_image.url;
  const ogImageAlt = pageTitle;

  let canonicalUrlPath;
  if (currentLocale === defaultUrlPrefix || currentLocale === undefined) {
    canonicalUrlPath = `/products/${productData.slug}`;
  } else {
    canonicalUrlPath = `/${currentLocale}/products/${productData.slug}`;
  }
  const canonicalUrl = `${siteUrl}${canonicalUrlPath}`;

  const languagesAlternate: Record<string, string> = {};

  for (const ietfTag in localePrefixMap) {
    const targetUrlPrefix = localePrefixMap[ietfTag];

    const slugForTargetPrefix = productData.allLanguageSlugs?.[targetUrlPrefix];

    if (slugForTargetPrefix) {
      let pathForLang = "";
      if (targetUrlPrefix === defaultUrlPrefix) {
        pathForLang = `${siteUrl}/products/${slugForTargetPrefix}`;
      } else {
        pathForLang = `${siteUrl}/${targetUrlPrefix}/products/${slugForTargetPrefix}`;
      }
      languagesAlternate[ietfTag] = pathForLang;
    }
  }

  // 设置 x-default
  const slugForXDefault = productData.allLanguageSlugs?.[defaultUrlPrefix];
  if (slugForXDefault) {
    languagesAlternate["x-default"] = `${siteUrl}/products/${slugForXDefault}`;
  }

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl, // 设置当前页面的规范链接
      languages:
        Object.keys(languagesAlternate).length > 0
          ? languagesAlternate
          : undefined,
    },
    openGraph: {
      title: pageTitle, // 使用页面标题
      description: pageDescription, // 使用页面描述
      url: canonicalUrl, // 使用页面的规范链接
      publishedTime: productData.publishedAt, // ISO 8601 格式
      modifiedTime: productData.updatedAt, // 更新时间或发布时间
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      title: pageTitle,
      description: pageDescription,
    },
    other: {
      ["og:type"]: "product",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, lang } = await params;
  const currentLocale = lang;

  const product = await getProductBySlug(slug, currentLocale);
  const breadcrumbItems = generateProductBreadcrumbs(product, currentLocale);

  if (!product) {
    notFound();
  }

  // --- 生成 Schema ---
  const articleSchema = generateSchema({
    lang: lang,
    type: "Product",
    data: product,
    slug,
  });
  const breadcrumbSchema = generateSchema({
    type: "BreadcrumbList",
    breadcrumbItems,
  });
  const schemaMetadataJson = embedSchema(
    [articleSchema, breadcrumbSchema].filter(Boolean)
  );

  return (
    <div className="mx-auto container px-4 sm:px-6 lg:px-8">
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
        />
      </section>
      <Breadcrumb items={breadcrumbItems} lang={currentLocale} />

      <ProductDetailClient product={product} lang={currentLocale} />
      <div className="mt-10 sm:mt-16 sm:px-0 lg:mt-0">
        <StatsSection />
        <QuoteForm />
        {product.related_products.length > 0 && (
          <Cav products={product.related_products} lang={currentLocale} />
        )}
        <RelatedArticles blogs={product.related_blogs} lang={lang} />
      </div>
    </div>
  );
}
