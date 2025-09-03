"use client";

import type { LashingMethod } from "@/hooks/useEN12195Calculation";
import type { CalculationResult } from "@/hooks/useEN12195Calculation";

interface ResultsDisplayProps {
  result: CalculationResult | null;
  isLoading: boolean;
  lashingMethod: LashingMethod;
}

export function ResultsDisplay({ result, isLoading, lashingMethod }: ResultsDisplayProps) {
  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Calculate</h3>
          <p className="text-gray-600">
            Please fill in all required fields above to see the calculation results.
          </p>
        </div>
      </div>
    );
  }

  const formatValue = (value: number, decimals: number = 2) => {
    return typeof value === 'number' ? value.toFixed(decimals) : value;
  };

  const getEfficiencyWarning = () => {
    if (lashingMethod === 'indirect' && result.values['sin(α)'] < 0.1) {
      return {
        type: 'warning',
        message: 'Low angle efficiency detected. Consider using a steeper angle for better securing.'
      };
    }
    if (lashingMethod === 'direct' && (result.values['cos(α)'] < 0.1 || result.values['cos(β)'] < 0.1)) {
      return {
        type: 'warning',
        message: 'Low angle efficiency detected. Consider adjusting angles for better securing.'
      };
    }
    return null;
  };

  const efficiencyWarning = getEfficiencyWarning();

  return (
    <div className="space-y-6">
      {/* Main Result */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8">
        <div className="text-center">
          <div className="text-5xl font-bold text-green-600 mb-4">
            {result.numberOfStraps}
          </div>
          <div className="text-xl text-green-800 mb-2">
            Lashing Straps Required
          </div>
          <div className="text-sm text-green-600">
            {result.calculationMethod}
          </div>
          {result.isMinimumApplied && (
            <div className="mt-2 text-sm text-amber-600">
              ⚠️ Minimum of 2 straps applied as per EN 12195-1 standard
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {result.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Calculation Warning</h3>
              <div className="mt-1 text-sm text-red-700">
                <p>{result.error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Efficiency Warning */}
      {efficiencyWarning && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Efficiency Warning</h3>
              <div className="mt-1 text-sm text-yellow-700">
                <p>{efficiencyWarning.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tipping Check Results */}
      {result.requiresTippingCheck && result.tippingResult && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Tipping Check Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {result.tippingResult}
              </div>
              <div className="text-sm text-blue-800">
                Straps required for tipping prevention
              </div>
            </div>
            <div className="text-sm text-blue-700">
              <p><strong>Safety Factor:</strong> {result.safetyFactor?.toFixed(2)}</p>
              <p><strong>Formula:</strong> {result.tippingFormula}</p>
            </div>
          </div>
        </div>
      )}

      {/* Calculation Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Calculation Details
        </h3>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Formula Used:</h4>
          <code className="block bg-gray-100 p-3 rounded text-sm font-mono">
            {result.formula}
          </code>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Input Values:</h4>
            <div className="space-y-2">
              {Object.entries(result.values)
                .filter(([key]) => !key.includes('_') && !key.includes('error_code'))
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600">{key}:</span>
                    <span className="font-medium">{formatValue(value as number)}</span>
                  </div>
                ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Calculation Steps:</h4>
            <div className="space-y-2 text-sm">
              {result.values.numerator && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Numerator:</span>
                  <span className="font-medium">{formatValue(result.values.numerator)}</span>
                </div>
              )}
              {result.values.denominator && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Denominator:</span>
                  <span className="font-medium">{formatValue(result.values.denominator)}</span>
                </div>
              )}
              {result.values.raw_result && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Raw Result:</span>
                  <span className="font-medium">{formatValue(result.values.raw_result)}</span>
                </div>
              )}
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600">Final Result:</span>
                <span className="font-bold text-green-600">{result.numberOfStraps} straps</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Guidelines */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4">
          ⚠️ Safety Guidelines
        </h3>
        <div className="space-y-3 text-sm text-yellow-800">
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span>
              <strong>Minimum Requirements:</strong> Always use at least 2 lashing straps as per EN 12195-1 standard
            </span>
          </div>
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span>
              <strong>Angle Efficiency:</strong> Steeper angles provide better securing efficiency
            </span>
          </div>
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span>
              <strong>Pre-trip Inspection:</strong> Check all straps for wear, damage, and proper tension
            </span>
          </div>
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span>
              <strong>Professional Verification:</strong> Always verify calculations with qualified personnel
            </span>
          </div>
        </div>
      </div>

      {/* Method-specific Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          {lashingMethod === 'indirect' ? 'Indirect Lashing Information' : 'Direct Lashing Information'}
        </h3>
        <div className="text-sm text-blue-800 space-y-2">
          {lashingMethod === 'indirect' ? (
            <>
              <p>
                <strong>Indirect Lashing:</strong> Uses friction between cargo and vehicle bed to prevent sliding. 
                The STF (Standard Tension Force) and vertical angle determine the securing effectiveness.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Friction coefficient affects the required number of straps</li>
                <li>Vertical angle efficiency: steeper angles provide better securing</li>
                <li>Unstable cargo may require additional straps for tipping prevention</li>
                <li>Suitable for most cargo types without dedicated attachment points</li>
              </ul>
            </>
          ) : (
            <>
              <p>
                <strong>Direct Lashing:</strong> Direct connection between cargo attachment points and vehicle. 
                Uses LC (Lashing Capacity) rating and considers both vertical and horizontal angles.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>LC rating determines the maximum load capacity per strap</li>
                <li>Both vertical and horizontal angles affect securing efficiency</li>
                <li>Provides maximum securing efficiency when properly applied</li>
                <li>Requires cargo with suitable attachment points</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
