'use client'

import { Product } from '@/types/product'
import Link from 'next/link'
import Image from 'next/image'

interface ProductListProps {
  products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="group"
        >
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            {product.gallery?.[0] && (
              <Image
                src={product.gallery[0]}
                alt={product.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
                width={500}
                height={500}
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
  )
} 