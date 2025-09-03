import { useMemo } from 'react'

export type LashingMethod = 'indirect' | 'direct'
export type ForceDirection = 'forward' | 'sideways'
export type FrictionCoefficient = 'wood_wood' | 'metal_wood' | 'concrete_wood' | 'anti_slip' | 'custom'

export interface EN12195Inputs {
  lashingMethod: LashingMethod
  cargoWeight: number // kg
  forceDirection: ForceDirection
  frictionCoefficient: FrictionCoefficient
  customFrictionValue?: number // for custom friction
  
  // Indirect lashing specific
  stf?: number // daN
  verticalAngle?: number // degrees
  isUnstableCargo?: boolean
  cargoHeight?: number // meters
  cargoWidth?: number // meters
  
  // Direct lashing specific
  lashingCapacity?: number // daN
  horizontalAngle?: number // degrees
}

export interface CalculationResult {
  numberOfStraps: number
  calculationMethod: string
  formula: string
  values: Record<string, number>
  isMinimumApplied: boolean
  requiresTippingCheck?: boolean
  tippingResult?: number
  tippingFormula?: string
  safetyFactor?: number
  error?: string
}

const G = 9.81 // m/s²

// Force direction coefficients
const FORCE_COEFFICIENTS = {
  forward: 0.8, // Braking
  sideways: 0.5 // Turning/Acceleration
} as const

// Friction coefficients
const FRICTION_COEFFICIENTS = {
  wood_wood: 0.45,
  metal_wood: 0.30,
  concrete_wood: 0.55,
  anti_slip: 0.60
} as const

export function useEN12195Calculation(inputs: EN12195Inputs): CalculationResult | null {
  return useMemo(() => {
    // Validate required inputs
    if (!inputs.cargoWeight || inputs.cargoWeight <= 0) {
      return null
    }

    const c_xy = FORCE_COEFFICIENTS[inputs.forceDirection]
    const μ = inputs.frictionCoefficient === 'custom' 
      ? (inputs.customFrictionValue || 0)
      : FRICTION_COEFFICIENTS[inputs.frictionCoefficient]

    if (inputs.lashingMethod === 'indirect') {
      return calculateIndirectLashing(inputs, c_xy, μ)
    } else {
      return calculateDirectLashing(inputs, c_xy)
    }
  }, [inputs])
}

function calculateIndirectLashing(
  inputs: EN12195Inputs, 
  c_xy: number, 
  μ: number
): CalculationResult {
  // Validate indirect lashing inputs
  if (!inputs.stf || inputs.stf <= 0 || !inputs.verticalAngle || inputs.verticalAngle <= 0) {
    return null
  }

  const m = inputs.cargoWeight
  const STF_Newtons = inputs.stf * 10 // Convert daN to N
  const α_radians = (inputs.verticalAngle * Math.PI) / 180

  // Check for invalid angle (90° is valid, but we need to ensure sin(α) is not too small)
  if (Math.abs(Math.sin(α_radians)) < 0.01) {
    return {
      numberOfStraps: 2,
      calculationMethod: 'Indirect Lashing (EN 12195-1)',
      formula: 'n = ((c_x,y - μ) × m × g) / (2 × μ × STF × sin(α))',
      values: {
        'c_x,y': c_xy,
        'μ': μ,
        'm': m,
        'g': G,
        'STF': inputs.stf,
        'α': inputs.verticalAngle,
        'STF_Newtons': STF_Newtons,
        'α_radians': α_radians,
        'sin(α)': Math.sin(α_radians),
        'error_code': 1
      },
      isMinimumApplied: true,
      error: 'Angle too small for effective securing. Minimum 2 straps applied.'
    }
  }

  // Indirect lashing formula: n = ((c_x,y - μ) * m * g) / (2 * μ * STF * sin(α))
  const numerator = (c_xy - μ) * m * G
  const denominator = 2 * μ * STF_Newtons * Math.sin(α_radians)
  
  let n = Math.ceil(numerator / denominator)
  
  // Apply minimum of 2 straps
  const isMinimumApplied = n < 2
  n = Math.max(2, n)

  // Check if tipping calculation is needed
  const requiresTippingCheck = inputs.isUnstableCargo && 
    inputs.cargoHeight && inputs.cargoWidth &&
    inputs.cargoHeight > inputs.cargoWidth

  let tippingResult: number | undefined
  let tippingFormula: string | undefined
  let safetyFactor: number | undefined

  if (requiresTippingCheck) {
    // Enhanced tipping calculation based on EN 12195-1 principles
    // For unstable cargo, we need to consider the center of gravity and tipping moments
    const height = inputs.cargoHeight!
    const width = inputs.cargoWidth!
    const heightWidthRatio = height / width
    
    // Calculate tipping safety factor based on cargo dimensions
    // Higher center of gravity requires more straps for stability
    if (heightWidthRatio > 1.5) {
      // High center of gravity - apply safety factor
      safetyFactor = 1 + (heightWidthRatio - 1.5) * 0.3
      tippingResult = Math.ceil(n * safetyFactor)
      tippingFormula = `Tipping safety factor: ${safetyFactor.toFixed(2)} (h/w ratio: ${heightWidthRatio.toFixed(2)})`
    } else {
      // Moderate center of gravity - standard calculation
      safetyFactor = 1.0
      tippingResult = n
      tippingFormula = `Standard calculation (h/w ratio: ${heightWidthRatio.toFixed(2)})`
    }
  }

  return {
    numberOfStraps: requiresTippingCheck ? Math.max(n, tippingResult || n) : n,
    calculationMethod: 'Indirect Lashing (EN 12195-1)',
    formula: 'n = ((c_x,y - μ) × m × g) / (2 × μ × STF × sin(α))',
    values: {
      'c_x,y': c_xy,
      'μ': μ,
      'm': m,
      'g': G,
      'STF': inputs.stf,
      'α': inputs.verticalAngle,
      'STF_Newtons': STF_Newtons,
      'α_radians': α_radians,
      'sin(α)': Math.sin(α_radians),
      'numerator': numerator,
      'denominator': denominator,
      'raw_result': numerator / denominator
    },
    isMinimumApplied,
    requiresTippingCheck,
    tippingResult,
    tippingFormula,
    safetyFactor
  }
}

