"use client";

import { Product } from "@/types/product";
import Link from "next/link";
import Specifications from "./Specifications";
import Description from "./Description";
import { getCombainedLocalePath } from "@/utils/formatUtils";
import { useTranslations } from "next-intl";

interface ProductInfoProps {
  product: Product;
  lang: string
}


export default function ProductInfo({ lang,product }: ProductInfoProps) {
  const services = [
    {
      id: "tailoredPrograms",
      titleKey: "services.tailoredPrograms.title",
      link: getCombainedLocalePath(lang, "/business-solutions"),
      linkTextKey: "services.tailoredPrograms.linkText",
    },
    {
      id: "questionsCustom",
      titleKey: "services.questionsCustom.title",
      link: getCombainedLocalePath(lang, "/contact-us"),
      linkTextKey: "services.questionsCustom.linkText",
    },
  ];
  const t = useTranslations("ProductInfo");
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 font-mono">{product.name}</h1>
        <div className="space-y-2">
          <p className="text-black">{t("itemNumberLabel")}#{product.code}</p>
          <div className="flex items-center space-x-2 text-black">
            <span>{t("stockStatus.inStock")},</span>
            <strong className="text-amber-700">{t("stockStatus.madeToOrder")}</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {services.map((service) => (
          <div key={service.id} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-black mb-2">
              {t(service.titleKey)}
            </h3>
            <Link
              href={service.link}
              className="text-amber-700 hover:text-blue-700"
            >
              {t(service.linkTextKey)}
            </Link>
          </div>
        ))}
        <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-center">
          <Link
            href={getCombainedLocalePath(lang, "request-quote")} 
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-amber-700 
              rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 shadow-sm hover:bg-amber-800" // Added hover state
          >
            {t("buttons.requestQuote")}
          </Link>
        </div>
      </div>

      <Specifications product={product} />

      <Description description={product.see_more} />
    </div>
  );
}