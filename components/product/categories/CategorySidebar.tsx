"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { CategoryFilter } from "./CategoryFilter"
import type { ProductCategory } from "@/types/productCategory"

interface Filter {
  id: string
  label: string
  options: {
    value: string
    label: string
    count: number
  }[]
}

interface CategorySidebarProps {
  categories: ProductCategory[]
  currentCategory: ProductCategory | null
  productFilters: Filter[]
  selectedFilters: Record<string, string[]>
  onFilterChange: (filterId: string, value: string) => void
  onClearAllFilters: () => void
}

export function CategorySidebar({
  categories,
  currentCategory,
  productFilters,
  selectedFilters,
  onFilterChange,
  onClearAllFilters,
}: CategorySidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({})

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  return (
    <div className="space-y-1">
      {/* Categories Navigation */}
      <div className="bg-white">
        <h2 className="text-lg font-bold text-gray-900 py-4 uppercase">Categories</h2>
        <nav className="space-y-1">
          {categories
            .filter((cat) => !cat.parent)
            .map((parentCategory) => (
              <div key={parentCategory.id}>
                <div className="flex items-center justify-between py-2 text-sm">
                  <Link
                    href={`/categories/${parentCategory.slug}`}
                    className={`flex-grow text-left ${
                      currentCategory?.id === parentCategory.id ? "font-bold" : "font-medium"
                    }`}
                  >
                    {parentCategory.name}
                  </Link>
                  {parentCategory.children && parentCategory.children.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleCategory(parentCategory.id)
                      }}
                      className="p-1"
                    >
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform ${
                          expandedCategories[parentCategory.id] ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                {expandedCategories[parentCategory.id] && parentCategory.children && (
                  <div className="ml-4 mt-1 border-gray-200">
                    {parentCategory.children.map((childCategory) => (
                      <Link
                        key={childCategory.id}
                        href={`/categories/${parentCategory.slug}/${childCategory.slug}`}
                        className={`block px-3 py-2 text-sm ${
                          currentCategory?.id === childCategory.id ? "font-bold" : "font-medium text-gray-600"
                        }`}
                      >
                        {childCategory.name}
                      </Link>
                    ))}
                  </div>
                )}
                <hr className="border-dashed border-gray-200 my-2" />
              </div>
            ))}
        </nav>
      </div>

      {/* Refine By Section */}
      <div className="bg-white mt-6">
        <h2 className="text-lg font-bold text-gray-900 py-4 uppercase">Refine By</h2>

        {/* Selected Filters */}
        {Object.keys(selectedFilters).length > 0 && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <button type="button" className="text-sm text-blue-600 hover:underline" onClick={onClearAllFilters}>
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
            <hr className="border-dashed border-gray-200 my-4" />
          </div>
        )}

        {/* Filters with dividers */}
        {productFilters.map((filter, index) => (
          <div key={filter.id}>
            <CategoryFilter
              filter={filter}
              selectedValues={selectedFilters[filter.id] || []}
              onChange={onFilterChange}
            />
            {index < productFilters.length - 1 && <hr className="border-dashed border-gray-200" />}
          </div>
        ))}
      </div>
    </div>
  )
}

