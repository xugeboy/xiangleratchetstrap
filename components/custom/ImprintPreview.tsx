"use client";

import { memo, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useCustomizer } from '@/contexts/CustomizerContext';

// Utility function outside component to avoid recreation
const calculateTextWidth = (text: string, font: string): number => {
  if (typeof window === 'undefined') return 0; // Guard for SSR
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    context.font = font;
    return context.measureText(text).width;
  }
  return 0;
};

interface ImprintPreviewProps {
    onApplyImprint: () => void;
    onComplexDesign: () => void;
}

function ImprintPreview({ onApplyImprint, onComplexDesign }: ImprintPreviewProps) {
  const t = useTranslations("OnlineBuilder");
  const { product, state } = useCustomizer();
  const { webbingColor, textColor, printedText, printInterval, unit } = state;

  const textToRender = printedText || "PREVIEW";
  const textLengthPx = useMemo(() => calculateTextWidth(textToRender, "bold 60px Poppins"), [textToRender]);

  const { mmToPx, pxToMm, unitWidthPx } = useMemo(() => {
    const DPI = (typeof window !== 'undefined' ? window.devicePixelRatio : 1) * 96;
    const MM_PER_INCH = 25.4;

    const convertToPx = (value: number) => unit === 'mm' ? (value * DPI) / MM_PER_INCH : value * DPI;
    const convertFromPx = (px: number) => unit === 'mm' ? (px * MM_PER_INCH) / DPI : px / DPI;
    
    const intervalPx = convertToPx(printInterval);
    const unitWidth = textLengthPx + intervalPx;

    return {
        mmToPx: convertToPx,
        pxToMm: convertFromPx,
        unitWidthPx: unitWidth
    };
  }, [unit, printInterval, textLengthPx]);

  if (!webbingColor || !textColor || !product) return null;

  const isWhiteBg = webbingColor.hexCode.toUpperCase() === "#FFFFFF";
  const containerBg = isWhiteBg ? "#E0E0E0" : "#FFFFFF";

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-3">
            <h3 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                {t("preview.title")}
            </h3>
        </div>
        <div className="py-8">
            <div className="flex items-center gap-2 py-8 px-2" style={{ backgroundColor: containerBg }}>
                <div className="flex flex-col items-center self-stretch h-24">
                    <div className="h-10 w-px bg-red-600"></div>
                    <span className="text-xs text-red-600 font-bold">{product.width}</span>
                    <div className="h-10 w-px bg-red-600"></div>
                </div>
                <div className="w-full">
                    <div className="relative h-24 w-full overflow-hidden bg-cover bg-center" style={{ backgroundColor: webbingColor.hexCode }}>
                        <div className="absolute inset-0 flex items-center">
                            <div
                                className="flex whitespace-nowrap animate-scroll-left"
                                style={{
                                    color: textColor.hexCode,
                                    '--scroll-width': `${unitWidthPx.toFixed(2)}px`,
                                    animationDuration: "8s",
                                } as React.CSSProperties}
                            >
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <span key={i} className="text-6xl font-bold" style={{ paddingRight: `${mmToPx(printInterval).toFixed(2)}px` }}>
                                        {textToRender}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex h-10 w-full overflow-hidden border-t border-red-600">
                        <div className="flex items-center whitespace-nowrap animate-scroll-left" style={{ '--scroll-width': `${unitWidthPx.toFixed(2)}px`, animationDuration: "8s" } as React.CSSProperties}>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} className="flex items-center whitespace-nowrap">
                                    <div className="flex h-full flex-col items-center justify-between border-r border-red-600" style={{ width: `${textLengthPx.toFixed(2)}px` }}>
                                        <span className="text-xs mt-2 text-red-600 font-bold">{pxToMm(textLengthPx).toFixed(2)}{unit}</span>
                                    </div>
                                    <div className="flex h-full flex-col items-center justify-between border-r border-red-600" style={{ width: `${mmToPx(printInterval).toFixed(2)}px` }}>
                                        <span className="text-xs mt-2 text-red-600 font-bold">{printInterval.toFixed(2)}{unit}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 px-4 max-w-2xl mx-auto flex gap-4">
                <button
                    onClick={onApplyImprint}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200"
                >
                    {t("buttons.applyAndQuote")}
                </button>
                <button
                    onClick={onComplexDesign}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200"
                >
                    {t("buttons.complexDesign")}
                </button>
            </div>
        </div>
        <style jsx>{`
            @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-1 * var(--scroll-width))); }
            }
            .animate-scroll-left { animation: scroll-left linear infinite; }
        `}</style>
    </div>
  );
}

export default memo(ImprintPreview);
