"use client"; // Converted to Client Component to manage state for layout

import { useState } from "react";
import Image from "next/image";
import {
  TextColor,
  textColorOptions,
  WebbingColor,
} from "@/components/custom/constants";
import Customizer from "@/components/custom/Customizer";
import ImprintPreview from "@/components/custom/ImprintPreview";
import QuoteForm from "@/components/forms/QuoteForm";

// This interface is now internal to the client component
interface ProductInfo {
  id: string;
  name: string;
  width: string;
  imageUrl: string;
}

interface QuoteDetails {
  product: ProductInfo;
  webbing: WebbingColor;
  textColor: TextColor;
  printedText: string;
  printInterval: number;
}

// The page now receives props but manages state internally
export default function CustomPrintingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // 1. 从 searchParams 获取编码后的数据
  const encodedData = searchParams.data as string;
  // 2. 将 Base64 解码回 JSON 字符串
  const decodedJson = Buffer.from(encodedData, "base64").toString("utf-8");
  // 3. 将 JSON 字符串解析为对象
  const productInfo = JSON.parse(decodedJson);

  // State management is lifted up to the page component
  const [webbingColor, setWebbingColor] = useState<WebbingColor>();
  const [textColor, setTextColor] = useState<TextColor>(textColorOptions[0]);
  const [printedText, setPrintedText] = useState<string>("TEST");
  const [printInterval, setPrintInterval] = useState<number>(150);
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails | null>(null);

  const handleApplyImprint = () => {
    setQuoteDetails({
      product: productInfo,
      webbing: webbingColor,
      textColor: textColor,
      printedText: printedText,
      printInterval: printInterval,
    });
  };

  return (
    <div className="bg-white">
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
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          {/* Left Side: Product Image */}
          <div className="flex flex-col items-center">
            <div className="sticky top-8 w-full max-w-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Product: {productInfo.name}
              </h2>
              <div className="aspect-square w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100">
                <Image
                  src={productInfo.imageUrl}
                  alt={productInfo.name}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
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
              webbingColorOptions={productInfo.strap_colors.colorSelection}
            />
          </div>
        </div>

        {/* --- Middle Section: Imprint Preview and Quote Button --- */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Imprint Preview
          </h3>
          <ImprintPreview
            webbingColor={webbingColor.hex}
            textColor={textColor.hex}
            text={printedText}
            interval={printInterval}
            webbingWidth={productInfo.width}
          />
          <div className="mt-8 max-w-md mx-auto">
            <button
              onClick={handleApplyImprint}
              className="w-full rounded-md bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Apply Imprint & Get Quote
            </button>
          </div>
        </div>

        {/* --- Quote Form Section --- */}
        <div className="mt-24">
          <QuoteForm />
        </div>

        {/* --- Bottom Section: Static Details --- */}
        <div className="mt-24">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Important Details
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-gray-600">
                <li>
                  There is a minimum order quantity of 4 for imprinting this
                  exact product.
                </li>
                <li>
                  Imprints cannot contain Trademarked, Copyrighted or Profanity
                  Content.
                </li>
                <li>
                  Sublimation imprinting is UV resistant and colorfast (will not
                  bleed).
                </li>
                <li>
                  The online system offers preset colors. These colors are close
                  representations of the finished printed color.
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Custom Designs Examples
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="https://placehold.co/400x200/dc2626/FFFFFF?text=Example+1"
                  alt="Example 1"
                  width={400}
                  height={200}
                  className="rounded-lg object-cover"
                />
                <Image
                  src="https://placehold.co/400x200/2563eb/FFFFFF?text=Example+2"
                  alt="Example 2"
                  width={400}
                  height={200}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
