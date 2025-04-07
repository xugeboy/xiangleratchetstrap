import Image from "next/image"
import Link from "next/link"
import { ChevronRightIcon } from "@heroicons/react/24/outline"

const products = [
  {
    title: "Heavy Duty Straps",
    description: "Industrial-grade strapping solutions for secure cargo transportation.",
    image: "/placeholder.svg?height=300&width=400",
    link: "/products/straps",
  },
  {
    title: "Cargo Control Systems",
    description: "Complete systems for efficient and safe cargo management.",
    image: "/placeholder.svg?height=300&width=400",
    link: "/products/cargo-control",
  },
  {
    title: "Specialized Fasteners",
    description: "High-quality fasteners designed for demanding industrial applications.",
    image: "/placeholder.svg?height=300&width=400",
    link: "/products/fasteners",
  },
]

export default function ProductsSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            FEATURED <span className="text-cyan-600">PRODUCTS</span>
          </h2>
          <Link
            href="/products"
            className="mt-4 md:mt-0 flex items-center text-cyan-600 font-medium hover:text-cyan-700"
          >
            View All Products
            <ChevronRightIcon className="ml-1 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <Link
                  href={product.link}
                  className="inline-flex items-center text-cyan-600 font-medium hover:text-cyan-700"
                >
                  Learn More
                  <ChevronRightIcon className="ml-1 h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

