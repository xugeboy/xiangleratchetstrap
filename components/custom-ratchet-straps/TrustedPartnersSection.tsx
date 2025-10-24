import { useTranslations } from "next-intl";

export default function TrustedPartnersSection() {
  const t = useTranslations("CustomRatchetStraps.trustedPartners");

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="mx-auto container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-6 flex items-center justify-center h-24">
              <span className="text-gray-400 text-sm">Partner {i}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
