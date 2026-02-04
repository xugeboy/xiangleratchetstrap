"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TestResults() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate counter from 0 to 1760
      if (counterRef.current) {
        gsap.to(counterRef.current, {
          innerText: 1760,
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
      }

      // Play video on scroll (if available)
      if (videoRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => {
            videoRef.current?.play().catch(() => {
              // Autoplay blocked, that's okay
            });
          },
          onLeaveBack: () => {
            videoRef.current?.pause();
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
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8">
            Tested. <span className="text-rose-600">Verified.</span>
          </h2>
          <div className="w-24 h-1 bg-rose-600 mx-auto mb-8" />
        </div>

        {/* Video/Image Container */}
        <div className="relative aspect-video bg-black/50 rounded-lg overflow-hidden mb-12">
          {/* Video with fallback to image */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
          >
            <source src="/video/tensile-test.mp4" type="video/mp4" />
          </video>

          {/* Fallback image if video not available */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/image/tensile-test-placeholder.jpg"
              alt="Tensile test machine"
              fill
              className="object-cover opacity-50"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          {/* Counter Overlay */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center">
            <div className="bg-black/80 backdrop-blur-sm px-8 py-4 rounded-lg border border-white/10">
              <div className="text-sm font-mono text-white/60 uppercase tracking-widest mb-2">
                Break Strength
              </div>
              <div className="text-5xl md:text-7xl font-black text-white">
                <span ref={counterRef}>0</span>
                <span className="text-2xl md:text-4xl ml-2 text-rose-600">lbs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Certification Badges */}
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-lg">
            <span className="text-sm font-mono text-white/60 uppercase tracking-widest">ISO9001</span>
          </div>
          <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-lg">
            <span className="text-sm font-mono text-white/60 uppercase tracking-widest">Verified Testing</span>
          </div>
          <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-lg">
            <span className="text-sm font-mono text-white/60 uppercase tracking-widest">Batch QC</span>
          </div>
        </div>

        {/* Minimal text */}
        <p className="text-center text-white/60 text-sm font-mono uppercase tracking-widest mt-12">
          Verified. Tested. Certified.
        </p>
      </div>
    </section>
  );
}
