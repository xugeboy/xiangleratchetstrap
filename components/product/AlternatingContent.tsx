import Image from "next/image";

export interface ContentItem {
  imageUrl?: string;
  description?: {
    title?: string;
    content?: string;
  };
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
    <div className="flex flex-col w-full gap-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Product details
        </h2>
      {items.map((item, index) => {
        // 如果既没有图片也没有描述，则跳过此项
        if (
          !item.imageUrl &&
          !item.description?.title &&
          !item.description?.content
        ) {
          return null;
        }

        // 判断是否为偶数索引（0是第一个，为偶数）
        const isEven = index % 2 === 0;

        return (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden rounded-lg"
          >
            {/* 图片部分 - 偶数行在左边，奇数行在右边 */}
            {item.imageUrl && (
              <div
                className={`relative h-[300px] md:h-full w-full order-1 ${
                  isEven ? "md:order-1" : "md:order-2"
                }`}
              >
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.description?.title || `Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* 文字部分 - 偶数行在右边，奇数行在左边 */}
            {(item.description?.title || item.description?.content) && (
              <div
                className={`flex flex-col justify-center p-6 bg-black text-white order-2 
                  bg-[url('/topographic-pattern.svg')] bg-cover bg-no-repeat
                  ${isEven ? "md:order-2" : "md:order-1"}`}
              >
                {item.description?.title && (
                  <h2 className="text-2xl font-bold mb-4 text-emerald-400">
                    {item.description.title}
                  </h2>
                )}
                {item.description?.content && (
                  <p className="text-base text-center">
                    {item.description.content}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
