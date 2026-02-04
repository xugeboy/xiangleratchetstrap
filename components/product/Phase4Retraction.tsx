"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useFrame } from '@react-three/fiber';
import { useRef as useThreeRef } from 'react';
import * as THREE from 'three';
import ModelViewer from './shared/ModelViewer';
import RatchetStrapModel from './shared/RatchetStrapModel';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Phase4RetractionProps {
  sectionRef: React.RefObject<HTMLElement>;
}

// Simplified retraction animation component
function RetractionAnimation({ progress }: { progress: number }) {
  const springRef = useThreeRef<THREE.Group>(null);
  const webbingRef = useThreeRef<THREE.Group>(null);

  useFrame(() => {
    if (springRef.current && webbingRef.current) {
      // Simulate controlled retraction
      // Spring compresses smoothly
      const springScale = 1 - progress * 0.3;
      springRef.current.scale.y = Math.max(0.7, springScale);
      
      // Webbing retracts
      const webbingLength = 1 - progress;
      webbingRef.current.scale.x = Math.max(0.1, webbingLength);
    }
  });

  return (
    <group>
      {/* Spring representation */}
      <group ref={springRef}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 1, 16]} />
          <meshStandardMaterial 
            color="#888888" 
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
      
      {/* Webbing representation */}
      <group ref={webbingRef} position={[0, 0.5, 0]}>
        <mesh>
          <boxGeometry args={[2, 0.1, 0.1]} />
          <meshStandardMaterial 
            color="#ff0066"
            emissive="#ff0066"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function Phase4Retraction({ sectionRef }: Phase4RetractionProps) {
  const [retractionProgress, setRetractionProgress] = React.useState(0);
  const textRef = useRef<HTMLDivElement>(null);

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

      // Animate retraction progress (0 to 1)
      gsap.to({ value: 0 }, {
        value: 1,
        ease: 'power2.inOut',
        onUpdate: function() {
          setRetractionProgress(this.targets()[0].value);
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
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
      {/* 3D Retraction Animation */}
      <div className="absolute inset-0">
        <ModelViewer
          cameraPosition={[0, 0, 5]}
          cameraFov={50}
          background="#050505"
          className="w-full h-full"
        >
          <RatchetStrapModel />
          <RetractionAnimation progress={retractionProgress} />
        </ModelViewer>
      </div>

      {/* Text Overlay */}
      <div
        ref={textRef}
        className="absolute bottom-24 right-6 lg:right-24 z-10 text-right"
      >
        <p className="text-2xl md:text-4xl font-light text-white/90 leading-relaxed">
          Controlled retraction.
          <br />
          Reduced internal impact.
        </p>
      </div>
    </section>
  );
}
