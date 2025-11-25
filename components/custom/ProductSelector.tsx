"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { Product } from "@/types/product";
import { filterProducts, getProductFilters } from "@/services/api/product";
import { getCloudinaryPublicId } from "@/utils/formatUtils";
import { useLocale } from "next-intl";
import { useCategories } from "@/contexts/CategoryContext";
import { ProductFilter } from "@/types/productFilter";

interface ProductSelectorProps {
  onProductSelect: (product: Product) => Promise<void>;
}

export default function ProductSelector({
  onProductSelect,
}: ProductSelectorProps) {
  const t = useTranslations("OnlineBuilder");
  const locale = useLocale();
  const { rootCategories } = useCategories();
  const [products, setProducts] = useState<Product[]>([]);
  const [productFilters, setProductFilters] = useState<ProductFilter[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const ITEMS_PER_PAGE = 16;
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // 过滤掉 webbing & hardware 分类
  const filteredCategories =
    rootCategories?.filter(
      (category) => category.documentId !== "tixhxm2sckxo2q0cadrk79i2"
    ) || [];

  // 初始化时默认选择第一个分类
  useEffect(() => {
    if (filteredCategories.length > 0 && !selectedCategory) {
      setSelectedCategory(filteredCategories[0].slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredCategories]);

  const buildFinalFilters = () => {
    const finalFilters: Record<string, string[]> = {};
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (key !== "customizable") {
        finalFilters[key] = value;
      }
    });
    finalFilters.customizable = ["true"];
    return finalFilters;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory) return;

      setIsLoading(true);
      try {
        const [filtersData, response] = await Promise.all([
          getProductFilters(selectedCategory, locale),
          filterProducts(
            selectedCategory,
            1,
            ITEMS_PER_PAGE,
            buildFinalFilters(),
            locale
          ),
        ]);

        const formattedFilters: ProductFilter[] = [];
        Object.entries(filtersData).forEach(([key, values]) => {
          if (
            key.toLowerCase().includes("size") ||
            key.toLowerCase().includes("width") ||
            key.toLowerCase().includes("length")
          ) {
            const options = Object.entries(values).map(
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
          }
        });

        setProductFilters(formattedFilters);
        setProducts(response.data);
        setTotalPages(response.meta.pagination.pageCount);
        setCurrentPage(1);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedFilters, selectedCategory, locale]);

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

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setSelectedFilters({ customizable: ["true"] }); // 清除之前的筛选条件，但保留customizable=true
    setCurrentPage(1); // 重置到第一页
  };

  const handleLoadMore = async () => {
    if (
      !selectedCategory ||
      isLoadingMore ||
      currentPage >= totalPages
    ) {
      return;
    }
    setIsLoadingMore(true);
    try {
      const response = await filterProducts(
        selectedCategory,
        currentPage + 1,
        ITEMS_PER_PAGE,
        buildFinalFilters(),
        locale
      );
      setProducts((prev) => [...prev, ...response.data]);
      setCurrentPage((prev) => prev + 1);
      setTotalPages(response.meta.pagination.pageCount);
    } catch (err) {
      console.error("Failed to load more products:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleProductClick = async (product: Product) => {
    // 将产品信息保存到sessionStorage
    sessionStorage.setItem("customPrintingProduct", JSON.stringify(product));
    await onProductSelect(product);
  };

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
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* 筛选侧边栏 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  className="lg:hidden"
                  onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                >
                  <ChevronDownIcon
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      isFilterExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              <div
                className={`space-y-3 ${
                  isFilterExpanded ? "block" : "hidden lg:block"
                }`}
              >
                {/* 分类选择 */}
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">
                    Product Category
                  </h4>
                  <div className="space-y-1.5">
                    {filteredCategories?.map((category) => (
                      <label
                        key={category.slug}
                        className="flex items-center space-x-2 text-sm cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category.slug}
                          onChange={() => handleCategoryChange(category.slug)}
                          className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700 text-xs">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size筛选条件 */}
                {productFilters.map((filter) => (
                  <div
                    key={filter.id}
                    className="border-b border-gray-200 pb-3 last:border-b-0"
                  >
                    <h4 className="font-medium text-gray-900 mb-2 text-sm">
                      {filter.label}
                    </h4>
                    <div className="space-y-1.5">
                      {filter.options.map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={
                              selectedFilters[filter.id]?.includes(
                                option.value
                              ) || false
                            }
                            onChange={() =>
                              handleFilterChange(filter.id, option.value)
                            }
                            className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700 text-xs">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 产品网格 */}
          <div className="lg:col-span-4">
            {!selectedCategory ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Please select a product category to view products.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-blue-300"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="aspect-square relative overflow-hidden bg-gray-100">
                        <Image
                          src={getCloudinaryPublicId(
                            product.featured_image?.url || ""
                          )}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* 渐变遮罩 - 从下向上 */}
                        <div className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent opacity-0 group-hover:h-2/3 group-hover:opacity-100 transition-all duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col justify-end h-full">
                            <div className="space-y-1">
                              <p className="text-white text-xs font-bold drop-shadow-lg">
                                {t("productSelector.sku")}: {product.code}
                              </p>
                              {product.working_load_limit && (
                                <p className="text-white/90 text-xs drop-shadow-md">
                                  {t("productSelector.wll")}: {product.working_load_limit}
                                </p>
                              )}
                              {product.assembly_break_strength && (
                                <p className="text-white/90 text-xs drop-shadow-md">
                                  {t("productSelector.bs")}: {product.assembly_break_strength}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {products.length === 0 && !isLoading && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      {t("productSelector.noProducts")}
                    </p>
                  </div>
                )}

                {products.length > 0 && currentPage < totalPages && (
                  <div className="text-center mt-8">
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className="px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoadingMore
                        ? t("productSelector.loadingMore")
                        : t("productSelector.loadMore")}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
