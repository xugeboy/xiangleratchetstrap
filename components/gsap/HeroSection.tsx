"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RevealText from "./RevealText";
import MagneticButton from "./MagneticButton";

// 注册插件
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null); // 背景图引用
  const overlayRef = useRef<HTMLDivElement>(null); // 遮罩层引用

  useGSAP(
    () => {
      // --- Part 2: 滚动交互 (新增核心逻辑) ---
      // 当我们向下滚动时，背景图放大，遮罩变黑
      if (bgImageRef.current && overlayRef.current) {

        // 2.1 图片缩放效果 (Scale Up)
        gsap.to(bgImageRef.current, {
          scale: 1.25, // 放大到 1.25 倍
          ease: "none", // 线性匀速，完全跟随滚动
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top", // 当组件顶部到达视口顶部时
            end: "bottom top", // 当组件底部离开视口顶部时
            scrub: true, // 绑定滚动条
          },
        });

        // 2.2 慢慢遮掉/变暗效果 (Dimming)
        gsap.to(overlayRef.current, {
          opacity: 0.6, // 变黑程度 (0.6)
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top", // 也可以设为 "bottom 20%" 提早变黑
            scrub: true,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      // 关键样式修改：
      // 1. h-screen: 占满全屏
      // 2. sticky top-0: 滚动时吸顶
      // 3. -z-10: 放在最底层，等着被后面的内容盖住
      className="w-full h-screen sticky top-0 -z-10 overflow-hidden"
    >

      {/* === Hero Content Layer === */}
      <div className="relative max-w-7/12 mx-auto flex flex-col items-center justify-center text-center px-4 bg-gray-900 text-white overflow-hidden">

        {/* 背景图容器 (用于缩放) */}
        <div ref={bgImageRef} className="absolute inset-0 will-change-transform">
          <img
            src="https://framerusercontent.com/images/Wne6ywIpp0BwY8GoBBoZlZEoC9g.png"  // 替换为你实际的图片路径，例如 "/image_8fc439.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-80" // object-cover 保证图片铺满且不变形
          />
        </div>

        {/* 黑色遮罩层 (用于变暗) */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black opacity-0 will-change-[opacity]"
        />

        <div className="relative z-10 flex flex-col items-center gap-8 max-w-4xl">
          <div className="overflow-hidden">
            <RevealText
              tag="h1"
              text="Imagine a space between vision & impact"
              className="text-5xl md:text-8xl font-medium font-serif mb-4"
              delay={0.6}
            />
          </div>

          <div className="overflow-hidden">
            <RevealText
              tag="p"
              text="That's where we thrive."
              className="text-xl md:text-2xl text-gray-300"
              delay={0.7}
            />
          </div>

          <div className="flex gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: '2.6s', animationFillMode: 'forwards' }}>
            <MagneticButton className="bg-white text-black border-transparent hover:bg-gray-200">
              Scroll to Explore
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}