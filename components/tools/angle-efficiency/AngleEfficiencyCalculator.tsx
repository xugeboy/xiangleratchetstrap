"use client";

import { useState, useEffect } from "react";
import {
  calculateEffectiveWLL,
  calculateLossPercentage,
} from "@/utils/angleEfficiencyCalculation";

export default function AngleEfficiencyCalculator() {
  const [nominalWLL, setNominalWLL] = useState<number>(2200);
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("lbs");
  const [angle, setAngle] = useState<number>(90);

  const [effectiveWLL, setEffectiveWLL] = useState<number>(2200);
  const [lossPercentage, setLossPercentage] = useState<number>(0);

  // Calculate results whenever inputs change
  useEffect(() => {
    const effective = calculateEffectiveWLL(nominalWLL, angle);
    const loss = calculateLossPercentage(angle);

    setEffectiveWLL(effective);
    setLossPercentage(loss);
  }, [nominalWLL, angle]);

  const handleWLLChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setNominalWLL(numValue);
  };

  const handleAngleChange = (value: number) => {
    setAngle(value);
  };

  const getLossColor = (loss: number) => {
    if (loss < 10) return "text-green-600";
    if (loss < 30) return "text-yellow-600";
    if (loss < 50) return "text-orange-600";
    return "text-red-600";
  };

  const getLossSeverity = (loss: number) => {
    if (loss < 10) return "Minimal";
    if (loss < 30) return "Moderate";
    if (loss < 50) return "Significant";
    return "Critical";
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* WLL Input */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Nominal WLL</h3>
            <div className="flex space-x-3">
              <input
                type="number"
                min="0"
                step="1"
                value={nominalWLL || ""}
                onChange={(e) => handleWLLChange(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-lg font-medium focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter WLL"
              />
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value as "kg" | "lbs")}
                className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-lg font-medium focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
              </select>
            </div>
            <p className="text-sm text-gray-600">
              Enter the Working Load Limit printed on your strap
            </p>
          </div>

          {/* Angle Input */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Tie-Down Angle
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {angle}°
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="1"
                value={angle}
                onChange={(e) => handleAngleChange(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0°</span>
                <span>30°</span>
                <span>60°</span>
                <span>90°</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Drag to adjust the angle
            </p>
          </div>
        </div>

        {/* Visual Angle Representation */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Angle Visualization
          </h3>
          <div className="flex justify-center items-center h-32 mb-4">
            <div className="relative">
              {/* Vehicle surface */}
              <div className="w-32 h-1 bg-gray-300"></div>
              {/* Tie-down strap */}
              <div
                className="absolute top-0 left-0 w-32 h-1 bg-blue-500 origin-left transition-transform duration-300"
                style={{
                  transform: `rotate(${angle - 90}deg)`,
                  transformOrigin: "left center",
                }}
              ></div>
              {/* Connection points */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-600">
            <p>Vehicle surface ← → Cargo surface</p>
            <p>Blue line shows tie-down angle</p>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Main Result */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium text-blue-800 mb-2">
              Effective Working Load Limit
            </h3>
            <div className="text-5xl font-bold text-blue-600 mb-2">
              {effectiveWLL.toFixed(0)} {weightUnit}
            </div>
            <p className="text-blue-700">
              Your strap's actual capacity at {angle}° angle
            </p>
          </div>

          {/* Loss Warning */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <span
                className={`text-xl font-bold ${getLossColor(lossPercentage)}`}
              >
                {getLossSeverity(lossPercentage)} Loss:{" "}
                {lossPercentage.toFixed(1)}%
              </span>
            </div>
            <p className="text-red-700 text-center">
              You're losing <strong>{lossPercentage.toFixed(1)}%</strong> of
              your strap's capacity due to the {angle}° angle!
            </p>
          </div>

          {/* Comparison Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Capacity Comparison
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Nominal WLL:</span>
                <span className="text-gray-900 font-bold">
                  {nominalWLL.toFixed(0)} {weightUnit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                  style={{ width: "100%" }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">
                  Effective WLL:
                </span>
                <span className="text-gray-900 font-bold">
                  {effectiveWLL.toFixed(0)} {weightUnit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${(effectiveWLL / nominalWLL) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Safety Guidelines */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">
              Safety Guidelines
            </h3>
            <div className="space-y-2 text-sm text-yellow-800">
              <div className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong>90° angle:</strong> Maximum efficiency (100% of strap
                  capacity)
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong>60° angle:</strong> Good efficiency (86% of strap
                  capacity)
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong>45° angle:</strong> Moderate efficiency (70% of strap
                  capacity)
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong>30° angle:</strong> Poor efficiency (50% of strap
                  capacity)
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong>Below 30°:</strong> Dangerous - consider repositioning
                  your tie-downs
                </span>
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="text-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Share This Tool
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Help others understand the importance of proper tie-down angles
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