function calculateDirectLashing(
  inputs: EN12195Inputs, 
  c_xy: number
): CalculationResult {
  // Validate direct lashing inputs
  if (!inputs.lashingCapacity || inputs.lashingCapacity <= 0 || 
      !inputs.verticalAngle || inputs.verticalAngle <= 0 ||
      !inputs.horizontalAngle || inputs.horizontalAngle <= 0) {
    return null
  }

  const m = inputs.cargoWeight
  const LC_daN = inputs.lashingCapacity
  const α_radians = (inputs.verticalAngle * Math.PI) / 180
  const β_radians = (inputs.horizontalAngle * Math.PI) / 180

  // Check for angles that would cause division by zero or very small values
  const cos_α = Math.cos(α_radians)
  const cos_β = Math.cos(β_radians)
  
  if (Math.abs(cos_α) < 0.01 || Math.abs(cos_β) < 0.01) {
    return {
      numberOfStraps: 2,
      calculationMethod: 'Direct Lashing (EN 12195-1)',
      formula: 'n = (c_x,y × (m × g / 10)) / (LC × cos(α) × cos(β))',
      values: {
        'c_x,y': c_xy,
        'm': m,
        'g': G,
        'G_daN': (m * G) / 10,
        'LC': LC_daN,
        'α': inputs.verticalAngle,
        'β': inputs.horizontalAngle,
        'α_radians': α_radians,
        'β_radians': β_radians,
        'cos(α)': cos_α,
        'cos(β)': cos_β,
        'error_code': 2
      },
      isMinimumApplied: true,
      error: 'Angles too close to 90° for effective securing. Minimum 2 straps applied.'
    }
  }

  // Direct lashing formula: n = (c_x,y × (m × g / 10)) / (LC × cos(α) × cos(β))
  const G_daN = (m * G) / 10 // Convert weight to daN
  const numerator = c_xy * G_daN
  const denominator = LC_daN * cos_α * cos_β
  
  let n = Math.ceil(numerator / denominator)
  
  // Apply minimum of 2 straps
  const isMinimumApplied = n < 2
  n = Math.max(2, n)

  return {
    numberOfStraps: n,
    calculationMethod: 'Direct Lashing (EN 12195-1)',
    formula: 'n = (c_x,y × (m × g / 10)) / (LC × cos(α) × cos(β))',
    values: {
      'c_x,y': c_xy,
      'm': m,
      'g': G,
      'G_daN': G_daN,
      'LC': LC_daN,
      'α': inputs.verticalAngle,
      'β': inputs.horizontalAngle,
      'α_radians': α_radians,
      'β_radians': β_radians,
      'cos(α)': cos_α,
      'cos(β)': cos_β,
      'numerator': numerator,
      'denominator': denominator,
      'raw_result': numerator / denominator
    },
    isMinimumApplied
  }
}

// Helper function to get friction coefficient value
export function getFrictionCoefficient(
  type: FrictionCoefficient, 
  customValue?: number
): number {
  if (type === 'custom') {
    return customValue || 0
  }
  return FRICTION_COEFFICIENTS[type]
}

// Helper function to get force direction coefficient
export function getForceDirectionCoefficient(direction: ForceDirection): number {
  return FORCE_COEFFICIENTS[direction]
}

