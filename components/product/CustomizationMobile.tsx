"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { colorSelection, Customizations } from "@/types/Customizations";

interface CustomizationMobileProps {
  customizations: Customizations;
}

export default function CustomizationMobile({
  customizations,
}: CustomizationMobileProps) {
  const t = useTranslations("ProductInfo.customization");

  const [selectedImage, setSelectedImage] = useState<colorSelection>(
    customizations.colorSelection?.[0]
  );

  if (
    !customizations ||
    (typeof customizations === "object" &&
      Object.keys(customizations).length === 0)
  ) {
    return null;
  }

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="text-md font-semibold text-black mb-3 border-b pb-2">
          {t("colorSelection")}
        </h3>

        {selectedImage && (
          <div className="mb-4 rounded-lg overflow-hidden border">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={selectedImage.imageId}
                alt="Selected Color Preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
              <div className="absolute bottom-0 left-0 right-0 text-black text-center text-sm backdrop-blur-sm">
                <p>{selectedImage.name}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          {customizations.colorSelection.map((option) => (
            <div
              key={option.id}
              className="flex flex-col items-center gap-1 cursor-pointer"
              onClick={() => setSelectedImage(option)}
            >
              <div
                className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  selectedImage.hexCode === option.hexCode
                    ? "border-indigo-500 scale-110"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: option.hexCode }}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold text-black mb-3 border-b pb-2">
          {t("customLogo")}
        </h3>
        <div className="flex flex-wrap gap-4">
          {customizations.LogoOptions.map((logo) => (
            <div key={logo.id} className="text-center w-24">
              <div className="w-20 h-20 overflow-hidden rounded-lg border mx-auto">
                <Image
                  src={logo.imageUrl}
                  alt={logo.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-xs font-semibold text-gray-800 mt-2 block">
                {logo.name}
              </span>
              {logo.description && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {logo.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold text-black mb-3 border-b pb-2">
          {t("tailoredPackaging")}
        </h3>
        <div className="flex flex-wrap gap-4">
          {customizations.PackagingOptions.map((packaging) => (
            <div key={packaging.id} className="text-center w-24">
              <div className="w-20 h-20 overflow-hidden rounded-lg border mx-auto">
                <Image
                  src={packaging.imageUrl}
                  alt={packaging.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-xs font-semibold text-gray-800 mt-2 block">
                {packaging.name}
              </span>
              {packaging.description && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {packaging.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
