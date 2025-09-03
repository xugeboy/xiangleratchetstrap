export type LashingMode = "indirect" | "direct"

/**
 * Calculate geometric efficiency for indirect lashing (friction lashing)
 * Uses sin(α) calculation according to EN 12195-1
 * @param verticalAngle - The vertical angle α in degrees (0-90)
 * @returns The efficiency percentage (0-100)
 */
export function calculateIndirectEfficiency(verticalAngle: number): number {
  if (verticalAngle < 0 || verticalAngle > 90) return 0
  
  const angleInRadians = (verticalAngle * Math.PI) / 180
  const sineValue = Math.sin(angleInRadians)
  
  return sineValue * 100
}

/**
 * Calculate geometric efficiency for direct lashing
 * Uses cos(α) × cos(β) calculation according to EN 12195-1
 * @param verticalAngle - The vertical angle α in degrees (0-90)
 * @param horizontalAngle - The horizontal angle β in degrees (0-90)
 * @returns The efficiency percentage (0-100)
 */
export function calculateDirectEfficiency(verticalAngle: number, horizontalAngle: number): number {
  if (verticalAngle < 0 || verticalAngle > 90) return 0
  if (horizontalAngle < 0 || horizontalAngle > 90) return 0
  
  const verticalRadians = (verticalAngle * Math.PI) / 180
  const horizontalRadians = (horizontalAngle * Math.PI) / 180
  
  const cosVertical = Math.cos(verticalRadians)
  const cosHorizontal = Math.cos(horizontalRadians)
  
  return cosVertical * cosHorizontal * 100
}

/**
 * Get efficiency interpretation based on percentage
 * @param efficiency - The efficiency percentage (0-100)
 * @returns A description of the efficiency level
 */
export function getEfficiencyInterpretation(efficiency: number): string {
  if (efficiency >= 85) return "High Efficiency"
  if (efficiency >= 50) return "Medium Efficiency"
  return "Low Efficiency"
}

/**
 * Get optimization recommendations based on mode and angles
 * @param mode - The lashing mode (indirect or direct)
 * @param verticalAngle - The vertical angle α in degrees
 * @param horizontalAngle - The horizontal angle β in degrees (for direct mode)
 * @param efficiency - The calculated efficiency percentage
 * @returns Array of optimization recommendations
 */
export function getOptimizationRecommendations(
  mode: LashingMode,
  verticalAngle: number,
  horizontalAngle: number,
  efficiency: number
): string[] {
  const recommendations: string[] = []
  
  if (efficiency < 50) {
    if (mode === "indirect") {
      recommendations.push("For indirect lashing, try increasing angle α to 75° or above")
      recommendations.push("Consider repositioning lashing points to achieve steeper angles")
    } else {
      recommendations.push("For direct lashing, try reducing angle β to improve efficiency")
      recommendations.push("Consider optimizing both vertical and horizontal angles simultaneously")
    }
    recommendations.push("This angle setup requires significantly stronger or more lashing straps for compliance")
  } else if (efficiency < 85) {
    if (mode === "indirect") {
      recommendations.push("For indirect lashing, consider increasing angle α for better efficiency")
    } else {
      recommendations.push("For direct lashing, fine-tune both angles for optimal performance")
    }
    recommendations.push("Monitor lashing tension and consider additional straps if needed")
  } else {
    recommendations.push("Excellent angle configuration - maintain current setup")
    recommendations.push("Regular inspection and maintenance of lashing equipment recommended")
  }
  
  return recommendations
}

/**
 * Get common angle examples with their efficiency values for indirect lashing
 * @returns Array of angle examples with efficiency data
 */
export function getIndirectLashingExamples() {
  return [
    { angle: 90, efficiency: 100.0, description: "Vertical - Maximum efficiency" },
    { angle: 75, efficiency: 96.6, description: "Steep - Excellent efficiency" },
    { angle: 60, efficiency: 86.6, description: "Good - High efficiency" },
    { angle: 45, efficiency: 70.7, description: "Moderate - Reduced efficiency" },
    { angle: 30, efficiency: 50.0, description: "Poor - Half efficiency" },
    { angle: 15, efficiency: 25.9, description: "Very Poor - Quarter efficiency" },
    { angle: 0, efficiency: 0.0, description: "Horizontal - No efficiency" }
  ]
}

/**
 * Get common angle examples with their efficiency values for direct lashing
 * @returns Array of angle examples with efficiency data
 */
export function getDirectLashingExamples() {
  return [
    { verticalAngle: 0, horizontalAngle: 0, efficiency: 100.0, description: "Perfect alignment - Maximum efficiency" },
    { verticalAngle: 15, horizontalAngle: 15, efficiency: 93.3, description: "Excellent - Very high efficiency" },
    { verticalAngle: 30, horizontalAngle: 30, efficiency: 75.0, description: "Good - High efficiency" },
    { verticalAngle: 45, horizontalAngle: 45, efficiency: 50.0, description: "Moderate - Reduced efficiency" },
    { verticalAngle: 60, horizontalAngle: 60, efficiency: 25.0, description: "Poor - Low efficiency" },
    { verticalAngle: 75, horizontalAngle: 75, efficiency: 6.7, description: "Very Poor - Very low efficiency" },
    { verticalAngle: 90, horizontalAngle: 90, efficiency: 0.0, description: "Perpendicular - No efficiency" }
  ]
}
