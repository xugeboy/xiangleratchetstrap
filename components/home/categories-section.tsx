import {
  getCloudinaryPublicId,
  getCombainedLocalePath,
} from "@/utils/formatUtils";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "retractableRatchetStrap.title",
    alt: "retractableRatchetStrap.alt",
    image: "/v1745311043/retractable_ratchet_strap_9147cf873f.jpg",
    link: "retractableRatchetStrap.link",
  },
  {
    title: "ratchetStrapsAndTieDowns.title",
    alt: "ratchetStrapsAndTieDowns.alt",
    image: "/v1745311043/ratchet_strap_29ce01f81a.jpg",
    link: "ratchetStrapsAndTieDowns.link",
  },
  {
    title: "kayakAndCanoeStrap.title",
    alt: "kayakAndCanoeStrap.link",
    image: "/v1745307786/cam_buckle_strap_srytzu.jpg",
    link: "kayakAndCanoeStrap.link",
  },
  {
    title: "atvAndMotorcycleStrap.title",
    alt: "atvAndMotorcycleStrap.link",
    image: "/v1745311045/38_MM_MTD_FB_020_f616857deb.jpg",
    link: "atvAndMotorcycleStrap.link",
  },
  {
    title: "spareTireYStrap.title",
    alt: "spareTireYStrap.link",
    image: "/v1745306181/YwayStrap_010_n5xjja.jpg",
    link: "spareTireYStrap.link",
  },
  {
    title: "webbingAndHardware.title",
    alt: "webbingAndHardware.link",
    image: "/v1745311045/webbing_hardware_fde0a59657.png",
    link: "webbingAndHardware.link",
  },
];

export default async function CategoriesSection() {
  const lang = await getLocale();
  const t = await getTranslations("CategoriesSection");
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          {t.rich("title", {
            span: (chunks) => <span className="text-amber-700">{chunks}</span>,
          })}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative w-full overflow-hidden rounded-md border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <Link
                prefetch={false}
                href={getCombainedLocalePath(lang, t(category.link))}
                className="group flex flex-col h-full text-center text-black hover:underline"
              >
                <div className="relative w-full aspect-[3/3]">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={index < 3}
                  />
                </div>
                <div className="relative inset-x-0 bottom-0 flex flex-col items-center justify-end p-4 md:p-6 text-center">
                  <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                    {t(category.title)}
                  </h3>
                  <div className="mt-auto pt-4">
                    <span className="inline-block w-full bg-black text-white px-4 py-3 rounded-md text-md font-bold uppercase">
                      {t("viewMoreButton")}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
