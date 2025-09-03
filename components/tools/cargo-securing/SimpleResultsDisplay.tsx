"use client";

import { useState } from "react";
import type {
  CargoInput,
  SecuringMethod,
  CalculationResult,
} from "@/utils/cargoSecuringCalculation";
import { formatWeight, formatDimension } from "@/utils/formatUtils";
import {
  getRegionDisplayName,
  getLoadCapacityTerm,
} from "@/utils/cargoSecuringCalculation";

interface SimpleResultsDisplayProps {
  results: CalculationResult;
  cargoInput: CargoInput;
  securingMethod: SecuringMethod;
  angle: number;
  selectedStrapWLL: number;
  onRecalculate: () => void;
}

export function SimpleResultsDisplay({
  results,
  cargoInput,
  securingMethod,
  angle,
  selectedStrapWLL,
  onRecalculate,
}: SimpleResultsDisplayProps) {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const formatWeightLocal = (weight: number, unit: string) => {
    return formatWeight(weight, unit);
  };

  const getSecuringMethodText = () => {
    if (securingMethod === "direct") return "Direct Tie-Down";
    return cargoInput.region === "north_america"
      ? "Indirect Tie-Down"
      : `Indirect Tie-Down (${angle}° angle)`;
  };

  // Calculate how many straps are needed
  const calculateRequiredStraps = () => {
    const strapCapacity = selectedStrapWLL;
    const requiredCapacity = results.totalRequiredWLL;
    
    // Use the calculated total required WLL for all regions
    // The calculation logic is already handled in the backend
    return Math.ceil(requiredCapacity / strapCapacity);
  };

  const requiredStrapCount = calculateRequiredStraps();
  const totalCapacity = requiredStrapCount * selectedStrapWLL;
  
  // Calculate actual safety margin (total capacity vs base requirement without safety margin)
  // The results.totalRequiredWLL already includes safety margin, so we need to calculate
  // the margin against the base requirement
  const baseRequiredWLL = results.baseRequiredWLL;
  const actualSafetyMargin = ((totalCapacity - baseRequiredWLL) / baseRequiredWLL) * 100;

  return (
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Calculation Results
        </h2>
        <p className="text-gray-600">
          Based on {getRegionDisplayName(cargoInput.region)} standards
        </p>
      </div>

      {/* Main Result Card */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8 mb-8">
        <div className="text-center">
          <div className="text-5xl font-bold text-green-600 mb-4">
            {requiredStrapCount}
          </div>
          <div className="text-xl text-green-800 mb-2">
            {getLoadCapacityTerm(cargoInput.region)} {selectedStrapWLL} {cargoInput.weightUnit} straps required
          </div>
          <div className="text-sm text-green-600">
            {getSecuringMethodText()}
          </div>
        </div>
      </div>

      {/* Input Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Your Input Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Cargo Weight:</span>
              <span className="font-medium">
                {formatWeightLocal(cargoInput.weight, cargoInput.weightUnit)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cargo Length:</span>
              <span className="font-medium">
                {formatDimension(cargoInput.length, cargoInput.dimensionUnit)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Region:</span>
              <span className="font-medium">
                {getRegionDisplayName(cargoInput.region)}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Securing Method:</span>
              <span className="font-medium capitalize">{securingMethod}</span>
            </div>
            {securingMethod === "indirect" && cargoInput.region !== "north_america" && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tie-Down Angle:</span>
                <span className="font-medium">{angle}°</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Selected Strap Rating:</span>
              <span className="font-medium">
                {selectedStrapWLL} {cargoInput.weightUnit} {getLoadCapacityTerm(cargoInput.region)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculation Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Calculation Details
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Required {getLoadCapacityTerm(cargoInput.region)}:</span>
            <span className="font-medium">
              {formatWeightLocal(results.totalRequiredWLL, cargoInput.weightUnit)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Selected Strap Capacity:</span>
            <span className="font-medium">
              {formatWeightLocal(selectedStrapWLL, cargoInput.weightUnit)} {getLoadCapacityTerm(cargoInput.region)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Capacity:</span>
            <span className="font-medium text-green-600">
              {formatWeightLocal(totalCapacity, cargoInput.weightUnit)}
            </span>
          </div>
                     <div className="flex justify-between">
             <span className="text-gray-600">Safety Margin:</span>
             <span className="font-medium text-green-600">
               +{actualSafetyMargin.toFixed(1)}%
             </span>
           </div>
        </div>
      </div>

      {/* Regional Standards Info */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {getRegionDisplayName(cargoInput.region)} Standards Applied
        </h3>
        {cargoInput.region === "north_america" ? (
          <div className="text-sm text-gray-700">
            <div className="font-semibold mb-2">DOT Requirements:</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Aggregate WLL ≥ 50% of cargo weight</li>
              <li>Direct tie-down contributes 50% of its WLL; indirect contributes 100%</li>
              <li>Minimum tie-downs: 2 for first 10 ft, then +1 per additional 10 ft</li>
            </ul>
          </div>
        ) : (
          <div className="text-sm text-gray-700">
            <div className="font-semibold mb-2">AS/NZS 4380 / EN12195-1 Requirements:</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Method × Angle efficiency model applied</li>
              <li>Minimum tie-downs: ≥3.0m → ≥2; ≥6.0m → ≥3; beyond 6.0m +1 per 3.0m</li>
            </ul>
          </div>
        )}
      </div>

      {/* Safety Guidelines */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4">
          ⚠️ Safety Guidelines
        </h3>
        <div className="space-y-3 text-sm text-yellow-800">
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span>
              <strong>Minimum Tie-Down Count:</strong> Ensure you meet the minimum number of tie-downs based on cargo length
            </span>
          </div>
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span>
              <strong>Weight Distribution:</strong> Distribute tie-downs evenly along the cargo length
            </span>
          </div>
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span>
              <strong>Pre-Trip Inspection:</strong> Check all tie-downs for wear, damage, and proper tension
            </span>
          </div>
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span>
              <strong>Regular Checks:</strong> Inspect tie-downs during long trips and adjust tension as needed
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={onRecalculate}
          className="px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Calculate New Cargo
        </button>
      </div>

      {/* Disclaimer */}
      <div className="text-center">
        <button
          onClick={() => setShowDisclaimer(!showDisclaimer)}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          {showDisclaimer ? "Hide" : "Show"} Legal Disclaimer
        </button>

        {showDisclaimer && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
            <p className="mb-2">
              <strong>Disclaimer:</strong> This calculator provides estimates
              based on standard industry practices and regional regulations. Actual
              requirements may vary based on specific cargo characteristics,
              transportation conditions, and local regulations. Always consult
              with qualified professionals and ensure compliance with applicable
              laws and regulations.
            </p>
            <p>
              XiangleTools is not responsible for any damages or losses
              resulting from the use of this calculator. Users are responsible
              for verifying calculations and ensuring proper cargo securing
              practices.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
