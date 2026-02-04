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

interface Phase1WholeProductProps {
  sectionRef: React.RefObject<HTMLElement>;
  onModelLoadComplete?: () => void;
}

export default function Phase1WholeProduct({ sectionRef, onModelLoadComplete }: Phase1WholeProductProps) {
  const modelContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [rotationY, setRotationY] = React.useState(0);
  const [scale, setScale] = React.useState(1);
  const [isModelLoaded, setIsModelLoaded] = React.useState(false);

  // Only create ScrollTrigger after model is loaded
  useGSAP(() => {
    if (!sectionRef.current || !isModelLoaded) return;

    let ctx: gsap.Context | null = null;
    let timer: NodeJS.Timeout | null = null;

    // Wait for DOM to be fully ready
    timer = setTimeout(() => {
      if (!sectionRef.current) return;

      try {
        ctx = gsap.context(() => {
          // Pin the section
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          });

          // Animate rotation (0° to 20°)
          gsap.to({ value: 0 }, {
            value: 20 * (Math.PI / 180), // Convert to radians
            ease: 'none',
            onUpdate: function() {
              setRotationY(this.targets()[0].value);
            },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=200%',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          // Animate scale (1 to 1.05)
          gsap.to({ value: 1 }, {
            value: 1.05,
            ease: 'none',
            onUpdate: function() {
              setScale(this.targets()[0].value);
            },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=200%',
              scrub: 1,
              invalidateOnRefresh: true,
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
                start: 'top top',
                end: '+=50%',
                scrub: 1,
                invalidateOnRefresh: true,
              },
            });
          }
        }, sectionRef);
      } catch (error) {
        console.warn('Phase1WholeProduct: Failed to create ScrollTrigger', error);
      }
    }, 200);

    return () => {
      if (timer) clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, { scope: sectionRef, dependencies: [isModelLoaded] });

  // Handle model load completion
  const handleModelLoad = React.useCallback(() => {
    setIsModelLoaded(true);
    
    // Fade in model
    if (modelContainerRef.current) {
      gsap.to(modelContainerRef.current, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          // Notify parent that model is loaded and visible
          onModelLoadComplete?.();
        },
      });
    } else {
      // If refs not ready, still notify parent
      setTimeout(() => {
        onModelLoadComplete?.();
      }, 100);
    }
  }, [onModelLoadComplete]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-[#ffffff] overflow-hidden"
    >

      {/* 3D Model Container */}
      <div ref={modelContainerRef} className="absolute inset-0" style={{ opacity: 0 }}>
        <ModelViewer
          cameraPosition={[0, 1, 6]}
          cameraFov={45}
          background="#050505"
          className="w-full h-full"
          onLoadComplete={handleModelLoad}
        >
          <RatchetStrapModel
            rotationY={rotationY}
            scale={scale}
            onLoadComplete={handleModelLoad}
          />
        </ModelViewer>
      </div>

      {/* Text Overlay */}
      <div
        ref={textRef}
        className="absolute bottom-24 right-6 lg:right-24 z-10 text-right"
      >
        <p className="text-2xl md:text-4xl font-light text-white/90 leading-relaxed">
          Built as a system.
          <br />
          Not as parts.
        </p>
      </div>
    </section>
  );
}
