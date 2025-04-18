import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import ImageComparisonSlider from "../common/ImageComparisonSlider";

const products = [
  {
    title: '1" Retractable Ratchet Strap',
    description:
      "Effortless retraction and secure hold—engineered for fast, tangle-free cargo control in industrial settings.",
    beforeImage:
      "https://res.cloudinary.com/duimeqqch/image/upload/v1744354646/mess_uonisw.jpg",
    afterImage:
      "https://res.cloudinary.com/duimeqqch/image/upload/v1744354626/clean_ruzf8i.jpg",
    beforeAlt: "before",
    afterAlt: "after",
    link: '/products/1inch-retractable-ratchet-strap',
  },
  {
    title: '1" 316 Garde Stainless Steel Ratchet Strap with Double J Hook',
    description:
      "Designed for marine and heavy-duty outdoor use, this corrosion-resistant tie-down strap offers long-lasting performance in harsh environments. Ideal for boats, trailers, and industrial applications.",
    beforeImage:
      "https://res.cloudinary.com/duimeqqch/image/upload/v1744957762/rusty_ratchet_buckle_dule2b.jpg",
    afterImage:
      "https://res.cloudinary.com/duimeqqch/image/upload/v1744957763/316ss_ratchet_buckle_yspy0c.jpg",
    beforeAlt: "before",
    afterAlt: "after",
    link: '/products/1inch-316-garde-stainless-steel-ratchet-strap-with-double-j-hook',
  }
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[4/3] relative">
                <ImageComparisonSlider
                  beforeImage={product.afterImage}
                  afterImage={product.beforeImage}
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
