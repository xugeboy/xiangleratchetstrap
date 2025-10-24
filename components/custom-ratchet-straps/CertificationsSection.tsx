import { useTranslations } from "next-intl";

export default function CertificationsSection() {
  const t = useTranslations("CustomRatchetStraps.certifications");

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
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-gray-600">ISO</span>
            </div>
            <h3 className="font-semibold text-gray-900">ISO 9001</h3>
            <p className="text-sm text-gray-600">Quality Management</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-gray-600">CE</span>
            </div>
            <h3 className="font-semibold text-gray-900">CE Marking</h3>
            <p className="text-sm text-gray-600">European Conformity</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-gray-600">EN</span>
            </div>
            <h3 className="font-semibold text-gray-900">EN 12195</h3>
            <p className="text-sm text-gray-600">Cargo Securing</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-gray-600">AS</span>
            </div>
            <h3 className="font-semibold text-gray-900">AS/NZS 4380</h3>
            <p className="text-sm text-gray-600">Australian Standard</p>
          </div>
        </div>
      </div>
    </section>
  );
}
