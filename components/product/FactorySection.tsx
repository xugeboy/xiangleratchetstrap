"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FactorySectionProps {
  sectionRef: React.RefObject<HTMLElement>;
}

const factoryImages = [
  { src: '/image/factory-production.jpg', alt: 'Production line', label: 'Production' },
  { src: '/image/factory-assembly.jpg', alt: 'Assembly process', label: 'Assembly' },
  { src: '/image/factory-qc.jpg', alt: 'Quality control', label: 'QC Testing' },
  { src: '/image/factory-warehouse.jpg', alt: 'Warehouse', label: 'Warehouse' },
];

export default function FactorySection({ sectionRef }: FactorySectionProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate numbers
      if (statsRef.current) {
        const numbers = statsRef.current.querySelectorAll('.stat-num');
        numbers.forEach((num) => {
          const target = parseInt(num.getAttribute('data-target') || '0');
          gsap.to(num, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
          });
        });
      }

      // Fade and slide up images
      if (imagesRef.current) {
        const images = imagesRef.current.querySelectorAll('.factory-image');
        images.forEach((img, i) => {
          gsap.from(img, {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: img,
              start: 'top 90%',
              end: 'top 50%',
              scrub: 1,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#050505] py-40"
    >
      <div className="container mx-auto px-6">
        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          <div className="text-center">
            <div className="text-5xl md:text-7xl font-black text-white mb-2">
              <span className="stat-num" data-target="150000">0</span>
              <span className="text-2xl text-rose-600">+</span>
            </div>
            <div className="text-xs font-mono text-white/60 uppercase tracking-widest">
              Units / Month
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-7xl font-black text-white mb-2">
              <span className="stat-num" data-target="16">0</span>
            </div>
            <div className="text-xs font-mono text-white/60 uppercase tracking-widest">
              Years Experience
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-7xl font-black text-white mb-2">
              <span className="stat-num" data-target="100">0</span>
              <span className="text-2xl text-rose-600">%</span>
            </div>
            <div className="text-xs font-mono text-white/60 uppercase tracking-widest">
              Vertical Integration
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-7xl font-black text-white mb-2">
              <span className="stat-num" data-target="1760">0</span>
            </div>
            <div className="text-xs font-mono text-white/60 uppercase tracking-widest">
              LBS Break Strength
            </div>
          </div>
        </div>

        {/* Factory Images Grid */}
        <div ref={imagesRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {factoryImages.map((img, i) => (
            <div
              key={i}
              className="factory-image relative aspect-square bg-black/50 rounded-lg overflow-hidden group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                loading="lazy"
                onError={(e) => {
                  // Show placeholder if image not available
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-black/30">
                        <span class="text-white/30 text-xs font-mono uppercase">${img.label}</span>
                      </div>
                    `;
                  }
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <span className="text-xs font-mono text-white/60 uppercase tracking-widest">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
