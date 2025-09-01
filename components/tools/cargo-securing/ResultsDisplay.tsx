"use client"

import { useState } from "react"
import type { CargoInput, SecuringMethod, CalculationResult } from "@/utils/cargoSecuringCalculation"
import { formatWeight, formatDimension } from "@/utils/formatUtils"

interface ResultsDisplayProps {
  results: CalculationResult
  cargoInput: CargoInput
  securingMethod: SecuringMethod
  angle: number
  onReset: () => void
  onRecalculate: () => void
}

export function ResultsDisplay({ 
  results, 
  cargoInput, 
  securingMethod, 
  angle, 
  onReset, 
  onRecalculate 
}: ResultsDisplayProps) {
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  const formatWeightLocal = (weight: number, unit: string) => {
    return formatWeight(weight, unit)
  }

  const getSecuringMethodText = () => {
    return securingMethod === "indirect" 
      ? `Indirect Tie-Down (${angle}° angle)`
      : "Direct Tie-Down"
  }

  const getEfficiencyText = () => {
    if (securingMethod === "direct") return "100% (no angle loss)"
    
    const efficiency = results.angleEfficiencyFactor * 100
    return `${efficiency.toFixed(0)}% (${angle}° angle)`
  }

  return (
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 4: Calculation Results</h2>
        <p className="text-gray-600">
          Your cargo securing requirements have been calculated based on professional standards
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {formatWeightLocal(results.totalRequiredWLL, cargoInput.weightUnit)}
          </div>
          <div className="text-lg text-blue-800">Total Required WLL</div>
          <div className="text-sm text-blue-600 mt-1">
            {getSecuringMethodText()} • {getEfficiencyText()}
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Input Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Input Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Cargo Weight:</span>
              <span className="font-medium">{formatWeightLocal(cargoInput.weight, cargoInput.weightUnit)}</span>
            </div>
            {cargoInput.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Dimensions:</span>
                <span className="font-medium">
                  {formatDimension(cargoInput.length, cargoInput.dimensionUnit)} × {formatDimension(cargoInput.width, cargoInput.dimensionUnit)} × {formatDimension(cargoInput.height, cargoInput.dimensionUnit)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Securing Method:</span>
              <span className="font-medium capitalize">{securingMethod}</span>
            </div>
            {securingMethod === "indirect" && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tie-Down Angle:</span>
                <span className="font-medium">{angle}°</span>
              </div>
            )}
          </div>
        </div>

        {/* Calculation Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculation Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Base WLL:</span>
              <span className="font-medium">
                {formatWeightLocal(results.baseRequiredWLL, cargoInput.weightUnit)}
              </span>
            </div>
            {securingMethod === "indirect" && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Method Factor:</span>
                  <span className="font-medium">× 0.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Angle Factor:</span>
                  <span className="font-medium">× {results.angleEfficiencyFactor.toFixed(3)}</span>
                </div>
              </>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Final WLL:</span>
              <span className="font-medium text-blue-600">
                {formatWeightLocal(results.totalRequiredWLL, cargoInput.weightUnit)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* XiangleTools Recommendations */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-green-900 mb-4 text-center">
          🎯 XiangleTools Recommended Solutions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.recommendations.map((rec, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-green-300">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  Option {index + 1}
                </div>
                <div className="text-lg text-gray-900 mb-2">
                  {rec.strapCount} × {formatWeightLocal(rec.strapWLL, cargoInput.weightUnit)} straps
                </div>
                <div className="text-sm text-gray-600">
                  Total capacity: {formatWeightLocal(rec.totalCapacity, cargoInput.weightUnit)}
                </div>
                <div className="text-xs text-green-600 mt-1">
                  {rec.safetyMargin > 0 ? `+${rec.safetyMargin.toFixed(1)}% safety margin` : 'Exact match'}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <button className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
            View Recommended Products
          </button>
        </div>
      </div>

      {/* Safety Guidelines */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4">⚠️ Safety Guidelines</h3>
        <div className="space-y-3 text-sm text-yellow-800">
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span>
              <strong>DOT Compliance:</strong> Cargo over {cargoInput.dimensionUnit === 'ft' ? '10 feet' : '3.05 meters'} requires at least 2 tie-downs, 
              over {cargoInput.dimensionUnit === 'ft' ? '20 feet' : '6.1 meters'} requires at least 3 tie-downs
            </span>
          </div>
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span>
              <strong>Weight Distribution:</strong> Ensure tie-downs are evenly distributed along the cargo length
            </span>
          </div>
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span>
              <strong>Pre-Trip Inspection:</strong> Check all tie-downs for wear, damage, and proper tension before departure
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
              <strong>Disclaimer:</strong> This calculator provides estimates based on standard industry practices 
              and DOT regulations. Actual requirements may vary based on specific cargo characteristics, 
              transportation conditions, and local regulations. Always consult with qualified professionals 
              and ensure compliance with applicable laws and regulations.
            </p>
            <p>
              XiangleTools is not responsible for any damages or losses resulting from the use of this calculator. 
              Users are responsible for verifying calculations and ensuring proper cargo securing practices.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
