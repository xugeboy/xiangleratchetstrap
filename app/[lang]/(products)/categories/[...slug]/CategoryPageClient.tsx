"use client";

import { useState } from "react";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineXMark,
} from "react-icons/hi2";

import { ViewControls } from "@/components/product/categories/ViewControls";
import { CategorySidebar } from "@/components/product/categories/CategorySidebar";
import { ProductGrid } from "@/components/product/categories/ProductGrid";

import type { Product } from "@/types/product";
import type { ProductCategory } from "@/types/productCategory";
import type { ProductFilter } from "@/types/productFilter";

interface CategoryPageClientProps {
  currentCategory: ProductCategory;
  initialProducts: Product[];
  initialTotalPages: number;
  itemsPerPage: number;
  lang: string;
  productFilters: ProductFilter[];
}

export default function CategoryPageClient({
  currentCategory,
  initialProducts,
  initialTotalPages,
  itemsPerPage,
  lang,
  productFilters,
}: CategoryPageClientProps) {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">(
    "grid"
  );
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filterId: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[filterId] || [];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter((item) => item !== value)
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

  return (
    <div className="flex flex-col md:flex-row py-4">
      <div className="hidden pr-8 md:block">
        <CategorySidebar
          currentCategory={currentCategory}
          productFilters={productFilters}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClearAllFilters={clearAllFilters}
        />
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setShowFilters((previous) => !previous)}
          className="flex items-center gap-2 text-gray-600 font-medium hover:text-black transition-colors"
        >
          <HiOutlineAdjustmentsHorizontal className="h-5 w-5" />
          <span className="font-medium">CATEGORIES & FILTERS</span>
        </button>

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
                aria-label="Close category filters"
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

      <div className="flex-1">
        <ViewControls viewMode={viewMode} setViewMode={setViewMode} />

        <ProductGrid
          selectedFilters={selectedFilters}
          currentCategorySlug={currentCategory.slug}
          viewMode={viewMode}
          itemsPerPage={itemsPerPage}
          lang={lang}
          initialProducts={initialProducts}
          initialTotalPages={initialTotalPages}
        />
      </div>
    </div>
  );
}
