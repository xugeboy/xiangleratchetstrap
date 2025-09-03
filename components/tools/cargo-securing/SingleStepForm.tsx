"use client";

import { useState, useEffect } from "react";
import type {
  CargoInput,
  Region,
  CalculationResult,
} from "@/utils/cargoSecuringCalculation";
import { useRegion } from "@/contexts/RegionContext";
import {
  getWeightUnitForRegion,
  getDimensionUnitForRegion,
  getRegionDisplayName,
  calculateRequiredWLL,
} from "@/utils/cargoSecuringCalculation";
import { formatWeight, formatDimension } from "@/utils/formatUtils";


// No props needed for real-time calculation

const STANDARD_WLL_VALUES = [
  166, 256, 367, 400, 585, 1100, 1467, 2200, 3333, 5400,
];
const STANDARD_LC_VALUES = [
  125, 175, 250, 275, 400, 750, 1000, 1500, 2500, 5000,
];

export function SingleStepForm() {
  const { selectedRegion, securingMethod } = useRegion();
  
  const [cargoInput, setCargoInput] = useState<CargoInput>({
    region: selectedRegion,
    weight: 0,
    weightUnit: "lbs",
    length: 0,
    dimensionUnit: "ft",
  });
  const [angle, setAngle] = useState<number>(90);
  const [selectedStrapWLL, setSelectedStrapWLL] = useState<number>(166);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);

  // Update units when region changes
  useEffect(() => {
    const newWeightUnit = getWeightUnitForRegion(selectedRegion);
    const newDimensionUnit = getDimensionUnitForRegion(selectedRegion);

    setCargoInput((prev) => ({
      ...prev,
      region: selectedRegion,
      weightUnit: newWeightUnit,
      dimensionUnit: newDimensionUnit,
    }));
  }, [selectedRegion]);

  // Update selected strap WLL when region changes
  useEffect(() => {
    const standardValues =
      selectedRegion === "north_america"
        ? STANDARD_WLL_VALUES
        : STANDARD_LC_VALUES;
    if (!standardValues.includes(selectedStrapWLL)) {
      setSelectedStrapWLL(standardValues[0]);
    }
  }, [selectedRegion, selectedStrapWLL]);

  // Real-time calculation when inputs change
  useEffect(() => {
    if (cargoInput.weight > 0) {
      try {
        const result = calculateRequiredWLL(cargoInput, securingMethod, angle);
        setCalculationResult(result);
      } catch (error) {
        console.error("Calculation error:", error);
        setCalculationResult(null);
      }
    } else {
      setCalculationResult(null);
    }
  }, [cargoInput, securingMethod, angle]);

  // Calculate required straps based on current inputs
  const calculateRequiredStraps = () => {
    if (!calculationResult) return 0;

    // Calculate minimum straps based on cargo length
    const getMinimumTieDownCount = (
      length: number,
      unit: string,
      region: string
    ) => {
      const lengthInMeters = unit === "ft" ? length * 0.3048 : length;

      if (region === "north_america") {
        // DOT rule: 2 tie-downs for first 10 ft, then +1 per additional 10 ft (or fraction)
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
    };

    // Calculate straps needed based on WLL requirement
    const strapsForWLL = Math.ceil(
      calculationResult.totalRequiredWLL / selectedStrapWLL
    );

    // Calculate minimum straps based on cargo length
    const minStrapsForLength = getMinimumTieDownCount(
      cargoInput.length,
      cargoInput.dimensionUnit,
      cargoInput.region
    );

    // Return the higher of the two requirements, with absolute minimum of 2
    return Math.max(2, Math.max(strapsForWLL, minStrapsForLength));
  };

  const updateCargoInput = (
    field: keyof CargoInput,
    newValue: string | number
  ) => {
    setCargoInput((prev) => ({ ...prev, [field]: newValue }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const getStandardValues = () => {
    return cargoInput.region === "north_america"
      ? STANDARD_WLL_VALUES
      : STANDARD_LC_VALUES;
  };

  const getLoadCapacityTerm = (region: Region) => {
    return region === "north_america" ? "WLL" : "LC";
  };



  return (
    <div className="mx-auto">
      <form className="space-y-8">


                {/* Basic Cargo Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Cargo Information
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cargo Weight *
              </label>
              <div className="flex">
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={cargoInput.weight || ""}
                  onChange={(e) =>
                    updateCargoInput("weight", parseFloat(e.target.value) || 0)
                  }
                  className={`flex-1 rounded-l-md border px-3 py-2 text-sm ${
                    errors.weight ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  placeholder="Enter weight"
                />
                <div className="rounded-r-md border-l-0 border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600 flex items-center">
                  {cargoInput.weightUnit}
                </div>
              </div>
              {errors.weight && (
                <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cargo Length (for minimum tie-down count)
              </label>
              <div className="flex">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={cargoInput.length || ""}
                  onChange={(e) =>
                    updateCargoInput("length", parseFloat(e.target.value) || 0)
                  }
                  className={`flex-1 rounded-l-md border px-3 py-2 text-sm ${
                    errors.length ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  placeholder="0.00"
                />
                <div className="rounded-r-md border-l-0 border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600 flex items-center">
                  {cargoInput.dimensionUnit}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Angle Selection (only for indirect method and non-North America) */}
        {securingMethod === "indirect" &&
          cargoInput.region !== "north_america" && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tie-Down Angle
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[90, 60, 45, 30].map((angleOption) => (
                  <button
                    key={angleOption}
                    type="button"
                    onClick={() => setAngle(angleOption)}
                    className={`p-3 border-2 rounded-lg text-center transition-all ${
                      angle === angleOption
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-semibold">{angleOption}°</div>
                    <div className="text-xs text-gray-600">
                      {angleOption === 90
                        ? "100%"
                        : angleOption === 60
                        ? "87%"
                        : angleOption === 45
                        ? "71%"
                        : "50%"}{" "}
                      efficiency
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        {/* Strap WLL/LC Selection */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Select Strap {getLoadCapacityTerm(cargoInput.region)} Rating
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {getStandardValues().map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setSelectedStrapWLL(value)}
                className={`p-3 border-2 rounded-lg text-center transition-all ${
                  selectedStrapWLL === value
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-semibold">{value}</div>
                <div className="text-xs text-gray-600">
                  {cargoInput.weightUnit}{" "}
                  {getLoadCapacityTerm(cargoInput.region)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Real-time calculation - no submit button needed */}
      </form>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">How it works</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                The calculator will determine how many straps of your selected{" "}
                {getLoadCapacityTerm(cargoInput.region)} rating are needed to
                safely secure your cargo according to{" "}
                {getRegionDisplayName(cargoInput.region)} standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Results Display */}
      {calculationResult && cargoInput.weight > 0 && (
        <div className="mt-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Calculation Results
            </h3>
          </div>

          {/* Main Result Card */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {calculateRequiredStraps()}
              </div>
              <div className="text-lg text-green-800 mb-1">
                {getLoadCapacityTerm(cargoInput.region)} {selectedStrapWLL}{" "}
                {cargoInput.weightUnit} straps required
              </div>
            </div>
          </div>

          {/* Calculation Details */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Calculation Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cargo Weight:</span>
                  <span className="font-medium">
                    {formatWeight(cargoInput.weight, cargoInput.weightUnit)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cargo Length:</span>
                  <span className="font-medium">
                    {formatDimension(
                      cargoInput.length,
                      cargoInput.dimensionUnit
                    )}
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
                  <span className="text-gray-600">
                    Required {getLoadCapacityTerm(cargoInput.region)}:
                  </span>
                  <span className="font-medium">
                    {formatWeight(
                      calculationResult.totalRequiredWLL,
                      cargoInput.weightUnit
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Selected Strap Capacity:
                  </span>
                  <span className="font-medium">
                    {formatWeight(selectedStrapWLL, cargoInput.weightUnit)}{" "}
                    {getLoadCapacityTerm(cargoInput.region)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Straps for WLL:</span>
                  <span className="font-medium">
                    {Math.ceil(
                      calculationResult.totalRequiredWLL / selectedStrapWLL
                    )}{" "}
                    straps
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Min straps for length:</span>
                  <span className="font-medium">
                    {(() => {
                      const lengthInMeters =
                        cargoInput.dimensionUnit === "ft"
                          ? cargoInput.length * 0.3048
                          : cargoInput.length;
                      if (cargoInput.region === "north_america") {
                        const lengthInFeet =
                          cargoInput.dimensionUnit === "ft"
                            ? cargoInput.length
                            : cargoInput.length * 3.28084;
                        if (lengthInFeet <= 10) return "2 straps";
                        const extra = Math.ceil((lengthInFeet - 10) / 10);
                        return `${2 + extra} straps`;
                      } else {
                        if (lengthInMeters <= 3.0) return "2 straps";
                        if (lengthInMeters <= 6.0) return "3 straps";
                        const extraMetric = Math.ceil(
                          (lengthInMeters - 6.0) / 3.0
                        );
                        return `${3 + extraMetric} straps`;
                      }
                    })()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Capacity:</span>
                  <span className="font-medium text-green-600">
                    {formatWeight(
                      calculateRequiredStraps() * selectedStrapWLL,
                      cargoInput.weightUnit
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Guidelines */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-yellow-900 mb-2">
              ⚠️ Safety Guidelines
            </h4>
            <div className="text-xs text-yellow-800 space-y-1">
              <div>
                • Ensure you meet the minimum number of tie-downs based on cargo
                length
              </div>
              <div>• Distribute tie-downs evenly along the cargo length</div>
              <div>
                • Check all tie-downs for wear, damage, and proper tension
                before departure
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
