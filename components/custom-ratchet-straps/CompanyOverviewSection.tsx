import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import VideoPlayer from "@/components/common/VideoPlayer";

export default function CompanyOverviewSection() {
  const t = useTranslations("CustomRatchetStraps.companyOverview");

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="mx-auto container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2">
            <VideoPlayer
              videoId="dQw4w9WgXcQ"
              title=""
            />
          </div>
          
          {/* Content Section - Takes up 1/3 of the space */}
          <div className="lg:col-span-1">
            <div className="inline-block bg-black text-white px-3 py-1 rounded text-sm font-medium mb-4">
              {t("established")}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t("description")}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{t("features.integrated")}</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{t("features.certified")}</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{t("features.global")}</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{t("features.experience")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}