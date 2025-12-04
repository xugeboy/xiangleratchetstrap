"use client";

import { useTranslations } from "next-intl";

const VIDEO_SRC =
  "https://xiangleratchetstrap.com/cdn/videos/v1764747704/webbing_production_line_vjbaxq.mp4";

export default function HeroSection() {
  const t = useTranslations("HeroSection");

  const title = t("slides.1.title");
  const subtitle = t("slides.1.subtitle");
  const description = t("slides.1.description");

  return (
    <section
      className="
        relative w-full overflow-hidden
        py-24
        md:py-32
        lg:h-[680px] lg:py-0
      "
    >
      {/* 背景视频 */}
      <div className="absolute inset-0 flex justify-center">
        <div className="container mx-auto px-4 h-full relative">
          <video
            className="h-full w-full object-cover"
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
      </div>

      {/* 文案层 */}
      <div className="relative z-20 h-full">
        <div className="container mx-auto px-16 h-full flex items-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {title} <br />
              <span className="text-red-600">{subtitle}</span>
            </h1>

            <p className="text-xl text-white leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
