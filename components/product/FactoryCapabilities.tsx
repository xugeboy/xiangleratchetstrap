"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { FiSettings, FiShield, FiZap } from 'react-icons/fi';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const capabilities = [
  { icon: <FiSettings className="w-full h-full" />, text: "CNC Tooling" },
  { icon: <FiShield className="w-full h-full" />, text: "ISO Testing", accent: true },
  { icon: <FiZap className="w-full h-full" />, text: "Fast R&D" },
];

const factoryImages = [
  { src: '/image/factory-production.jpg', alt: 'Production line', label: 'Production' },
  { src: '/image/factory-assembly.jpg', alt: 'Assembly process', label: 'Assembly' },
  { src: '/image/factory-qc.jpg', alt: 'Quality control', label: 'QC Testing' },
  { src: '/image/factory-warehouse.jpg', alt: 'Warehouse', label: 'Warehouse' },
];

export default function FactoryCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
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
      className="py-48 px-6 lg:px-24 bg-black border-t border-white/5 relative z-10"
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-32 items-center mb-24">
          <div>
            <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-12">
              Factory <br />
              <span className="text-rose-600 underline underline-offset-8">Direct</span>
            </h2>
            <p className="text-xl text-slate-400 font-light mb-16 leading-relaxed max-w-xl">
              XiangleTools is a vertically integrated manufacturer with 16 years of R&D in Zhangjiagang. 
              We don&apos;t outsource quality. We manufacture it.
            </p>
            
            {/* Stats */}
            <div ref={statsRef} className="flex gap-20 mb-16">
              <div>
                <div className="text-6xl font-black text-white italic tracking-tighter flex items-baseline">
                  <span className="stat-num" data-target="150000">0</span>
                  <span className="text-rose-600 ml-1">+</span>
                </div>
                <span className="font-mono text-[10px] tracking-[0.3em] text-slate-500 uppercase">
                  Units / Mo
                </span>
              </div>
              <div>
                <div className="text-6xl font-black text-white italic tracking-tighter flex items-baseline">
                  <span className="stat-num" data-target="16">0</span>
                </div>
                <span className="font-mono text-[10px] tracking-[0.3em] text-slate-500 uppercase">
                  Years Exp.
                </span>
              </div>
            </div>

            {/* Capabilities Grid */}
            <div className="grid grid-cols-3 gap-6">
              {capabilities.map((cap, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-[2rem] border ${
                    cap.accent
                      ? 'bg-rose-600 border-rose-500'
                      : 'bg-[#111] border-white/5'
                  } flex flex-col items-center justify-center p-8 transition-transform hover:-translate-y-2 cursor-default`}
                >
                  <div
                    className={`w-12 h-12 mb-6 ${
                      cap.accent ? 'text-white' : 'text-rose-600'
                    } flex items-center justify-center`}
                  >
                    {cap.icon}
                  </div>
                  <span className="font-black uppercase italic tracking-tighter text-sm text-center leading-tight">
                    {cap.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Factory Images Grid */}
          <div ref={imagesRef} className="grid grid-cols-2 gap-4">
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
      </div>
    </section>
  );
}
