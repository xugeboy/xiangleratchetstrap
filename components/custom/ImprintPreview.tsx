"use client";

interface ImprintPreviewProps {
  webbingColor: string;
  textColor: string;
  text: string;
  interval: number;
  webbingWidth: string;
}

export default function ImprintPreview({
  webbingColor,
  textColor,
  text,
  interval,
  webbingWidth,
}: ImprintPreviewProps) {
  // 模拟文本和间隔的视觉宽度
  const calculateTextWidth = (text, font) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    return context.measureText(text).width.toFixed(2);
  };
  const textLength = calculateTextWidth(text, "60px Poppins");

  const mmToPx = (mm: number) => {
    const DPI = window.devicePixelRatio * 96;
    const mmToInch = 25.4; // 每英寸的毫米数
    return ((mm * DPI) / mmToInch).toFixed(2);
  };

  const pxTomm = (px: number) => {
    const DPI = window.devicePixelRatio * 96;
    const mmPerInch = 25.4;
    return ((px * mmPerInch) / DPI).toFixed(2);
  };

  return (
    <div className="flex items-center gap-2">
      {/* 左侧宽度指示器 */}
      <div className="flex flex-col items-center self-stretch h-24">
        <div className="h-10 w-px bg-amber-700"></div>
        <span className="text-xs text-amber-700 font-bold">{webbingWidth}</span>
        <div className="h-10 w-px bg-amber-700"></div>
      </div>

      {/* 右侧主预览区域 */}
      <div className="w-full">
        {/* 织带预览 */}
        <div
          className="relative h-24 w-full overflow-hidden bg-cover bg-center size"
          style={{ backgroundColor: webbingColor }}
        >
          <div className="absolute inset-0 flex items-center">
            <div
              className="flex whitespace-nowrap"
              style={{ color: textColor }}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className="text-6xl"
                  style={{ paddingRight: `${mmToPx(interval)}px` }}
                >
                  {text || "PREVIEW"}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 下方测量指南 */}
        <div className="flex h-10 w-full overflow-hidden border-t border-amber-700">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center whitespace-nowrap">
              <div
                className="flex h-full flex-col items-center justify-between border-r border-amber-700"
                style={{ width: `${Number(textLength)}px` }}
              >
                <span className="text-xs mt-2 text-amber-700 font-bold">
                  {pxTomm(textLength)}mm
                </span>
              </div>
              <div
                className="flex h-full flex-col items-center justify-between border-r border-amber-700"
                style={{ width: `${Number(mmToPx(interval))}px` }}
              >
                <span className="text-xs mt-2 text-amber-700 font-bold">{interval}mm</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
