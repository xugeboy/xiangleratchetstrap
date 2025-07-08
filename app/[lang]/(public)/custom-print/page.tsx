// file: app/[locale]/custom-print/page.tsx

import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { FaArrowRight, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default async function CustomPrintOverviewPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "CustomPrint" });

  const textPrintingImages = [
    "https://placehold.co/400x150/fde047/000000?text=IMPRINT",
    "https://placehold.co/400x150/dc2626/ffffff?text=IMPRINT",
    "https://placehold.co/400x150/000000/ffffff?text=IMPRINT",
    "https://placehold.co/400x150/3b82f6/ffffff?text=IMPRINT",
  ];

  const fullDesignImages = [
    "https://placehold.co/400x150/ef4444/ffffff?text=STARS",
    "https://placehold.co/400x150/4ade80/ffffff?text=CAMO",
    "https://placehold.co/400x150/facc15/000000?text=CAUTION!",
    "https://placehold.co/400x150/dc2626/ffffff?text=HO!+HO!+HO!",
  ];

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
        {/* 页面头部 */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {t("header.title")}
          </h1>
          <p className="mt-4 max-w-4xl mx-auto text-lg text-gray-600">
            {t("header.description")}
          </p>
          <p className="mt-2 max-w-4xl mx-auto text-lg text-gray-600 font-semibold">
            {t("header.subDescription")}
          </p>
        </header>

        {/* 对比区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          
          {/* Custom Text Printing 卡片 */}
          <div className="flex flex-col bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-black mb-4 text-center">
                {t("textPrinting.title")}
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {textPrintingImages.map((src, index) => (
                  <Image key={index} src={src} alt={`${t("textPrinting.title")} Example ${index + 1}`} width={400} height={150} className="rounded-lg object-cover" />
                ))}
              </div>

              {/* Benefits */}
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{t("common.benefits")}</h3>
              <ul className="space-y-2 mb-6">
                {[...Array(9)].map((_, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">{t(`textPrinting.benefits.item${i + 1}`)}</span>
                  </li>
                ))}
              </ul>

              {/* Limitations */}
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{t("common.limitations")}</h3>
              <ul className="space-y-2">
                 {[...Array(2)].map((_, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <FaTimesCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="text-gray-600">{t(`textPrinting.limitations.item${i + 1}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto bg-gray-50 p-8">
                <p className="text-gray-600 mb-6">{t("textPrinting.description")}</p>
                <Link href="/custom-text-imprinting" className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200">
                    {t("textPrinting.cta")}
                    <FaArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </div>
          </div>

          {/* Full Design Printing 卡片 */}
          <div className="flex flex-col bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-black mb-4 text-center">
                {t("fullDesign.title")}
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {fullDesignImages.map((src, index) => (
                  <Image key={index} src={src} alt={`${t("fullDesign.title")} Example ${index + 1}`} width={400} height={150} className="rounded-lg object-cover" />
                ))}
              </div>

              {/* Benefits */}
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{t("common.benefits")}</h3>
              <ul className="space-y-2 mb-6">
                {[...Array(8)].map((_, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">{t(`fullDesign.benefits.item${i + 1}`)}</span>
                  </li>
                ))}
              </ul>

              {/* Limitations */}
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{t("common.limitations")}</h3>
              <ul className="space-y-2">
                 {[...Array(3)].map((_, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <FaTimesCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="text-gray-600">{t(`fullDesign.limitations.item${i + 1}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto bg-gray-50 p-8">
                <p className="text-gray-600 mb-6">{t("fullDesign.description")}</p>
                <Link href="/custom-pattern-design" className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-200">
                    {t("fullDesign.cta")}
                    <FaArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </div>
          </div>

        </div>

        {/* 页脚联系信息 */}
        <footer className="mt-24 text-center bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-black mb-4">
                {t("footer.title")}
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
                {t("footer.description")}
            </p>
        </footer>
      </div>
    </div>
  );
}
