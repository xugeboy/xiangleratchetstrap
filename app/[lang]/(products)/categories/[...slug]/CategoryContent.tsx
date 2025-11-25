"use client";

import React, { useEffect, useState, useMemo } from "react";

import { useCategories } from "@/contexts/CategoryContext";

import { getProductFilters } from "@/services/api/product";
import { generateCategoryBreadcrumbs } from "@/utils/breadcrumbs";

import Breadcrumb from "@/components/common/Breadcrumb";
import { useIsMobile } from "@/hooks/useMobile";
import { CategorySidebar } from "@/components/product/categories/CategorySidebar";
import { ViewControls } from "@/components/product/categories/ViewControls";
import { ProductGrid } from "@/components/product/categories/ProductGrid";

import type { ProductCategory } from "@/types/productCategory";
import type { BreadcrumbItem } from "@/types/breadcrumbItem";
import { FilterOption, ProductFilter } from "@/types/productFilter";
import BlocksClient from "@/components/common/BlocksClient";

import { generateSchema, embedSchema } from "@/utils/schema";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineXMark,
} from "react-icons/hi2";

interface CategoryContentProps {
  slug: string[];
  lang: string;
}

export default function CategoryContent({ slug, lang }: CategoryContentProps) {
  const { categories: allCategories } = useCategories();

  const targetSlug = useMemo(() => slug[slug.length - 1], [slug]);

  const currentCategory = useMemo(() => {
    if (allCategories.length === 0) {
      return undefined;
    }
    const found = allCategories.find(
      (category) => category.slug === targetSlug
    );
    return found as ProductCategory | undefined;
  }, [allCategories, targetSlug]);

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [breadcrumbItems, setbreadcrumbItems] = useState<BreadcrumbItem[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("grid");
  const ITEMS_PER_PAGE = 16;
  const [showFilters, setShowFilters] = useState(false);
  const [productFilters, setProductFilters] = useState<ProductFilter[]>([]);
  const [error, setError] = useState<string | null>(null); // Add error state

  const isMobile = useIsMobile();

  useEffect(() => {
    if (allCategories.length > 0 && !currentCategory) {
      console.log(
        `Category for slug "${targetSlug}" not found in context. Redirecting...`
      );
      // notFound()
    }
  }, [allCategories, currentCategory, targetSlug]);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentCategory) return;

      setError(null);
      setbreadcrumbItems([]);
      setProductFilters([]);

      try {
        const [filtersData, breadcrumbItems] = await Promise.all([
          getProductFilters(currentCategory.slug, lang),
          generateCategoryBreadcrumbs(currentCategory, lang),
        ]);
        setbreadcrumbItems(breadcrumbItems);

        const formattedFilters: ProductFilter[] = [];
        Object.entries(filtersData).forEach(([key, values]) => {
          const options: FilterOption[] = Object.entries(values).map(
            ([optionKey, count]) => ({
              value: optionKey,
              label: optionKey,
              count,
            })
          );
          if (options.length > 0) {
            formattedFilters.push({
              id: key,
              label: key
                .split("_")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" "),
              options,
            });
          }
        });
        setProductFilters(formattedFilters);
      } catch (err) {
        console.error("Error fetching filtered data:", err);
        setError("Failed to load products.");
      }
    };

    fetchData();
  }, [currentCategory, selectedFilters]); // 依赖 filters

  const handleFilterChange = (filterId: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[filterId] || [];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter((v) => v !== value)
        : [...currentFilters, value];
      const updatedFilters = { ...prev, [filterId]: newFilters };
      if (newFilters.length === 0) {
        delete updatedFilters[filterId];
      }
      return updatedFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (!currentCategory) {
    return null;
  }

  // --- 生成 Schema ---
  const articleSchema = generateSchema({
    lang: lang,
    type: "CollectionPage",
    data: currentCategory,
    slug: targetSlug,
  });
  const breadcrumbItemschema = generateSchema({
    type: "BreadcrumbList",
    breadcrumbItems,
  });
  const schemaMetadataJson = embedSchema(
    [articleSchema, breadcrumbItemschema].filter(Boolean)
  );

  // Main component render when data is ready
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <section>
        {/* Add JSON-LD to your page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
        />
      </section>
      <Breadcrumb items={breadcrumbItems} lang={lang} />

      <div className="flex flex-col md:flex-row py-4">
        {!isMobile ? (
          <div className="pr-8">
            <CategorySidebar
              currentCategory={currentCategory}
              productFilters={productFilters}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearAllFilters={clearAllFilters}
            />
          </div>
        ) : (
          // 移动端视图
          <div>
            {/* Mobile Filter Toggle */}
            {isMobile && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-gray-600 font-medium hover:text-black transition-colors"
              >
                <HiOutlineAdjustmentsHorizontal className="h-5 w-5" />
                <span className="font-medium">CATEGORIES & FILTERS</span>
              </button>
            )}
            <div
              className={`fixed inset-0 z-40 transition-all duration-300 ${
                showFilters ? "visible" : "invisible"
              }`}
              aria-hidden={!showFilters}
            >
              <div
                onClick={() => setShowFilters(false)}
                className={`absolute inset-0 bg-black/50 transition-opacity ${
                  showFilters ? "opacity-100" : "opacity-0"
                }`}
              />

              <div
                className={`relative h-full w-4/5 max-w-sm bg-white shadow-xl transition-transform duration-300 ${
                  showFilters ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <div className="flex justify-between items-center p-4">
                  <h2 className="text-lg font-semibold text-black">
                    CATEGORIES & FILTERS
                  </h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    aria-label="Close Customization Menu"
                  >
                    <HiOutlineXMark className="h-6 w-6" />
                  </button>
                </div>
                <div className="px-4 overflow-y-auto h-[calc(100vh-65px)]">
                  <CategorySidebar
                    currentCategory={currentCategory}
                    productFilters={productFilters}
                    selectedFilters={selectedFilters}
                    onFilterChange={handleFilterChange}
                    onClearAllFilters={clearAllFilters}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1">
          <ViewControls viewMode={viewMode} setViewMode={setViewMode} />

          <ProductGrid
            selectedFilters={selectedFilters}
            currentCategorySlug={currentCategory.slug}
            viewMode={viewMode}
            itemsPerPage={ITEMS_PER_PAGE}
            lang={lang}
          />

          {currentCategory && currentCategory.description && (
            <div className="mt-40 bg-white rounded-2xl p-2">
              <BlocksClient content={currentCategory.description} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
