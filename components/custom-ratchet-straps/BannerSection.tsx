import Link from "next/link";
import { getCombainedLocalePath } from "@/utils/formatUtils";
import { useTranslations } from "next-intl";

interface BannerSectionProps {
  lang: string;
}

export default function BannerSection({ lang }: BannerSectionProps) {
  const t = useTranslations("CustomRatchetStraps.banner");

  return (
    <section className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/image/warehouse-boxes-bg.jpg')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative mx-auto container px-4 z-10">
        <div className="max-w-4xl">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            {t("title")}
          </h1>

          {/* Key Selling Points */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <span className="text-xl md:text-2xl text-white font-medium">
              {t("sellingPoints.oem")}
            </span>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-xl md:text-2xl text-white font-medium">
              {t("sellingPoints.brand")}
            </span>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-xl md:text-2xl text-white font-medium">
              {t("sellingPoints.sample")}
            </span>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-4 mb-12">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-3">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span className="text-white font-medium">
                {t("features.factory")}
              </span>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-3">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              <span className="text-white font-medium">
                {t("features.moq")}
              </span>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-3">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-white font-medium">
                {t("features.reply")}
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={getCombainedLocalePath(lang, "request-quote")}
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-lg"
            >
              {t("cta.sample")}
            </Link>

            <Link
              href={getCombainedLocalePath(lang, "request-quote")}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/30 transition-colors text-lg border border-white/30"
            >
              {t("cta.quote")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
