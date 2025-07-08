// file: app/[locale]/custom-pattern-design/page.tsx

import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { FaCheckCircle, FaTimesCircle, FaArrowRight } from "react-icons/fa";

export default async function CustomPatternDesignPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "CustomPrint" });

  const exampleImages = [
    {
      src: "https://placehold.co/600x200/1e3a8a/ffffff?text=Stars+%26+Stripes",
      alt: "Stars and Stripes Pattern",
    },
    {
      src: "https://placehold.co/600x200/facc15/000000?text=CAUTION!",
      alt: "Caution Pattern",
    },
    {
      src: "https://placehold.co/600x200/166534/ffffff?text=HO!+HO!+HO!",
      alt: "Christmas Pattern",
    },
    {
      src: "https://placehold.co/600x200/4d7c0f/ffffff?text=CAMOUFLAGE",
      alt: "Camouflage Pattern",
    },
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
          <p className="mt-4 max-w-4xl mx-auto text-lg text-gray-600">
            {t("header.subDescription")}
            <Link
              href="/custom-text-imprinting"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              {t("header.linkToScreenPrint")}
            </Link>
            .
          </p>
        </header>

        {/* 示例图片 */}
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {exampleImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl shadow-lg"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={200}
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
          <p className="text-center text-lg text-gray-700 mt-8">
            {t("fullDesign.imageDesc")}
          </p>
        </div>

        {/* 优点和局限性 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Benefits */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t("common.benefits")}
            </h3>
            <ul className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <li key={i} className="flex items-start gap-3">
                  <FaCheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    {t(`fullDesign.benefits.item${i + 1}`)}
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
              {[...Array(3)].map((_, i) => (
                <li key={i} className="flex items-start gap-3">
                  <FaTimesCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    {t(`fullDesign.limitations.item${i + 1}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 行动号召 (Call to Action) */}
        <div className="text-center bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-bold text-black mb-4">
            {t("fullDesign.cta.title")}
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-8">
            {t("fullDesign.cta.description")}
          </p>
          <Link
            href="/request-quote"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-200"
          >
            {t("fullDesign.cta.button")}
            <FaArrowRight className="ml-3 h-5 w-5" />
          </Link>
        </div>

        {/* 页脚联系信息 */}
        <footer className="mt-24 text-center">
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
