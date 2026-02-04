"use client";

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';

// Dynamic import for 3D hero component
const Phase1WholeProduct = dynamic(
  () => import('@/components/product/Phase1WholeProduct'),
  { ssr: false }
);

// Marketing sections (no 3D) - only load after model is ready
const ProductFeatures = dynamic(
  () => import('@/components/product/ProductFeatures'),
  { ssr: false }
);

const TechnicalSpecs = dynamic(
  () => import('@/components/product/TechnicalSpecs'),
  { ssr: false }
);

const ApplicationScenarios = dynamic(
  () => import('@/components/product/ApplicationScenarios'),
  { ssr: false }
);

const FactoryCapabilities = dynamic(
  () => import('@/components/product/FactoryCapabilities'),
  { ssr: false }
);

const TestResults = dynamic(
  () => import('@/components/product/TestResults'),
  { ssr: false }
);

const FAQSection = dynamic(
  () => import('@/components/product/FAQSection'),
  { ssr: false }
);

const CTASection = dynamic(
  () => import('@/components/product/CTASection'),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () => import('@/components/product/shared/ScrollProgress'),
  { ssr: false }
);

/**
 * Product Landing Page
 * 3D Hero + Marketing Content
 */

export default function ProductExperiencePage() {
  const phase1Ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Performance detection - components handle their own fallbacks
    const checkPerformance = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        // WebGL not available - components will show fallback images
        return;
      }
    };

    checkPerformance();
  }, []);

  const handleModelLoadComplete = () => {
    setIsModelLoaded(true);
    
    // Wait a bit for model to fully render, then show content
    setTimeout(() => {
      setShowContent(true);
      
      // Fade in content sections
      requestAnimationFrame(() => {
        if (contentRef.current) {
          gsap.to(contentRef.current, {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          });
        }
      });
    }, 300);
  };

  return (
    <div className="bg-[#050505] text-[#F8FAFC] font-sans overflow-x-hidden">
      {/* Full-screen Loading Animation - shown until model loads */}
      {!isModelLoaded && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]">
          <div className="text-center">
            {/* Spinner */}
            <div className="relative w-16 h-16 mx-auto mb-8">
              <div className="absolute inset-0 border-4 border-rose-600/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent border-t-rose-600 rounded-full animate-spin" />
            </div>
            {/* Loading Text */}
            <p className="text-sm font-mono text-white/60 uppercase tracking-widest">
              Loading Model...
            </p>
          </div>
        </div>
      )}

      {/* Scroll Progress Indicator - only show after model loads */}
      {showContent && <ScrollProgress />}

      {/* Hero Section with 3D Model - always render but hidden until loaded */}
      <div style={{ visibility: isModelLoaded ? 'visible' : 'hidden' }}>
        <Phase1WholeProduct 
          sectionRef={phase1Ref} 
          onModelLoadComplete={handleModelLoadComplete}
        />
      </div>

      {/* Marketing Sections - only render after model loads and content is ready to show */}
      {showContent && (
        <div 
          ref={contentRef}
          className="opacity-0"
        >
          <ProductFeatures />
          <TechnicalSpecs />
          <ApplicationScenarios />
          <FactoryCapabilities />
          <TestResults />
          <FAQSection />
          <CTASection />

          {/* Footer */}
          <footer className="py-16 border-t border-white/5 px-6 lg:px-24 text-center bg-[#050505] relative z-10">
            <p className="font-mono text-[10px] tracking-[0.5em] text-slate-600 uppercase">
              &copy; {new Date().getFullYear()} XiangleTools Ltd. Manufacturing Excellence Since 2008.
            </p>
          </footer>
        </div>
      )}
    </div>
  );
}
