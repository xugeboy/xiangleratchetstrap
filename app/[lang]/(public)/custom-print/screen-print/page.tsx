// file: app/[locale]/custom-text-imprinting/page.tsx

import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default async function CustomTextImprintingPage() {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: "CustomPrint",
  });

  const exampleImages = [
    "/v1751985848/pattern2_q8k4uf.jpg",
    "/v1751985848/pattern1_etapzc.jpg",
  ];

  const colorOptions = [
    { hex: "#000000" },
    { hex: "#3b82f6" },
    { hex: "#16a34a" },
    { hex: "#ef4444" },
    { hex: "#f59e0b" },
    { hex: "#8b5cf6" },
    { hex: "#ec4899" },
    { hex: "#fde047" },
  ];

  return (
    <div>
      <div className="container mx-auto pt-8">
        {/* 页面头部 */}
        <header className="mb-16">
          <div className="border-l-4 border-blue-600 pl-6 mb-8">
            <h1 className="text-4xl font-bold mb-4">
              {t("textPrinting.title")}
            </h1>
            <p className="text-lg leading-relaxed">
              {t("textPrinting.description")}
            </p>
            <p className="text-base font-medium mt-2">
              {t.rich("textPrinting.subDescription", {
                link: (chunks) => (
                  <Link
                    href="/custom-print/full-design"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </div>
        </header>

        {/* 示例图片和颜色选项 */}
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {exampleImages.map((src, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl shadow-lg"
              >
                <Image
                  src={src}
                  alt={`Example ${index + 1}`}
                  width={600}
                  height={200}
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="border-l-4 border-blue-600 pl-6 text-left">
            <p className="text-lg mb-4">
              {t("textPrinting.colorOptionsText")}
            </p>
            <div className="flex gap-3">
              {colorOptions.map((color, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: color.hex }}
                  className="h-8 w-8 rounded-full shadow border-2 border-white"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* 优点和局限性 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Benefits */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t("common.benefits")}
            </h3>
            <ul className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <li key={i} className="flex items-start gap-3">
                  <FaCheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    {t(`textPrinting.benefits.item${i + 1}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Limitations */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t("common.limitations")}
            </h3>
            <ul className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <li key={i} className="flex items-start gap-3">
                  <FaTimesCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    {t(`textPrinting.limitations.item${i + 1}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 如何定制 */}
        <div className="bg-white mb-8 p-10 rounded-3xl shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-bold text-center mb-4">
            {t("textPrinting.howTo.title")}
          </h2>
          <p className="text-center text-lg max-w-5xl mx-auto mb-12">
            {t("textPrinting.howTo.description")}
          </p>
          <ol className="relative border-l-2 border-blue-200 ml-4">
            {[...Array(6)].map((_, i) => (
              <li key={i} className="mb-10 ml-8">
                <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full ring-8 ring-white">
                  <span className="font-bold text-blue-800">{i + 1}</span>
                </span>
                <h3 className="flex items-center mb-1 text-xl font-semibold">
                  {t(`textPrinting.howTo.steps.step${i + 1}.title`)}
                </h3>
                <p className="text-base font-normal max-w-7xl">
                  {t(`textPrinting.howTo.steps.step${i + 1}.description`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
