"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CarabinerCanvas } from "./threeD-display";

export default function ScrollShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

  // 用来驱动 3D 旋转
  const rotationYRef = useRef(0);

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { SplitText } = await import("gsap/SplitText");
      gsap.registerPlugin(ScrollTrigger, SplitText);

      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        // 1) 标题 SplitText 动画（进入视口时播放一次）
        if (titleRef.current) {
          const split = new SplitText(titleRef.current, {
            type: "chars,words",
          });

          gsap.from(split.chars, {
            y: 40,
            opacity: 0,
            stagger: 0.03,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
            onComplete: () => {
              split.revert();
            },
          });
        }

        // 2) 整个 section 滚动驱动：pin + 3D 旋转 + 文案淡入
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            // progress: 0 ~ 1
            const p = self.progress;
            rotationYRef.current = p * Math.PI * 2; // 0~360°
          },
        });

        // 文案块渐渐显现
        if (textBlockRef.current) {
          gsap.from(textBlockRef.current.children, {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              scrub: true,
            },
          });
        }
      }, sectionRef);
    })();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左边：3D 模型 */}
          <CarabinerCanvas rotationYRef={rotationYRef} />

          {/* 右边：文案 + SplitText 标题 */}
          <div className="max-w-xl">
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight"
            >
              Engineered for{" "}
              <span className="text-red-600">Secure Control</span>
            </h2>

            <div ref={textBlockRef} className="space-y-4 text-neutral-600">
              <p>
                Heavy-duty swivel carabiner hook built for motorcycle, UTV and
                cargo applications.
              </p>
              <p>
                Precision-machined body, optimized for auto-retractable ratchet
                straps and custom OEM projects.
              </p>
              <p>
                Tuned for high-cycle usage, smooth rotation and consistent
                surface treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
