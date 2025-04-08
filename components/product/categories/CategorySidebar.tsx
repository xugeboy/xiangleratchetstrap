"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { CategoryFilter } from "./CategoryFilter"
import type { ProductCategory } from "@/types/productCategory"
import { ProductFilter } from "@/types/productFilter";

interface CategorySidebarProps {
  categories: ProductCategory[]
  currentCategory: ProductCategory | null
  productFilters: ProductFilter[]
  selectedFilters: Record<string, string[]>
  onFilterChange: (filterId: string, value: string) => void
  onClearAllFilters: () => void
}

interface CategoryItemProps {
  category: ProductCategory
  currentCategory: ProductCategory | null
  depth: number
  expandedCategories: Record<number, boolean>
  onToggle: (categoryId: number) => void
}

function CategoryItem({ category, currentCategory, depth, expandedCategories, onToggle }: CategoryItemProps) {
  const isActive = currentCategory?.id === category.id
  const isExpanded = expandedCategories[category.id]
  const hasChildren = category.children.length > 0
  const showExpandButton = depth < 2 && hasChildren
  const indentClass = `ml-${depth * 4}`

  const getCategoryPath = (category: ProductCategory): string => {
    const path: string[] = []
    let current: ProductCategory | null = category
    
    while (current) {
      path.unshift(current.slug)
      current = current.parent || null
    }
    
    return `/categories/${path.join('/')}`
  }

  return (
    <div className={`${indentClass} ${depth === 0 ? 'mb-2' : ''}`}>
      <div className="flex items-center justify-between py-2 text-sm">
        <Link
          href={getCategoryPath(category)}
          className={`flex-grow text-left ${
            isActive 
              ? "font-bold text-blue-600" 
              : "font-medium text-gray-700 hover:text-blue-600"
          }`}
        >
          {category.name}
        </Link>
        {showExpandButton && (
          <button
            onClick={(e) => {
              e.preventDefault()
              onToggle(category.id)
            }}
            className="p-1"
          >
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="pl-4">
          {category.children?.map(child => (
            <CategoryItem
              key={child.id}
              category={child}
              currentCategory={currentCategory}
              depth={depth + 1}
              expandedCategories={expandedCategories}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
      {depth === 0 && <hr className="border-dashed border-gray-200 my-2" />}
    </div>
  )
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

  useEffect(() => {
    if (currentCategory) {
      const newExpandedCategories = { ...expandedCategories }
      
      const expandParents = (category: ProductCategory | null) => {
        if (!category) return
        newExpandedCategories[category.id] = true
        if (category.parent) {
          expandParents(category.parent)
        }
      }
      
      if (currentCategory.parent) {
        expandParents(currentCategory.parent)
      }
      setExpandedCategories(newExpandedCategories)
    }
  }, [currentCategory])

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
            .filter(cat => cat.parent == null)
            .map(category => (
              <CategoryItem
                key={category.id}
                category={category}
                currentCategory={currentCategory}
                depth={0}
                expandedCategories={expandedCategories}
                onToggle={toggleCategory}
              />
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

