"use client"

import { useState } from "react"
import { getCargoRecommendation, type CargoRecommendation } from "@/utils/cargoRecommendationEngine"

interface AdditionalDetailsProps {
  cargoId: string
  onSubmit: (details: Record<string, string>) => void
  onBack: () => void
}

export default function AdditionalDetails({ cargoId, onSubmit, onBack }: AdditionalDetailsProps) {
  const [details, setDetails] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const cargoRecommendation = getCargoRecommendation(cargoId)
  const additionalOptions = cargoRecommendation?.additionalOptions

  const handleInputChange = (field: string, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields if any
    const newErrors: Record<string, string> = {}
    if (additionalOptions) {
      Object.keys(additionalOptions).forEach(field => {
        if (!details[field] || details[field].trim() === "") {
          newErrors[field] = "This field is required"
        }
      })
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    onSubmit(details)
  }

  const handleSkip = () => {
    onSubmit({})
  }

  if (!cargoRecommendation) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">❌</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Cargo not found</h3>
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Go back
        </button>
      </div>
    )
  }

  const { cargoType } = cargoRecommendation

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{cargoType.icon}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Step 2: Tell us more about your {cargoType.name}
        </h2>
        <p className="text-gray-600">
          Help us provide the most accurate recommendation for your specific needs.
        </p>
      </div>

      {additionalOptions && Object.keys(additionalOptions).length > 0 ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(additionalOptions).map(([field, options]) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field} *
              </label>
              <select
                value={details[field] || ""}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className={`w-full rounded-lg border px-3 py-2 text-sm ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200`}
              >
                <option value="">Select {field.toLowerCase()}</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors[field] && (
                <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
              )}
            </div>
          ))}

          <div className="flex justify-center space-x-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Get Recommendation
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            No additional details needed!
          </h3>
          <p className="text-gray-600 mb-6">
            We have enough information to provide you with a personalized recommendation.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSkip}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Get Recommendation
            </button>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Why do we need these details?</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Specific details help us provide the most accurate strap recommendations, 
                ensuring you get the right length, strength, and accessories for your exact needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
