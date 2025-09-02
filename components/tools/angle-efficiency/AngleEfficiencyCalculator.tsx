"use client";

import { useState, useEffect } from "react";
import {
  calculateEffectiveWLL,
  calculateLossPercentage,
  getWeightUnitForRegion,
  getRegionDisplayName,
  getLoadCapacityTerm,
  type Region,
  type WeightUnit,
} from "@/utils/angleEfficiencyCalculation";

export default function AngleEfficiencyCalculator() {
  const [region, setRegion] = useState<Region>("north_america");
  const [nominalWLL, setNominalWLL] = useState<number>(2200);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("lbs");
  const [angle, setAngle] = useState<number>(45);
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);

  const [effectiveWLL, setEffectiveWLL] = useState<number>(2200);
  const [lossPercentage, setLossPercentage] = useState<number>(0);

  // Tick marks rendered proportionally under the slider
  const TICK_MIN = 15;
  const TICK_MAX = 90;
  const TICK_MARKS = [15, 30, 60, 90];
  const toPercent = (v: number) => ((v - TICK_MIN) / (TICK_MAX - TICK_MIN)) * 100;

  // Auto-update weight unit when region changes
  useEffect(() => {
    const newUnit = getWeightUnitForRegion(region);
    setWeightUnit(newUnit);
  }, [region]);

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

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const copyToClipboard = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const shareOnSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      "Check out this Angle Efficiency Calculator for tie-down straps!"
    );

    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
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
        {/* Main Layout - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column: Inputs and Results */}
          <div className="space-y-6">
            {/* Input Row - Region and WLL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Region Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Region & Standards *
                </h3>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as Region)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg font-medium focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="north_america">North America (DOT)</option>
                  <option value="australia">Australia (AS/NZS 4380)</option>
                  <option value="europe">Europe (EN12195-2)</option>
                </select>
                <p className="text-sm text-gray-600">
                  Select your region for automatic unit selection and
                  calculation standards
                </p>
              </div>

              {/* WLL Input */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Nominal {getLoadCapacityTerm(region)} *
                </h3>
                <div className="flex space-x-3">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={nominalWLL || ""}
                    onChange={(e) => handleWLLChange(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-lg font-medium focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder={`Enter ${getLoadCapacityTerm(region)}`}
                  />
                  <div className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-lg font-medium text-gray-700 min-w-[80px] flex items-center justify-center">
                    {weightUnit}
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Enter the {getLoadCapacityTerm(region)} printed on your strap
                </p>
              </div>
            </div>

            {/* Main Result */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Effective {getLoadCapacityTerm(region)}{" "}
                {effectiveWLL.toFixed(0)} {weightUnit}
              </h3>
              <p className="text-blue-700 text-sm">
                Your strap&apos;s actual capacity at {angle}° angle based on{" "}
                {getRegionDisplayName(region)} standards
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
                  className={`text-xl font-bold ${getLossColor(
                    lossPercentage
                  )}`}
                >
                  {getLossSeverity(lossPercentage)} Loss:{" "}
                  {lossPercentage.toFixed(1)}%
                </span>
              </div>
              <p className="text-red-700 text-center text-sm">
                You&apos;re losing <strong>{lossPercentage.toFixed(1)}%</strong>{" "}
                of your strap&apos;s capacity due to the {angle}° angle!
              </p>
            </div>
          </div>

          {/* Right Column: Angle Input and Visualization */}
          <div className="space-y-6">
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
                  min="15"
                  max="90"
                  step="1"
                  value={angle}
                  onChange={(e) => handleAngleChange(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="relative h-5 mt-2 text-xs text-gray-500">
                  {TICK_MARKS.map((mark) => (
                    <span
                      key={mark}
                      className="absolute -translate-x-1/2"
                      style={{ left: `${toPercent(mark)}%` }}
                    >
                      {mark}°
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Drag to adjust the angle
              </p>
            </div>

            {/* Visual Angle Representation */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Angle Visualization
              </h3>
              <div className="flex justify-center items-end h-32 mb-4">
                <div className="relative">
                  {/* Vehicle surface */}
                  <div className="w-32 h-1 bg-gray-300"></div>
                  {/* Tie-down strap */}
                  <div
                    className="absolute top-0 left-0 w-32 h-1 bg-blue-500 origin-left transition-transform duration-300"
                    style={{
                      transform: `rotate(${-angle}deg)`,
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
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Comparison Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Capacity Comparison
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">
                  Nominal {getLoadCapacityTerm(region)}:
                </span>
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
                  Effective {getLoadCapacityTerm(region)}:
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
              EN 12195-1 Recommended Angle Guidelines
            </h3>
            <div className="space-y-2 text-sm text-yellow-800">
              <div className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong>30°–60° range:</strong> Optimal balance of friction
                  and restraining force (EN 12195-1)
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong>45° angle:</strong> Ideal middle ground (70.7%
                  efficiency)
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong>Below 30°:</strong> Insufficient friction - straps
                  mainly &quot;pull&quot; rather than &quot;press down&quot;
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong>Above 60°:</strong> Insufficient horizontal force -
                  can&apos;t prevent sliding
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong>15° minimum:</strong> Emergency situations only -
                  requires 4x strap capacity
                </span>
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="text-center">
            <button
              onClick={handleShare}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Share This Tool
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Help others understand the importance of proper tie-down angles
            </p>

            {/* Share Options */}
            {showShareOptions && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Share Options:
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition-colors"
                  >
                    📋 Copy Link
                  </button>
                  <button
                    onClick={() => shareOnSocial("twitter")}
                    className="px-3 py-2 bg-blue-400 text-white rounded-md text-sm hover:bg-blue-500 transition-colors"
                  >
                    🐦 Twitter
                  </button>
                  <button
                    onClick={() => shareOnSocial("linkedin")}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                  >
                    💼 LinkedIn
                  </button>
                  <button
                    onClick={() => shareOnSocial("facebook")}
                    className="px-3 py-2 bg-blue-800 text-white rounded-md text-sm hover:bg-blue-900 transition-colors"
                  >
                    📘 Facebook
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
