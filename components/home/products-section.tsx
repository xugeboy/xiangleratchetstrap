import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import ImageComparisonSlider from "../common/ImageComparisonSlider";
import { useLocale, useTranslations } from "next-intl";
import { getCombainedLocalePath } from "@/utils/formatUtils";
import LoopingVideoCard from "../common/LoopingVideoCard";

const productKeysAndImages = [
  {
    key: "retractable1Inch",
    beforeImage: "/v1744354626/clean_ruzf8i.jpg",
    afterImage: "/v1744354646/mess_uonisw.jpg",
  },
  {
    key: "stainlessSteel1Inch",
    beforeImage: "/v1744957763/316ss_ratchet_buckle_yspy0c.jpg", // Swapped
    afterImage: "/v1744957762/rusty_ratchet_buckle_dule2b.jpg",
  },
];
const cloudinaryVideos = [
  {
    key: "retractable2Inch",
    video:
      "https://res.cloudinary.com/duimeqqch/video/upload/v1754447873/2inch_Retractable_Ratchet_Strap_1-1_ntskkm.mp4",
    poster:
      "https://res.cloudinary.com/duimeqqch/image/upload/f_webp,w_750,q_75/v1754443527/XLARS_02_2_82452b5623.jpg",
    alt: "2inch auto retractable ratchet strap",
  },
  {
    key: "spinFree1Inch",
    video:
      "https://res.cloudinary.com/duimeqqch/video/upload/v1752204618/spinfree_fzf13f.mp4",
    poster:
      "https://res.cloudinary.com/duimeqqch/image/upload/f_webp,w_750,q_75/v1752207183/XLRS_020_4_f652d4c1c5.jpg",
    alt: "1inch Spin Free Ratchet Strap, easy relesae",
  },
];

export default function ProductsSection() {
  const lang = useLocale();
  const t = useTranslations("ProductsSection");
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center flex-col md:flex-row justify-between mb-12 relative">
          <div className="flex-1" />
          <h2 className="text-4xl font-bold text-black text-center flex-1">
            {t.rich("title", {
              span: (chunks) => <span className="text-red-600">{chunks}</span>,
            })}
          </h2>
          <Link
            href={getCombainedLocalePath(lang, "products")}
            className="flex items-center text-red-600 font-medium hover:text-cyan-700 flex-1 justify-end"
          >
            {t("viewAllButton")}
            <ChevronRightIcon className="ml-1 h-5 w-5" />
          </Link>
        </div>

        <div className="grid container mx-auto grid-cols-1 gap-6 lg:grid-cols-2 pb-8">
          {cloudinaryVideos.map((item, index) => {
            const productKey = item.key;
            const slug = t(`products.${productKey}.slug`);
            const productLink = getCombainedLocalePath(
              lang,
              `products/${slug}`
            );
            return (
              <Link
                key={index}
                href={productLink}
                className="inline-flex items-center text-red-600 font-semibold hover:text-red-800 transition-colors group" // Adjusted styling
              >
                <LoopingVideoCard
                  key={index}
                  videoSrc={item.video}
                  posterSrc={item.poster}
                  alt={item.alt}
                />
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {productKeysAndImages.map((productVisual) => {
            const productKey = productVisual.key;
            // 6. 从翻译文件中获取 title, description, alt texts, 和 slug
            const title = t(`products.${productKey}.title`);
            const description = t(`products.${productKey}.description`);
            const slug = t(`products.${productKey}.slug`);
            const productLink = getCombainedLocalePath(
              lang,
              `products/${slug}`
            );

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
                  <h3 className="text-xl font-bold mb-2 text-black min-h-[3em] line-clamp-2">
                    {" "}
                    {/* Fixed height for title */}
                    {title}
                  </h3>
                  <p className="text-black mb-4 flex-grow min-h-[4.5em] line-clamp-3">
                    {" "}
                    {/* Fixed height for description */}
                    {description}
                  </p>
                  <div className="mt-auto">
                    {" "}
                    {/* Pushes button to bottom */}
                    <Link
                      href={productLink}
                      className="inline-flex items-center text-red-600 font-semibold hover:text-red-800 transition-colors group" // Adjusted styling
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
