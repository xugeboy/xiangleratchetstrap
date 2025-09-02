export type WeightUnit = "kg" | "lbs";
export type DimensionUnit = "m" | "ft";
export type SecuringMethod = "indirect" | "direct";
export type Region = "north_america" | "australia" | "europe";

export interface CargoInput {
  region: Region;
  weight: number;
  weightUnit: WeightUnit;
  length: number;
  dimensionUnit: DimensionUnit;
}

export interface Recommendation {
  strapCount: number;
  strapWLL: number;
  strapUnit: WeightUnit;
  totalCapacity: number;
  safetyMargin: number;
  isExactMatch: boolean;
  isRecommended: boolean;
  recommendationReason: string;
}

export interface CalculationResult {
  baseRequiredWLL: number;
  totalRequiredWLL: number;
  methodFactor: number;
  angleEfficiencyFactor: number;
  recommendations: Recommendation[];
}

// Standard WLL values for common strap sizes (in lbs)
const STANDARD_WLL_VALUES = [
  166, 256, 367, 400, 585, 1100, 1467, 2200, 3333, 5400,
];
// Standard LC values for common strap sizes (in kg)
const STANDARD_LC_VALUES = [
  125, 175, 250, 275, 400, 750, 1000, 1500, 2500, 5000,
];

// Convert weight between units
export function convertWeight(
  weight: number,
  fromUnit: WeightUnit,
  toUnit: WeightUnit
): number {
  if (fromUnit === toUnit) return weight;

  if (fromUnit === "kg" && toUnit === "lbs") {
    return weight * 2.20462;
  } else if (fromUnit === "lbs" && toUnit === "kg") {
    return weight / 2.20462;
  }

  return weight;
}

// Get angle efficiency factor based on tie-down angle
// Note: This should return the actual efficiency percentage, not cosine value
export function getAngleEfficiencyFactor(angle: number): number {
  if (angle >= 90) return 1.0;
  
  // Based on industry standards and practical measurements
  // These values are more accurate than pure cosine calculations
  if (angle >= 85) return 0.99;
  if (angle >= 80) return 0.98;
  if (angle >= 75) return 0.96;
  if (angle >= 70) return 0.94;
  if (angle >= 65) return 0.91;
  if (angle >= 60) return 0.87; // Corrected: 60° = 87%
  if (angle >= 55) return 0.82;
  if (angle >= 50) return 0.77;
  if (angle >= 45) return 0.71;
  if (angle >= 40) return 0.64;
  if (angle >= 35) return 0.57;
  if (angle >= 30) return 0.50;
  if (angle >= 25) return 0.42;
  if (angle >= 20) return 0.34;
  if (angle >= 15) return 0.26;
  
  return 0.20; // For angles below 15°
}

// Get indirect tie-down factor based on region standards
export function getIndirectTieDownFactor(region: Region): number {
  switch (region) {
    case "north_america":
      return 0.5; // DOT: aggregate WLL ≥ 50% of load weight
    case "australia":
      return 0.8; // AS/NZS 4380 standard
    case "europe":
      return 0.7; // EN12195-2 standard
    default:
      return 0.7;
  }
}

// Calculate minimum number of tie-downs based on cargo length and region
// Practical rule: minimum 2 straps for most cargo, 3+ for long cargo
export function getMinimumTieDownCount(
  length: number,
  unit: DimensionUnit,
  region: Region
): number {
  const lengthInMeters = unit === "ft" ? length * 0.3048 : length;
  
  if (region === "north_america") {
    // DOT rule for unblocked cargo: 2 tie-downs for first 10 ft, then +1 per additional 10 ft (or fraction)
    const lengthInFeet = unit === "ft" ? length : length * 3.28084;
    if (lengthInFeet <= 10) return 2;
    const extra = Math.ceil((lengthInFeet - 10) / 10);
    return Math.max(2, 2 + extra);
  }
  
  // AU/EU: 3.0 m → ≥2; 6.0 m → ≥3; beyond 6.0 m, +1 per additional 3.0 m (or fraction)
  if (lengthInMeters <= 3.0) return 2;
  if (lengthInMeters <= 6.0) return 3;
  const extraMetric = Math.ceil((lengthInMeters - 6.0) / 3.0);
  return 3 + Math.max(0, extraMetric);
}

