"use client"

import { useState, useEffect } from "react"
import type { CargoInput, Region } from "@/utils/cargoSecuringCalculation"
import { getWeightUnitForRegion, getDimensionUnitForRegion, getRegionDisplayName } from "@/utils/cargoSecuringCalculation"

interface CargoInputFormProps {
  value: CargoInput
  onChange: (value: CargoInput) => void
  onSubmit: () => void
}

export function CargoInputForm({ value, onChange, onSubmit }: CargoInputFormProps) {
  const [errors, setErrors] = useState<Partial<CargoInput>>({})

  // Update units when region changes
  useEffect(() => {
    const newWeightUnit = getWeightUnitForRegion(value.region)
    const newDimensionUnit = getDimensionUnitForRegion(value.region)
    
    if (newWeightUnit !== value.weightUnit || newDimensionUnit !== value.dimensionUnit) {
      onChange({
        ...value,
        weightUnit: newWeightUnit,
        dimensionUnit: newDimensionUnit
      })
    }
  }, [value.region, value.weightUnit, value.dimensionUnit, onChange, value])

  const validateForm = () => {
    const newErrors: Partial<CargoInput> = {}
    
    if (!value.weight || value.weight <= 0) {
      newErrors.weight = "Weight is required and must be greater than 0"
    }
    
    if (value.length < 0) newErrors.length = "Length cannot be negative"
    if (value.width < 0) newErrors.width = "Width cannot be negative"
    if (value.height < 0) newErrors.height = "Height cannot be negative"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit()
    }
  }

  const updateValue = (field: keyof CargoInput, newValue: any) => {
    onChange({ ...value, [field]: newValue })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  return (
    <div className="mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 1: Cargo Information</h2>
        <p className="text-gray-600">
          Enter your cargo details to calculate the required tie-down capacity
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Region, Weight, Length in one row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Region & Standards *
            </label>
            <select
              value={value.region}
              onChange={(e) => updateValue("region", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="north_america">North America (DOT Standards)</option>
              <option value="australia">Australia (AS/NZS 4380 Standards)</option>
              <option value="europe">Europe (EN12195-2 Standards)</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Units will be automatically set based on your region: {value.region === "north_america" ? "lbs/ft" : "kg/m"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cargo Weight *
            </label>
            <div className="flex">
              <input
                type="number"
                step="1"
                min="0"
                value={value.weight || ""}
                onChange={(e) => updateValue("weight", parseFloat(e.target.value) || 0)}
                className={`flex-1 rounded-l-md border px-3 py-2 text-sm ${
                  errors.weight ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter weight"
              />
              <div className="rounded-r-md border-l-0 border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600 flex items-center">
                {value.weightUnit}
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
                step="0.01"
                min="0"
                value={value.length || ""}
                onChange={(e) => updateValue("length", parseFloat(e.target.value) || 0)}
                className={`flex-1 rounded-l-md border px-3 py-2 text-sm ${
                  errors.length ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="0.00"
              />
              <div className="rounded-r-md border-l-0 border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600 flex items-center">
                {value.dimensionUnit}
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              North America (DOT): 2 tie-downs for first 10 ft, then +1 per 10 ft (or fraction). AU/EU: ≥3.0m → ≥2; ≥6.0m → ≥3; beyond 6.0m +1 per 3.0m.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Continue to Securing Method
          </button>
        </div>
      </form>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Regional Standards Applied</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Calculations will be based on {getRegionDisplayName(value.region)} standards. 
                Different regions have varying requirements for safety margins, 
                indirect tie-down factors, and minimum tie-down counts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
