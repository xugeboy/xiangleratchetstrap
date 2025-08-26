export const UnitOptions = ["ft", "yd", "inch", "m", "cm", "mm"] as const
export type LengthUnit = typeof UnitOptions[number]

export const WeightUnits = ["lb", "kg"] as const
export type WeightUnit = typeof WeightUnits[number]

export interface PalletPreset {
  key: string
  name: string
  lengthCm: number
  widthCm: number
  heightCm: number
  maxLoadLb?: number
}

export const PALLET_PRESETS: PalletPreset[] = [
  { key: "standard_48x40", name: "Standard Pallet 48×40 in", lengthCm: 121.92, widthCm: 101.6, heightCm: 15.24, maxLoadLb: 2200 },
  { key: "euro_120x80", name: "Euro Pallet 120×80 cm", lengthCm: 120, widthCm: 80, heightCm: 15, maxLoadLb: 2200 },
  { key: "us_48x40", name: "US Pallet 48×40 in", lengthCm: 121.92, widthCm: 101.6, heightCm: 15.24, maxLoadLb: 2200 },
]

export interface ContainerPreset {
  key: string
  name: string
  innerLengthCm: number
  innerWidthCm: number
  innerHeightCm: number
  capacityCbmApprox: number
}

export const CONTAINERS: ContainerPreset[] = [
  { key: "20gp", name: "20' GP", innerLengthCm: 589, innerWidthCm: 235, innerHeightCm: 239, capacityCbmApprox: 33 },
  { key: "40gp", name: "40' GP", innerLengthCm: 1203, innerWidthCm: 235, innerHeightCm: 239, capacityCbmApprox: 67 },
  { key: "40hc", name: "40' HC", innerLengthCm: 1203, innerWidthCm: 235, innerHeightCm: 269, capacityCbmApprox: 76 },
]

export const INCH_TO_CM = 2.54
export const FT_TO_CM = 30.48
export const YD_TO_CM = 91.44
export const M_TO_CM = 100
export const MM_TO_CM = 0.1

export function toCentimeter(value: number, unit: LengthUnit): number {
  if (!Number.isFinite(value)) return 0
  switch (unit) {
    case "cm":
      return value
    case "mm":
      return value * MM_TO_CM
    case "m":
      return value * M_TO_CM
    case "inch":
      return value * INCH_TO_CM
    case "ft":
      return value * FT_TO_CM
    case "yd":
      return value * YD_TO_CM
    default:
      return value
  }
}

export function kgFrom(value: number, unit: WeightUnit): number {
  if (!Number.isFinite(value)) return 0
  return unit === "lb" ? value * 0.45359237 : value
}


