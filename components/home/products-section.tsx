import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const products = [
  {
    title: '1" Retractable Ratchet Strap',
    description:
      "Effortless retraction and secure hold—engineered for fast, tangle-free cargo control in industrial settings.",
    image: "/placeholder.svg?height=300&width=400",
    link: '/products/1"-retractable-ratchet-strap',
  },
  {
    title: '1.5" Motorcycle Cam Buckle Tie Down Strap with Swivel Carabiner',
    description:
      "Heavy-duty tie-down with swivel carabiner—built for secure, scratch-free motorcycle and powersport transport.",
    image: "/placeholder.svg?height=300&width=400",
    link: '/products/1.5"-motorcycle-tie-down-strap-with-swivel-carabiner',
  },
  {
    title: '1" Zero Friction Ratchet Straps',
    description:
      "Experience smooth, resistance-free tensioning—ideal for professionals needing speed, control, and reliability.",
    image: "/placeholder.svg?height=300&width=400",
    link: '/products/1"-zero-friction-ratchet-straps',
  },
];

export default function ProductsSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center flex-col md:flex-row justify-between mb-12 relative">
          <div className="flex-1" /> {/* 占位用 */}
          <h2 className="text-4xl font-bold text-gray-800 text-center flex-1">
            FEATURED <span className="text-amber-700">PRODUCTS</span>
          </h2>
          <Link
            href="/products"
            className="flex items-center text-amber-700 font-medium hover:text-cyan-700 flex-1 justify-end"
          >
            View All Products
            <ChevronRightIcon className="ml-1 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <Link
                  href={product.link}
                  className="inline-flex items-center text-amber-700 font-medium hover:text-cyan-700"
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
  );
}
