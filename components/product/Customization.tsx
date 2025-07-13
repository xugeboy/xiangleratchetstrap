"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Customizations } from "@/types/Customizations";
import { PreviewData } from "@/types/previewData";

interface CustomizationDesktopProps {
  customizations: Customizations;
  setPreviewHover: (data: PreviewData | null) => void;
  setPreviewClick: (data: PreviewData) => void;
}

export default function Customization({
  customizations,
  setPreviewHover,
  setPreviewClick,
}: CustomizationDesktopProps) {
  const t = useTranslations("ProductInfo.customization");

  if (
    !customizations ||
    (typeof customizations === "object" &&
      Object.keys(customizations).length === 0)
  ) {
    return null;
  }

  return (
    <div
      className="mb-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm"
      onMouseLeave={() => setPreviewHover(null)}
    >
      <h2 className="text-lg font-semibold bg-gray-100 px-4 py-3 border-b border-gray-200 text-black">
        {t("customizations")}
      </h2>
      <table className="w-full border-collapse">
        <tbody>
          {/* Color Selection */}
          <tr className="bg-white">
            <td className="py-3 px-4 w-1/4 border-b border-r border-gray-200 align-top">
              <div className="text-sm text-black font-medium mt-2">
                {t("colorSelection")}
              </div>
            </td>
            <td className="py-3 px-4 w-3/4 border-b border-gray-200">
              <div className="flex flex-wrap gap-2">
                {customizations.colorSelection.map((option) => (
                  <div
                    key={option.id}
                    onMouseEnter={() =>
                      setPreviewHover({
                        url: option.imageId,
                        name: option.name,
                      })
                    }
                    onClick={() =>
                      setPreviewClick({
                        url: option.imageId,
                        name: option.name,
                      })
                    }
                    className="cursor-pointer rounded-md p-0.5"
                  >
                    <div
                      className="w-10 h-10 rounded-full border border-gray-300 transition-all duration-200 hover:scale-110"
                      style={{ backgroundColor: option.hexCode }}
                    />
                  </div>
                ))}
              </div>
            </td>
          </tr>
          {/* Logo Options */}
          <tr className="bg-gray-50/50">
            <td className="py-3 px-4 w-1/4 border-b border-r border-gray-200 align-top">
              <div className="text-sm text-black font-medium mt-2">
                {t("customLogo")}
              </div>
            </td>
            <td className="py-3 px-4 w-3/4 border-b border-gray-200">
              <div className="flex flex-wrap gap-3">
                {customizations.LogoOptions.map((logo) => (
                  <div
                    key={logo.id}
                    onMouseEnter={() =>
                      setPreviewHover({
                        url: logo.imageUrl,
                        description: logo.description,
                        name: logo.name,
                      })
                    }
                    onClick={() =>
                      setPreviewClick({
                        url: logo.imageUrl,
                        description: logo.description,
                        name: logo.name,
                      })
                    }
                    className="cursor-pointer p-1"
                  >
                    <div className="w-16 h-16 overflow-hidden transition-transform duration-200 hover:scale-110">
                      <Image
                        src={logo.imageUrl}
                        alt={logo.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full rounded-md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </td>
          </tr>
          {/* Packaging Options */}
          <tr className="bg-white">
            <td className="py-3 px-4 w-1/4 border-r border-gray-200 align-top">
              <div className="text-sm text-black font-medium mt-2">
                {t("tailoredPackaging")}
              </div>
            </td>
            <td className="py-3 px-4 w-3/4">
              <div className="flex flex-wrap gap-3">
                {customizations.PackagingOptions.map((packaging) => (
                  <div
                    key={packaging.id}
                    onMouseEnter={() =>
                      setPreviewHover({
                        url: packaging.imageUrl,
                        description: packaging.description,
                        name: packaging.name,
                      })
                    }
                    onClick={() =>
                      setPreviewClick({
                        url: packaging.imageUrl,
                        description: packaging.description,
                        name: packaging.name,
                      })
                    }
                    className="cursor-pointer p-1"
                  >
                    <div className="w-16 h-16 overflow-hidden transition-transform duration-200 hover:scale-110">
                      <Image
                        src={packaging.imageUrl}
                        alt={packaging.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full rounded-md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
