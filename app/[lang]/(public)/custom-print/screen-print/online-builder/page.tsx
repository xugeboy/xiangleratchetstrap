"use client"; // Converted to Client Component to manage state for layout

import { useEffect, useState } from "react";
import Image from "next/image";
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

// The page now receives props but manages state internally
export default function CustomPrintingPage() {
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State management is lifted up to the page component
  const [webbingColor, setWebbingColor] = useState<colorSelection>();
  const [textColor, setTextColor] = useState<TextColor>();
  const [printedText, setPrintedText] = useState<string>("CUSTOM");
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

        // 更新 product 对象
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
          <p className="text-gray-600">Loading Product Details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Information Not Found
          </h1>
          <p className="text-gray-600">
            Please select a product to customize first.
          </p>
        </div>
      </div>
    );
  }
  if (!webbingColor) return <div>Setting up colors...</div>;
  if (!textColor) return <div>Setting up colors...</div>;

  const handleApplyImprint = () => {
    // 1. 根据您的要求构建消息字符串
    const message = `
Dear XiangleRatchetStrap Service Team,
I would like to inquire about the customized printing service for the following product:
• Product Name: ${product.name} 
• Product Code: ${product.code}
• Webbing Color: ${webbingColor.name} 
• Text Color: ${textColor.name} 
• Printed Text: "${printedText}" 
• Finished Webbing Length: ${finishedLength}${unit}
• Print Interval: ${printInterval}${unit}
Please let me know the available pricing and estimated production timeline. I look forward to your reply.
Best regards
`;
    setGeneratedMessage(message.trim().replace(/^\s+/gm, ""));
    const formElement = document.getElementById("quote_form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleComplexDesign = () => {
    const message = `
Dear XiangleRatchetStrap Service Team,
I would like to inquire about the customized printing service for the following product:
• Product Name: ${product.name} 
• Product Code: ${product.code}
We are looking to apply a more complex logo design that includes intricate patterns and potentially multiple colors. 
Please advise on the feasibility, available printing methods, pricing details, and estimated production timeline for such customization.
Best regards
`;
    setGeneratedMessage(message.trim().replace(/^\s+/gm, ""));
    const formElement = document.getElementById("quote_form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const ProductInfoPanel = () => (
    <div className="sticky top-8 w-full">
      {/* Product Card */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Product Header */}
        <div className="bg-gradient-to-r from-black  to-amber-700 px-8 py-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-3">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            Build From Here
          </h3>
        </div>

        {/* Images Section - Product and Webbing side by side */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Image */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Item #{product.code}
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

            {/* Webbing Image */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Selected Webbing
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
      {/* Mobile Sidebar Trigger */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-1/2 -translate-y-1/2 left-0 z-30 bg-white p-2 rounded-r-full shadow-lg xl:hidden"
        aria-label="Open product details"
      >
        <Image
          src={getCloudinaryPublicId(product.featured_image.url)}
          alt="Product"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      </button>

      {/* Mobile Sidebar Panel */}
      <div
        className={`fixed inset-0 z-40 xl:hidden transition-all duration-300 ${
          isSidebarOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setIsSidebarOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        {/* Sidebar Content */}
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

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:py-16 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Custom Imprinting
          </h1>
          <p className="mt-4 mx-auto text-xl text-gray-600">
            Create a custom printed strap for your product below. The background
            and text will be imprinted repeatedly.
          </p>
        </header>

        {/* --- Top Section: Product Image and Customizer Options --- */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 xl:grid-cols-2">
          {/* Left Side: Enhanced Product Image and Webbing Preview (Desktop Only) */}
          <div className="hidden xl:flex flex-col items-center">
            <ProductInfoPanel />
          </div>

          {/* Right Side: Customizer Options */}
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

        {/* --- Middle Section: Imprint Preview and Quote Button --- */}
        <div className="mt-16">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-6">
              <h3 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                Live Imprint Preview
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
                  Apply Imprint & Get Quote
                </button>
                <button
                  onClick={handleComplexDesign}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200"
                >
                  I Need Complex Design!
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Section: Static Details --- */}
        <div className="mt-24">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                Important Details
              </h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    There is a minimum order quantity of 4 for imprinting this
                    exact product.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Imprints cannot contain Trademarked, Copyrighted or
                    Profanity Content.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Sublimation imprinting is UV resistant and colorfast (will
                    not bleed).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    The online system offers preset colors. These colors are
                    close representations of the finished printed color.
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                Custom Designs Examples
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group overflow-hidden rounded-xl">
                  <Image
                    src="https://placehold.co/400x200/dc2626/FFFFFF?text=Example+1"
                    alt="Example 1"
                    width={400}
                    height={200}
                    className="rounded-xl object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="relative group overflow-hidden rounded-xl">
                  <Image
                    src="https://placehold.co/400x200/2563eb/FFFFFF?text=Example+2"
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

        {/* --- Quote Form Section --- */}
        <div className="mt-24">
          <QuoteForm messageFromCustomizer={generatedMessage} />
        </div>
      </div>
    </div>
  );
}
