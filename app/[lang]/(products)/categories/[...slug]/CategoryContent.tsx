"use client";

import React, { useEffect, useState, useMemo } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { useCategories } from "@/contexts/CategoryContext";

import { getProductFilters } from "@/services/api/product";
import { generateCategoryBreadcrumbs } from "@/utils/breadcrumbs";

import Breadcrumb from "@/components/common/Breadcrumb";
import { useMediaQuery } from "@/hooks/useMobile";
import { CategorySidebar } from "@/components/product/categories/CategorySidebar";
import { ViewControls } from "@/components/product/categories/ViewControls";
import { ProductGrid } from "@/components/product/categories/ProductGrid";

import type { ProductCategory } from "@/types/productCategory";
import type { BreadcrumbItem } from "@/types/breadcrumbItem";
import { FilterOption, ProductFilter } from "@/types/productFilter";
import BlocksClient from "@/components/common/BlocksClient";

import { generateSchema, embedSchema } from "@/utils/schema";

interface CategoryContentProps {
  slug: string[];
  lang: string;
}

export default function CategoryContent({ slug,lang }: CategoryContentProps) {
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

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [breadcrumbItems, setbreadcrumbItems] = useState<BreadcrumbItem[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("grid");
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [showFilters, setShowFilters] = useState(false);
  const [productFilters, setProductFilters] = useState<ProductFilter[]>([]);
  const [error, setError] = useState<string | null>(null); // Add error state

  const isMobile = useMediaQuery("(max-width: 768px)");

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
          getProductFilters(currentCategory.slug,lang),
          generateCategoryBreadcrumbs(currentCategory,lang),
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
    const articleSchema = generateSchema({ lang: lang,type: "CollectionPage", data: currentCategory, slug: targetSlug });
    const breadcrumbItemschema = generateSchema({
      type: "BreadcrumbList",
      breadcrumbItems,
    });
    const schemaMetadataJson = embedSchema(
      [articleSchema, breadcrumbItemschema].filter(Boolean)
    );

  // Main component render when data is ready
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-neutral-100">
      <section>
        {/* Add JSON-LD to your page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
        />
      </section>
      <Breadcrumb items={breadcrumbItems} lang={lang}/>

      {/* Mobile Filter Toggle */}
      {isMobile && (
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between bg-gray-100 p-3 rounded-md mb-4 mt-2"
        >
          <span className="font-medium">CATEGORIES & FILTERS</span>
          <ChevronDownIcon
            className={`h-5 w-5 transition-transform ${
              showFilters ? "rotate-180" : ""
            }`}
          />
        </button>
      )}

      <div className="flex flex-col md:flex-row gap-8 py-4">
        {/* Categories Sidebar */}
        <div
          className={`${
            isMobile && !showFilters ? "hidden" : "block"
          } w-full md:w-64 flex-shrink-0`}
        >
          {/* Pass allCategories from context and the derived currentCategory */}
          <CategorySidebar
            currentCategory={currentCategory}
            productFilters={productFilters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearAllFilters={clearAllFilters}
          />
        </div>

        {/* Products Section */}
        <div className="flex-1">
          {/* View Controls */}
          <ViewControls
            viewMode={viewMode}
            setViewMode={setViewMode}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />

          {/* Products Grid */}
          <ProductGrid
            selectedFilters={selectedFilters}
            currentCategorySlug={currentCategory.slug}
            viewMode={viewMode}
            itemsPerPage={itemsPerPage}
            lang={lang}
          />

          {/* Product Models Section */}
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
