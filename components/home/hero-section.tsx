"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const VIDEO_SRC =
  "https://xiangleratchetstrap.com/cdn/videos/v1764747704/webbing_production_line_vjbaxq.mp4";

export default function HeroSection() {
  const t = useTranslations("HeroSection");

  const title = t("slides.1.title");
  const subtitle = t("slides.1.subtitle");
  const description = t("slides.1.description");

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    (async () => {
      const { SplitText } = await import("gsap/SplitText");
      gsap.registerPlugin(SplitText);

      if (!sectionRef.current || !titleRef.current) return;

      ctx = gsap.context(() => {
        // ✅ 1. 视频轻微 zoom-in（极克制）
        if (videoRef.current) {
          gsap.fromTo(
            videoRef.current,
            { scale: 1.05 },
            {
              scale: 1,
              duration: 1.6,
              ease: "power2.out",
            }
          );
        }

        // ✅ 2. 标题 SplitText
        const split = new SplitText(titleRef.current, {
          type: "chars,words",
        });

        gsap.from(split.chars, {
          y: 40,
          opacity: 0,
          stagger: 0.03,
          duration: 0.8,
          ease: "power3.out",
        });

        // ✅ 3. 描述文字淡入
        if (descRef.current) {
          gsap.from(descRef.current, {
            y: 20,
            opacity: 0,
            delay: 0.6,
            duration: 0.6,
            ease: "power2.out",
          });
        }

        // ✅ 清理 SplitText
        gsap.delayedCall(1.6, () => {
          split.revert();
        });
      }, sectionRef);
    })();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
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
            ref={videoRef}
            className="h-full w-full object-cover"
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          {/* 轻遮罩，保证文字对比度 */}
          <div className="absolute inset-0" />
        </div>
      </div>

      {/* 文案 */}
      <div className="relative z-20 h-full">
        <div className="container mx-auto px-16 h-full flex items-center">
          <div className="max-w-4xl">
            <h1
              ref={titleRef}
              className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
            >
              {title} <br />
              <span className="text-red-600">{subtitle}</span>
            </h1>

            <p
              ref={descRef}
              className="text-xl text-white leading-relaxed"
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
