"use client";

import type { Product } from "@/types/product";
import Specifications from "./Specifications";
import Description from "./Description";
import { getCombainedLocalePath } from "@/utils/formatUtils";
import { useTranslations } from "next-intl";
import Customization from "./Customization";
import { ActionButton } from "../common/ActionButton";
import { FaTags, FaTools } from "react-icons/fa";
import { ServiceCard } from "../common/ServiceCard";
import {
  HiCheckCircle,
  HiClock,
  HiOutlineCog8Tooth,
  HiOutlineXMark,
} from "react-icons/hi2";
import { useIsMobile } from "@/hooks/useMobile";
import { useState } from "react";
import CustomizationMobile from "./CustomizationMobile";
import { PreviewData } from "@/types/previewData";

// 1. 修改 Props 接口，将 setPreviewImage 设为可选
interface ProductInfoProps {
  product: Product;
  lang: string;
  setPreviewHover?: (data: PreviewData | null) => void;
  setPreviewClick?: (data: PreviewData) => void;
}

export default function ProductInfo({
  lang,
  product,
  setPreviewHover,
  setPreviewClick,
}: ProductInfoProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const isMobile = useIsMobile();
  const handleCustomPrintingClick = () => {
    try {
      sessionStorage.setItem("customPrintingProduct", JSON.stringify(product));
    } catch (error) {
      console.error("Could not save product to sessionStorage", error);
    }
  };

  const customizable = product.customizable;

  return (
    <div>
      <div className="mx-auto">
        {/* Hero Product Section */}
        <div className="rounded-2xl shadow-lg mb-8 overflow-hidden">
          <div className="px-4 pt-4">
            <h1 className="text-4xl font-bold text-black mb-4">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="uppercase">{t("itemNumberLabel")}</span>
                <span>#{product.code}</span>
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
              {customizable && (
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full">
                  <HiClock className="text-red-600 w-5 h-5" />
                  <span className="text-red-600 font-semibold text-sm">
                    {t("stockStatus.madeToOrder")}
                  </span>
                </div>
              )}
            </div>
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

        {/* Customization Section */}
        {customizable && (
          <>
            {/* 3. 使用 isMobile 状态进行条件渲染 */}
            {!isMobile ? (
              // 桌面端视图
              setPreviewHover &&
              setPreviewClick && (
                <Customization
                  customizations={product.strap_colors}
                  setPreviewHover={setPreviewHover}
                  setPreviewClick={setPreviewClick}
                />
              )
            ) : (
              // 移动端视图
              <div>
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="fixed top-1/2 -translate-y-1/2 left-0 z-30 bg-white p-2 rounded-r-full shadow-lg xl:hidden"
                  aria-label="Open Customization Menu"
                >
                  <HiOutlineCog8Tooth className="h-6 w-6" />
                </button>

                <div
                  className={`fixed inset-0 z-40 transition-all duration-300 ${
                    isSidebarOpen ? "visible" : "invisible"
                  }`}
                  aria-hidden={!isSidebarOpen}
                >
                  <div
                    onClick={() => setIsSidebarOpen(false)}
                    className={`absolute inset-0 bg-black/50 transition-opacity ${
                      isSidebarOpen ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div
                    className={`relative h-full w-4/5 max-w-sm bg-white shadow-xl transition-transform duration-300 ${
                      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                  >
                    <div className="flex justify-between items-center p-4 border-b">
                      <h2 className="text-lg font-semibold text-black">
                        {t("customization.customizations")}
                      </h2>
                      <button
                        onClick={() => setIsSidebarOpen(false)}
                        aria-label="Close Customization Menu"
                      >
                        <HiOutlineXMark className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="overflow-y-auto h-[calc(100vh-65px)]">
                      <CustomizationMobile
                        customizations={product.strap_colors}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <Specifications product={product} />
        <Description description={product.see_more} />
      </div>
    </div>
  );
}
