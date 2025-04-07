import { Metadata } from "next";
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

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await fetchAPI(`/getProductMetaDataBySlug/${params.slug}`);

  if (!product) {
    redirect("/404");
  }

  return {
    title: product.seo_title,
    description: product.seo_description,
  };
}

export async function generateStaticParams() {
  return await getAllProductSlug();
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
