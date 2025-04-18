import { Product } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link';
interface RelatedProductsProps {
    products?: Product[];
  }
  
  
  
  export default function Cav({ products = [] }: RelatedProductsProps) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers Also Viewed</h2>
  
          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id}>
                <div className="relative">
                  <div className="relative h-72 w-full overflow-hidden rounded-lg">
                    <Image alt={product.featured_image?.name} 
                    src={product.featured_image?.url} 
                    className="size-full object-cover" 
                    width={500}
                    height={500}
                    />
                  </div>
                  <div className="relative mt-4">
                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                  >
                    View Item<span className="sr-only">, {product.name}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  