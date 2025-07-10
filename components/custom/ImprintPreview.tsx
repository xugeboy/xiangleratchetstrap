interface ImprintPreviewProps {
  webbingColor: string
  textColor: string
  text: string
  interval: number
  webbingWidth: string
  unit: string
}

export default function ImprintPreview({ webbingColor, textColor, text, interval, webbingWidth,unit }: ImprintPreviewProps) {
  // 模拟文本和间隔的视觉宽度
  const calculateTextWidth = (text: string, font: string) => {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    if (context) {
      context.font = font
      return context.measureText(text).width.toFixed(2)
    }
    return "0"
  }
  const textLength = calculateTextWidth(text, "bold 60px Poppins")

  const MM_PER_INCH = 25.4;
  const mmToPx = (mm: number) => {
    const DPI = window.devicePixelRatio * 96
    return unit === "mm" ? ((mm * DPI) / MM_PER_INCH).toFixed(2):(mm * DPI).toFixed(2)
  }

  const pxTomm = (px: number) => {
    const DPI = window.devicePixelRatio * 96
    px = unit === "mm" ? px : px / MM_PER_INCH
    return ((px * MM_PER_INCH) / DPI).toFixed(2)
  }

  // 计算单个重复单元的总宽度（文字宽度 + 间隔宽度）
  const unitWidth = Number(textLength) + Number(mmToPx(interval))
  const isWhite = webbingColor.toUpperCase() === "#FFFFFF";
  const backgroundColor = isWhite ? "#E0E0E0" : "#FFFFFF";
  return (
    <div className="flex items-center gap-2 py-8 px-2" 
    style={{ backgroundColor: backgroundColor }}>
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
          className="relative h-24 w-full overflow-hidden bg-cover bg-center"
          style={{ backgroundColor: webbingColor }}
        >
          <div className="absolute inset-0 flex items-center">
            <div
              className="flex whitespace-nowrap animate-scroll-left"
              style={{
                color: textColor,
                animationDuration: "8s",
              }}
            >
              {/* 创建足够多的重复文字以确保无缝循环 */}
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-6xl font-bold" style={{ paddingRight: `${mmToPx(interval)}px` }}>
                  {text || "PREVIEW"}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 下方测量指南 */}
        <div className="flex h-10 w-full overflow-hidden border-t border-amber-700">
          <div className="flex items-center whitespace-nowrap animate-scroll-left" style={{ animationDuration: "8s" }}>
            {/* 创建足够多的重复测量单元以确保无缝循环 */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center whitespace-nowrap">
                <div
                  className="flex h-full flex-col items-center justify-between border-r border-amber-700"
                  style={{ width: `${Number(textLength)}px` }}
                >
                  <span className="text-xs mt-2 text-amber-700 font-bold">{pxTomm(Number(textLength))}{unit}</span>
                </div>
                <div
                  className="flex h-full flex-col items-center justify-between border-r border-amber-700"
                  style={{ width: `${Number(mmToPx(interval))}px` }}
                >
                  <span className="text-xs mt-2 text-amber-700 font-bold">{interval}{unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${unitWidth}px);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }
      `}</style>
    </div>
  )
}
