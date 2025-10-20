"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import type { Product } from "@/types/product";
import { filterProducts } from "@/services/api/product";
import {
  getBreadcrumbPathPrefix,
  getCloudinaryPublicId,
} from "@/utils/formatUtils";
import { useTranslations } from "next-intl";
import { ResponsivePagination } from "./ResponsivePagination";
import { FaPalette } from "react-icons/fa";

interface ProductGridProps {
  selectedFilters: Record<string, string[]>;
  currentCategorySlug: string;
  viewMode: "grid" | "list" | "compact";
  itemsPerPage: number;
  lang: string;
}

export function ProductGrid({
  selectedFilters,
  currentCategorySlug,
  viewMode,
  itemsPerPage,
  lang,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!currentCategorySlug) return;
      setIsLoading(true);
      setProducts([]);

      try {
        const response = await filterProducts(
          currentCategorySlug,
          currentPage,
          itemsPerPage,
          selectedFilters,
          lang
        );
        setProducts(response.data);
        setTotalPages(response.meta.pagination.pageCount);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentCategorySlug, selectedFilters, currentPage, itemsPerPage, lang]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const pathPrefix = getBreadcrumbPathPrefix(lang);
  const t = useTranslations("ProductGrid");
  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-sm text-black">{t("loading")}</p>
        </div>
      ) : (
        <>
          <div
            className={`
              ${
                viewMode === "grid"
                  ? "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : ""
              }
              ${viewMode === "list" ? "space-y-6" : ""}
              ${viewMode === "compact" ? "space-y-4" : ""}
            `}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={`
                  ${viewMode === "grid" ? "" : "border-b pb-4"}
                  ${viewMode === "compact" ? "py-2" : ""}
                `}
              >
                {viewMode === "grid" && (
                  <div className="group relative flex flex-col h-full">
                    <Link
                      prefetch={false}
                      href={`${pathPrefix}/products/${product.slug}`}
                      className="block"
                    >
                      <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4">
                        {product.featured_image && (
                          <Image
                            src={
                              getCloudinaryPublicId(
                                product.featured_image.url
                              )
                            }
                            alt={product.name}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-scale-down transition-transform duration-300 md:group-hover:scale-105"
                          />
                        )}
                      </div>
                      {product.code && (
                        <>
                          <div className="text-xs text-gray-500 mb-2 font-mono">
                            {product.code}
                          </div>
                          {product.customizable && (
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 text-xs font-semibold">
                                {t("fastCustomization")}
                                <InformationCircleIcon className="h-3.5 w-3.5 text-indigo-600" />
                              </span>
                              <Link
                                href={`${pathPrefix}/custom-print/online-builder?${product.slug}`}
                                aria-label="Go to Online Builder"
                                className="inline-flex items-center rounded-full border border-red-200 text-red-600 px-2 py-1 text-xs hover:bg-red-50"
                              >
                                <FaPalette className="h-4 w-4" />
                              </Link>
                            </div>
                          )}
                        </>
                      )}
                      <h3 className="font-medium line-clamp-3 md:group-hover:text-red-700 transition-colors duration-200 mb-4">
                        {product.name}
                      </h3>
                    </Link>
                    {/* grid视图下已移至标签行右侧，不再重复显示调色盘按钮 */}
                  </div>
                )}

                {viewMode === "list" && (
                  <div className="flex flex-row gap-4 sm:gap-6">
                    <div className="w-40 h-40 flex-shrink-0 bg-gray-100">
                      {product.featured_image && (
                        <Image
                          src={
                            getCloudinaryPublicId(product.featured_image.url) ||
                            "/placeholder.svg"
                          }
                          alt={product.name}
                          width={160}
                          height={160}
                          className="object-contain w-full h-full"
                        />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      {product.code && (
                        <>
                          <div className="text-xs text-gray-500 mb-1 font-mono">
                            {product.code}
                          </div>
                          {product.customizable && (
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 text-xs font-semibold">
                                {t("fastCustomization")}
                                <InformationCircleIcon className="h-3.5 w-3.5 text-indigo-600" />
                              </span>
                              <Link
                                href={`${pathPrefix}/custom-print/online-builder?${product.slug}`}
                                aria-label="Go to Online Builder"
                                className="inline-flex items-center rounded-full border border-red-200 text-red-600 px-2 py-1 text-xs hover:bg-red-50"
                              >
                                <FaPalette className="h-4 w-4" />
                              </Link>
                            </div>
                          )}
                        </>
                      )}
                      <Link href={`${pathPrefix}/products/${product.slug}`}>
                        <h3 className="font-medium hover:text-red-700 transition-colors duration-200 line-clamp-3">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="mt-2 text-sm text-black line-clamp-3 flex-1">
                        {product.about}
                      </p>

                      {/* 优化的按钮布局 - 移动端友好 */}
                      <div className="mt-4" />
                    </div>
                  </div>
                )}

                {viewMode === "compact" && (
                  <Link
                    href={`${pathPrefix}/products/${product.slug}`}
                    className="flex items-center gap-4"
                  >
                    <div className="w-16 h-16 flex-shrink-0 bg-gray-100">
                      {product.featured_image && (
                        <Image
                          src={
                            getCloudinaryPublicId(product.featured_image.url) ||
                            "/placeholder.svg"
                          }
                          alt={product.name}
                          width={64}
                          height={64}
                          className="object-contain w-full h-full"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      {product.code && (
                        <>
                          <div className="text-xs text-gray-500 mb-1 font-mono">
                            {product.code}
                          </div>
                          {product.customizable && (
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 text-xs font-semibold">
                                {t("fastCustomization")}
                                <InformationCircleIcon className="h-3.5 w-3.5 text-indigo-600" />
                              </span>
                              <Link
                                href={`${pathPrefix}/custom-print/online-builder?${product.slug}`}
                                aria-label="Go to Online Builder"
                                className="inline-flex items-center rounded-full border border-red-200 text-red-600 px-2 py-1 text-xs hover:bg-red-50"
                              >
                                <FaPalette className="h-4 w-4" />
                              </Link>
                            </div>
                          )}
                        </>
                      )}
                      <h3 className="text-sm font-medium">
                        {product.name}
                      </h3>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-black" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <ResponsivePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              t={t}
            />
          )}

          {/* No Results Message */}
          {products.length === 0 && !isLoading && (
            <div className="text-center py-12 rounded-lg">
              <h3 className="text-lg font-medium text-black">
                {t("noResults.title")}
              </h3>
              <p className="mt-2 text-sm text-black">
                {t("noResults.suggestion")}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
