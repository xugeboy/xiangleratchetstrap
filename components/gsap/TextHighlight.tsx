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

interface TextHighlightProps {
  text: string;
  className?: string;
}

export default function TextHighlight({ text, className }: TextHighlightProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  // 将文本拆分为单词数组
  const words = text.split(" ");

  useGSAP(
    () => {
      if (!containerRef.current) return;
      
      const wordElements = containerRef.current.querySelectorAll(".highlight-word");

      // 核心动画：从暗 (opacity: 0.2) 变亮 (opacity: 1)
      // scrub: true 表示动画进度直接绑定滚动条，滚回去会变暗
      gsap.fromTo(
        wordElements,
        {
          opacity: 0.2, // 初始透明度 (暗)
          color: "inherit", 
        },
        {
          opacity: 1,   // 结束透明度 (亮)
          color: "white", // 强制高亮色，确保对比度
          stagger: 0.5, // 单词之间的交错时间，值越大，高亮光带越短
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",   // 当这段文字的顶部到达视口 80% 处开始
            end: "bottom 40%",  // 当这段文字的底部到达视口 40% 处结束
            scrub: true,        // 关键：绑定滚动条，实现“滚多少亮多少”
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <p 
      ref={containerRef} 
      className={cn("flex flex-wrap leading-tight", className)}
    >
      {words.map((word, i) => (
        <span key={i} className="mr-[0.25em] inline-block">
          <span className="highlight-word inline-block opacity-20 will-change-[opacity,color]">
            {word}
          </span>
        </span>
      ))}
    </p>
  );
}