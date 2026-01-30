"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/utils/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 磁力强度，越大吸得越远
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className,
  strength = 30, // 默认强度
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const btn = buttonRef.current;
      const text = textRef.current;
      if (!btn || !text) return;

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = btn.getBoundingClientRect();
        
        // 计算鼠标相对于按钮中心的距离
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        // 按钮本身的移动
        gsap.to(btn, {
          x: x * 0.5, // 按钮移动系数
          y: y * 0.5,
          duration: 1,
          ease: "power4.out",
        });

        // 内部文字稍微移动一点点（视差效果）
        gsap.to(text, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 1,
          ease: "power4.out",
        });
      };

      const handleMouseLeave = () => {
        // 鼠标离开，弹回原位
        gsap.to([btn, text], {
          x: 0,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)", // 弹性回归
        });
      };

      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        btn.removeEventListener("mousemove", handleMouseMove);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: buttonRef }
  );

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={cn(
        "relative px-8 py-4 rounded-full border border-white/20 overflow-hidden group hover:bg-white hover:text-black transition-colors duration-300",
        className
      )}
    >
      {/* 这里的 span 用于做视差移动 */}
      <span ref={textRef} className="relative z-10 inline-block font-medium">
        {children}
      </span>
    </button>
  );
}