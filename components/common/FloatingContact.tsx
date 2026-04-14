"use client";

import dynamic from "next/dynamic";
import { useState, type ReactNode } from "react";

interface FloatingContactProps {
  whatsappNumber?: string;
  email?: string;
}

const FloatingContactModal = dynamic(
  () => import("@/components/common/FloatingContactModal"),
  { ssr: false }
);

function FloatingButtonIcon({ children }: { children: ReactNode }) {
  return <span className="block h-6 w-6">{children}</span>;
}

export default function FloatingContact({
  whatsappNumber = "+8619952792557",
  email = "info@xiangleratchetstrap.com",
}: FloatingContactProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldLoadModal, setShouldLoadModal] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hello, I want to know more about your products."
    );
    window.open(
      `https://wa.me/${whatsappNumber.replace(/\s/g, "")}?text=${message}`,
      "_blank"
    );
  };

  const handleEmailClick = () => {
    window.open(`mailto:${email}`, "_blank");
  };

  const handleFormClick = () => {
    setShouldLoadModal(true);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 transform flex-col gap-2 md:flex">
        <button
          type="button"
          onClick={handleWhatsAppClick}
          className="group relative cursor-pointer rounded-full bg-green-500 p-4 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600"
          title="WhatsApp Contact Us"
        >
          <FloatingButtonIcon>
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M19.05 4.91A9.82 9.82 0 0012.03 2C6.62 2 2.2 6.42 2.2 11.83c0 1.74.45 3.44 1.31 4.95L2 22l5.38-1.41a9.8 9.8 0 004.65 1.18h.01c5.41 0 9.83-4.42 9.83-9.83a9.77 9.77 0 00-2.82-7.03zm-7.02 15.2h-.01a8.12 8.12 0 01-4.14-1.13l-.3-.18-3.2.84.86-3.12-.2-.32a8.13 8.13 0 01-1.25-4.35c0-4.48 3.64-8.13 8.13-8.13 2.17 0 4.2.84 5.73 2.38a8.05 8.05 0 012.38 5.74c0 4.48-3.65 8.13-8.14 8.13zm4.46-6.08c-.24-.12-1.42-.7-1.64-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.95-1.18-.72-.64-1.21-1.42-1.35-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.68 2.56 4.07 3.59.57.24 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.03.14-1.14-.06-.12-.22-.18-.46-.3z" />
            </svg>
          </FloatingButtonIcon>
          <div className="absolute right-full top-1/2 mr-3 -translate-y-1/2 transform whitespace-nowrap rounded-lg bg-gray-800 px-3 py-2 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            WhatsApp
          </div>
        </button>

        <button
          type="button"
          onClick={handleEmailClick}
          className="group relative cursor-pointer rounded-full bg-orange-500 p-4 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-orange-600"
          title="Send Email"
        >
          <FloatingButtonIcon>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </FloatingButtonIcon>
          <div className="absolute right-full top-1/2 mr-3 -translate-y-1/2 transform whitespace-nowrap rounded-lg bg-gray-800 px-3 py-2 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            E-Mail
          </div>
        </button>

        <button
          type="button"
          onClick={handleFormClick}
          className="group relative cursor-pointer rounded-full bg-blue-500 p-4 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-600"
          title="Request Quote"
        >
          <FloatingButtonIcon>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M8 3.5h6l4 4V20a1 1 0 0 1-1 1H8a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z" />
              <path d="M14 3.5V8h4" />
              <path d="M9 12h6M9 16h6" />
            </svg>
          </FloatingButtonIcon>
          <div className="absolute right-full top-1/2 mr-3 -translate-y-1/2 transform whitespace-nowrap rounded-lg bg-gray-800 px-3 py-2 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Request Quote
          </div>
        </button>
      </div>

      {shouldLoadModal && (
        <FloatingContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
