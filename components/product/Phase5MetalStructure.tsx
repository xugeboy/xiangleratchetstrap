"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ModelViewer from './shared/ModelViewer';
import RatchetStrapModel from './shared/RatchetStrapModel';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Phase5MetalStructureProps {
  sectionRef: React.RefObject<HTMLElement>;
}

export default function Phase5MetalStructure({ sectionRef }: Phase5MetalStructureProps) {
  const highlightProgressRef = useRef(0);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // No pinning for this section - allow natural scroll
      gsap.to(highlightProgressRef, {
        current: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.5,
        },
      });

      // Fade in text
      if (textRef.current) {
        gsap.from(textRef.current, {
          opacity: 0,
          y: 20,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
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
      className="relative min-h-screen w-full bg-[#050505] py-40 flex items-center justify-center"
    >
      {/* 3D Model with Metal Highlight */}
      <div className="absolute inset-0">
        <ModelViewer
          cameraPosition={[0, 0, 5]}
          cameraFov={50}
          background="#050505"
          className="w-full h-full"
        >
          <RatchetStrapModel
            highlightParts={['ratchet-core', 'base-plate', 'hooks']}
          />
        </ModelViewer>
      </div>

      {/* Text Overlay */}
      <div
        ref={textRef}
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        <p className="text-2xl md:text-4xl font-light text-white/90 leading-relaxed">
          Load-bearing parts are metal.
          <br />
          Because they have to be.
        </p>
      </div>
    </section>
  );
}
