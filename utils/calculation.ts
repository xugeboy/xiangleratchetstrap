import { CONTAINERS, PALLET_PRESETS, toCentimeter, kgFrom, LengthUnit, WeightUnit } from "./cbmConstants"

export interface CalculatorInput {
  unit: LengthUnit
  weightUnit: WeightUnit
  length: number
  width: number
  height: number
  weightPerCarton: number
  quantity: number

  calculatePallet: boolean
  palletPresetKey: string | "custom"
  palletLength?: number
  palletWidth?: number
  maxPalletHeight?: number
  maxPalletWeight?: number

  containerKey?: string | "none"
}

export interface PalletPlan {
  cartonsPerLayer: number
  layers: number
  cartonsPerPallet: number
  palletsNeeded: number
  bestOrientation: "LW" | "WL"
  palletDimsCm: { L: number; W: number; H: number }
  stackHeightCm: number
  spaceEfficiency: number
}

export interface CalculatorOutput {
  volumePerCartonCbm: number
  totalVolumeCbm: number
  totalWeightKg: number
  cartonSizeCm: { L: number; W: number; H: number }
  palletPlan?: PalletPlan
  containerEstimate?: {
    containerName: string
    palletsFit: number
    utilizationPercent: number
  }
}

function getPalletDimsCm(input: CalculatorInput) {
  if (input.palletPresetKey && input.palletPresetKey !== "custom") {
    const found = PALLET_PRESETS.find(p => p.key === input.palletPresetKey)
    if (found) return { L: found.lengthCm, W: found.widthCm, H: found.heightCm }
  }
  return {
    L: toCentimeter(input.palletLength || 0, input.unit),
    W: toCentimeter(input.palletWidth || 0, input.unit),
    H: 15,
  }
}

export function calculateCbmAndPallets(input: CalculatorInput): CalculatorOutput {
  const Lcm = toCentimeter(input.length, input.unit)
  const Wcm = toCentimeter(input.width, input.unit)
  const Hcm = toCentimeter(input.height, input.unit)
  const perCartonCbm = (Lcm * Wcm * Hcm) / 1_000_000

  const qty = Math.max(0, Math.floor(input.quantity || 0))
  const totalVolumeCbm = perCartonCbm * qty
  const totalWeightKg = kgFrom(input.weightPerCarton || 0, input.weightUnit) * qty

  const output: CalculatorOutput = {
    volumePerCartonCbm: Number(perCartonCbm.toFixed(6)),
    totalVolumeCbm: Number(totalVolumeCbm.toFixed(6)),
    totalWeightKg: Number(totalWeightKg.toFixed(2)),
    cartonSizeCm: { L: Lcm, W: Wcm, H: Hcm },
  }

  if (input.calculatePallet) {
    const palletDims = getPalletDimsCm(input)
    const maxH = Math.max(0, toCentimeter(input.maxPalletHeight || 0, input.unit)) || 180
    const palletH = palletDims.H || 15
    const usableH = Math.max(0, maxH - palletH)

    const perLayer1 = Math.floor(palletDims.L / Lcm) * Math.floor(palletDims.W / Wcm)
    const perLayer2 = Math.floor(palletDims.L / Wcm) * Math.floor(palletDims.W / Lcm)
    const bestIsLW = perLayer1 >= perLayer2
    const cartonsPerLayer = Math.max(perLayer1, perLayer2)
    const layers = Math.max(0, Math.floor(usableH / Hcm))
    const cartonsPerPallet = cartonsPerLayer * layers
    const palletsNeeded = cartonsPerPallet > 0 ? Math.ceil(qty / cartonsPerPallet) : 0

    const stackHeightCm = palletH + layers * Hcm
    const palletPlan: PalletPlan = {
      cartonsPerLayer,
      layers,
      cartonsPerPallet,
      palletsNeeded,
      bestOrientation: bestIsLW ? "LW" : "WL",
      palletDimsCm: { L: palletDims.L, W: palletDims.W, H: palletH },
      stackHeightCm,
      spaceEfficiency: Number(((cartonsPerLayer * Lcm * Wcm) / (palletDims.L * palletDims.W) * 100 || 0).toFixed(2)),
    }

    output.palletPlan = palletPlan

    if (input.containerKey && input.containerKey !== "none") {
      const c = CONTAINERS.find(x => x.key === input.containerKey)
      if (c) {
        // rough estimate: compare pallet footprint to container footprint, no aisle
        const palletsPerLayer = Math.floor(c.innerLengthCm / palletDims.L) * Math.floor(c.innerWidthCm / palletDims.W)
        const palletHeightCm = stackHeightCm
        const layersFit = Math.max(1, Math.floor(c.innerHeightCm / palletHeightCm))
        const palletsFit = palletsPerLayer * layersFit
        const utilizationPercent = Number(((palletsFit * (palletDims.L * palletDims.W * palletHeightCm)) / (c.innerLengthCm * c.innerWidthCm * c.innerHeightCm) * 100).toFixed(2))
        output.containerEstimate = { containerName: c.name, palletsFit, utilizationPercent }
      }
    }
  }

  return output
}


