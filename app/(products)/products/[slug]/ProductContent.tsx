"use client";

import { useEffect, useState } from "react";
import { getProductBySlug } from "@/services/api/product";
import { generateProductBreadcrumbs } from "@/utils/breadcrumbs";
import { redirect } from "next/navigation";
import { BreadcrumbItem } from "@/types/breadcrumbItem";
import { Product } from "@/types/product";
import Breadcrumb from "@/components/common/Breadcrumb";
import StatsSection from "@/components/common/StatsSection";
import QuoteForm from "@/components/forms/QuoteForm";
import Cav from "@/components/product/Cav";
import ImageGallery from "@/components/product/ImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedArticles from "@/components/product/RelatedArticles";

interface ProductContentProps {
  slug: string;
}

export default function ProductContent({ slug }: ProductContentProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    const loadProduct = async () => {
      const product = await getProductBySlug(slug);

      if (!product) {
        redirect("/404");
      }

      setProduct(product);
      const breadcrumbs = generateProductBreadcrumbs(product);
      setBreadcrumbs(breadcrumbs);
    };

    loadProduct();
  }, [slug]);

  if (!product) {
    return null;
  }

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
