"use client";

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import type { RatchetStrapModelProps } from '@/types/product-experience';

export default function RatchetStrapModel({
  rotationY = 90 * (Math.PI / 180),
  scale = 0.3,
  modelPath = '/asset/XLFY001.glb',
  onLoadComplete,
}: RatchetStrapModelProps & { onLoadComplete?: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasCalledCallback = useRef(false);
  
  // Always call useGLTF hook (React rules) - it will handle errors internally
  const gltfResult = useGLTF(modelPath, true);
  const gltf = Array.isArray(gltfResult) ? null : gltfResult;
  const hasModel = !!(gltf && gltf.scene);

  // Detect when model is loaded
  useEffect(() => {
    if (hasModel && gltf && !Array.isArray(gltf) && gltf.scene && !isLoaded) {
      // Model is loaded, wait a frame for rendering
      requestAnimationFrame(() => {
        setIsLoaded(true);
        if (!hasCalledCallback.current && onLoadComplete) {
          hasCalledCallback.current = true;
          // Small delay to ensure smooth transition
          setTimeout(() => {
            onLoadComplete();
          }, 200);
        }
      });
    } else if (!hasModel && !isLoaded) {
      // Using placeholder, mark as loaded immediately
      setIsLoaded(true);
      if (!hasCalledCallback.current && onLoadComplete) {
        hasCalledCallback.current = true;
        setTimeout(() => {
          onLoadComplete();
        }, 300);
      }
    }
  }, [hasModel, gltf, isLoaded, onLoadComplete]);

  useFrame(() => {
    if (groupRef.current) {
      // Apply Y rotation (scroll-controlled) while maintaining 45° X rotation
      groupRef.current.rotation.y = rotationY;
      groupRef.current.scale.setScalar(scale);
    }
  });


  if (hasModel && gltf && !Array.isArray(gltf) && gltf.scene) {
    // Clone the scene and apply material overrides
    const clonedScene = gltf.scene.clone();
    
    // Apply lime white material to all meshes
    clonedScene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if ('color' in mat && 'metalness' in mat && 'roughness' in mat) {
              mat.color = new THREE.Color(0x000000);
              mat.metalness = 0.1;
              mat.roughness = 0.7;
              mat.needsUpdate = true;
            }
        }
      }
    });
    
    // Use actual model
    return (
      <group 
        ref={groupRef}
        rotation={[Math.PI*1,0,Math.PI*1.3]} // 45 degrees on X axis for horizontal display
      >
        <primitive 
          object={clonedScene} 
          scale={0.01} // Reduced from 0.02 for smaller size
        />
      </group>
    );
  }
}