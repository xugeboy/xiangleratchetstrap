"use client";

import { useState, useEffect } from 'react';
import type { Product } from "@/types/product";
import type { colorSelection } from '@/types/Customizations';

export const useProductLoader = () => {
  const [product, setProduct] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const productJson = sessionStorage.getItem("customPrintingProduct");
      if (productJson) {
        const parsedProduct = JSON.parse(productJson) as Product;
        
        // Ensure strap_colors and colorSelection exist before filtering
        if (parsedProduct.strap_colors?.colorSelection) {
            const filteredColorSelection = parsedProduct.strap_colors.colorSelection.filter(
              (item: colorSelection) => item.name !== "25mm Camouflage"
            );
            parsedProduct.strap_colors.colorSelection = filteredColorSelection;
        }
        
        setProduct(parsedProduct);
      } else {
        console.warn("No product info found in sessionStorage.");
      }
    } catch (error) {
      console.error("Failed to parse product info from sessionStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { product, isLoading };
};