// Generate strap recommendations based on required WLL and region
// Following practical rules: 2-4 straps, each WLL ≥ 1/3 total requirement
export function generateRecommendations(
  requiredWLL: number,
  weightUnit: WeightUnit,
  minCount: number = 1,
  region: Region
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const factors = getRegionFactors(region);

  // Select standard values based on region
  // For North America, use lbs values; for others, use kg values
  const standardValues = region === "north_america" ? STANDARD_WLL_VALUES : STANDARD_LC_VALUES;
  const standardUnit = region === "north_america" ? "lbs" : "kg";
   
  // Ensure we're working with the correct units
  // If the requiredWLL is in kg but we're using lbs standards, we need to convert
  let adjustedRequiredWLL = requiredWLL;
  if (region === "north_america" && weightUnit === "kg") {
    // Convert kg to lbs to match lbs standards
    adjustedRequiredWLL = convertWeight(requiredWLL, "kg", "lbs");
  } else if (region !== "north_america" && weightUnit === "lbs") {
    // Convert lbs to kg to match kg standards
    adjustedRequiredWLL = convertWeight(requiredWLL, "lbs", "kg");
  }

  // Search strap counts from minimum up to a practical range (min + 6)
  for (let count = minCount; count <= minCount + 6; count++) {
    const requiredWLLPerStrap = adjustedRequiredWLL / count;
    
    // Practical rule: each strap WLL should be ≥ 1/3 of total requirement
    // This ensures safety even with imperfect angles
    const minWLLPerStrap = adjustedRequiredWLL / 3;
    const actualRequiredWLLPerStrap = Math.max(requiredWLLPerStrap, minWLLPerStrap);

    // Find ALL standard WLL/LC values that meet or exceed the requirement
    const suitableWLLs = standardValues.filter(
      (wll) => wll >= actualRequiredWLLPerStrap
    );

    // Test each suitable WLL value to find the best configuration
    for (const suitableWLL of suitableWLLs) {
      const totalCapacity = suitableWLL * count;
      const safetyMargin = ((totalCapacity - adjustedRequiredWLL) / adjustedRequiredWLL) * 100;

      // Determine if this is an exact match or recommended based on region standards
      const isExactMatch =
        Math.abs(totalCapacity - adjustedRequiredWLL) < adjustedRequiredWLL * 0.01; // Within 1% margin
      
      // Only recommend configurations that meet the region's minimum safety margin
      const isRecommended = safetyMargin >= factors.safetyMargin; // Region-specific minimum

      let recommendationReason = "";
      if (isExactMatch) {
        recommendationReason = "Exact match - minimal safety margin";
      } else if (safetyMargin >= 50) {
        recommendationReason =
          "Excellent safety margin (≥50%) - meets strict industry standards";
      } else if (safetyMargin >= 30) {
        recommendationReason =
          "Good safety margin (≥30%) - suitable for high-value cargo";
      } else if (safetyMargin >= factors.safetyMargin) {
        recommendationReason =
          `Adequate safety margin (≥${factors.safetyMargin}%) - meets ${getRegionDisplayName(region)} minimum requirements`;
      } else {
        recommendationReason =
          `Insufficient safety margin (${safetyMargin.toFixed(1)}% < ${factors.safetyMargin}%) - below ${getRegionDisplayName(region)} requirements`;
      }

      // Only add recommendations that meet the minimum safety margin requirement
      if (isRecommended) {
        recommendations.push({
          strapCount: count,
          strapWLL: suitableWLL,
          strapUnit: standardUnit,
          totalCapacity,
          safetyMargin,
          isExactMatch,
          isRecommended,
          recommendationReason,
        });
      }
    }
  }

  // Sort by safety margin (lowest first) to prioritize minimal-overhead configurations
  const sortedBySafetyAsc = recommendations.sort((a, b) => a.safetyMargin - b.safetyMargin);
  
  // Take only the bottom 3 configurations with the lowest safety margins (but still >= min)
  const bottom3BySafety = sortedBySafetyAsc.slice(0, 3);
  
  // Then sort by practical priority: fewer straps first, then by total capacity
  // This ensures customers get the most economical and practical solutions first
  return bottom3BySafety.sort((a, b) => {
    // Primary: prefer fewer straps (more practical)
    if (a.strapCount !== b.strapCount) {
      return a.strapCount - b.strapCount;
    }
    // Secondary: if same strap count, prefer lower total capacity (more economical)
    return a.totalCapacity - b.totalCapacity;
  });
}

