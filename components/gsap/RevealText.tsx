"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/utils/utils";

// 注册插件
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealTextProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "div"; // 支持不同的 HTML 标签
  delay?: number;
}

export default function RevealText({
  text,
  className,
  tag: Tag = "p",
  delay = 0,
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  // 简单粗暴地将文本按空格拆分成单词
  // 注意：如果你需要处理复杂的中文分词，可能需要按字拆分 (.split(""))
  const words = text.split(" ");

  useGSAP(
    () => {
      // 选取所有的 .word 元素
      const wordElements = containerRef.current?.querySelectorAll(".word");

      gsap.fromTo(
        wordElements,
        {
          y: "100%", // 初始位置在下方
          opacity: 0,
        },
        {
          y: "0%", // 移动到原位
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.02, // 每个单词之间的延迟，形成波浪感
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%", // 进入视口底部 85% 处触发
            toggleActions: "play none none reverse", // 滚回去会反向消失
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <Tag
      ref={containerRef as any}
      className={cn("leading-tight overflow-hidden", className)}
    >
      {/* 为了不仅能隐藏，还需要一个 overflow-hidden 的 wrapper 包裹每个单词 */}
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <span className="word inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}