/**
 * Calculate the effective Working Load Limit based on tie-down angle
 * @param nominalWLL - The nominal WLL printed on the strap
 * @param angle - The tie-down angle in degrees (0-90)
 * @returns The effective WLL at the given angle
 */
export function calculateEffectiveWLL(nominalWLL: number, angle: number): number {
  if (nominalWLL <= 0) return 0
  if (angle < 0 || angle > 90) return 0
  
  // Convert angle to radians and calculate sine
  const angleInRadians = (angle * Math.PI) / 180
  const sineValue = Math.sin(angleInRadians)
  
  return nominalWLL * sineValue
}

/**
 * Calculate the percentage of capacity lost due to angle
 * @param angle - The tie-down angle in degrees (0-90)
 * @returns The percentage of capacity lost (0-100)
 */
export function calculateLossPercentage(angle: number): number {
  if (angle < 0 || angle > 90) return 100
  
  // Convert angle to radians and calculate sine
  const angleInRadians = (angle * Math.PI) / 180
  const sineValue = Math.sin(angleInRadians)
  
  return (1 - sineValue) * 100
}

/**
 * Get the efficiency factor for a given angle
 * @param angle - The tie-down angle in degrees (0-90)
 * @returns The efficiency factor (0-1)
 */
export function getEfficiencyFactor(angle: number): number {
  if (angle < 0 || angle > 90) return 0
  
  const angleInRadians = (angle * Math.PI) / 180
  return Math.sin(angleInRadians)
}

/**
 * Get a human-readable description of the angle efficiency
 * @param angle - The tie-down angle in degrees (0-90)
 * @returns A description of the efficiency level
 */
export function getEfficiencyDescription(angle: number): string {
  if (angle >= 85) return "Excellent - Maximum efficiency"
  if (angle >= 70) return "Very Good - High efficiency"
  if (angle >= 60) return "Good - Acceptable efficiency"
  if (angle >= 45) return "Moderate - Reduced efficiency"
  if (angle >= 30) return "Poor - Significant efficiency loss"
  if (angle >= 15) return "Very Poor - Major efficiency loss"
  return "Dangerous - Minimal efficiency"
}

/**
 * Get safety recommendations based on angle
 * @param angle - The tie-down angle in degrees (0-90)
 * @returns Safety recommendations
 */
export function getSafetyRecommendations(angle: number): string[] {
  const recommendations: string[] = []
  
  if (angle < 30) {
    recommendations.push("Consider repositioning your tie-downs for a steeper angle")
    recommendations.push("Use additional tie-downs to compensate for efficiency loss")
    recommendations.push("Verify that your cargo is still properly secured")
  } else if (angle < 45) {
    recommendations.push("Monitor tie-down tension during transport")
    recommendations.push("Consider using straps with higher WLL ratings")
  } else if (angle < 60) {
    recommendations.push("Ensure tie-downs are properly tensioned")
    recommendations.push("Regular inspection recommended during long trips")
  } else {
    recommendations.push("Excellent angle - maintain current setup")
    recommendations.push("Regular maintenance of straps recommended")
  }
  
  return recommendations
}

/**
 * Calculate the required WLL increase to compensate for angle loss
 * @param requiredWLL - The WLL needed for the cargo
 * @param angle - The tie-down angle in degrees (0-90)
 * @returns The WLL rating needed to compensate for angle loss
 */
export function calculateRequiredWLLCompensation(requiredWLL: number, angle: number): number {
  if (requiredWLL <= 0 || angle <= 0 || angle > 90) return 0
  
  const efficiencyFactor = getEfficiencyFactor(angle)
  if (efficiencyFactor === 0) return Infinity
  
  return requiredWLL / efficiencyFactor
}

/**
 * Get common angle examples with their efficiency values
 * @returns Array of angle examples with efficiency data
 */
export function getCommonAngleExamples() {
  return [
    { angle: 90, efficiency: 100, description: "Vertical - Maximum efficiency" },
    { angle: 75, efficiency: 96.6, description: "Steep - Excellent efficiency" },
    { angle: 60, efficiency: 86.6, description: "Good - High efficiency" },
    { angle: 45, efficiency: 70.7, description: "Moderate - Reduced efficiency" },
    { angle: 30, efficiency: 50.0, description: "Poor - Half efficiency" },
    { angle: 15, efficiency: 25.9, description: "Very Poor - Quarter efficiency" },
    { angle: 0, efficiency: 0.0, description: "Horizontal - No efficiency" }
  ]
}