// Main calculation function
export function calculateRequiredWLL(
  cargoInput: CargoInput,
  securingMethod: SecuringMethod,
  angle: number
): CalculationResult {
  // Convert all weights to kg for calculations
  const weightInKg = convertWeight(
    cargoInput.weight,
    cargoInput.weightUnit,
    "kg"
  );

  // Get region-specific factors
  const factors = getRegionFactors(cargoInput.region);
  const indirectFactor = getIndirectTieDownFactor(cargoInput.region);

  // Step 1: Calculate Required Actual Load Capacity (实际需要承载力)
  // Cargo Weight × (1 + Safety Margin)
  const requiredActualLoadCapacity = weightInKg * (1 + factors.safetyMargin / 100);

  // Step 2: Calculate Effective Load Factor (有效载荷系数)
  let effectiveLoadFactor: number;
  let angleEfficiency: number;
  let methodFactor: number;
  
  if (cargoInput.region === "north_america") {
    // FMCSA/DOT aggregate rule (49 CFR §393.106(d)):
    // - Aggregate WLL of all tiedowns ≥ 50% of cargo weight
    // - Contribution counting: direct = 50% of WLL; indirect over-the-top (across vehicle) = 100% of WLL
    //   (Note: indirect returning to same side would contribute 50%; not modeled yet in UI)
    const contributionFactor = securingMethod === "direct" ? 0.5 : 1.0;
    methodFactor = contributionFactor;
    angleEfficiency = 1.0; // No angle reduction under DOT aggregate rule
    effectiveLoadFactor = 1.0; // not used in NA branch below

    // Required aggregate sum of strap WLLs (with safety margin)
    const requiredAggregate = requiredActualLoadCapacity * 0.5;
    // Convert to an equivalent total required WLL before distributing to straps
    const totalRequiredWLL_na = requiredAggregate / contributionFactor;

    // Determine min tie-down count per NA length rules
    const minTieDownCount = getMinimumTieDownCount(
      cargoInput.length,
      cargoInput.dimensionUnit,
      cargoInput.region
    );

    // Generate recommendations in user-preferred unit
    const userUnit = cargoInput.weightUnit;
    const totalRequiredInUser = convertWeight(totalRequiredWLL_na, "kg", userUnit);
    const recommendations = generateRecommendations(
      totalRequiredInUser,
      userUnit,
      minTieDownCount,
      cargoInput.region
    );

    // Prepare return payload for NA early exit
    return {
      baseRequiredWLL: convertWeight(requiredActualLoadCapacity, "kg", userUnit),
      totalRequiredWLL: Math.round(totalRequiredInUser),
      methodFactor: methodFactor,
      angleEfficiencyFactor: angleEfficiency,
      recommendations: recommendations,
    };
  } else {
    if (securingMethod === "direct") {
      methodFactor = 1.0; // Direct tie-down: 100% efficiency
      angleEfficiency = 1.0; // No angle loss for direct tie-down
      effectiveLoadFactor = methodFactor * angleEfficiency;
    } else {
      // Indirect tie-down (AU/EU): method factor × angle efficiency
      methodFactor = indirectFactor; // 0.8 for AU, 0.7 for EU
      angleEfficiency = getAngleEfficiencyFactor(angle);
      effectiveLoadFactor = methodFactor * angleEfficiency;
    }
  }

  // Step 3: Calculate Total Required WLL
  // Total Required WLL = Required Actual Load Capacity ÷ Effective Load Factor
  const totalRequiredWLL = requiredActualLoadCapacity / effectiveLoadFactor;

  // Get minimum tie-down count based on cargo length and region
  const minTieDownCount = getMinimumTieDownCount(
    cargoInput.length,
    cargoInput.dimensionUnit,
    cargoInput.region
  );

  // Generate recommendations with region-specific standards
  const recommendations = generateRecommendations(
    totalRequiredWLL,
    "kg",
    minTieDownCount,
    cargoInput.region
  );

  // Convert results back to user's preferred weight unit
  const userUnit = cargoInput.weightUnit;
  const convertedBaseWLL = convertWeight(requiredActualLoadCapacity, "kg", userUnit);
  const convertedTotalWLL = convertWeight(totalRequiredWLL, "kg", userUnit);

  // Convert recommendation WLL values to user's unit only if different
  const convertedRecommendations = recommendations.map((rec) => ({
    ...rec,
    strapWLL: rec.strapUnit === userUnit ? rec.strapWLL : convertWeight(rec.strapWLL, rec.strapUnit, userUnit),
    totalCapacity: rec.strapUnit === userUnit ? rec.totalCapacity : convertWeight(rec.totalCapacity, rec.strapUnit, userUnit),
  }));

  return {
    baseRequiredWLL: convertedBaseWLL,
    totalRequiredWLL: Math.round(convertedTotalWLL), // Final LC 取整数
    methodFactor: methodFactor,
    angleEfficiencyFactor: angleEfficiency,
    recommendations: convertedRecommendations,
  };
}

