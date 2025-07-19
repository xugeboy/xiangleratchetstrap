import { Product } from '@/types/product'
import { getCloudinaryPublicId, getCombainedLocalePath } from '@/utils/formatUtils';
import Image from 'next/image'
import Link from 'next/link';
interface RelatedProductsProps {
    products?: Product[];
    lang:string;
  }
  
  
  export default function Cav({ products = [],lang }: RelatedProductsProps) {
    return (
      <div className="bg-white">
        <div className="mx-auto py-10 sm:py-12">
          <h2 className="text-2xl font-bold tracking-tight text-black">Related Products</h2>
  
          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:gap-x-6">
            {products.map((product) => (
              <Link 
              key={product.code}
              href={getCombainedLocalePath(lang, `products/${product.slug}`)}
              className="flex items-center gap-4 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={getCloudinaryPublicId(product.featured_image.url)}
                    alt={product.seo_title}
                    fill
                    className="object-cover rounded-lg"
                  />
              </div>
              <h3 className="text-lg font-medium group-hover:text-green-600 transition-colors">
                {product.name}
              </h3>
            </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }
  