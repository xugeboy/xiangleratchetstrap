"use client"

import { useMediaQuery } from "@/hooks/useMobile"
import { PDFViewer } from "@/components/common/PdfViewer"

// Path to your PDF file
const PDF_FILE = "/asset/xiangle_catalogue.pdf"
const PDF_NAME = "xiangle_catalogue"

export default function PDFViewerPage() {
  const isMobile = useMediaQuery("(max-width: 640px)")

  return (
    <div className={`container mx-auto py-8 px-4 ${isMobile ? "mb-24" : ""}`}>
      <h1 className="text-3xl font-bold mb-6">PDF Document Viewer</h1>

      <PDFViewer pdfUrl={PDF_FILE} fileName={PDF_NAME} />
    </div>
  )
}
