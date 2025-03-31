'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getCategoryBySlug, getAllProductCategories } from '@/services/api/productCategory'
import { getProductsByCategorySlug } from '@/services/api/product'
import { generateCategoryBreadcrumbs } from '@/utils/breadcrumbs'
import { redirect } from 'next/navigation'
import Breadcrumb from '@/components/common/Breadcrumb'
import { ProductCategory } from '@/types/productCategory'
import { Product } from '@/types/product'
import { productFilters } from '@/data/productFilters'
import { BreadcrumbItem } from '@/types/breadcrumbItem'

interface CategoryContentProps {
  slug: string[]
}

export default function CategoryContent({ slug }: CategoryContentProps) {
  const [category, setCategory] = useState<ProductCategory | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all categories
        const allCategories = await getAllProductCategories()
        setCategories(allCategories)

        // Get current category
        const categoryData = await getCategoryBySlug(slug.join('/'))
        if (!categoryData) {
          redirect('/404')
        }
        setCategory(categoryData)

        // Set breadcrumbs
        const breadcrumbs = await generateCategoryBreadcrumbs(categoryData)
        setBreadcrumbs(breadcrumbs)

        // Get products list
        const productsData = await getProductsByCategorySlug(categoryData.slug.toString())
        setProducts(productsData.data)

        // Expand parent category if current category has a parent
        if (categoryData.parent) {
          setExpandedCategories(prev => ({
            ...prev,
            [categoryData.parent!.id]: true
          }))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        redirect('/404')
      }
    }

    fetchData()
  }, [slug])

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }))
  }

  const handleFilterChange = (filterId: string, value: string) => {
    setSelectedFilters(prev => {
      const currentFilters = prev[filterId] || []
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter(v => v !== value)
        : [...currentFilters, value]
      
      return {
        ...prev,
        [filterId]: newFilters
      }
    })
  }

  // Filter products
  const filteredProducts = products.filter(product => {
    // If no filters are selected, show all products
    if (Object.keys(selectedFilters).length === 0) return true

    // Check each filter
    return Object.entries(selectedFilters).every(([filterId, selectedValues]) => {
      // If no values are selected for this filter, pass
      if (selectedValues.length === 0) return true

      switch (filterId) {
        case 'material':
          return selectedValues.includes(product.material || '')
        case 'working_load_limit': {
          const wll = parseInt(product.working_load_limit || '0')
          return selectedValues.some(range => {
            const [min, max] = range.split('-').map(Number)
            if (range.endsWith('+')) {
              return wll >= min
            }
            return wll >= min && wll <= max
          })
        }
        case 'length': {
          const length = parseInt(product.length || '0')
          return selectedValues.some(range => {
            const [min, max] = range.split('-').map(Number)
            if (range.endsWith('+')) {
              return length >= min
            }
            return length >= min && length <= max
          })
        }
        case 'grade':
          return selectedValues.includes(product.grade || '')
        case 'finish':
          return selectedValues.includes(product.finish || '')
        default:
          return true
      }
    })
  })

  if (!category) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb items={breadcrumbs} />

      <div className="flex gap-8 py-8">
        {/* Categories Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-4 space-y-6">
            {/* Categories Navigation */}
            <div className="bg-white rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 p-4 border-b">Product Categories</h2>
              <nav className="space-y-1 p-2">
                {categories.filter(cat => !cat.parent).map((parentCategory) => (
                  <div key={parentCategory.id}>
                    <button
                      onClick={() => toggleCategory(parentCategory.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md ${
                        category?.id === parentCategory.id || category?.parent?.id === parentCategory.id
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Link
                        href={`/categories/${parentCategory.slug}`}
                        className="flex-grow text-left"
                      >
                        {parentCategory.name}
                      </Link>
                      {parentCategory.children && parentCategory.children.length > 0 && (
                        <svg
                          className={`ml-2 h-5 w-5 transform transition-transform ${
                            expandedCategories[parentCategory.id] ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                    {expandedCategories[parentCategory.id] && parentCategory.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {parentCategory.children.map((childCategory) => (
                          <Link
                            key={childCategory.id}
                            href={`/categories/${parentCategory.slug}/${childCategory.slug}`}
                            className={`block px-3 py-2 text-sm rounded-md ${
                              category?.id === childCategory.id
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {childCategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 p-4 border-b">Filters</h2>
              <div className="p-4">
                {productFilters.map((filter) => (
                  <div key={filter.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">{filter.name}</h3>
                    <div className="space-y-3">
                      {filter.options.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`${filter.id}-${option.value}`}
                            value={option.value}
                            checked={selectedFilters[filter.id]?.includes(option.value) || false}
                            onChange={() => handleFilterChange(filter.id, option.value)}
                            className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                          />
                          <label
                            htmlFor={`${filter.id}-${option.value}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Filters */}
              {Object.keys(selectedFilters).length > 0 && (
                <div className="border-t p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-900">Selected Filters</h3>
                    <button
                      type="button"
                      className="text-sm text-yellow-600 hover:text-yellow-500"
                      onClick={() => setSelectedFilters({})}
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedFilters).map(([filterId, values]) =>
                      values.map(value => {
                        const filter = productFilters.find(f => f.id === filterId)
                        const option = filter?.options.find(o => o.value === value)
                        if (!option) return null
                        return (
                          <button
                            key={`${filterId}-${value}`}
                            type="button"
                            className="inline-flex items-center px-2.5 py-1.5 rounded-md text-sm bg-yellow-100 text-yellow-800"
                            onClick={() => handleFilterChange(filterId, value)}
                          >
                            {option.label}
                            <svg className="ml-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="group">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  {product.gallery && product.gallery[0] && (
                    <Image
                      src={product.gallery[0]}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-yellow-600">
                    {product.name}
                  </h3>
                  {product.working_load_limit && (
                    <p className="mt-1 text-sm text-gray-600">
                      Working Load: {product.working_load_limit}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* No Results Message */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
              <p className="mt-2 text-sm text-gray-500">
                Please try adjusting the filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 