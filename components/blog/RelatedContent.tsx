import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { Blog } from "@/types/blog";
import { useTranslations } from "next-intl";
import {
  getCloudinaryPublicId,
  getCombainedLocalePath,
} from "@/utils/formatUtils";

interface RelatedContentProps {
  products?: Product[];
  blogs?: Blog[];
  lang: string;
}

export default function RelatedContent({
  products = [],
  blogs = [],
  lang,
}: RelatedContentProps) {
  const t = useTranslations("Common");

  if ((!products || products.length === 0) && (!blogs || blogs.length === 0)) {
    return null;
  }

  return (
    <div className="space-y-12">
      {products && products.length > 0 && (
        <div className="bg-white">
          <div className="mx-auto py-2 sm:py-3">
            <h2 className="text-2xl font-bold tracking-tight text-black mb-4">
              Related Products
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => (
                <Link
                  key={product.code}
                  href={getCombainedLocalePath(
                    lang,
                    `products/${product.slug}`
                  )}
                  className="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={getCloudinaryPublicId(product.featured_image.url)}
                      alt={product.seo_title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg font-medium leading-snug group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {blogs && blogs.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-black">{t("relatedBlogs")}</h2>
          <div className="space-y-3">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={getCombainedLocalePath(lang, `blogs/${blog.slug}`)}
                className="flex items-start gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="flex-shrink-0 mt-1">
                  <svg 
                    className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                    />
                  </svg>
                </div>
                <h3 className="text-base font-medium leading-relaxed text-gray-800 group-hover:text-red-600 transition-colors">
                  {blog.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
