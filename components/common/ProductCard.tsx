import { ShowCase } from "@/types/showCase";
import Image from "next/image";

interface ProductCardProps {
  product: ShowCase;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="mb-4 break-inside-avoid-column overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="relative aspect-w-1 aspect-h-1 w-full">
        <Image
          src={product.image.url}
          alt={product.image.alternativeText}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-700">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
