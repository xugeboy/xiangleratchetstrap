"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import StepDrivenBuilder from "./StepDrivenBuilder";
import { Product } from "@/types/product";
import { getProductBySlug } from "@/services/api/product";

export default function OnlineBuilderShell() {
  const [loadedProduct, setLoadedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations("OnlineBuilder");

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      
      try {
        // 检查 URL slug 参数
        const slug = searchParams.get('slug');

        if (slug) {
          const fetchedProduct = await getProductBySlug(slug, locale);
          
          if (fetchedProduct) {
            setLoadedProduct(fetchedProduct);
            sessionStorage.setItem("customPrintingProduct", JSON.stringify(fetchedProduct));
            setIsLoading(false);
            return;
          } else {
          }
        }

        // 如果没有 URL slug，检查 sessionStorage
        const productJson = sessionStorage.getItem("customPrintingProduct");
        
        if (productJson) {
          try {
            const parsedProduct = JSON.parse(productJson) as Product;
            setLoadedProduct(parsedProduct);
            setIsLoading(false);
            return;
          } catch (parseError) {
            console.error("Failed to parse product from sessionStorage:", parseError);
            sessionStorage.removeItem("customPrintingProduct");
          }
        }
        setLoadedProduct(null);
      } catch (error) {
        console.error("OnlineBuilderShell: Failed to load product", error);
        setLoadedProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [searchParams, locale]);

  // 如果有加载的产品，直接进入第二步（设计印字）
  // 否则进入第一步（选择产品）
  const initialStep = loadedProduct ? 'customization' : 'product-selection';
  
  
  // 显示加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("loading.productData")}</p>
        </div>
      </div>
    );
  }
  
  return (
    <StepDrivenBuilder 
      initialStep={initialStep}
      initialProduct={loadedProduct}
    />
  );
}