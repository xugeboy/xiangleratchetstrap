import { Gallery } from "@/types/gallery";
import { getCloudinaryPublicId } from "@/utils/formatUtils";
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
  return (
    <div className="flex flex-col w-full gap-8 mb-8">
      <h2 className="text-2xl font-bold tracking-tight text-black">
        Product details
      </h2>
      {items.map((item, index) => {
        // 判断是否为偶数索引（0是第一个，为偶数）
        const isEven = index % 2 === 0;

        return (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-lg"
          >
            <div
              className={`relative h-[350px] lg:h-[465px] w-full order-1 ${
                isEven ? "md:order-1" : "md:order-2"
              }`}
            >
              <Image
                src={getCloudinaryPublicId(item.Image.url)}
                alt={item.title}
                fill
                sizes="(min-width: 992px) calc((100vw - (100vw - 1800px)/2) * 0.5),(max-width: 991px) calc(90vw),  100vw"
                className="object-fill"
              />
            </div>
            <div
              className={`flex flex-col justify-center p-6 text-white order-2
                  bg-[url('/image/pattern-topography.svg')] bg-cover bg-no-repeat
                  ${isEven ? "md:order-2" : "md:order-1"}`}
            >
              <h2 className="text-2xl font-bold mb-4 text-center text-red-600">
                {item.title}
              </h2>
              <p className="text-base text-center text-white">{item.Text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
