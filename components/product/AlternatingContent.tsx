import { Gallery } from "@/types/gallery";
import Image from "next/image";

export interface ContentItem {
  Image: Gallery;
  title: string;
  Text: string;
}

interface AlternatingContentProps {
  items: ContentItem[];
}

export default function AlternatingContent({
  items = [],
}: AlternatingContentProps) {
  // 如果没有数据，不显示任何内容
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col w-full gap-8 mb-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Product details
      </h2>
      {items.map((item, index) => {
        // 如果既没有图片也没有描述，则跳过此项
        if (!item.Image && !item.title && !item.Text) {
          return null;
        }

        // 判断是否为偶数索引（0是第一个，为偶数）
        const isEven = index % 2 === 0;

        return (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 h-[380px] overflow-hidden rounded-lg"
          >
            {/* 图片部分 - 偶数行在左边，奇数行在右边 */}
            {item.Image.url && (
              <div
                className={`relative md:h-full w-full order-1 ${
                  isEven ? "md:order-1" : "md:order-2"
                }`}
              >
                <Image
                  src={item.Image.url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            )}

            {/* 文字部分 - 偶数行在右边，奇数行在左边 */}
            {item.title && (
              <div
                className={`flex flex-col justify-center p-6 text-white order-2
                  bg-[url('/topographic-pattern.svg')] bg-cover bg-no-repeat
                  ${isEven ? "md:order-2" : "md:order-1"}`}
              >
                {item.title && (
                  <h2 className="text-2xl font-bold mb-4 text-center text-black">
                    {item.title}
                  </h2>
                )}
                {item.Text && (
                  <p className="text-base text-center text-black">{item.Text}</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
