"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ModelViewer from './shared/ModelViewer';
import RatchetStrapModel from './shared/RatchetStrapModel';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Phase3WebbingPathProps {
  sectionRef: React.RefObject<HTMLElement>;
}

export default function Phase3WebbingPath({ sectionRef }: Phase3WebbingPathProps) {
  const [webbingProgress, setWebbingProgress] = React.useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the section (most important phase - longer scroll)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 1,
      });

      // Animate webbing path progress (0 to 1)
      gsap.to({ value: 0 }, {
        value: 1,
        ease: 'power1.inOut',
        onUpdate: function() {
          setWebbingProgress(this.targets()[0].value);
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
        },
      });

      // Fade in text
      if (textRef.current) {
        gsap.from(textRef.current, {
          opacity: 0,
          x: 30,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-[#050505] overflow-hidden"
    >
      {/* 3D Model with Webbing Path */}
      <div className="absolute inset-0">
        <ModelViewer
          cameraPosition={[0, 0, 5]}
          cameraFov={50}
          background="#050505"
          className="w-full h-full"
        >
          <RatchetStrapModel
            exploded={0}
            highlightParts={['webbing', 'ratchet-core']}
            webbingProgress={webbingProgress}
          />
        </ModelViewer>
      </div>

      {/* Text Overlay */}
      <div
        ref={textRef}
        className="absolute bottom-24 right-6 lg:right-24 z-10 text-right"
      >
        <p className="text-2xl md:text-4xl font-light text-white/90 leading-relaxed">
          Direct pull webbing path.
          <br />
          No twist. No internal resistance.
        </p>
      </div>
    </section>
  );
}
