export type WeightUnit = "kg" | "lbs"
export type DimensionUnit = "m" | "ft"
export type SecuringMethod = "indirect" | "direct"

export interface CargoInput {
  weight: number
  weightUnit: WeightUnit
  length: number
  width: number
  height: number
  dimensionUnit: DimensionUnit
}

export interface Recommendation {
  strapCount: number
  strapWLL: number
  totalCapacity: number
  safetyMargin: number
}

export interface CalculationResult {
  baseRequiredWLL: number
  totalRequiredWLL: number
  angleEfficiencyFactor: number
  recommendations: Recommendation[]
}

// Standard WLL values for common strap sizes (in kg)
const STANDARD_WLL_VALUES = [
  250, 500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 8000, 10000
]

// Convert weight between units
export function convertWeight(weight: number, fromUnit: WeightUnit, toUnit: WeightUnit): number {
  if (fromUnit === toUnit) return weight
  
  if (fromUnit === "kg" && toUnit === "lbs") {
    return weight * 2.20462
  } else if (fromUnit === "lbs" && toUnit === "kg") {
    return weight / 2.20462
  }
  
  return weight
}

// Get angle efficiency factor based on tie-down angle
export function getAngleEfficiencyFactor(angle: number): number {
  if (angle >= 90) return 1.0
  if (angle >= 75) return 0.97
  if (angle >= 60) return 0.86
  if (angle >= 45) return 0.70
  if (angle >= 30) return 0.50
  if (angle >= 15) return 0.30
  return 0.20 // For very shallow angles
}

// Calculate minimum number of tie-downs based on cargo length
export function getMinimumTieDownCount(length: number, unit: DimensionUnit): number {
  const lengthInMeters = unit === "ft" ? length * 0.3048 : length
  
  if (lengthInMeters >= 6.1) return 3  // 20+ feet
  if (lengthInMeters >= 3.05) return 2 // 10+ feet
  return 1
}

// Generate strap recommendations based on required WLL
export function generateRecommendations(
  requiredWLL: number, 
  weightUnit: WeightUnit,
  minCount: number = 1
): Recommendation[] {
  const recommendations: Recommendation[] = []
  
  // Find the best combinations of strap counts and WLL values
  for (let count = minCount; count <= 8; count++) {
    const requiredWLLPerStrap = requiredWLL / count
    
    // Find the closest standard WLL value that meets or exceeds the requirement
    const suitableWLL = STANDARD_WLL_VALUES.find(wll => wll >= requiredWLLPerStrap)
    
    if (suitableWLL) {
      const totalCapacity = suitableWLL * count
      const safetyMargin = ((totalCapacity - requiredWLL) / requiredWLL) * 100
      
      recommendations.push({
        strapCount: count,
        strapWLL: suitableWLL,
        totalCapacity,
        safetyMargin
      })
      
      // Limit to 3 best options
      if (recommendations.length >= 3) break
    }
  }
  
  // Sort by total capacity (ascending) and then by strap count (ascending)
  return recommendations.sort((a, b) => {
    if (Math.abs(a.totalCapacity - b.totalCapacity) < 100) {
      return a.strapCount - b.strapCount
    }
    return a.totalCapacity - b.totalCapacity
  })
}

// Main calculation function
export function calculateRequiredWLL(
  cargoInput: CargoInput, 
  securingMethod: SecuringMethod, 
  angle: number
): CalculationResult {
  // Convert all weights to kg for calculations
  const weightInKg = convertWeight(cargoInput.weight, cargoInput.weightUnit, "kg")
  
  // Calculate base required WLL
  let baseRequiredWLL: number
  
  if (securingMethod === "direct") {
    // Direct tie-down: full weight capacity needed
    baseRequiredWLL = weightInKg
  } else {
    // Indirect tie-down: 50% of weight capacity needed
    baseRequiredWLL = weightInKg * 0.5
  }
  
  // Apply angle efficiency factor for indirect method
  let totalRequiredWLL = baseRequiredWLL
  let angleEfficiencyFactor = 1.0
  
  if (securingMethod === "indirect") {
    angleEfficiencyFactor = getAngleEfficiencyFactor(angle)
    totalRequiredWLL = baseRequiredWLL / angleEfficiencyFactor
  }
  
  // Get minimum tie-down count based on cargo length
  const minTieDownCount = getMinimumTieDownCount(cargoInput.length, cargoInput.dimensionUnit)
  
  // Generate recommendations
  const recommendations = generateRecommendations(totalRequiredWLL, "kg", minTieDownCount)
  
  // Convert results back to user's preferred weight unit
  const userUnit = cargoInput.weightUnit
  const convertedBaseWLL = convertWeight(baseRequiredWLL, "kg", userUnit)
  const convertedTotalWLL = convertWeight(totalRequiredWLL, "kg", userUnit)
  
  // Convert recommendation WLL values to user's unit
  const convertedRecommendations = recommendations.map(rec => ({
    ...rec,
    strapWLL: convertWeight(rec.strapWLL, "kg", userUnit),
    totalCapacity: convertWeight(rec.totalCapacity, "kg", userUnit)
  }))
  
  return {
    baseRequiredWLL: convertedBaseWLL,
    totalRequiredWLL: convertedTotalWLL,
    angleEfficiencyFactor,
    recommendations: convertedRecommendations
  }
}

// Utility function to validate input
export function validateCargoInput(input: CargoInput): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!input.weight || input.weight <= 0) {
    errors.push("Cargo weight must be greater than 0")
  }
  
  if (input.length < 0) errors.push("Length cannot be negative")
  if (input.width < 0) errors.push("Width cannot be negative")
  if (input.height < 0) errors.push("Height cannot be negative")
  
  if (input.weight > 50000) {
    errors.push("Weight exceeds maximum supported value (50,000 kg)")
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Get safety factor explanation
export function getSafetyFactorExplanation(securingMethod: SecuringMethod, angle?: number): string {
  if (securingMethod === "direct") {
    return "Direct tie-down provides 100% strap efficiency with no angle-related losses."
  }
  
  if (!angle) return "Indirect tie-down requires angle consideration for proper efficiency calculation."
  
  const efficiency = getAngleEfficiencyFactor(angle) * 100
  
  if (angle >= 75) {
    return `Excellent angle (${angle}°) provides ${efficiency.toFixed(0)}% efficiency with minimal force loss.`
  } else if (angle >= 45) {
    return `Good angle (${angle}°) provides ${efficiency.toFixed(0)}% efficiency. Consider steeper angles for better performance.`
  } else {
    return `Shallow angle (${angle}°) significantly reduces efficiency to ${efficiency.toFixed(0)}%. Consider repositioning tie-downs.`
  }
}
