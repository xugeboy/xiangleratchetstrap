import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getCloudinaryPublicId } from "@/utils/formatUtils";
export default async function BentoGrids() {
  const t = await getTranslations("BentoGrids");

  const bentoCellsConfig = [
    {
      key: "manufacturing",
      colSpan: "md:col-span-3",
      rowSpan: "",
      imageSrc:
        "/v1744959681/factory_production_mgldoj.jpg",
      imageWidth: 600,
      imageHeight: 400,
      imageClassName: "object-scale-down w-full h-48 md:h-64 lg:h-auto",
    },
    {
      key: "speed",
      colSpan: "md:col-span-3",
      rowSpan: "",
      imageSrc:
        "/v1744959235/fast_delivery_emjngs.jpg",
      imageWidth: 600,
      imageHeight: 400,
      imageClassName: "object-scale-down w-full h-48 md:h-64 lg:h-auto",
    },
    {
      key: "customization",
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-1",
      imageSrc:
        "/v1745298278/Custom_Branding_Options_pcebaz.png",
      imageWidth: 300,
      imageHeight: 200,
      imageClassName: "object-scale-down h-64 md:h-40 lg:h-auto",
    },
    {
      key: "expertise",
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-1",
      imageSrc:
        "/v1745304647/Industry-Leading_Team_eilpxj.jpg",
      imageWidth: 300,
      imageHeight: 200,
      imageClassName: "object-scale-down h-64 md:h-40 lg:h-auto",
    },
    {
      key: "partnership",
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-1",
      imageSrc:
        "/v1745304055/large-storage-center_zcahvz.jpg",
      imageWidth: 300,
      imageHeight: 200,
      imageClassName: "object-scale-down h-64 md:h-40 lg:h-auto",
    },
  ];

  return (
    <div className="mx-auto mt-10 mb-10 lg:max-w-7xl">
      <p className=" max-w-lg text-4xl font-semibold tracking-tight text-pretty text-black sm:text-5xl">
        {t("mainTitle")}
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-2">
        {bentoCellsConfig.map((cell, index) => (
          <div
            key={cell.key}
            className={`relative ${cell.colSpan} ${cell.rowSpan}`}
          >
            <div
              className={`absolute inset-px rounded-lg bg-white 
              ${
                index === 0
                  ? "max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]"
                  : ""
              }
              ${index === 1 ? "lg:rounded-tr-[2rem]" : ""}
              ${index === 2 ? "lg:rounded-bl-[2rem]" : ""}
              ${
                index === bentoCellsConfig.length - 1 && index > 1
                  ? "max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]"
                  : ""
              }
            `}
            />
            <div
              className={`relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] 
              ${
                index === 0
                  ? "max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]"
                  : ""
              }
              ${index === 1 ? "lg:rounded-tr-[calc(2rem+1px)]" : ""}
              ${index === 2 ? "lg:rounded-bl-[calc(2rem+1px)]" : ""}
              ${
                index === bentoCellsConfig.length - 1 && index > 1
                  ? "max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]"
                  : ""
              }
            `}
            >
              <div className="p-10 pt-4 flex flex-col h-full">
                <h3 className="text-sm/4 font-semibold text-amber-700">
                  {t(`items.${cell.key}.subtitle`)}
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-black">
                  {t(`items.${cell.key}.title`)}
                </p>
                <div className="my-2 flex items-center justify-center">
                  <Image
                    alt={t(`items.${cell.key}.imageAlt`)}
                    src={cell.imageSrc}
                    width={cell.imageWidth}
                    height={cell.imageHeight}
                    className={cell.imageClassName} // Use defined className
                  />
                </div>
                <p className="mt-2 text-sm/6 text-black">
                  {t(`items.${cell.key}.description`)}
                </p>
              </div>
            </div>
            <div
              className={`pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 
              ${
                index === 0
                  ? "max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]"
                  : ""
              }
              ${index === 1 ? "lg:rounded-tr-[2rem]" : ""}
              ${index === 2 ? "lg:rounded-bl-[2rem]" : ""}
              ${
                index === bentoCellsConfig.length - 1 && index > 1
                  ? "max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]"
                  : ""
              }
            `}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
