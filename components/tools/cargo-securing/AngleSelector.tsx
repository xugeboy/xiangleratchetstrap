"use client"

import { useState, useEffect } from "react"

interface AngleSelectorProps {
  value: number
  onChange: (value: number) => void
  onSubmit: () => void
  onBack: () => void
}

const angleOptions = [
  { value: 90, label: "90°", description: "Vertical (100% efficiency)", efficiency: 1.0 },
  { value: 60, label: "60°", description: "Steep angle (86% efficiency)", efficiency: 0.86 },
  { value: 45, label: "45°", description: "Medium angle (70% efficiency)", efficiency: 0.70 },
  { value: 30, label: "30°", description: "Shallow angle (50% efficiency)", efficiency: 0.50 },
]

export function AngleSelector({ value, onChange, onSubmit, onBack }: AngleSelectorProps) {
  const [customAngle, setCustomAngle] = useState<number>(value)
  const [isCustom, setIsCustom] = useState<boolean>(!angleOptions.some(opt => opt.value === value))

  useEffect(() => {
    if (!isCustom) {
      onChange(value)
    }
  }, [value, isCustom, onChange])

  const handleCustomAngleChange = (newAngle: number) => {
    setCustomAngle(newAngle)
    onChange(newAngle)
  }

  const getEfficiencyForAngle = (angle: number) => {
    if (angle >= 90) return 1.0
    if (angle >= 60) return 0.86
    if (angle >= 45) return 0.70
    if (angle >= 30) return 0.50
    return 0.30 // For very shallow angles
  }

  const currentEfficiency = getEfficiencyForAngle(value)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 3: Tie-Down Angle</h2>
        <p className="text-gray-600">
          Select the angle at which your tie-down straps will be applied. 
          Smaller angles significantly reduce the effective securing force.
        </p>
      </div>

      {/* Visual Angle Representation */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Current Angle: {value}°</h3>
          <p className="text-sm text-gray-600">
            Efficiency: {(currentEfficiency * 100).toFixed(0)}%
          </p>
        </div>
        
        {/* Simple ASCII Art for Angle Visualization */}
        <div className="flex justify-center items-center h-32 mb-4">
          <div className="relative">
            <div className="w-32 h-1 bg-gray-300"></div>
            <div 
              className="absolute top-0 left-0 w-32 h-1 bg-blue-500 origin-left"
              style={{ 
                transform: `rotate(${value - 90}deg)`,
                transformOrigin: 'left center'
              }}
            ></div>
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-600">
          <p>Vehicle surface ← → Cargo surface</p>
          <p>Blue line shows tie-down angle</p>
        </div>
      </div>

      {/* Preset Angle Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {angleOptions.map((option) => (
          <div
            key={option.value}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              value === option.value && !isCustom
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => {
              setIsCustom(false)
              onChange(option.value)
            }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{option.label}</div>
              <div className="text-sm text-gray-600 mb-2">{option.description}</div>
              <div className="text-lg font-semibold text-blue-600">
                {(option.efficiency * 100).toFixed(0)}% efficiency
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Angle Input */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Custom Angle</h3>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isCustom}
              onChange={(e) => setIsCustom(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Use custom angle</span>
          </label>
        </div>
        
        {isCustom && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Angle (degrees): {customAngle}°
              </label>
              <input
                type="range"
                min="15"
                max="90"
                step="1"
                value={customAngle}
                onChange={(e) => handleCustomAngleChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>15°</span>
                <span>30°</span>
                <span>45°</span>
                <span>60°</span>
                <span>75°</span>
                <span>90°</span>
              </div>
            </div>
            
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600">Custom angle efficiency:</div>
              <div className="text-xl font-bold text-blue-600">
                {(getEfficiencyForAngle(customAngle) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Angle Efficiency Chart */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Angle Efficiency Chart</h3>
        <div className="space-y-3">
          {[90, 75, 60, 45, 30, 15].map((angle) => {
            const efficiency = getEfficiencyForAngle(angle)
            const isCurrent = value === angle
            return (
              <div key={angle} className="flex items-center">
                <div className="w-16 text-sm font-medium text-gray-700">{angle}°</div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isCurrent ? "bg-blue-500" : "bg-gray-400"
                      }`}
                      style={{ width: `${efficiency * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className={`w-16 text-sm font-medium ${
                  isCurrent ? "text-blue-600" : "text-gray-600"
                }`}>
                  {(efficiency * 100).toFixed(0)}%
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          ← Back to Securing Method
        </button>
        <button
          onClick={onSubmit}
          className="px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Calculate Results
        </button>
      </div>

      {/* Warning for Shallow Angles */}
      {value < 45 && (
        <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Warning: Shallow Angle</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  Angles below 45° significantly reduce tie-down efficiency and may not provide 
                  adequate securing force. Consider repositioning your tie-downs for better safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
