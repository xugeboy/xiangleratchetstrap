"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getCloudinaryPublicId } from "@/utils/formatUtils";
import Customizer from "./Customizer";
import ImprintPreview from "./ImprintPreview";
import QuoteForm from "@/components/forms/QuoteForm";
import { useCustomizer } from "@/contexts/CustomizerContext";
import ProductInfoPanel from "./ProductInfoPanel";

/**
 * This component renders the main layout and UI of the online builder.
 * It consumes the centralized state from CustomizerContext.
 */
export default function OnlineBuilderClient() {
  const t = useTranslations("OnlineBuilder");
  const { product, state } = useCustomizer();
  const { webbingColor, textColor, printedText, printInterval, finishedLength, unit } = state;


  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleApplyImprint = useCallback(() => {
    if (!product || !webbingColor || !textColor) return;
    const message = [
      t("formMessages.simplePrint.greeting"),
      t("formMessages.simplePrint.intro"),
      t("formMessages.simplePrint.productName", { productName: product.name }),
      t("formMessages.simplePrint.productCode", { productCode: product.code }),
      t("formMessages.simplePrint.webbingColor", { webbingColor: webbingColor.name }),
      t("formMessages.simplePrint.textColor", { textColor: textColor.name }),
      t("formMessages.simplePrint.printedText", { printedText }),
      t("formMessages.simplePrint.finishedLength", { finishedLength: finishedLength.toFixed(2), unit }),
      t("formMessages.simplePrint.printInterval", { printInterval: printInterval.toFixed(2), unit }),
      t("formMessages.simplePrint.request"),
      t("formMessages.simplePrint.closing"),
    ].join("\n");
    setGeneratedMessage(message);
    document.getElementById("quote_form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [product, webbingColor, textColor, printedText, finishedLength, printInterval, unit, t]);

  const handleComplexDesign = useCallback(() => {
    if (!product) return;
    const message = [
        t("formMessages.complexDesign.greeting"),
        t("formMessages.complexDesign.intro"),
        t("formMessages.complexDesign.productName", { productName: product.name }),
        t("formMessages.complexDesign.productCode", { productCode: product.code }),
        t("formMessages.complexDesign.body"),
        t("formMessages.complexDesign.request"),
        t("formMessages.complexDesign.closing"),
    ].join("\n");
    setGeneratedMessage(message);
    document.getElementById("quote_form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [product, t]);

  if (!product) {
    return <div>{t("setup")}</div>;
  }

  // 如果有产品但没有颜色数据（初始化阶段），显示加载或等待状态
  if (!webbingColor || !textColor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("loading.productColors")}</p>
        </div>
      </div>
    );
  }

return (
    <div>
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-1/2 -translate-y-1/2 left-0 z-30 bg-white p-2 rounded-r-full shadow-lg xl:hidden"
        aria-label={t("mobileSidebar.ariaLabel")}
      >
        <Image
          src={getCloudinaryPublicId(product.featured_image.url)}
          alt="Product"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      </button>

      <div
        className={`fixed inset-0 z-40 xl:hidden transition-all duration-300 ${
          isSidebarOpen ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={() => setIsSidebarOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <div
          className={`relative h-full w-4/5 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="overflow-y-auto h-full">
            <ProductInfoPanel />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 xl:grid-cols-2">
          <div className="hidden xl:flex flex-col items-center">
            <ProductInfoPanel />
          </div>

          <div>
            <Customizer />
          </div>
        </div>

        <div className="mt-4">
          <ImprintPreview 
            onApplyImprint={handleApplyImprint}
            onComplexDesign={handleComplexDesign}/>
        </div>

        <div className="mt-4">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                {t("details.title")}
              </h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t("details.minOrder")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t("details.productionTime")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t("details.previewLimitation")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t("details.customColors")}</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                {t("examples.title")}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group overflow-hidden rounded-xl">
                  <Image
                    src="/v1752112807/screen2_l6nock.jpg"
                    alt="Example 1"
                    width={400}
                    height={200}
                    className="rounded-xl object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="relative group overflow-hidden rounded-xl">
                  <Image
                    src="/v1752112807/screen1_whcirx.jpg"
                    alt="Example 2"
                    width={400}
                    height={200}
                    className="rounded-xl object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="quote_form" className="mt-24">
          <QuoteForm messageFromCustomizer={generatedMessage} />
        </div>
      </div>
    </div>
  );
}
