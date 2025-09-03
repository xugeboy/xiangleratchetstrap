"use client";

import { useState, useEffect } from "react";
import {
  calculateIndirectEfficiency,
  calculateDirectEfficiency,
  getEfficiencyInterpretation,
  getOptimizationRecommendations,
  type LashingMode,
} from "@/utils/angleEfficiencyCalculation";

export default function AngleEfficiencyCalculator() {
  const [mode, setMode] = useState<LashingMode>("indirect");
  const [verticalAngle, setVerticalAngle] = useState<number>(45);
  const [horizontalAngle, setHorizontalAngle] = useState<number>(45);
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);

  const [efficiency, setEfficiency] = useState<number>(70.7);
  const [interpretation, setInterpretation] = useState<string>("");
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // Tick marks rendered proportionally under the slider
  const TICK_MIN = 0;
  const TICK_MAX = 90;
  const TICK_MARKS = [0, 15, 30, 45, 60, 75, 90];
  const toPercent = (v: number) => ((v - TICK_MIN) / (TICK_MAX - TICK_MIN)) * 100;

  // Calculate results whenever inputs change
  useEffect(() => {
    let calculatedEfficiency: number;
    
    if (mode === "indirect") {
      calculatedEfficiency = calculateIndirectEfficiency(verticalAngle);
    } else {
      calculatedEfficiency = calculateDirectEfficiency(verticalAngle, horizontalAngle);
    }

    setEfficiency(calculatedEfficiency);
    setInterpretation(getEfficiencyInterpretation(calculatedEfficiency));
    setRecommendations(getOptimizationRecommendations(mode, verticalAngle, horizontalAngle, calculatedEfficiency));
  }, [mode, verticalAngle, horizontalAngle]);

  const handleVerticalAngleChange = (value: number) => {
    setVerticalAngle(value);
  };

  const handleHorizontalAngleChange = (value: number) => {
    setHorizontalAngle(value);
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
      "Check out this European Angle Efficiency Calculator for cargo securing!"
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

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 85) return "text-green-600";
    if (efficiency >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getEfficiencyIcon = (efficiency: number) => {
    if (efficiency >= 85) return "✅";
    if (efficiency >= 50) return "⚠️";
    return "❌";
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Mode Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Lashing Mode Selection *
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setMode("indirect")}
              className={`p-4 rounded-lg border-2 transition-all ${
                mode === "indirect"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-semibold mb-2">Indirect Lashing (Friction)</div>
                <div className="text-sm text-gray-600">
                  Uses sin(α) calculation - only vertical angle required
                </div>
              </div>
            </button>
            <button
              onClick={() => setMode("direct")}
              className={`p-4 rounded-lg border-2 transition-all ${
                mode === "direct"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-semibold mb-2">Direct Lashing</div>
                <div className="text-sm text-gray-600">
                  Uses cos(α) × cos(β) calculation - both angles required
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Main Layout - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column: Angle Inputs */}
          <div className="space-y-6">
            {/* Vertical Angle Input */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Vertical Angle α (0°-90°)
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {verticalAngle}°
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  step="1"
                  value={verticalAngle}
                  onChange={(e) => handleVerticalAngleChange(parseInt(e.target.value))}
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
                Drag to adjust the vertical angle
              </p>
            </div>

            {/* Horizontal Angle Input (only for direct mode) */}
            {mode === "direct" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Horizontal Angle β (0°-90°)
                </h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {horizontalAngle}°
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    step="1"
                    value={horizontalAngle}
                    onChange={(e) => handleHorizontalAngleChange(parseInt(e.target.value))}
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
                  Drag to adjust the horizontal angle
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Results and Interpretation */}
          <div className="space-y-6">
            {/* Efficiency Output */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Geometric Efficiency
              </h3>
              <div className={`text-4xl font-bold mb-2 ${getEfficiencyColor(efficiency)}`}>
                {efficiency.toFixed(1)}%
              </div>
              <p className="text-blue-700 text-sm">
                {mode === "indirect" 
                  ? `sin(${verticalAngle}°) = ${efficiency.toFixed(1)}%`
                  : `cos(${verticalAngle}°) × cos(${horizontalAngle}°) = ${efficiency.toFixed(1)}%`
                }
              </p>
            </div>

            {/* Interpretation */}
            <div className={`border rounded-lg p-6 ${
              efficiency >= 85 ? "bg-green-50 border-green-200" :
              efficiency >= 50 ? "bg-yellow-50 border-yellow-200" :
              "bg-red-50 border-red-200"
            }`}>
              <div className="flex items-center justify-center space-x-3 mb-3">
                <span className="text-2xl">{getEfficiencyIcon(efficiency)}</span>
                <span className={`text-lg font-semibold ${getEfficiencyColor(efficiency)}`}>
                  {interpretation}
                </span>
              </div>
              <p className={`text-center text-sm ${
                efficiency >= 85 ? "text-green-700" :
                efficiency >= 50 ? "text-yellow-700" :
                "text-red-700"
              }`}>
                {efficiency >= 85 
                  ? "Your angle settings can efficiently transfer restraining force."
                  : efficiency >= 50 
                  ? "Some restraining force will be lost due to angles."
                  : "This angle setup will cause most restraining force to be wasted, requiring significantly stronger or more lashing straps for compliance."
                }
              </p>
            </div>

            {/* Optimization Recommendations */}
            {recommendations.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  Optimization Recommendations
                </h3>
                <ul className="space-y-2">
                  {recommendations.map((recommendation, index) => (
                    <li key={index} className="text-blue-800 text-sm flex items-start">
                      <span className="mr-2">•</span>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* European Standards Guidelines */}
        <div className="space-y-6">
          {/* EN 12195-1 Guidelines */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">
              EN 12195-1 European Standards Guidelines
            </h3>
            <div className="space-y-2 text-sm text-yellow-800">
              <div className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong>Indirect Lashing:</strong> Uses sin(α) calculation for friction-based securing
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong>Direct Lashing:</strong> Uses cos(α) × cos(β) calculation for direct force transfer
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong>High Efficiency (&gt;85%):</strong> Excellent angle configuration for optimal force transfer
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong>Medium Efficiency (50-85%):</strong> Acceptable but consider optimization
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong>Low Efficiency (&lt;50%):</strong> Requires stronger straps or angle adjustment
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
              Help others understand the importance of proper lashing angles for European standards
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
