"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl"; // 导入 useTranslations
import {
  getDefaultTextColorForWebbing,
  type TextColor,
} from "@/components/custom/constants";
import Customizer from "@/components/custom/Customizer";
import ImprintPreview from "@/components/custom/ImprintPreview";
import QuoteForm from "@/components/forms/QuoteForm";
import type { Product } from "@/types/product";
import type { colorSelection } from "@/types/Customizations";
import { getCloudinaryPublicId } from "@/utils/formatUtils";
import Specifications from "@/components/product/Specifications";

export default function OnlineBuilder() {
  const t = useTranslations("OnlineBuilder"); // 初始化翻译函数

  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [webbingColor, setWebbingColor] = useState<colorSelection>();
  const [textColor, setTextColor] = useState<TextColor>();
  // 使用翻译函数初始化默认状态
  const [printedText, setPrintedText] = useState<string>(
    "Custom"
  );
  const [printInterval, setPrintInterval] = useState<number>(6);
  const [finishedLength, setFinishedLength] = useState<number>(40);
  const [unit, setUnit] = useState<string>("mm");
  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const productJson = sessionStorage.getItem("customPrintingProduct");
      if (productJson) {
        const parsedProduct = JSON.parse(productJson);

        // 过滤掉 name 为 25mm Camouflage 的项
        const filteredColorSelection =
          parsedProduct.strap_colors.colorSelection.filter(
            (item: colorSelection) => item.name !== "25mm Camouflage"
          );
        parsedProduct.strap_colors.colorSelection = filteredColorSelection;
        setProduct(parsedProduct);
      } else {
        console.warn("No product info found in sessionStorage.");
      }
    } catch (error) {
      console.error("Failed to parse product info from sessionStorage", error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (
      product &&
      product.strap_colors &&
      product.strap_colors.colorSelection &&
      product.strap_colors.colorSelection.length > 0
    ) {
      setWebbingColor(product.strap_colors.colorSelection[0]);
    }
  }, [product]);

  useEffect(() => {
    if (webbingColor) {
      setTextColor(getDefaultTextColorForWebbing(webbingColor));
    }
  }, [webbingColor]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t("notFound.title")}
          </h1>
          <p className="text-gray-600">{t("notFound.description")}</p>
        </div>
      </div>
    );
  }
  if (!webbingColor) return <div>{t("setup")}</div>;
  if (!textColor) return <div>{t("setup")}</div>;

  const handleApplyImprint = () => {
    // 使用 t() 函数和占位符构建消息
    const messageLines = [
      t("formMessages.simpleImprint.greeting"),
      t("formMessages.simpleImprint.intro"),
      t("formMessages.simpleImprint.productName", {
        productName: product.name,
      }),
      t("formMessages.simpleImprint.productCode", {
        productCode: product.code,
      }),
      t("formMessages.simpleImprint.webbingColor", {
        webbingColor: webbingColor.name,
      }),
      t("formMessages.simpleImprint.textColor", { textColor: textColor.name }),
      t("formMessages.simpleImprint.printedText", { printedText }),
      t("formMessages.simpleImprint.finishedLength", {
        finishedLength,
        unit,
      }),
      t("formMessages.simpleImprint.printInterval", { printInterval, unit }),
      t("formMessages.simpleImprint.request"),
      t("formMessages.simpleImprint.closing"),
    ];
    const message = messageLines.join("\n");

    setGeneratedMessage(message);
    const formElement = document.getElementById("quote_form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleComplexDesign = () => {
    // 使用 t() 函数和占位符构建消息
    const messageLines = [
      t("formMessages.complexDesign.greeting"),
      t("formMessages.complexDesign.intro"),
      t("formMessages.complexDesign.productName", {
        productName: product.name,
      }),
      t("formMessages.complexDesign.productCode", {
        productCode: product.code,
      }),
      t("formMessages.complexDesign.body"),
      t("formMessages.complexDesign.request"),
      t("formMessages.complexDesign.closing"),
    ];
    const message = messageLines.join("\n");

    setGeneratedMessage(message);
    const formElement = document.getElementById("quote_form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const ProductInfoPanel = () => (
    <div className="top-8 w-full">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-black  to-amber-700 px-4 py-3">
          <h3 className="text-xl font-semibold text-white flex items-center gap-3">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            {t("productPanel.title")}
          </h3>
        </div>

        <div className="px-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                {t("productPanel.itemNumberLabel")}
                {product.code}
              </h3>
              <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner">
                <Image
                  src={getCloudinaryPublicId(product.featured_image.url)}
                  alt={product.name}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                {t("productPanel.selectedWebbingLabel")}
              </h3>
              <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner">
                <Image
                  src={webbingColor.imageId}
                  alt={`${webbingColor.name} webbing`}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4">
          <Specifications product={product} />
        </div>
      </div>
    </div>
  );

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
          className={`relative h-full w-4/5 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="overflow-y-auto h-full">
            <ProductInfoPanel />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <header className="mb-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t("header.title")}
          </h1>
          <p className="mt-4 mx-auto text-xl text-gray-600">
            {t("header.description")}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 xl:grid-cols-2">
          <div className="hidden xl:flex flex-col items-center">
            <ProductInfoPanel />
          </div>

          <div>
            <Customizer
              webbingColor={webbingColor}
              setWebbingColor={setWebbingColor}
              textColor={textColor}
              setTextColor={setTextColor}
              printedText={printedText}
              setPrintedText={setPrintedText}
              printInterval={printInterval}
              setPrintInterval={setPrintInterval}
              finishedLength={finishedLength}
              setFinishedLength={setFinishedLength}
              unit={unit}
              setUnit={setUnit}
              webbingColorOptions={product.strap_colors.colorSelection}
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-3">
              <h3 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                {t("preview.title")}
              </h3>
            </div>
            <div className="py-8">
              <ImprintPreview
                webbingColor={webbingColor.hexCode}
                textColor={textColor.hexCode}
                text={printedText}
                interval={printInterval}
                webbingWidth={product.width}
                unit={unit}
              />
              <div className="mt-8 px-4 max-w-2xl mx-auto flex gap-4">
                <button
                  onClick={handleApplyImprint}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200"
                >
                  {t("buttons.applyAndQuote")}
                </button>
                <button
                  onClick={handleComplexDesign}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200"
                >
                  {t("buttons.complexDesign")}
                </button>
              </div>
            </div>
          </div>
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
                  <span>{t("details.contentPolicy")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t("details.sublimationInfo")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t("details.colorRepresentation")}</span>
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

        <div className="mt-24">
          <QuoteForm messageFromCustomizer={generatedMessage} />
        </div>
      </div>
    </div>
  );
}