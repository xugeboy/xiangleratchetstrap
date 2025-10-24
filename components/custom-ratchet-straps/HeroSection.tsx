import Link from "next/link";
import { FiCheckCircle, FiTruck, FiAward, FiHeadphones } from "react-icons/fi"
import { getCombainedLocalePath } from "@/utils/formatUtils";
import { useTranslations } from "next-intl";

interface HeroSectionProps {
  lang: string;
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const t = useTranslations("CustomRatchetStraps.hero");

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto container px-4">
        <div className="text-center mx-auto">
          <h1 className="text-4xl max-w-4xl mx-auto md:text-6xl font-bold text-gray-900 mb-6">
            {t("title")}
          </h1>
          <p className="text-lg max-w-4xl mx-auto text-muted-foreground text-pretty leading-relaxed text-gray-600">
            {t("description")}
          </p>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="p-6">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FiHeadphones className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("features.privateLabel.title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("features.privateLabel.description")}
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FiCheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("features.hardware.title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("features.hardware.description")}
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FiTruck className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("features.sampleDelivery.title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("features.sampleDelivery.description")}
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FiAward className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("features.qualitySupply.title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("features.qualitySupply.description")}
              </p>
            </div>
          </div>
          
          {/* CTA Button */}
          <Link 
            href={getCombainedLocalePath(lang, "request-quote")}
            className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors text-lg"
          >
            {t("cta")}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
