"use client";

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import type { RatchetStrapModelProps } from '@/types/product-experience';

// Placeholder geometry components
function PlaceholderPart({ name, position, color, opacity = 1 }: { 
  name: string; 
  position: [number, number, number]; 
  color: string;
  opacity?: number;
}) {
  return (
    <mesh position={position} name={name}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.8} 
        roughness={0.2}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

function PlaceholderWebbing({ progress = 0 }: { progress?: number }) {
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2, 0, 0),
      new THREE.Vector3(-1, 0.5, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, -0.5, 0),
      new THREE.Vector3(2, 0, 0),
    ]);
    return curve.getPoints(50);
  }, []);

  const visiblePoints = useMemo(() => {
    const count = Math.floor(points.length * progress);
    return points.slice(0, count);
  }, [points, progress]);

  return (
    <group>
      {visiblePoints.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial 
            color="#ff0066" 
            emissive="#ff0066"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function RatchetStrapModel({
  exploded = 0,
  highlightParts = [],
  webbingProgress = 0,
  rotationY = 0,
  scale = 1,
  modelPath = '/asset/ratchet-strap.glb',
  onLoadComplete,
}: RatchetStrapModelProps & { onLoadComplete?: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasCalledCallback = useRef(false);
  
  let gltf: any = null;
  let hasModel = false;

  // Try to load the model - use placeholder if it fails
  try {
    gltf = useGLTF(modelPath, true);
    hasModel = !!gltf;
  } catch (error) {
    // Model not found, use placeholder
    hasModel = false;
  }

  // Detect when model is loaded
  useEffect(() => {
    if (hasModel && gltf && gltf.scene && !isLoaded) {
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
      groupRef.current.rotation.y = rotationY;
      groupRef.current.scale.setScalar(scale);
    }
  });

  // Explosion offsets for each part
  const explosionOffsets = useMemo(() => {
    return {
      housing: [0, 0, 0],
      'ratchet-core': [0, exploded * 0.5, 0],
      webbing: [exploded * 1.5, 0, 0],
      spring: [0, -exploded * 0.3, 0],
      hooks: [exploded * 0.8, 0, exploded * 0.5],
      'base-plate': [0, -exploded * 0.6, 0],
    };
  }, [exploded]);

  if (hasModel && gltf) {
    // Use actual model
    return (
      <group ref={groupRef}>
        <primitive 
          object={gltf.scene.clone()} 
          scale={0.02}
        />
        {webbingProgress > 0 && (
          <PlaceholderWebbing progress={webbingProgress} />
        )}
      </group>
    );
  }

  // Placeholder geometry
  return (
    <group ref={groupRef}>
      {/* Housing */}
      <PlaceholderPart
        name="housing"
        position={[
          explosionOffsets.housing[0],
          explosionOffsets.housing[1],
          explosionOffsets.housing[2],
        ]}
        color={highlightParts.includes('housing') ? '#ff0066' : '#333333'}
        opacity={highlightParts.includes('housing') ? 1 : 0.3}
      />
      
      {/* Ratchet Core */}
      <PlaceholderPart
        name="ratchet-core"
        position={[
          0.3 + explosionOffsets['ratchet-core'][0],
          explosionOffsets['ratchet-core'][1],
          explosionOffsets['ratchet-core'][2],
        ]}
        color={highlightParts.includes('ratchet-core') ? '#ff0066' : '#666666'}
        opacity={highlightParts.includes('ratchet-core') ? 1 : 0.5}
      />
      
      {/* Base Plate */}
      <PlaceholderPart
        name="base-plate"
        position={[
          explosionOffsets['base-plate'][0],
          -0.5 + explosionOffsets['base-plate'][1],
          explosionOffsets['base-plate'][2],
        ]}
        color="#444444"
        opacity={0.6}
      />
      
      {/* Hooks */}
      <PlaceholderPart
        name="hooks"
        position={[
          -0.8 + explosionOffsets.hooks[0],
          explosionOffsets.hooks[1],
          explosionOffsets.hooks[2],
        ]}
        color="#555555"
        opacity={0.7}
      />
      
      {/* Webbing path visualization */}
      {webbingProgress > 0 && (
        <PlaceholderWebbing progress={webbingProgress} />
      )}
    </group>
  );
}

// Note: Model preloading should be done at page level if model is available
