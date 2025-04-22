"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { CategoryFilter } from "./CategoryFilter"
import type { ProductCategory } from "@/types/productCategory"
import { ProductFilter } from "@/types/productFilter"
import { useCategories } from "@/contexts/CategoryContext"

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

  // Auto-expand categories based on current selection
  useEffect(() => {
    if (currentCategory) {
      const newExpandedCategories = { ...expandedCategories }

      // Find all parent categories that contain the current category as a child
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

  // Recursive function to render a category and its children
  const renderCategory = (category: ProductCategory, depth = 0) => {
    const isActive = currentCategory?.id === category.id
    const isExpanded = expandedCategories[category.id]
    const hasChildren = category.children && category.children.length > 0

    return (
      <div key={category.id} className={`${depth > 0 ? "ml-4" : ""}`}>
        <div className="flex items-center justify-between py-2">
          <Link
            href={`/categories/${category.slug}`}
            className={`flex-grow text-left text-sm ${
              isActive ? "font-bold text-amber-700" : "text-gray-700 hover:text-amber-700"
            }`}
          >
            {category.name}
          </Link>
          {hasChildren && (
            <button
              onClick={() => toggleCategory(category.id)}
              className="p-1"
              aria-label={isExpanded ? "Collapse category" : "Expand category"}
            >
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="pl-2 border-l border-gray-200">
            {category.children.map((childRef) => {
              // Look up the full child category from the map
              const childCategory = categoryMap.get(childRef.id)
              if (!childCategory) {
                // If we can't find the full category, render a simple link with the slug
                return (
                  <div key={childRef.id} className="py-2 ml-2">
                    <Link href={`/categories/${childRef.slug}`} className="text-sm text-gray-700 hover:text-amber-700">
                      {childRef.name || childRef.slug.replace(/-/g, " ")}
                    </Link>
                  </div>
                )
              }

              // Otherwise, recursively render the full child category
              return renderCategory(childCategory, depth + 1)
            })}
          </div>
        )}

        {depth === 0 && <hr className="my-2 border-gray-200" />}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Categories Navigation */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Categories</h2>
        <nav className="space-y-1">{rootCategories.map((category) => renderCategory(category))}</nav>
      </div>

      {/* Filters Section */}
      {productFilters.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Refine By</h2>

          {/* Selected Filters */}
          {Object.keys(selectedFilters).length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Selected Filters</span>
                <button type="button" className="text-sm text-amber-700 hover:underline" onClick={onClearAllFilters}>
                  Clear All
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
                        className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-800"
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
