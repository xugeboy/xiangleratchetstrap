"use client"

import type { CalculatorOutput } from "@/utils/calculation"
import PalletVisualizer from "./PalletVisualizer"

interface Props {
  data: CalculatorOutput | null
}

export default function ResultsDisplay({ data }: Props) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-black">Results & Visualization</h2>
      {!data && <p className="mt-4 text-sm text-black/60">Enter inputs on the left and click Calculate.</p>}

      {data && (
        <div className="mt-4 space-y-6">
          <div className="rounded-lg border border-black/10 bg-white p-4">
            <h3 className="text-lg font-semibold text-black">Quick Results</h3>
            <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
              <Metric label="Volume per Carton" value={`${data.volumePerCartonCbm.toFixed(6)} m³`} />
              <Metric label="Total Volume" value={`${data.totalVolumeCbm.toFixed(6)} m³`} />
              <Metric label="Total Weight" value={`${data.totalWeightKg.toFixed(2)} kg`} />
            </div>
          </div>

          {data.palletPlan && (
            <div className="rounded-lg border border-black/10 bg-white p-4">
              <h3 className="text-lg font-semibold text-black">Pallet Loading Plan</h3>
              <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
                <Metric label="Cartons per Pallet" value={`${data.palletPlan.cartonsPerPallet}`} />
                <Metric label="Layers per Pallet" value={`${data.palletPlan.layers}`} />
                <Metric label="Cartons per Layer" value={`${data.palletPlan.cartonsPerLayer}`} />
                <Metric label="Pallet Dimensions" value={`${Math.round(data.palletPlan.palletDimsCm.L)}×${Math.round(data.palletPlan.palletDimsCm.W)}×${Math.round(data.palletPlan.stackHeightCm)} cm`} />
                <Metric label="Total Pallets Needed" value={`${data.palletPlan.palletsNeeded}`} />
                <Metric label="Space Efficiency" value={`${data.palletPlan.spaceEfficiency}%`} />
              </div>
              <div className="mt-4">
                <PalletVisualizer
                  palletSizeCm={{ L: data.palletPlan.palletDimsCm.L, W: data.palletPlan.palletDimsCm.W, H: data.palletPlan.palletDimsCm.H }}
                  cartonSizeCm={data.cartonSizeCm}
                  cartonsPerLayer={data.palletPlan.cartonsPerLayer}
                  layers={data.palletPlan.layers}
                  orientation={data.palletPlan.bestOrientation}
                />
              </div>
            </div>
          )}

          {data.containerEstimate && (
            <div className="rounded-lg border border-black/10 bg-white p-4">
              <h3 className="text-lg font-semibold text-black">Container Loading Estimate</h3>
              <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
                <Metric label="Recommendation" value={`${data.containerEstimate.containerName}`} />
                <Metric label="Pallets Fit (est.)" value={`${data.containerEstimate.palletsFit}`} />
                <Metric label="Utilization (est.)" value={`${data.containerEstimate.utilizationPercent}%`} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-black/5 p-3">
      <div className="text-xs font-medium uppercase tracking-wide text-black/60">{label}</div>
      <div className="mt-1 text-lg font-bold text-black">{value}</div>
    </div>
  )
}


