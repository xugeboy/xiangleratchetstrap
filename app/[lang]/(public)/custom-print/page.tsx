import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import {
  FaArrowRight,
  FaCheckCircle,
  FaTimesCircle,
  FaIndustry,
  FaCog,
} from "react-icons/fa";

export default async function CustomPrintOverviewPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "CustomPrint" });

  const textPrintingImages = [
    "/v1751985848/pattern2_q8k4uf.jpg",
    "/v1751985848/pattern1_etapzc.jpg",
  ];
  const fullDesignImages = [
    "/v1751985848/pattern2_q8k4uf.jpg",
    "/v1751985848/pattern1_etapzc.jpg",
  ];

  return (
    <div>
      <div className="container mx-auto pt-8">
        {/* 页面头部 */}
        <header className="mb-16">
          <div className="border-l-4 border-blue-600 pl-6 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("header.title")}
            </h1>
            <p className="text-lg text-gray-600 max-w-4xl leading-relaxed">
              {t("header.description")}
            </p>
            <p className="text-base text-gray-800 font-medium mt-2 max-w-4xl">
              {t("header.subDescription")}
            </p>
          </div>
        </header>

        {/* 对比区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Custom Text Printing 卡片 */}
          <div className="bg-white  rounded-3xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 pl-6 pt-6">
              <FaCog className="w-5 h-5 text-gray-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                {t("textPrinting.title")}
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 mb-8">
                {textPrintingImages.map((src, index) => (
                  <div key={index} className="border border-gray-200">
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`${t("textPrinting.title")} Example ${index + 1}`}
                      width={800}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  {t("common.benefits")}
                </h3>
                <ul className="space-y-3">
                  {[...Array(9)].map((_, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaCheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        {t(`textPrinting.benefits.item${i + 1}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  {t("common.limitations")}
                </h3>
                <ul className="space-y-3">
                  {[...Array(2)].map((_, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaTimesCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-1" />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        {t(`textPrinting.limitations.item${i + 1}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {t("textPrinting.description")}
                </p>
                <Link
                  href="/custom-print/screen-print"
                  className="inline-flex items-center justify-center w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200"
                >
                  {t("textPrinting.cta.title")}
                  <FaArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Full Design Printing 卡片 */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 pl-6 pt-6">
              <FaIndustry className="w-5 h-5 text-gray-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                {t("fullDesign.title")}
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 mb-8">
                {fullDesignImages.map((src, index) => (
                  <div key={index} className="border border-gray-200">
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`${t("fullDesign.title")} Example ${index + 1}`}
                      width={800}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  {t("common.benefits")}
                </h3>
                <ul className="space-y-3">
                  {[...Array(8)].map((_, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaCheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        {t(`fullDesign.benefits.item${i + 1}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  {t("common.limitations")}
                </h3>
                <ul className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaTimesCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-1" />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        {t(`fullDesign.limitations.item${i + 1}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {t("fullDesign.description")}
                </p>
                <Link
                  href="/custom-print/full-design"
                  className="inline-flex items-center justify-center w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200"
                >
                  {t("fullDesign.cta.title")}
                  <FaArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
