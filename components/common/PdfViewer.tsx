"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { useMediaQuery } from "@/hooks/useMobile"

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`

interface PDFViewerProps {
  pdfUrl: string
  fileName?: string
}

export function PDFViewer({ pdfUrl, fileName }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [showControls, setShowControls] = useState<boolean>(false)
  const [scale, setScale] = useState<number>(1.0)
  const [width, setWidth] = useState<number | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Reset when PDF changes
  useEffect(() => {
    setPageNumber(1)
    setIsLoading(true)
    setError(null)
  }, [pdfUrl])

  // Calculate width for PDF pages on mobile
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current && isMobile) {
        // Get container width and subtract padding
        const containerWidth = containerRef.current.clientWidth - 32 // 16px padding on each side
        setWidth(containerWidth)
      }
    }

    // Initial calculation
    updateWidth()

    // Recalculate on resize
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [isMobile])

  // Handle swipe gestures for mobile
  useEffect(() => {
    if (!isMobile || !containerRef.current) return

    let touchStartX = 0
    let touchEndX = 0
    let touchStartY = 0
    let touchEndY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX
      touchStartY = e.changedTouches[0].screenY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX
      touchEndY = e.changedTouches[0].screenY
      handleSwipe()
    }

    const handleSwipe = () => {
      const horizontalSwipeThreshold = 50
      const verticalSwipeThreshold = 70

      // Calculate horizontal and vertical distance
      const horizontalDistance = Math.abs(touchEndX - touchStartX)
      const verticalDistance = Math.abs(touchEndY - touchStartY)

      // If horizontal swipe is more significant than vertical
      if (horizontalDistance > verticalDistance && horizontalDistance > horizontalSwipeThreshold) {
        if (touchEndX - touchStartX > horizontalSwipeThreshold) {
          // Swipe right - go to previous page
          previousPage()
        } else if (touchStartX - touchEndX > horizontalSwipeThreshold) {
          // Swipe left - go to next page
          nextPage()
        }
      }
      // If vertical swipe is more significant than horizontal
      else if (verticalDistance > horizontalDistance && verticalDistance > verticalSwipeThreshold) {
        if (touchEndY - touchStartY > verticalSwipeThreshold) {
          // Swipe down - show controls
          setShowControls(true)
        } else if (touchStartY - touchEndY > verticalSwipeThreshold) {
          // Swipe up - hide controls
          setShowControls(false)
        }
      }
    }

    const container = containerRef.current
    container.addEventListener("touchstart", handleTouchStart, { passive: true })
    container.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isMobile, numPages, pageNumber,nextPage,previousPage])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setIsLoading(false)
  }

  function onDocumentLoadError(error: Error) {
    console.error("Error loading PDF:", error)
    setError("Failed to load PDF. Please try again later.")
    setIsLoading(false)
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset
      return Math.max(1, Math.min(numPages || 1, newPageNumber))
    })
  }

  function previousPage() {
    changePage(-1)
  }

  function nextPage() {
    changePage(1)
  }

  function zoomIn() {
    setScale((prevScale) => Math.min(prevScale + 0.2, 3))
  }

  function zoomOut() {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.6))
  }

  function handleDownload() {
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = fileName || pdfUrl.split("/").pop() || "document.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function handlePageInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0 && value <= (numPages || 1)) {
      setPageNumber(value)
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Mobile PDF Controls - Fixed at bottom */}
      {isMobile && (
        <div
          className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg transition-transform duration-300 z-10 ${showControls ? "translate-y-0" : "translate-y-full"}`}
        >
          <div className="p-3 flex flex-col gap-3">
            {/* Page navigation */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={previousPage}
                disabled={pageNumber <= 1}
                aria-label="Previous page"
                className="flex-1 py-3 flex items-center justify-center bg-gray-100 rounded-l-lg disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div className="flex-1 flex items-center justify-center px-2">
                <input
                  type="number"
                  min={1}
                  max={numPages || 1}
                  value={pageNumber}
                  onChange={handlePageInputChange}
                  className="w-12 text-center rounded-md border border-gray-300 py-2 text-sm"
                  aria-label="Page number"
                />
                <span className="text-sm text-gray-500 ml-1">/ {numPages || "-"}</span>
              </div>

              <button
                type="button"
                onClick={nextPage}
                disabled={!numPages || pageNumber >= numPages}
                aria-label="Next page"
                className="flex-1 py-3 flex items-center justify-center bg-gray-100 rounded-r-lg disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Zoom and download */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={zoomOut}
                  disabled={scale <= 0.6}
                  aria-label="Zoom out"
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </button>
                <span className="text-sm text-gray-500 w-16 text-center">{Math.round(scale * 100)}%</span>
                <button
                  type="button"
                  onClick={zoomIn}
                  disabled={scale >= 3}
                  aria-label="Zoom in"
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
                aria-label="Download PDF"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span className="font-medium">Download</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop PDF Controls */}
      {!isMobile && (
        <div className="flex flex-wrap items-center justify-between w-full mb-4 gap-2 p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={previousPage}
              disabled={pageNumber <= 1}
              aria-label="Previous page"
              className={`inline-flex items-center justify-center rounded-md px-2 py-2 text-sm font-medium border ${
                pageNumber <= 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex items-center gap-1">
              <input
                type="number"
                min={1}
                max={numPages || 1}
                value={pageNumber}
                onChange={handlePageInputChange}
                className="w-16 text-center rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                aria-label="Page number"
              />
              <span className="text-sm text-gray-500">/ {numPages || "-"}</span>
            </div>

            <button
              type="button"
              onClick={nextPage}
              disabled={!numPages || pageNumber >= numPages}
              aria-label="Next page"
              className={`inline-flex items-center justify-center rounded-md px-2 py-2 text-sm font-medium border ${
                !numPages || pageNumber >= numPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={zoomOut}
              disabled={scale <= 0.6}
              aria-label="Zoom out"
              className={`inline-flex items-center justify-center rounded-md px-2 py-2 text-sm font-medium border ${
                scale <= 0.6
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </button>
            <span className="text-sm text-gray-500 w-16 text-center">{Math.round(scale * 100)}%</span>
            <button
              type="button"
              onClick={zoomIn}
              disabled={scale >= 3}
              aria-label="Zoom in"
              className={`inline-flex items-center justify-center rounded-md px-2 py-2 text-sm font-medium border ${
                scale >= 3
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="ml-auto inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Download PDF"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </button>
        </div>
      )}

      {/* PDF Document */}
      <div ref={containerRef} className={`w-full overflow-auto px-4 ${isMobile ? "pb-24" : ""}`}>
        {error ? (
          <div className="flex items-center justify-center h-[600px] text-red-500">{error}</div>
        ) : (
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex flex-col items-center justify-center h-[600px]">
                <div className="h-[600px] w-full bg-gray-200 animate-pulse rounded-md"></div>
              </div>
            }
            className="flex justify-center"
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-[600px]">
                <div className="h-[600px] w-full bg-gray-200 animate-pulse rounded-md"></div>
              </div>
            ) : (
              <Page
                pageNumber={pageNumber}
                scale={!isMobile ? scale : undefined}
                width={isMobile ? width : undefined}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-md"
                loading={
                  <div className="flex flex-col items-center justify-center h-[500px] w-full">
                    <div className="h-[500px] w-full bg-gray-200 animate-pulse rounded-md"></div>
                  </div>
                }
              />
            )}
          </Document>
        )}
      </div>

      {/* Mobile page indicator */}
      {isMobile && !showControls && numPages && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {pageNumber} / {numPages}
        </div>
      )}

      {/* Mobile swipe hint - only show when controls are hidden */}
      {isMobile && !showControls && !isLoading && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14"></path>
            <path d="M19 12l-7 7-7-7"></path>
          </svg>
          <span>下滑显示控制栏</span>
        </div>
      )}
    </div>
  )
}

