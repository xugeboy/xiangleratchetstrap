"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Product } from "@/types/product";
import { filterProducts } from "@/services/api/product";
import {
  getBreadcrumbPathPrefix,
  getCloudinaryPublicId,
} from "@/utils/formatUtils";
import { useTranslations } from "next-intl";
import { ResponsivePagination } from "./ResponsivePagination";

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
  }, [currentCategorySlug, selectedFilters, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
                  ? "grid grid-cols-2 lg:grid-cols-4 gap-6"
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
                  <Link
                    prefetch={false}
                    href={`${pathPrefix}/products/${product.slug}`}
                    className="group flex flex-col h-full text-center hover:underline"
                  >
                    {/* 图片部分 */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4">
                      {product.featured_image && (
                        <Image
                          src={getCloudinaryPublicId(
                            product.featured_image.url
                          )}
                          alt={product.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-scale-down"
                        />
                      )}
                    </div>

                    {/* 标题部分 */}
                    <h3 className="text-base font-medium">
                      {product.name}
                    </h3>

                    {/* 按钮容器 */}
                    {/* 2. 使用 mt-auto 将按钮推到底部 */}
                    <div className="mt-auto pt-4">
                      <span className="inline-block w-full bg-black text-white px-4 py-3 rounded-md text-md font-bold uppercase">
                        {t("learnMoreButton")}
                      </span>
                    </div>
                  </Link>
                )}

                {viewMode === "list" && (
                  <div className="flex gap-6">
                    <div className="w-40 h-40 flex-shrink-0 bg-gray-100">
                      {product.featured_image && (
                        <Image
                          src={getCloudinaryPublicId(
                            product.featured_image.url
                          )}
                          alt={product.name}
                          width={160}
                          height={160}
                          className="object-contain w-full h-full"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <Link href={`${pathPrefix}/products/${product.slug}`}>
                        <h3 className="text-lg font-medium">{product.name}</h3>
                      </Link>
                      <p className="mt-2 text-sm text-black line-clamp-3">
                        {product.about}
                      </p>
                      <div className="mt-4">
                        <Link
                          href={`${pathPrefix}/products/${product.slug}`}
                          className="inline-block  bg-black text-white px-4 py-2 rounded-md text-md font-bold uppercase"
                        >
                          {t("learnMoreButton")}
                        </Link>
                        <Link
                          href={`${pathPrefix}/custom-print/online-builder?${product.slug}`}
                          className="inline-block  bg-black text-white px-4 py-2 rounded-md text-md font-bold uppercase"
                        >
                          {t("learnMoreButton")}
                        </Link>
                      </div>
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
                          src={getCloudinaryPublicId(
                            product.featured_image.url
                          )}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="object-contain w-full h-full"
                        />
                      )}
                    </div>
                    <h3 className="text-sm font-medium flex-1">
                      {product.name}
                    </h3>
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
