"use client";

import type { Product } from "@/types/product";
import Specifications from "./Specifications";
import Description from "./Description";
import { getCombainedLocalePath } from "@/utils/formatUtils";
import { useTranslations } from "next-intl";
import StrapColorOptions from "./Customization";
import { ActionButton } from "../common/ActionButton";
import { FaTags, FaTools } from "react-icons/fa";
import { ServiceCard } from "../common/ServiceCard";
import {
  HiCheckCircle,
  HiClock,
} from "react-icons/hi2";
import Customizations from "./Customization";
import Customization from "./Customization";

interface ProductInfoProps {
  product: Product;
  lang: string;
}

export default function ProductInfo({ lang, product }: ProductInfoProps) {
  const services = [
    {
      id: "tailoredPrograms",
      titleKey: "services.tailoredPrograms.title",
      link: getCombainedLocalePath(lang, "business-solutions"),
      linkTextKey: "services.tailoredPrograms.linkText",
    },
    {
      id: "questionsCustom",
      titleKey: "services.questionsCustom.title",
      link: getCombainedLocalePath(lang, "contact-us"),
      linkTextKey: "services.questionsCustom.linkText",
    },
  ];

  const t = useTranslations("ProductInfo");

  const handleCustomPrintingClick = () => {
    try {
      sessionStorage.setItem("customPrintingProduct", JSON.stringify(product));
    } catch (error) {
      console.error("Could not save product to sessionStorage", error);
    }
  };

  const customizable =
    product.strap_colors && product.strap_colors.colorSelection;

  return (
    <div>
      <div className="mx-auto">
        {/* Hero Product Section */}
        <div className="rounded-2xl shadow-lg mb-8 overflow-hidden">
          <div className="px-4">
            <h1 className="text-4xl font-bold text-black mb-4">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="uppercase">
                  {t("itemNumberLabel")}
                </span>
                <span>
                  #{product.code}
                </span>
              </div>
            </div>
          </div>

          <div className="px-4 py-6">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                <HiCheckCircle className="text-green-600 w-5 h-5" />
                <span className="text-green-700 font-semibold text-sm">
                  {t("stockStatus.inStock")}
                </span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full">
                <HiClock className="text-red-600 w-5 h-5" />
                <span className="text-red-600 font-semibold text-sm">
                  {t("stockStatus.madeToOrder")}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <ActionButton
                href={getCombainedLocalePath(lang, "request-quote")}
                text={t("buttons.requestQuote")}
                icon={FaTags}
                variant="primary"
              />

              {customizable && (
                <ActionButton
                  href={getCombainedLocalePath(
                    lang,
                    "custom-print/online-builder"
                  )}
                  text={t("buttons.customPrinting")}
                  icon={FaTools}
                  onClick={handleCustomPrintingClick}
                  variant="secondary"
                />
              )}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={t(service.titleKey)}
                linkText={t(service.linkTextKey)}
                href={service.link}
              />
            ))}
          </div>
        </div>

        <Customization customizations={product.strap_colors} />
        <Specifications product={product} />

        <Description description={product.see_more} />
      </div>
    </div>
  );
}