// Utility function to validate input
export function validateCargoInput(input: CargoInput): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!input.weight || input.weight <= 0) {
    errors.push("Cargo weight must be greater than 0");
  }

  if (input.length < 0) errors.push("Length cannot be negative");

  if (input.weight > 50000) {
    errors.push("Weight exceeds maximum supported value (50,000 kg)");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Get safety factor explanation
export function getSafetyFactorExplanation(
  securingMethod: SecuringMethod,
  angle?: number
): string {
  if (securingMethod === "direct") {
    return "Direct tie-down provides 100% strap efficiency with no angle-related losses.";
  }

  if (!angle)
    return "Indirect tie-down requires angle consideration for proper efficiency calculation.";

  const efficiency = getAngleEfficiencyFactor(angle) * 100;

  if (angle >= 75) {
    return `Excellent angle (${angle}°) provides ${efficiency.toFixed(
      0
    )}% efficiency with minimal force loss.`;
  } else if (angle >= 45) {
    return `Good angle (${angle}°) provides ${efficiency.toFixed(
      0
    )}% efficiency. Consider steeper angles for better performance.`;
  } else {
    return `Shallow angle (${angle}°) significantly reduces efficiency to ${efficiency.toFixed(
      0
    )}%. Consider repositioning tie-downs.`;
  }
}

// Get weight unit for region
export function getWeightUnitForRegion(region: Region): WeightUnit {
  switch (region) {
    case "north_america":
      return "lbs";
    case "australia":
    case "europe":
      return "kg";
    default:
      return "kg";
  }
}

// Get dimension unit for region
export function getDimensionUnitForRegion(region: Region): DimensionUnit {
  switch (region) {
    case "north_america":
      return "ft";
    case "australia":
    case "europe":
      return "m";
    default:
      return "m";
  }
}

// Get region-specific calculation factors
export function getRegionFactors(region: Region) {
  switch (region) {
    case "north_america":
      return {
        safetyMargin: 20, // Minimum 20% for DOT
        indirectFactor: 0.5, // DOT: aggregate WLL ≥ 50% of load weight
        minTieDownLengths: {
          short: 3.05, // 10 feet
          long: 6.1, // 20 feet
        },
      };
    case "australia":
      return {
        safetyMargin: 25, // AS/NZS 4380 requires 25% minimum
        indirectFactor: 0.8, // AS/NZS 4380 standard
        minTieDownLengths: {
          short: 3.0, // 3 meters
          long: 6.0, // 6 meters
        },
      };
    case "europe":
      return {
        safetyMargin: 30, // EN12195-2 requires 30% minimum
        indirectFactor: 0.7, // EN12195-2 standard
        minTieDownLengths: {
          short: 3.0, // 3 meters
          long: 6.0, // 6 meters
        },
      };
    default:
      return {
        safetyMargin: 20,
        indirectFactor: 0.7,
        minTieDownLengths: {
          short: 3.05,
          long: 6.1,
        },
      };
  }
}

// Get region name for display
export function getRegionDisplayName(region: Region): string {
  switch (region) {
    case "north_america":
      return "North America (DOT)";
    case "australia":
      return "Australia (AS/NZS 4380)";
    case "europe":
      return "Europe (EN12195-2)";
    default:
      return "Unknown";
  }
}

// Get load capacity term for region
export function getLoadCapacityTerm(region: Region): string {
  switch (region) {
    case "north_america":
      return "WLL";
    case "australia":
    case "europe":
      return "LC";
    default:
      return "WLL";
  }
}
