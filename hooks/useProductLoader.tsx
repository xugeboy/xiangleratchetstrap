"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Product } from "@/types/product";
import type { colorSelection } from '@/types/Customizations';
import { getProductBySlug } from '@/services/api/product';
import { useLocale } from 'next-intl';

export const useProductLoader = () => {
  const [product, setProduct] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const locale = useLocale()

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        const slug = searchParams.keys().next().value;

        if (slug) {
          console.log(`Product slug found in URL: ${slug}. Fetching from API...`);
          const fetchedProduct = await getProductBySlug(slug,locale); 

          if (fetchedProduct) {
            if (fetchedProduct.strap_colors?.colorSelection) {
              const filteredColorSelection = fetchedProduct.strap_colors.colorSelection.filter(
                (item: colorSelection) => item.name !== "25mm Camouflage"
              );
              fetchedProduct.strap_colors.colorSelection = filteredColorSelection;
            }
            setProduct(fetchedProduct);
          } else {
            console.error(`Product with slug "${slug}" not found via API.`);
            setProduct(undefined);
          }
        } else {
          console.log("No product slug in URL, attempting to load from sessionStorage...");
          const productJson = sessionStorage.getItem("customPrintingProduct");
          if (productJson) {
            const parsedProduct = JSON.parse(productJson) as Product;
            
            if (parsedProduct.strap_colors?.colorSelection) {
                const filteredColorSelection = parsedProduct.strap_colors.colorSelection.filter(
                  (item: colorSelection) => item.name !== "25mm Camouflage"
                );
                parsedProduct.strap_colors.colorSelection = filteredColorSelection;
            }
            
            setProduct(parsedProduct);
          } else {
            console.warn("No product info found in sessionStorage either.");
          }
        }
      } catch (error) {
        console.error("Failed to load product", error);
        setProduct(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [locale, searchParams]);

  return { product, isLoading };
};
