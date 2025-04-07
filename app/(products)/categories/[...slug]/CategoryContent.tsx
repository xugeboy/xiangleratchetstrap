"use client";

// Import necessary React hooks and Next.js functions
import React, { useEffect, useState, useMemo } from "react";
import { redirect } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// Import context hook and Category type
import { useCategories } from "@/contexts/CategoryContext";

// Import API service functions (assuming these remain necessary for products/filters)
import {
  getProductsByCategorySlug,
  getProductFilters,
} from "@/services/api/product";
// Keep breadcrumb generation if it relies on category hierarchy potentially beyond the basic slug match
import { generateCategoryBreadcrumbs } from "@/utils/breadcrumbs";

// Import components and hooks
import Breadcrumb from "@/components/common/Breadcrumb";
import { useMediaQuery } from "@/hooks/useMobile";
import { CategorySidebar } from "@/components/product/categories/CategorySidebar";
import { ViewControls } from "@/components/product/categories/ViewControls";
import { ProductGrid } from "@/components/product/categories/ProductGrid";
import { ProductModels } from "@/components/product/categories/ProductModels";

// Import types (adjust ProductCategory if it differs significantly from ContextCategory)
import type { ProductCategory } from "@/types/productCategory"; // Keep if needed for specific fields not in ContextCategory
import type { Product } from "@/types/product";
import type { BreadcrumbItem } from "@/types/breadcrumbItem";

// Define Filter types (assuming these are still needed)
interface FilterOption {
  value: string;
  label: string;
  count: number;
}
interface Filter {
  id: string;
  label: string;
  options: FilterOption[];
}

// Component Props
interface CategoryContentProps {
  slug: string[]; // Receive slug parts as props
}

export default function CategoryContent({ slug }: CategoryContentProps) {
  // 1. Get all categories from Context
  const { categories: allCategories } = useCategories();

  // 2. Determine the current category from context data based on slug prop
  const targetSlug = useMemo(() => slug.join("/"), [slug]); // Memoize targetSlug

  const currentCategory = useMemo(() => {
    if (allCategories.length === 0) {
      return undefined; // Categories not loaded yet
    }
    // Find category based on slug (assuming ContextCategory has a 'slug' field)
    const found = allCategories.find(
      (category) => category.slug === targetSlug
    );
    // You might need to adapt 'found' to the 'ProductCategory' type if they differ
    return found as ProductCategory | undefined; // Cast or map if necessary
  }, [allCategories, targetSlug]);

  // 3. State Management (excluding category and categories)
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("grid");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [showFilters, setShowFilters] = useState(false);
  const [productFilters, setProductFilters] = useState<Filter[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state for product/filter fetching
  const [error, setError] = useState<string | null>(null); // Add error state

  const isMobile = useMediaQuery("(max-width: 768px)");

  // 4. Redirect logic if category not found after context loads
  useEffect(() => {
    // Only redirect if context has loaded categories AND category wasn't found for the given slug
    if (allCategories.length > 0 && !currentCategory) {
      console.log(
        `Category for slug "${targetSlug}" not found in context. Redirecting...`
      );
      redirect("/404");
    }
  }, [allCategories, currentCategory, targetSlug]);

  // 5. useEffect for fetching data related to the *current* category (products, filters, breadcrumbs)
  useEffect(() => {
    // Only run fetch if we have a valid currentCategory determined from context
    if (currentCategory) {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        setProducts([]); // Clear previous products
        setFilteredProducts([]);
        setProductFilters([]);
        setBreadcrumbs([]);

        try {
          // Fetch products, filters, and generate breadcrumbs based on the currentCategory
          const [productsData, filtersData, breadcrumbItems] =
            await Promise.all([
              getProductsByCategorySlug(currentCategory.slug), // Use slug from found category
              getProductFilters(currentCategory.slug),
              generateCategoryBreadcrumbs(currentCategory), // Use found category object
            ]);

          setProducts(productsData.data);
          setFilteredProducts(productsData.data); // Initialize filtered products
          setBreadcrumbs(breadcrumbItems);

          // Process and set filters (same logic as before)
          const formattedFilters: Filter[] = [];
          Object.entries(filtersData).forEach(([key, values]) => {
            const options: FilterOption[] = Object.entries(values).map(
              ([optionKey, count]) => ({
                value: optionKey,
                label: optionKey, // Consider formatting the label more nicely if needed
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
        } catch (err) {
          console.error("Error fetching category-specific data:", err);
          setError("Failed to load product data. Please try again later.");
          // Optional: redirect to 404 or an error page on critical fetch errors
          // redirect("/404");
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    } else if (allCategories.length > 0 && !currentCategory) {
      // This case should be handled by the redirect effect, but as a fallback:
      setIsLoading(false); // Stop loading if category definitively not found
    } else {
      // Categories are still loading from context, keep loading state true
      setIsLoading(true);
    }
    // Depend on the category's identifier (e.g., slug or id) to refetch when the category changes
  }, [currentCategory, allCategories.length]); // Rerun when currentCategory is determined or changes

  // 6. useEffect for applying filters (remains the same)
  useEffect(() => {
    // Filter products based on selectedFilters
    const newFilteredProducts = products.filter((product) => {
      if (Object.keys(selectedFilters).length === 0) return true;
      return Object.entries(selectedFilters).every(
        ([filterId, selectedValues]) => {
          if (selectedValues.length === 0) return true;
          // Filtering logic based on filterId (same as before)
          switch (filterId) {
            case "material":
              return selectedValues.includes(product.material || "");
            case "working_load_limit": {
              const wll = Number.parseInt(product.working_load_limit || "0");
              return selectedValues.some((range) => {
                /* ... range logic ... */
              });
            }
            case "length": {
              const length = Number.parseInt(product.length || "0");
              return selectedValues.some((range) => {
                /* ... range logic ... */
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

  // 7. Event Handlers (handleFilterChange, clearAllFilters - remain the same)
  const handleFilterChange = (filterId: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[filterId] || [];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter((v) => v !== value)
        : [...currentFilters, value];
      // Clear empty filter arrays
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

  // --- Render Logic ---

  // Handle loading state while context or initial data is loading
  if (isLoading && !error) {
    // Show a more specific loading message if possible
    const loadingMessage =
      allCategories.length === 0
        ? "Loading categories..."
        : !currentCategory
        ? "Finding category..."
        : "Loading products and filters...";
    return (
      <div className="container mx-auto p-4 text-center">{loadingMessage}</div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-600">
        {error}
      </div>
    );
  }

  // Handle case where category is determined to be invalid (should have been redirected, but as fallback)
  if (!currentCategory) {
    // This should ideally not be reached due to the redirect effect
    return (
      <div className="container mx-auto p-4 text-center">
        Category not found.
      </div>
    );
  }

  // Main component render when data is ready
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
          {/* Pass allCategories from context and the derived currentCategory */}
          <CategorySidebar
            categories={allCategories as ProductCategory[]} // Cast or map if needed
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
            products={filteredProducts}
            viewMode={viewMode}
            itemsPerPage={itemsPerPage}
          />

          {/* Product Models Section */}
          {currentCategory && currentCategory.description && (
            <ProductModels
              categoryName={currentCategory.name}
              description={currentCategory.description}
            />
          )}
        </div>
      </div>
    </div>
  );
}
