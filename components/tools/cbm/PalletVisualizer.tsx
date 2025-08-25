"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useMemo } from "react"

interface PalletVisualizerProps {
  palletSizeCm: { L: number; W: number; H: number }
  cartonSizeCm: { L: number; W: number; H: number }
  cartonsPerLayer: number
  layers: number
  orientation: "LW" | "WL"
}

export default function PalletVisualizer({ palletSizeCm, cartonSizeCm, cartonsPerLayer, layers, orientation }: PalletVisualizerProps) {
  const scene = useMemo(() => {
    const palletL = palletSizeCm.L / 100
    const palletW = palletSizeCm.W / 100
    const palletH = Math.max(0.05, palletSizeCm.H / 100)
    const cL = (orientation === "LW" ? cartonSizeCm.L : cartonSizeCm.W) / 100
    const cW = (orientation === "LW" ? cartonSizeCm.W : cartonSizeCm.L) / 100
    const cH = cartonSizeCm.H / 100

    const cols = Math.max(1, Math.floor(palletL / cL))
    const rows = Math.max(1, Math.floor(palletW / cW))
    const perLayer = Math.min(cols * rows, Math.max(0, cartonsPerLayer))

    const positions: [number, number, number][] = []
    let count = 0
    for (let z = 0; z < layers; z++) {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (count >= perLayer * (z + 1)) break
          const x = -palletL / 2 + cL / 2 + j * cL
          const y = palletH + cH / 2 + z * cH
          const zpos = -palletW / 2 + cW / 2 + i * cW
          positions.push([x, y, zpos])
          count++
        }
      }
    }
    return { palletL, palletW, palletH, cL, cW, cH, positions }
  }, [palletSizeCm, cartonSizeCm, cartonsPerLayer, layers, orientation])

  return (
    <div className="h-64 w-full overflow-hidden rounded-md border border-black/10">
      <Canvas camera={{ position: [2.5, 2.5, 2.5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={0.8} />

        {/* pallet */}
        <mesh position={[0, scene.palletH / 2, 0]}>
          <boxGeometry args={[scene.palletL, scene.palletH, scene.palletW]} />
          <meshStandardMaterial color="#D2B48C" />
        </mesh>

        {/* cartons */}
        {scene.positions.map((p, idx) => (
          <mesh key={idx} position={p}>
            <boxGeometry args={[scene.cL, scene.cH, scene.cW]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        ))}

        <OrbitControls enableDamping makeDefault />
      </Canvas>
    </div>
  )
}


