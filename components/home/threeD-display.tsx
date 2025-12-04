"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useRef } from "react";

const MODEL_URL = "/asset/Untitled.glb";

/** 3D 模型组件 */
function ProductModel() {
  const gltf: any = useGLTF(MODEL_URL);
  const modelRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.4; 
      // 0.3~0.6 都是舒服的转速
    }
  });

  return (
    <group
      ref={modelRef}
      scale={0.02}
      rotation={[0.01, 0, 0]} // 你的修正角度
    >
      <primitive object={gltf.scene} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);

export function CarabinerCanvas({
  rotationYRef,
}: {
  rotationYRef: React.MutableRefObject<number>;
}) {
  return (
    <div className="h-[320px] sm:h-[400px] md:h-[460px] lg:h-[520px] overflow-hidden">
      <Canvas
              camera={{
                position: [2.8, 1.6, 3.6],
                fov: 30,
              }}
            >
              {/* 光照 */}
              <color attach="background" args={["#ffffff"]} />
              <Environment preset="warehouse" />
              {/* 主光：决定金属质感 */}
              <directionalLight position={[4, 6, 3]} intensity={1.2} />

              {/* 补光：防止死黑 */}
              <directionalLight position={[-3, -4, -2]} intensity={0.6} />

              {/* 环境光：整体亮度 */}
              <ambientLight intensity={0.35} />

              <Suspense fallback={null}>
          <ProductModel rotationYRef={rotationYRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}