"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { CategoryFilter } from "./CategoryFilter"
import type { ProductCategory } from "@/types/productCategory"
import { ProductFilter } from "@/types/productFilter"
import { useCategories } from "@/contexts/CategoryContext"
import { useLocale, useTranslations } from "next-intl"
import { getCombainedLocalePath } from "@/utils/formatUtils"

interface CategorySidebarProps {
  currentCategory: ProductCategory | null
  productFilters: ProductFilter[]
  selectedFilters: Record<string, string[]>
  onFilterChange: (filterId: string, value: string) => void
  onClearAllFilters: () => void
}

export function CategorySidebar({
  currentCategory,
  productFilters,
  selectedFilters,
  onFilterChange,
  onClearAllFilters,
}: CategorySidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({})
  const { categories, categoryMap, rootCategories } = useCategories()
  const locale = useLocale()
  useEffect(() => {
    if (currentCategory) {
      const newExpandedCategories = { ...expandedCategories }

      categories.forEach((category) => {
        if (category.children?.some((child) => child.id === currentCategory.id)) {
          newExpandedCategories[category.id] = true
        }
      })

      setExpandedCategories(newExpandedCategories)
    }
  }, [currentCategory, categories])

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  const renderCategory = (category: ProductCategory, depth = 0) => {
    const isActive = currentCategory?.id === category.id
    const isExpanded = expandedCategories[category.id]
    const hasChildren = category.children && category.children.length > 0

    return (
      <div key={category.id} className={`${depth > 0 ? "ml-4" : ""}`}>
        <div className="flex items-center justify-between py-2">
          <Link prefetch={false}
            href={getCombainedLocalePath(locale,`categories/${category.slug}`)}
            className={`flex-grow text-left text-sm ${
              isActive ? "font-bold text-red-600" : "text-black hover:text-red-600"
            }`}
          >
            {category.name}
          </Link>
          {hasChildren && (
            <button
              onClick={() => toggleCategory(category.id)}
              className="p-1"
              aria-label={isExpanded ? t("collapseCategory") : t("expandCategory")}
            >
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="pl-2 border-l border-gray-200">
            {category.children.map((childRef) => {
              const childCategory = categoryMap.get(childRef.id)
              if (!childCategory) {
                return (
                  <div key={childRef.id} className="py-2 ml-2">
                    <Link prefetch={false} href={getCombainedLocalePath(locale,`categories/${childRef.slug}`)} className="text-sm text-black hover:text-red-600">
                      {childRef.name || childRef.slug.replace(/-/g, " ")}
                    </Link>
                  </div>
                )
              }

              return renderCategory(childCategory, depth + 1)
            })}
          </div>
        )}

        {depth === 0 && <hr className="my-2 border-gray-200" />}
      </div>
    )
  }

  const t = useTranslations("CategorySidebar");
  return (
    <div className="space-y-6">
      {/* Categories Navigation */}
      <div>
        <h2 className="text-lg font-bold text-black mb-4">{t("categories")}</h2>
        <nav className="space-y-1">{rootCategories.map((category) => renderCategory(category))}</nav>
      </div>

      {/* Filters Section */}
      {productFilters.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold text-black mb-4">{t("refineBy")}</h2>

          {/* Selected Filters */}
          {Object.keys(selectedFilters).length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{t("selectedFilters")}</span>
                <button type="button" className="text-sm text-red-600 hover:underline" onClick={onClearAllFilters}>
                {t("clearAll")}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedFilters).map(([filterId, values]) =>
                  values.map((value) => {
                    const filter = productFilters.find((f) => f.id === filterId)
                    const option = filter?.options.find((o) => o.value === value)
                    if (!option) return null

                    return (
                      <button
                        key={`${filterId}-${value}`}
                        type="button"
                        className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-black"
                        onClick={() => onFilterChange(filterId, value)}
                      >
                        {option.label}
                        <span className="ml-1">×</span>
                      </button>
                    )
                  }),
                )}
              </div>

              <hr className="my-4 border-gray-200" />
            </div>
          )}

          {/* Filter Groups */}
          {productFilters.map((filter, index) => (
            <div key={filter.id}>
              <CategoryFilter
                filter={filter}
                selectedValues={selectedFilters[filter.id] || []}
                onChange={onFilterChange}
              />
              {index < productFilters.length - 1 && <hr className="my-4 border-gray-200" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
