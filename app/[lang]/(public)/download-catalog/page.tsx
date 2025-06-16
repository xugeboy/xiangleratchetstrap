import { generateGeneralBreadcrumbs } from "@/utils/breadcrumbs";
import { generateSchema, embedSchema } from "@/utils/schema";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

const PDF_FILE = "/asset/xiangle_catalogue.pdf";
const PDF_NAME = "xiangle_catalogue.pdf";
const PDF_SIZE_MB = "3.4";

export default function PDFViewerPage() {
  const locale = useLocale();
  const t = useTranslations('DownloadCatalogPage');

  const breadcrumbItems = generateGeneralBreadcrumbs(
    "DownloadCatalog",
    "download-catalog",
    locale
  );
  const websiteSchema = generateSchema({
    type: "WebSite",
    lang: locale,
  });
  const organizationSchema = generateSchema({
    type: "Organization",
    lang: locale,
  });
  const breadcrumbSchema = generateSchema({
    type: "BreadcrumbList",
    breadcrumbItems,
  });
  const schemaMetadataJson = embedSchema(
    [websiteSchema, organizationSchema, breadcrumbSchema].filter(Boolean)
  );

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
      />
      
      <div className="container mx-auto max-w-6xl py-12 md:py-24 px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('title')}
            </h1>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t('description')}
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2 inline-block text-left">
                <li>{t('features.feature1')}</li>
                <li>{t('features.feature2')}</li>
                <li>{t('features.feature3')}</li>
            </ul>
            
            <a
              href={PDF_FILE}
              download={PDF_NAME}
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
            >
              {t('buttonText')}
              <span className="block text-sm opacity-90 mt-1">
                {t('buttonMeta', { size: PDF_SIZE_MB })}
              </span>
            </a>
          </div>

          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <div className="bg-gray-100 rounded-lg shadow-md p-4">
                 <Image 
                    src="/images/catalog-cover-placeholder.jpg"
                    alt={t('imageAlt')}
                    width={800}
                    height={600}
                    className="rounded-md object-cover"
                 />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}