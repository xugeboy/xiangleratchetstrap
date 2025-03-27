'use client'

import { useEffect, useState } from 'react'
import { getProductBySlug } from '@/services/api/product'
import { generateProductBreadcrumbs } from '@/utils/breadcrumbs'
import { redirect } from 'next/navigation'
import { BreadcrumbItem } from '@/types/breadcrumbItem'
import { Product } from '@/types/product'
import Breadcrumb from '@/components/common/Breadcrumb'

interface ProductContentProps {
  slug: string
}

export default function ProductContent({ slug }: ProductContentProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([])

  useEffect(() => {
    const loadProduct = async () => {
      const product = await getProductBySlug(slug)
      
      if (!product) {
        redirect('/404')
      }

      setProduct(product)
      const breadcrumbs = generateProductBreadcrumbs(product)
      setBreadcrumbs(breadcrumbs)
    }

    loadProduct()
  }, [slug])

  if (!product) {
    return null
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
        <Breadcrumb items={breadcrumbs} />
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>
          {product.about && (
            <p className="mt-4 text-lg text-gray-500">{product.about}</p>
          )}
        </div>
      </div>
    </div>
  )
} 