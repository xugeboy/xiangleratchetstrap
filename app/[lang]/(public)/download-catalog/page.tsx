"use client"

import { useMediaQuery } from "@/hooks/useMobile"
import { generateGeneralBreadcrumbs } from "@/utils/breadcrumbs";
import { generateSchema, embedSchema } from "@/utils/schema";
import { useLocale } from "next-intl";
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('@/components/common/PdfViewer'), {
  ssr: false,
});

const PDF_FILE = "/asset/xiangle_catalogue.pdf"
const PDF_NAME = "xiangle_catalogue"

export default function PDFViewerPage() {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const locale = useLocale();
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
    <div className={`container mx-auto py-8 px-4 ${isMobile ? "mb-24" : ""}`}>
            <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
        />
      </section>
      <h1 className="text-3xl font-bold mb-6">PDF Document Viewer</h1>

      <PDFViewer pdfUrl={PDF_FILE} fileName={PDF_NAME} />
    </div>
  )
}
