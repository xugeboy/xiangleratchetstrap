"use client";

import { Product } from "@/types/product";
import Link from "next/link";
import Specifications from "./Specifications";
import Description from "./Description";
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("@/components/common/VideoPlayer"), {
  ssr: false,
});
interface ProductInfoProps {
  product: Product;
}

const services = [
  {
    title: "Tailored Business Programs",
    link: "/business-solutions",
    linkText: "Partner with Us",
  },
  {
    title: "Questions? Need it custom?",
    link: "/contact-us",
    linkText: "We can help!",
  },
];

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div>
      {/* Product Basic Info */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 font-mono">{product.name}</h1>
        <div className="space-y-2">
          <p className="text-gray-600">ITEM #{product.code}</p>
          <div className="flex items-center space-x-2 text-gray-600">
            <span>In Stock, Made to Order</span>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {services.map((service, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              {service.title}
            </h3>
            <Link
              href={service.link}
              className="text-amber-700 hover:text-blue-700"
            >
              {service.linkText}
            </Link>
          </div>
        ))}
        <div className="p-6 rounded-lg flex items-center justify-center">
          <a
            href="/request-quote"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-blue-500 
          rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 shadow-sm"
          >
            Request Quote
          </a>
        </div>
      </div>

      {/* Specifications */}
      <Specifications product={product} />

      {/* Description */}
      <Description description={product.about} />

      {/* Video Section */}
      {product.youtube_url && (
        <VideoPlayer
          url={product.youtube_url}
          title={`How to Thread a ${product.name}`}
        />
      )}
    </div>
  );
}
