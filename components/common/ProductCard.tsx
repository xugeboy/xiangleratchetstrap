import { ShowCase } from "@/types/showCase";
import { getCloudinaryPublicId } from "@/utils/formatUtils";
import Image from "next/image";

interface ProductCardProps {
  product: ShowCase;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
<div className="mb-4 break-inside-avoid">
  {/* 不再需要一个独立的、限制宽高比的 div 来包裹图片 */}
  <Image
    src={getCloudinaryPublicId(product.image.url)}
    alt={product.image.alternativeText}
    width={800}   // 使用图片的原始宽度
    height={800} // 使用图片的原始高度
    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
    className="h-auto w-full rounded-lg object-cover" // 宽度100%, 高度自动
  />
  <div className="pl-1 mt-3">
    {/* <p>{product.description}</p> */}
  </div>
</div>
  );
};

export default ProductCard;
