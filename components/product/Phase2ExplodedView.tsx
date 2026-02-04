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

interface Phase2ExplodedViewProps {
  sectionRef: React.RefObject<HTMLElement>;
}

export default function Phase2ExplodedView({ sectionRef }: Phase2ExplodedViewProps) {
  const [exploded, setExploded] = React.useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
      });

      // Animate explosion progress (0 to 1)
      // First 80% of scroll: explode from 0 to 1
      // Last 20%: hold at 1 (brief pause)
      gsap.to({ value: 0 }, {
        value: 1,
        ease: 'power2.out',
        onUpdate: function() {
          setExploded(this.targets()[0].value);
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=240%', // 80% of total scroll
          scrub: 1,
        },
      });

      // Hold at full explosion
      gsap.to({ value: 1 }, {
        value: 1,
        ease: 'none',
        onUpdate: function() {
          setExploded(this.targets()[0].value);
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '+=240%',
          end: '+=300%',
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
      {/* 3D Exploded Model */}
      <div className="absolute inset-0">
        <ModelViewer
          cameraPosition={[0, 0, 5]}
          cameraFov={50}
          background="#050505"
          className="w-full h-full"
        >
          <RatchetStrapModel exploded={exploded} />
        </ModelViewer>
      </div>

      {/* Text Overlay */}
      <div
        ref={textRef}
        className="absolute bottom-24 right-6 lg:right-24 z-10 text-right"
      >
        <p className="text-2xl md:text-4xl font-light text-white/90 leading-relaxed">
          Every component has a job.
        </p>
      </div>
    </section>
  );
}
