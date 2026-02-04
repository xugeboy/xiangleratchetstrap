"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      if (!progressRef.current) return;

      try {
        const st = ScrollTrigger.create({
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              const progress = self.progress;
              progressRef.current.style.transform = `scaleX(${progress})`;
            }
          },
        });
        scrollTriggerRef.current = st;
      } catch (error) {
        console.warn('ScrollProgress: Failed to create ScrollTrigger', error);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (scrollTriggerRef.current) {
        try {
          scrollTriggerRef.current.kill();
        } catch (error) {
          // Ignore cleanup errors
        }
        scrollTriggerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 h-1 bg-rose-600 w-full z-[100] origin-left">
      <div ref={progressRef} className="h-full bg-rose-600 origin-left scale-x-0" />
    </div>
  );
}
