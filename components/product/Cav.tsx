import { Product } from '@/types/product'
import { getCombainedLocalePath } from '@/utils/formatUtils';
import Image from 'next/image'
import Link from 'next/link';
interface RelatedProductsProps {
    products?: Product[];
    lang:string;
  }
  
  
  export default function Cav({ products = [],lang }: RelatedProductsProps) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-10 sm:py-12 lg:max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight text-black">Related Products</h2>
  
          <div className="mt-8 grid grid-cols-2 gap-y-12 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id}>
                <div className="relative">
                  <div className="relative w-full overflow-hidden rounded-lg">
                    <Image alt={product.name} 
                    src={product.featured_image?.url} 
                    className="size-full object-fill" 
                    width={500}
                    height={500}
                    />
                  </div>
                  <div className="relative mt-4">
                    <h3 className="text-sm font-medium text-black">{product.name}</h3>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href={getCombainedLocalePath(lang, `products/${product.slug}`)}
                    className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-black hover:bg-gray-200"
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
  