"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useThree, useFrame } from '@react-three/fiber';
import ModelViewer from './shared/ModelViewer';
import RatchetStrapModel from './shared/RatchetStrapModel';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Camera controller component
function CameraController({ zoomProgress }: { zoomProgress: number }) {
  const { camera } = useThree();
  
  useFrame(() => {
    if (!camera) return;

    // Zoom to bottom view
    const basePosition: [number, number, number] = [0, 0, 5];
    const zoomPosition: [number, number, number] = [0, -2, 2];
    
    const currentPosition = [
      basePosition[0] + (zoomPosition[0] - basePosition[0]) * zoomProgress,
      basePosition[1] + (zoomPosition[1] - basePosition[1]) * zoomProgress,
      basePosition[2] + (zoomPosition[2] - basePosition[2]) * zoomProgress,
    ] as [number, number, number];

    camera.position.set(...currentPosition);
    camera.lookAt(0, -1, 0);
  });

  return null;
}

interface Phase6MountingHolesProps {
  sectionRef: React.RefObject<HTMLElement>;
}

export default function Phase6MountingHoles({ sectionRef }: Phase6MountingHolesProps) {
  const [zoomProgress, setZoomProgress] = React.useState(0);
  const [reassemblyProgress, setReassemblyProgress] = React.useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const measurementRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1,
      });

      // First half: zoom in
      gsap.to({ value: 0 }, {
        value: 1,
        ease: 'power2.inOut',
        onUpdate: function() {
          setZoomProgress(this.targets()[0].value);
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
        },
      });

      // Second half: reassemble and zoom out
      gsap.to({ value: 0 }, {
        value: 1,
        ease: 'power2.inOut',
        onUpdate: function() {
          setReassemblyProgress(this.targets()[0].value);
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '+=100%',
          end: '+=200%',
          scrub: 1,
        },
      });

      gsap.to({ value: 1 }, {
        value: 0,
        ease: 'power2.inOut',
        onUpdate: function() {
          setZoomProgress(this.targets()[0].value);
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '+=100%',
          end: '+=200%',
          scrub: 1,
        },
      });

      // Show measurement overlay when zoomed
      if (measurementRef.current) {
        gsap.to(measurementRef.current, {
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=50%',
            scrub: 1,
          },
        });
        gsap.to(measurementRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '+=150%',
            end: '+=200%',
            scrub: 1,
          },
        });
      }

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
      {/* 3D Model with Camera Zoom */}
      <div className="absolute inset-0">
        <ModelViewer
          cameraPosition={[0, 0, 5]}
          cameraFov={50}
          background="#050505"
          className="w-full h-full"
        >
          <CameraController zoomProgress={zoomProgress} />
          <RatchetStrapModel exploded={reassemblyProgress * 0.3} />
        </ModelViewer>
      </div>

      {/* Measurement Overlay (subtle) */}
      <div
        ref={measurementRef}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 opacity-0"
      >
        <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded border border-white/10">
          <span className="text-xs font-mono text-white/60">M8 Thread</span>
        </div>
      </div>

      {/* Text Overlay */}
      <div
        ref={textRef}
        className="absolute bottom-24 right-6 lg:right-24 z-10 text-right"
      >
        <p className="text-2xl md:text-4xl font-light text-white/90 leading-relaxed">
          Dual M8 mounting holes.
          <br />
          Designed for custom base plates.
        </p>
      </div>
    </section>
  );
}
