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
import { ProductJsonLd, BreadcrumbJsonLd, NextSeo } from 'next-seo';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// --- 环境变量 ---
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateStaticParams() {
  const allProducts = await getAllProductSlug();
  return allProducts.map((product) => ({
    slug: product.slug,
  }))
}

// ✅ SSR Product Page
export default async function ProductPage({ params }: ProductPageProps) {
  const slug = params.slug;
  const product = await getProductBySlug(slug);
  const breadcrumbItems = generateProductBreadcrumbs(product);

  const seoTitle = "11";
  const seoDescription = "product.seo_description";
  const canonicalUrl = `${siteUrl}/products/${slug}`;
  const featuredImageUrl = product.featured_image?.url;

  if (!product) {
    redirect("/404");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        openGraph={{
          type: 'product',
          url: canonicalUrl,
          title: seoTitle,
          description: seoDescription,
          images: [
            {
              url: featuredImageUrl,
              width: 1200,
              height: 630,
              alt: seoTitle,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      {/* JSON-LD - 产品结构化数据 */}
      <ProductJsonLd
        productName={product.name}
        images={[featuredImageUrl]}
        description={seoDescription}
        sku={product.code}
      />

      {/* JSON-LD - 面包屑结构化数据 */}
      <BreadcrumbJsonLd
        itemListElements={breadcrumbItems.map((item: any, index: number) => ({
          position: index + 1,
          name: item.name,
          item: `${siteUrl}/products/${item.slug}`,
        }))}
      />
      <Breadcrumb items={breadcrumbItems} />
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
