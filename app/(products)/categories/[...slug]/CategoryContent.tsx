"use client";

import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  getCategoryBySlug,
  getAllProductCategories,
} from "@/services/api/productCategory";
import {
  getProductsByCategorySlug,
  getProductFilters,
} from "@/services/api/product";
import { generateCategoryBreadcrumbs } from "@/utils/breadcrumbs";
import { redirect } from "next/navigation";
import Breadcrumb from "@/components/common/Breadcrumb";
import { useMediaQuery } from "@/hooks/useMobile";
import { CategorySidebar } from "@/components/product/categories/CategorySidebar";
import { ViewControls } from "@/components/product/categories/ViewControls";
import { ProductGrid } from "@/components/product/categories/ProductGrid";
import { ProductModels } from "@/components/product/categories/ProductModels";
import type { ProductCategory } from "@/types/productCategory";
import type { Product } from "@/types/product";
import type { BreadcrumbItem } from "@/types/breadcrumbItem";

interface CategoryContentProps {
  slug: string[];
}

// 定义筛选器选项类型
interface FilterOption {
  value: string;
  label: string;
  count: number;
}

// 定义筛选器类型
interface Filter {
  id: string;
  label: string;
  options: FilterOption[];
}

export default function CategoryContent({ slug }: CategoryContentProps) {
  const [category, setCategory] = useState<ProductCategory | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("grid");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [showFilters, setShowFilters] = useState(false);
  const [productFilters, setProductFilters] = useState<Filter[]>([]);

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all categories
        const allCategories = await getAllProductCategories();
        setCategories(allCategories);

        // Get current category
        const categoryData = await getCategoryBySlug(slug.join("/"));
        if (!categoryData) {
          redirect("/404");
        }
        setCategory(categoryData);

        // Set breadcrumbs
        const breadcrumbs = await generateCategoryBreadcrumbs(categoryData);
        setBreadcrumbs(breadcrumbs);

        // Get products list
        const productsData = await getProductsByCategorySlug(
          categoryData.slug.toString()
        );
        setProducts(productsData.data);
        setFilteredProducts(productsData.data);

        // 获取筛选条件数据
        const filtersData = await getProductFilters(
          categoryData.slug.toString()
        );
        const formattedFilters: Filter[] = [];

        // 将 API 返回的筛选条件数据转换为组件需要的格式
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
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
              options,
            });
          }
        });

        setProductFilters(formattedFilters);
      } catch (error) {
        console.error("Error fetching data:", error);
        redirect("/404");
      }
    };

    fetchData();
  }, [slug]);

  // Update filtered products when filters change
  useEffect(() => {
    // Filter products
    const newFilteredProducts = products.filter((product) => {
      // If no filters are selected, show all products
      if (Object.keys(selectedFilters).length === 0) return true;

      // Check each filter
      return Object.entries(selectedFilters).every(
        ([filterId, selectedValues]) => {
          // If no values are selected for this filter, pass
          if (selectedValues.length === 0) return true;

          switch (filterId) {
            case "material":
              return selectedValues.includes(product.material || "");
            case "working_load_limit": {
              const wll = Number.parseInt(product.working_load_limit || "0");
              return selectedValues.some((range) => {
                const [min, max] = range.split("-").map(Number);
                if (range.endsWith("+")) {
                  return wll >= min;
                }
                return wll >= min && wll <= max;
              });
            }
            case "length": {
              const length = Number.parseInt(product.length || "0");
              return selectedValues.some((range) => {
                const [min, max] = range.split("-").map(Number);
                if (range.endsWith("+")) {
                  return length >= min;
                }
                return length >= min && length <= max;
              });
            }
            case "grade":
              return selectedValues.includes(product.grade || "");
            case "finish":
              return selectedValues.includes(product.finish || "");
            default:
              return true;
          }
        }
      );
    });

    setFilteredProducts(newFilteredProducts);
  }, [selectedFilters, products]);

  const handleFilterChange = (filterId: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[filterId] || [];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter((v) => v !== value)
        : [...currentFilters, value];

      return {
        ...prev,
        [filterId]: newFilters,
      };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  if (!category) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb items={breadcrumbs} />

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
          <CategorySidebar
            categories={categories}
            currentCategory={category}
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
            products={filteredProducts}
            viewMode={viewMode}
            itemsPerPage={itemsPerPage}
          />

          {/* Product Models Section */}
          {category && category.description && (
            <ProductModels
              categoryName={category.name}
              description={category.description}
            />
          )}
        </div>
      </div>
    </div>
  );
}
