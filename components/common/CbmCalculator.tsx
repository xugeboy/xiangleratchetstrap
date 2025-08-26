"use client"

import { useMemo, useState } from "react"

type Unit = "cm" | "inch"

interface DimensionState {
  length: string
  width: string
  height: string
}

function toMeters(value: number, unit: Unit): number {
  if (Number.isNaN(value)) return 0
  return unit === "cm" ? value / 100 : value * 0.0254
}

export default function CbmCalculator() {
  const [unit, setUnit] = useState<Unit>("inch")
  const [dims, setDims] = useState<DimensionState>({ length: "", width: "", height: "" })
  const [quantity, setQuantity] = useState<string>("1")

  const numericDims = useMemo(() => {
    return {
      length: parseFloat(dims.length),
      width: parseFloat(dims.width),
      height: parseFloat(dims.height),
    }
  }, [dims])

  const perPieceM3 = useMemo(() => {
    const l = toMeters(numericDims.length, unit)
    const w = toMeters(numericDims.width, unit)
    const h = toMeters(numericDims.height, unit)
    if (l <= 0 || w <= 0 || h <= 0) return 0
    return l * w * h
  }, [numericDims, unit])

  const totalM3 = useMemo(() => {
    const qty = parseInt(quantity || "0", 10)
    if (!qty || qty <= 0) return 0
    return perPieceM3 * qty
  }, [perPieceM3, quantity])

  const perPieceCft = perPieceM3 * 35.3146667
  const totalCft = totalM3 * 35.3146667

  const handleDimChange = (key: keyof DimensionState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value
    // only allow numbers and decimal point
    if (/^\d*(\.|\d+)?$/.test(next)) {
      setDims(prev => ({ ...prev, [key]: next }))
    }
  }

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value
    if (/^\d*$/.test(next)) {
      setQuantity(next)
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold text-black">CBM Calculator</h2>
      <p className="mt-2 text-sm text-black/70">Quickly compute volume per piece and totals in CBM and CFT.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-black">Unit</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setUnit("cm")}
              className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                unit === "cm" ? "border-black bg-black text-white" : "border-black/20 text-black hover:border-black/40"
              }`}
            >
              cm
            </button>
            <button
              type="button"
              onClick={() => setUnit("inch")}
              className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                unit === "inch" ? "border-black bg-black text-white" : "border-black/20 text-black hover:border-black/40"
              }`}
            >
              inch
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-black">Length ({unit})</label>
          <input
            inputMode="decimal"
            value={dims.length}
            onChange={handleDimChange("length")}
            placeholder={`e.g. ${unit === "cm" ? "40" : "15.75"}`}
            className="mt-2 w-full rounded-lg border border-black/20 px-3 py-2 text-sm text-black placeholder-black/40 focus:border-black focus:outline-hidden"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Width ({unit})</label>
          <input
            inputMode="decimal"
            value={dims.width}
            onChange={handleDimChange("width")}
            placeholder={`e.g. ${unit === "cm" ? "30" : "11.81"}`}
            className="mt-2 w-full rounded-lg border border-black/20 px-3 py-2 text-sm text-black placeholder-black/40 focus:border-black focus:outline-hidden"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Height ({unit})</label>
          <input
            inputMode="decimal"
            value={dims.height}
            onChange={handleDimChange("height")}
            placeholder={`e.g. ${unit === "cm" ? "25" : "9.84"}`}
            className="mt-2 w-full rounded-lg border border-black/20 px-3 py-2 text-sm text-black placeholder-black/40 focus:border-black focus:outline-hidden"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div>
          <label className="block text-sm font-medium text-black">Quantity</label>
          <input
            inputMode="numeric"
            value={quantity}
            onChange={handleQtyChange}
            placeholder="e.g. 100"
            className="mt-2 w-full rounded-lg border border-black/20 px-3 py-2 text-sm text-black placeholder-black/40 focus:border-black focus:outline-hidden"
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-black/10 bg-black/5 p-4">
          <div className="text-sm font-medium text-black/70">Per Piece</div>
          <div className="mt-2 flex items-baseline gap-4">
            <div className="text-3xl font-bold text-black">{perPieceM3.toFixed(6)}</div>
            <div className="text-sm font-semibold text-black/70">m³</div>
          </div>
          <div className="mt-1 text-sm text-black/70">{perPieceCft.toFixed(4)} ft³</div>
        </div>

        <div className="rounded-xl border border-black/10 bg-black/5 p-4">
          <div className="text-sm font-medium text-black/70">Total</div>
          <div className="mt-2 flex items-baseline gap-4">
            <div className="text-3xl font-bold text-black">{totalM3.toFixed(6)}</div>
            <div className="text-sm font-semibold text-black/70">m³</div>
          </div>
          <div className="mt-1 text-sm text-black/70">{totalCft.toFixed(4)} ft³</div>
        </div>
      </div>

      <div className="mt-6 text-xs text-black/60">
        1 inch = 2.54 cm. CBM is computed as (L × W × H) converted to meters.
      </div>
    </div>
  )
}


