import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb from '@/components/common/Breadcrumb'
import { getAllCategories } from '@/services/api/productCategory'


export default async function ProductsPage() {
  const categoriesData = await getAllCategories()
    .catch((err: Error) => {
      console.error('Failed to fetch categories:', err)
      return null
    })

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Page Title */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">ALL Categories</h1>
        <p className="mt-4 text-lg text-gray-500">
          Browse our product categories to find the right professional equipment and solutions for your needs
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoriesData.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`} className="group">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              {category.image && (
                <Image
                  src={category.image.url}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-yellow-600">
                {category.name}
              </h3>
              {category.description && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {category.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Introduction */}
      <div className="mt-16 prose prose-lg max-w-none">
        <h2>professional industrial equipment and solutions</h2>
        <p>
          We are dedicated to providing high-quality equipment and solutions for the industrial and transportation industries. Whether you need industrial chains, protective equipment, or industrial belts, we have the right products for you. Our products are carefully selected to ensure performance and quality standards are met.
        </p>
      </div>
    </div>
  )
} 