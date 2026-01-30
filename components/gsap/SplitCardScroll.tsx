"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/utils/utils"; 

gsap.registerPlugin(ScrollTrigger);

// 定义数据接口
interface CardContent {
  id: string;
  backText: string;
  backNumber: string;
  color: string;
  textColor?: string;
}

interface SplitCardProps {
  headerText: string;
  masterImageSrc: string;
  cards: [CardContent, CardContent, CardContent]; // 严格限制为3张
}

export default function SplitCard({
  headerText,
  masterImageSrc,
  cards,
}: SplitCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // --- 桌面端动画 (min-width: 1024px) ---
      mm.add("(min-width: 1024px)", () => {
        // 计算时间轴的总时长，这决定了 scrub 的平滑程度
        // 我们设总时长为 9，以便后续精确控制各阶段
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stickyRef.current,
            start: "top top",
            end: `+=${typeof window !== 'undefined' ? window.innerHeight * 1.5 : 1000}`,
            scrub: 1, // 1秒的平滑缓冲，让缩放更丝滑
            pin: true,
            pinSpacing: true,
          },
        });

        // 1. Header 浮现 (时间: 0 - 1)
        tl.to(headerRef.current, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0);

        // 2. 容器宽度收缩 (时间: 0 - 2.5)
        // 制造聚拢感
        tl.fromTo(cardContainerRef.current, { width: "75%" }, { width: "60%", duration: 2.5, ease: "none" }, 0);

        // --- 核心修复：增强图片缩放 ---
        // 3. 全局图片缩放 (时间: 0 - 9)
        // 贯穿整个滚动过程。放大到 1.25 倍，ease: "none" 保证线性匀速推进
        // 配合 transformOrigin: "center center" (在 JSX 中设置)，会产生向画面中心推进的效果
        tl.to(".inner-image", { scale: 0.8, duration: 2, ease: "none" }, 0);

        // 4. 裂变阶段 (Gap Open) (时间: 3.5 - 5)
        tl.to(cardContainerRef.current, { gap: "20px", duration: 1, ease: "power3.out" }, 3.5);
        tl.to(".split-card", { borderRadius: "20px", duration: 1, ease: "power3.out" }, 3.5);

        // 5. 翻转阶段 (Flip) (时间: 7 - 9)
        tl.to(".split-card", { rotationY: 180, stagger: 0.1, duration: 1.5, ease: "power3.inOut" }, 7);
        
        // 两侧卡片倾斜位移 3D 效果
        tl.to("#card-0", { y: 30, rotationZ: -15, duration: 1, ease: "power3.inOut" }, 7);
        tl.to("#card-2", { y: 30, rotationZ: 15, duration: 1, ease: "power3.inOut" }, 7);
      });

      // --- 移动端清理 ---
      mm.add("(max-width: 1023px)", () => {
        gsap.set([cardContainerRef.current, headerRef.current, ".split-card", ".inner-image"], {
          clearProps: "all",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full bg-[#0f0f0f] text-white font-serif">
      <section
        ref={stickyRef}
        className="relative h-screen w-full flex flex-col lg:flex-row justify-center items-center py-16 px-8 lg:p-0 overflow-hidden"
      >
        {/* Header (Absolute centered) */}
        <div className="lg:absolute lg:top-[20%] lg:left-1/2 lg:-translate-x-1/2 z-20 mb-12 lg:mb-0 text-center w-full pointer-events-none">
          <h1
            ref={headerRef}
            className="text-4xl lg:text-6xl font-medium leading-none opacity-100 lg:opacity-0 lg:translate-y-10 will-change-transform"
          >
            {headerText}
          </h1>
        </div>

        {/* Card Container */}
        <div
          ref={cardContainerRef}
          className={cn(
            "relative w-full lg:w-[75%] flex flex-col lg:flex-row gap-8 lg:gap-0 perspective-[1000px] z-10",
            "lg:mx-auto justify-center items-stretch" // 关键：居中且等高
          )}
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              id={`card-${index}`}
              className={cn(
                "split-card relative w-full aspect-[5/7] max-w-[400px] mx-auto lg:mx-0 preserve-3d origin-top will-change-transform",
                "lg:w-1/3 lg:flex-none", // 强制三分之一宽度
                index === 0 && "lg:rounded-l-[20px] rounded-[20px]",
                index === 1 && "lg:rounded-none rounded-[20px]",
                index === 2 && "lg:rounded-r-[20px] rounded-[20px]"
              )}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* 正面：Windowing Image Logic */}
              <div className="card-front absolute inset-0 backface-hidden overflow-hidden">
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={masterImageSrc}
                    alt="Split Part"
                    className="inner-image absolute top-0 h-full w-[300%] max-w-none object-cover will-change-transform"
                    style={{
                      left: `${index * -100}%`, // 0%, -100%, -200%
                      transformOrigin: "center center", // 确保从中心放大，保证三张图视觉连续
                    }}
                  />
                  {/* Overlay for depth */}
                  <div className="absolute inset-0 " />
                </div>
              </div>

              {/* 背面：Content */}
              <div
                className="card-back absolute inset-0 backface-hidden overflow-hidden rounded-[inherit] flex flex-col justify-between p-8 rotate-y-180"
                style={{
                  backgroundColor: card.color,
                  transform: "rotateY(180deg)",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <span className={cn("text-xl font-sans opacity-50", card.textColor || "text-white")}>
                  {card.backNumber}
                </span>
                <div className="flex flex-col items-center gap-4">
                  {/* Icon Placeholder */}
                  <div className={cn("w-10 h-10 rounded-full border-2 border-current opacity-20", card.textColor || "text-white")} />
                  <p className={cn("text-3xl font-medium leading-tight text-center", card.textColor || "text-white")}>
                    {card.backText}
                  </p>
                </div>
                <div className={cn("w-full h-[1px] bg-current opacity-20", card.textColor || "text-white")} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}