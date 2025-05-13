import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import ImageComparisonSlider from "../common/ImageComparisonSlider";
import { useLocale, useTranslations } from "next-intl";
import { getCombainedLocalePath } from "@/utils/formatUtils";

const productKeysAndImages = [
  {
    key: "retractable1Inch",
    beforeImage: "https://res.cloudinary.com/duimeqqch/image/upload/v1744354626/clean_ruzf8i.jpg", // Swapped to match original logic (beforeImage was afterImage)
    afterImage: "https://res.cloudinary.com/duimeqqch/image/upload/v1744354646/mess_uonisw.jpg",
  },
  {
    key: "stainlessSteel1Inch",
    beforeImage: "https://res.cloudinary.com/duimeqqch/image/upload/v1744957763/316ss_ratchet_buckle_yspy0c.jpg", // Swapped
    afterImage: "https://res.cloudinary.com/duimeqqch/image/upload/v1744957762/rusty_ratchet_buckle_dule2b.jpg",
  }
];

export default function ProductsSection() {
  const lang = useLocale();
  const t = useTranslations("ProductsSection");
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center flex-col md:flex-row justify-between mb-12 relative">
          <div className="flex-1" />
          <h2 className="text-4xl font-bold text-gray-800 text-center flex-1">
          {t.rich("title", {
              span: (chunks) => <span className="text-amber-700">{chunks}</span>,
            })}
          </h2>
          <Link
            href={getCombainedLocalePath(lang,"products")}
            className="flex items-center text-amber-700 font-medium hover:text-cyan-700 flex-1 justify-end"
          >
            {t("viewAllButton")}
            <ChevronRightIcon className="ml-1 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {productKeysAndImages.map((productVisual) => {
            const productKey = productVisual.key;
            // 6. 从翻译文件中获取 title, description, alt texts, 和 slug
            const title = t(`products.${productKey}.title`);
            const description = t(`products.${productKey}.description`);
            const slug = t(`products.${productKey}.slug`);
            const productLink = getCombainedLocalePath(lang,`products/${slug}`);

            return (
              <div
                key={productKey} // 使用 productKey 作为 key
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col" // Added rounded-lg
              >
                <div className="aspect-[4/3] relative w-full">
                  <ImageComparisonSlider
                    beforeImage={productVisual.beforeImage} 
                    afterImage={productVisual.afterImage}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow"> 
                  <h3 className="text-xl font-bold mb-2 text-gray-800 min-h-[3em] line-clamp-2"> {/* Fixed height for title */}
                    {title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow min-h-[4.5em] line-clamp-3"> {/* Fixed height for description */}
                    {description}
                  </p>
                  <div className="mt-auto"> {/* Pushes button to bottom */}
                    <Link
                      href={productLink}
                      className="inline-flex items-center text-amber-700 font-semibold hover:text-amber-800 transition-colors group" // Adjusted styling
                    >
                      {t("learnMoreLink")} {/* 7. 翻译链接文本 */}
                      <ChevronRightIcon className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
