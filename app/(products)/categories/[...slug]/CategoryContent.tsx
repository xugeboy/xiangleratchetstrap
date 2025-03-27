'use client'

import { useEffect, useState } from 'react'
import { getCategoryBySlug } from '@/services/api/productCategory'
import { getProductsByCategory } from '@/services/api/product'
import { generateCategoryBreadcrumbs } from '@/utils/breadcrumbs'
import { redirect } from 'next/navigation'
import { ProductCategory } from '@/types/productCategory'
import { Product } from '@/types/product'
import { BreadcrumbItem } from '@/types/breadcrumbItem'
import Link from 'next/link'
import Breadcrumb from '@/components/common/Breadcrumb'

interface CategoryContentProps {
  slug: string[]
}

export default function CategoryContent({ slug }: CategoryContentProps) {
  const [category, setCategory] = useState<ProductCategory | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([])

  useEffect(() => {
    const loadCategory = async () => {
      const category = await getCategoryBySlug(slug)
      
      if (!category) {
        redirect('/404')
      }

      setCategory(category)
      const breadcrumbs = generateCategoryBreadcrumbs(category)
      setBreadcrumbs(breadcrumbs)

      // 加载分类下的产品
      const products = await getProductsByCategory(category.slug)
      setProducts(products)
    }

    loadCategory()
  }, [slug])

  if (!category) {
    return null
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <Breadcrumb items={breadcrumbs} />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {category.name}
          </h1>
          {category.description && (
            <p className="mt-4 text-lg text-gray-500">{category.description}</p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                {product.gallery?.[0] && (
                  <img
                    src={product.gallery[0]}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                )}
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              {product.code && (
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.code}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 