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
  getRegionFactors,
  getLoadCapacityTerm,
} from "@/utils/cargoSecuringCalculation";

interface ResultsDisplayProps {
  results: CalculationResult;
  cargoInput: CargoInput;
  securingMethod: SecuringMethod;
  angle: number;
  onReset: () => void;
  onRecalculate: () => void;
}

export function ResultsDisplay({
  results,
  cargoInput,
  securingMethod,
  angle,
  onReset,
  onRecalculate,
}: ResultsDisplayProps) {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const formatWeightLocal = (weight: number, unit: string) => {
    return formatWeight(weight, unit);
  };

  const getSecuringMethodText = () => {
    if (securingMethod === "direct") return "Direct Tie-Down";
    // Hide angle mention for North America
    return cargoInput.region === "north_america"
      ? "Indirect Tie-Down"
      : `Indirect Tie-Down (${angle}° angle)`;
  };

  const getEfficiencyText = () => {
    if (securingMethod === "direct") return "100%";
    // Do not show angle efficiency for North America
    if (cargoInput.region === "north_america") return "";
    const efficiency = results.angleEfficiencyFactor * 100;
    return `${efficiency.toFixed(0)}%`;
  };

  return (
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Step 4: Calculation Results
        </h2>
        <p className="text-gray-600">
          Your cargo securing requirements have been calculated based on{" "}
          {getRegionDisplayName(cargoInput.region)} standards
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {formatWeightLocal(results.totalRequiredWLL, cargoInput.weightUnit)}
          </div>
          <div className="text-lg text-blue-800">
            Total Required {getLoadCapacityTerm(cargoInput.region)}
          </div>
          <div className="text-sm text-blue-600 mt-1">
            {getSecuringMethodText()}
            {getEfficiencyText() && ` • ${getEfficiencyText()}`}
          </div>
        </div>
      </div>

      {/* Regional rule explanation */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
        {cargoInput.region === "north_america" ? (
          <div className="text-sm text-gray-700">
            <div className="font-semibold mb-1">DOT essentials</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Aggregate WLL ≥ 50% of cargo weight (plus regional safety margin)</li>
              <li>Direct tie-down contributes 50% of its WLL; indirect (across vehicle) contributes 100%</li>
              <li>Minimum tie-downs: 2 for first 10 ft, then +1 per additional 10 ft (or fraction)</li>
            </ul>
            <div className="mt-2 text-xs text-gray-600">Example: 22 ft cargo → 2 + ceil((22 − 10) / 10) = 4 tie-downs</div>
          </div>
        ) : (
          <div className="text-sm text-gray-700">
            <div className="font-semibold mb-1">AS/NZS 4380 / EN12195-2 essentials</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Method × Angle efficiency model (e.g., indirect 0.8 AU / 0.7 EU; 60° ≈ 0.87)</li>
              <li>Minimum tie-downs: ≥3.0 m → ≥2; ≥6.0 m → ≥3; beyond 6.0 m +1 per 3.0 m (or fraction)</li>
            </ul>
            <div className="mt-2 text-xs text-gray-600">Example: 9.2 m cargo → 3 + ceil((9.2 − 6.0)/3.0) = 4 tie-downs</div>
          </div>
        )}
      </div>

      {/* Detailed Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Input Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Input Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Cargo Weight:</span>
              <span className="font-medium">
                {formatWeightLocal(cargoInput.weight, cargoInput.weightUnit)}
              </span>
            </div>
            {cargoInput.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Length:</span>
                <span className="font-medium">
                  {formatDimension(cargoInput.length, cargoInput.dimensionUnit)}
                </span>
              </div>
            )}
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
          </div>
        </div>

        {/* Calculation Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Calculation Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">
                Base {getLoadCapacityTerm(cargoInput.region)}:
              </span>
              <span className="font-medium">
                {formatWeightLocal(
                  results.baseRequiredWLL,
                  cargoInput.weightUnit
                )}
              </span>
            </div>
            {securingMethod === "indirect" && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Method Factor:</span>
                  <span className="font-medium">
                    ×{" "}
                    {(() => {
                      const factors = getRegionFactors(cargoInput.region);
                      return `${(factors.indirectFactor * 100).toFixed(0)}%`;
                    })()}
                  </span>
                </div>
                {cargoInput.region !== "north_america" && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Angle Factor:</span>
                    <span className="font-medium">
                      {`× ${(results.angleEfficiencyFactor * 100).toFixed(0)}%`}
                    </span>
                  </div>
                )}
              </>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">
                Final {getLoadCapacityTerm(cargoInput.region)}:
              </span>
              <span className="font-medium text-blue-600">
                {formatWeightLocal(
                  results.totalRequiredWLL,
                  cargoInput.weightUnit
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* XiangleTools Recommendations */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-green-900 mb-4 text-center">
          🎯 XiangleTools Recommended Solutions - {getRegionDisplayName(cargoInput.region)} Standards
        </h3>
        <p className="text-center text-sm text-green-700 mb-4">
          Based on {getLoadCapacityTerm(cargoInput.region)} standards: {
            cargoInput.region === "north_america" 
              ? "WLL ratings in lbs (166, 256, 367, 400, 585, 1100, 1467, 2200, 3333, 5400)"
              : "LC ratings in kg (125, 175, 250, 275, 400, 750, 1000, 1500, 2500, 5000)"
          }
        </p>

        {results.recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.recommendations.map((rec, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-4 border transition-all ${
                  rec.isExactMatch
                    ? "border-yellow-400 bg-yellow-50"
                    : rec.isRecommended
                    ? "border-green-400 bg-green-50"
                    : "border-green-300"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`text-2xl font-bold mb-2 ${
                      rec.isExactMatch ? "text-yellow-700" : "text-green-600"
                    }`}
                  >
                    Option {index + 1}
                    {rec.isRecommended && !rec.isExactMatch && (
                      <span className="text-sm text-green-600 ml-2">
                        (recommend)
                      </span>
                    )}
                  </div>
                  <div className="text-lg text-gray-900 mb-2">
                    {rec.strapCount} ×{" "}
                    {formatWeightLocal(rec.strapWLL, rec.strapUnit)}{" "}
                    {getLoadCapacityTerm(cargoInput.region)} straps
                  </div>
                  <div className="text-sm text-gray-600">
                    Total capacity:{" "}
                    {formatWeightLocal(rec.totalCapacity, rec.strapUnit)}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      rec.isExactMatch ? "text-yellow-700" : "text-green-600"
                    }`}
                  >
                    {rec.safetyMargin > 0
                      ? `+${rec.safetyMargin.toFixed(1)}% safety margin`
                      : "Exact match"}
                  </div>
                  {rec.recommendationReason && (
                    <div className="text-xs text-gray-600 mt-2 italic">
                      {rec.recommendationReason}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 text-center">
            <div className="text-yellow-800">
              <div className="text-lg font-semibold mb-2">
                ⚠️ No Safe Configurations Found
              </div>
              <div className="text-sm">
                The calculated required {getLoadCapacityTerm(cargoInput.region)} of{" "}
                <strong>{formatWeightLocal(results.totalRequiredWLL, cargoInput.weightUnit)}</strong>{" "}
                cannot be safely achieved with standard {getLoadCapacityTerm(cargoInput.region)} values 
                while meeting {getRegionDisplayName(cargoInput.region)} minimum safety requirements.
              </div>
              <div className="text-sm mt-2">
                <strong>Recommendations:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Use higher capacity straps than standard values</li>
                  <li>• Increase the number of tie-down straps</li>
                  <li>• Consider custom or specialized securing solutions</li>
                  <li>• Consult with cargo securing professionals</li>
                </ul>
              </div>
            </div>
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
              <strong>
                {getRegionDisplayName(cargoInput.region)} Compliance:
              </strong>{" "}
              Cargo over{" "}
              {cargoInput.dimensionUnit === "ft" ? "10 feet" : "3.0 meters"}{" "}
              requires at least 2 tie-downs, over{" "}
              {cargoInput.dimensionUnit === "ft" ? "20 feet" : "6.0 meters"}{" "}
              requires at least 3 tie-downs
            </span>
          </div>
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span>
              <strong>Weight Distribution:</strong> Ensure tie-downs are evenly
              distributed along the cargo length
            </span>
          </div>
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span>
              <strong>Industry Safety Standards:</strong>{" "}
              {(() => {
                const factors = getRegionFactors(cargoInput.region);
                return `At least ${
                  factors.safetyMargin
                }% extra capacity required by ${getRegionDisplayName(
                  cargoInput.region
                )} standards for braking impact and road vibration. 
                 High-value/high-center-of-gravity cargo should have 30-50% extra margin. 
                 Some major clients require 50% margin (1.5× cargo weight).`;
              })()}
            </span>
          </div>
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span>
              <strong>Pre-Trip Inspection:</strong> Check all tie-downs for
              wear, damage, and proper tension before departure
            </span>
          </div>
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span>
              <strong>Regular Checks:</strong> Inspect tie-downs during long
              trips and adjust tension as needed
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <button
          onClick={onRecalculate}
          className="px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Calculate New Cargo
        </button>
        <button
          onClick={onReset}
          className="px-8 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Start Over
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
              based on standard industry practices and DOT regulations. Actual
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
