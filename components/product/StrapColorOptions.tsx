"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { colorSelection, Customizations, LogoOptions, PackagingOptions } from "@/types/Customizations";


export default function StrapColorOptions({
  customizations,
}: {
  customizations: Customizations;
}) {
  const t = useTranslations("ProductInfo.customization");
  const [hoveredOption, setHoveredOption] = useState<colorSelection | null>(
    null
  );
  const [hoveredLogo, setHoveredLogo] = useState<LogoOptions | null>(null);
  const [hoveredPackaging, setHoveredPackaging] =
    useState<PackagingOptions | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  if (
    customizations &&
    typeof customizations === 'object' &&
    !Array.isArray(customizations) &&
    Object.keys(customizations).length === 0
  ){
    return null;
  }

  const handleMouseEnter = (
    option: colorSelection,
    event: React.MouseEvent
  ) => {
    setHoveredOption(option);
    setHoveredLogo(null);
    setHoveredPackaging(null);
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setHoverPosition({
      x: rect.left + rect.width / 2 - 75,
      y: rect.top - 160,
    });
  };

  const handleLogoMouseEnter = (logo: LogoOptions) => {
    setHoveredLogo(logo);
    setHoveredOption(null);
    setHoveredPackaging(null);
    setHoverPosition({
      x: window.innerWidth / 2 - 200,
      y: window.innerHeight / 2 - 200,
    });
  };

  const handlePackagingMouseEnter = (packaging: PackagingOptions) => {
    setHoveredPackaging(packaging);
    setHoveredOption(null);
    setHoveredLogo(null);
    setHoverPosition({
      x: window.innerWidth / 2 - 200,
      y: window.innerHeight / 2 - 200,
    });
  };

  const handleMouseLeave = () => {
    setHoveredOption(null);
    setHoveredLogo(null);
    setHoveredPackaging(null);
    setHoverPosition(null);
  };

  return (
    <>
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <h2 className="text-lg font-semibold bg-gray-100 px-4 py-3 border-b border-gray-200 text-black">
          {t("customizations")}
        </h2>
        <table className="w-full border-collapse">
          <tbody>
            <tr className="bg-white">
              <td className="py-3 px-4 w-1/4 border-r border-gray-200 last:border-r-0">
                <div className="text-sm text-black font-medium">
                  {t("colorSelection")}
                </div>
              </td>
              <td className="py-3 px-4 w-3/4">
                <div className="flex flex-wrap gap-2 relative">
                  {customizations.colorSelection.map((option) => (
                    <div
                      key={option.id}
                      onMouseEnter={(e) => handleMouseEnter(option, e)}
                      onMouseLeave={handleMouseLeave}
                      className={`cursor-pointer text-center flex flex-col items-center justify-center rounded-md transition-transform duration-200 hover:scale-110
          ${
            option?.hexCode === "#ffffff"
              ? "border border-black bg-black"
              : "bg-white border-none"
          }`}
                    >
                      <div
                        className="w-10 h-10 rounded-full border border-gray-300 transition-all duration-200 hover:border-gray-500"
                        style={{ backgroundColor: option.hexCode }}
                      ></div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
            <tr className="bg-gray-50/50">
              <td className="py-3 px-4 w-1/4 border-r border-gray-200 last:border-r-0">
                <div className="text-sm text-black font-medium">
                  {t("customLogo")}
                </div>
              </td>
              <td className="py-3 px-4 w-3/4">
                <div className="flex flex-wrap gap-3 relative">
                  {customizations.LogoOptions.map((logo) => (
                    <div
                      key={logo.id}
                      onMouseEnter={() => handleLogoMouseEnter(logo)}
                      onMouseLeave={handleMouseLeave}
                      className="cursor-pointer text-center flex flex-col items-center justify-center transition-transform duration-200 hover:scale-110"
                    >
                      <div className="w-16 h-16 overflow-hidden transition-all duration-200 hover:border-gray-500 hover:shadow-md">
                      <Image
                          src={logo.imageUrl}
                          alt={logo.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="py-3 px-4 w-1/4 border-r border-gray-200 last:border-r-0">
                <div className="text-sm text-black font-medium">
                  {t("tailoredPackaging")}
                </div>
              </td>
              <td className="py-3 px-4 w-3/4">
                <div className="flex flex-wrap gap-3 relative">
                  {customizations.PackagingOptions.map((packaging) => (
                    <div
                      key={packaging.id}
                      onMouseEnter={() =>
                        handlePackagingMouseEnter(packaging)
                      }
                      onMouseLeave={handleMouseLeave}
                      className="cursor-pointer text-center flex flex-col items-center justify-center transition-transform duration-200 hover:scale-110"
                    >
                      <div className="w-16 h-16 overflow-hidden transition-all duration-200 hover:border-gray-500 hover:shadow-md">
                      <Image
                          src={packaging.imageUrl}
                          alt={packaging.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="px-4 pt-4 pb-4">
          <button className="w-full bg-gradient-to-r from-black via-amber-700 to-amber-700 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 group">
            <div className="flex items-center gap-2">
              <a href="#quote_form">
                <span className="text-lg tracking-wide">
                  🎨 {t("possibilities")}
                </span>
              </a>
            </div>
          </button>
        </div>
      </div>

      {/* Color hover preview */}
      {hoveredOption && hoverPosition && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y}px`,
          }}
        >
          <div className="relative w-[150px] h-[150px] bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-300 animate-in fade-in-0 zoom-in-95">
            <Image
              src={hoveredOption.imageId}
              alt={hoveredOption.name}
              fill
              className="object-cover"
              sizes="150px"
            />
          </div>
        </div>
      )}

      {/* Logo hover preview */}
      {hoveredLogo && hoverPosition && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y}px`,
          }}
        >
          <div className="relative w-[400px] h-[400px] bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-300 animate-in fade-in-0 zoom-in-95">
            <Image
              src={hoveredLogo.imageUrl}
              alt={hoveredLogo.name}
              fill
              className="object-cover"
              sizes="300px"
            />
            <div className="text-lg font-semibold absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
              <div>{hoveredLogo.name}</div>
              <div>{hoveredLogo.description}</div>
            </div>
          </div>
        </div>
      )}

      {/* Packaging hover preview */}
      {hoveredPackaging && hoverPosition && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y}px`,
          }}
        >
          <div className="relative w-[400px] h-[400px] bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-300 animate-in fade-in-0 zoom-in-95">
            <Image
              src={hoveredPackaging.imageUrl}
              alt={hoveredPackaging.name}
              fill
              className="object-cover"
            />
            <div className="text-lg font-semibold absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
              <div>{hoveredPackaging.name}</div>
              <div>{hoveredPackaging.description}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
