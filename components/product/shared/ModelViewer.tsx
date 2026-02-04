"use client";

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import React from 'react';

interface ModelViewerProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  background?: string;
  fallbackImage?: string;
  className?: string;
  onLoadComplete?: () => void;
}

export default function ModelViewer({
  children,
  cameraPosition = [0, 0, 5],
  cameraFov = 50,
  background = '#000000',
  fallbackImage,
  className = '',
  onLoadComplete,
}: ModelViewerProps) {
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Check WebGL availability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      setWebglAvailable(false);
      return;
    }

    // Check device performance
    const pixelRatio = window.devicePixelRatio || 1;
    if (pixelRatio < 1.5) {
      setIsLowPerformance(true);
    }

    // Check for low-end device indicators
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    if (hardwareConcurrency < 4) {
      setIsLowPerformance(true);
    }
  }, []);

  if (!webglAvailable && fallbackImage) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <img src={fallbackImage} alt="Product model" className="w-full h-full object-contain" />
      </div>
    );
  }

  if (isLowPerformance && fallbackImage) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <img src={fallbackImage} alt="Product model" className="w-full h-full object-contain" />
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
  camera={{ position: cameraPosition, fov: cameraFov }}
  gl={{ antialias: true, alpha: false }}
>
  {/* Pure white background */}
  <color attach="background" args={['#ffffff']} />

  {/* HDR only for reflections */}
  <Environment preset="studio" background={false} />

  {/* Key light */}
  <directionalLight position={[5, 6, 4]} intensity={1.8} />

  {/* Fill light */}
  <directionalLight position={[-4, 2, 3]} intensity={0.6} />

  {/* Top soft light */}
  <directionalLight position={[0, 6, 0]} intensity={0.4} />

  {/* Rim / edge light */}
  <pointLight position={[-6, 0, -6]} intensity={0.9} />

  {/* Minimal ambient */}
  <ambientLight intensity={0.25} />

  <Suspense fallback={null}>
    {React.isValidElement(children)
      ? React.cloneElement(children as React.ReactElement, { onLoadComplete })
      : children}
  </Suspense>
</Canvas>

    </div>
  );
}
