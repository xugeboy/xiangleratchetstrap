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
import { Metadata, ResolvingMetadata } from "next";
import { defaultUrlPrefix, localePrefixMap } from "@/middleware";

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const currentLocale = await getLocale();

  const pageTitle = "Custom Print - Xiangle Ratchet Strap";
  const pageSlug = "custom-print";
  const ogImageUrl = process.env.NEXT_PUBLIC_LOGO_URL;
  const ogImageAlt = pageTitle;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  let canonicalUrlPath;
  if (currentLocale === defaultUrlPrefix || currentLocale === undefined) {
    canonicalUrlPath = `/${pageSlug}`;
  } else {
    canonicalUrlPath = `/${currentLocale}/${pageSlug}`;
  }
  const canonicalUrl = `${siteUrl}${canonicalUrlPath}`;

  const languagesAlternate: Record<string, string> = {};

  for (const ietfTag in localePrefixMap) {
    const targetUrlPrefix = localePrefixMap[ietfTag];
      let pathForLang = "";
      if (targetUrlPrefix === defaultUrlPrefix) {
        pathForLang = `${siteUrl}/${pageSlug}`;
      } else {
        pathForLang = `${siteUrl}/${targetUrlPrefix}/${pageSlug}`;
      }
      languagesAlternate[ietfTag] = pathForLang;
  }
  languagesAlternate["x-default"] = `${siteUrl}/${pageSlug}`;


  return {
    title: pageTitle,
    alternates: {
      canonical: canonicalUrl,
      languages:
        Object.keys(languagesAlternate).length > 0
          ? languagesAlternate
          : undefined,
    },
    openGraph: {
      title: pageTitle,
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      title: pageTitle,
    }
  };
}

export default async function CustomPrintOverviewPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "CustomPrint" });
  const tw = await getTranslations({ locale, namespace: "CategoriesSection" });

  const textPrintingImages = [
    "/v1752112807/screen2_l6nock.jpg",
    "/v1752112807/screen1_whcirx.jpg",
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
            <h1 className="text-4xl font-bold mb-4">{t("header.title")}</h1>
            <p className="text-lg leading-relaxed">{t("header.description")}</p>
            <p className="text-base font-medium mt-2">
              {t.rich("header.subDescription", {
                link: (chunks) => (
                  <Link href={tw("webbingAndHardware.link")} className="text-blue-600 underline hover:text-blue-800">
                    {chunks}
                  </Link>
                ),
              })}
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
                  {[...Array(6)].map((_, i) => (
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
                  {t("textPrinting.cta")}
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
                  {t("fullDesign.cta")}
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
