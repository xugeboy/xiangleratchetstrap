"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import type { Product } from "@/types/product"

interface ProductGridProps {
  products: Product[]
  viewMode: "grid" | "list" | "compact"
  itemsPerPage: number
}

export function ProductGrid({ products, viewMode, itemsPerPage }: ProductGridProps) {
  const [showAllProducts, setShowAllProducts] = useState(false)
  
  // Display limited products or all based on showAllProducts state
  const displayedProducts = showAllProducts ? products : products.slice(0, itemsPerPage)

  return (
    <div className="space-y-6">
      <div
        className={`
          ${viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : ""}
          ${viewMode === "list" ? "space-y-6" : ""}
          ${viewMode === "compact" ? "space-y-4" : ""}
        `}
      >
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className={`
              ${viewMode === "grid" ? "" : "border-b pb-4"}
              ${viewMode === "compact" ? "py-2" : ""}
            `}
          >
            {viewMode === "grid" && (
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4">
                  {product.gallery && product.gallery[0] && (
                    <Image
                      src={product.gallery[0].url || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-contain p-4"
                    />
                  )}
                </div>
                <h3 className="text-base font-medium text-center">{product.name}</h3>
                <div className="mt-4 text-center">
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-block bg-blue-700 text-white px-4 py-2 text-sm font-medium uppercase"
                  >
                    LEARN MORE
                  </Link>
                </div>
              </Link>
            )}

            {viewMode === "list" && (
              <div className="flex gap-6">
                <div className="w-40 h-40 flex-shrink-0 bg-gray-100">
                  {product.gallery && product.gallery[0] && (
                    <Image
                      src={product.gallery[0].url || "/placeholder.svg"}
                      alt={product.name}
                      width={160}
                      height={160}
                      className="object-contain w-full h-full p-2"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="text-lg font-medium">{product.name}</h3>
                  </Link>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {product.about || "No description available."}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-block bg-blue-700 text-white px-4 py-2 text-sm font-medium uppercase"
                    >
                      LEARN MORE
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {viewMode === "compact" && (
              <Link href={`/products/${product.slug}`} className="flex items-center gap-4">
                <div className="w-16 h-16 flex-shrink-0 bg-gray-100">
                  {product.gallery && product.gallery[0] && (
                    <Image
                      src={product.gallery[0].url || "/placeholder.svg"}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="object-contain w-full h-full"
                    />
                  )}
                </div>
                <h3 className="text-sm font-medium flex-1">{product.name}</h3>
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {products.length === 0 && (
        <div className="text-center py-12 border rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-2 text-sm text-gray-500">Please try adjusting the filters</p>
        </div>
      )}

      {/* Show More Button */}
      {!showAllProducts && products.length > itemsPerPage && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAllProducts(true)}
            className="inline-block border border-blue-700 text-blue-700 px-8 py-2 font-medium"
          >
            SHOW MORE
          </button>
        </div>
      )}
    </div>
  )
}
