"use client"

import { useState } from "react"
import { getCargoRecommendation, type CargoRecommendation } from "@/utils/cargoRecommendationEngine"
import CargoSelection from "./CargoSelection"
import AdditionalDetails from "./AdditionalDetails"
import RecommendationDisplay from "./RecommendationDisplay"

export default function CargoSpecificRecommender() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCargoId, setSelectedCargoId] = useState<string>("")
  const [additionalDetails, setAdditionalDetails] = useState<Record<string, string>>({})
  const [recommendation, setRecommendation] = useState<CargoRecommendation | null>(null)

  const handleCargoSelect = (cargoId: string) => {
    setSelectedCargoId(cargoId)
    setCurrentStep(2)
  }

  const handleAdditionalDetails = (details: Record<string, string>) => {
    setAdditionalDetails(details)
    const cargoRecommendation = getCargoRecommendation(selectedCargoId)
    if (cargoRecommendation) {
      setRecommendation(cargoRecommendation)
      setCurrentStep(3)
    }
  }

  const handleBackToStep = (step: number) => {
    setCurrentStep(step)
    if (step === 1) {
      setSelectedCargoId("")
      setAdditionalDetails({})
      setRecommendation(null)
    } else if (step === 2) {
      setAdditionalDetails({})
      setRecommendation(null)
    }
  }

  const handleStartOver = () => {
    setCurrentStep(1)
    setSelectedCargoId("")
    setAdditionalDetails({})
    setRecommendation(null)
  }

  return (
    <div className="mx-auto container">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[
            { step: 1, title: "Select Cargo", icon: "📦" },
            { step: 2, title: "Details", icon: "📝" },
            { step: 3, title: "Recommendation", icon: "✅" },
          ].map(({ step, title, icon }) => (
            <div
              key={step}
              className={`flex items-center space-x-2 cursor-pointer transition-all ${
                step <= currentStep
                  ? "text-blue-600"
                  : "text-gray-400"
              }`}
              onClick={() => handleBackToStep(step)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step < currentStep ? "✓" : icon}
              </div>
              <span className="hidden sm:inline text-sm font-medium">{title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {currentStep === 1 && (
          <CargoSelection onSelect={handleCargoSelect} />
        )}

        {currentStep === 2 && selectedCargoId && (
          <AdditionalDetails
            cargoId={selectedCargoId}
            onSubmit={handleAdditionalDetails}
            onBack={() => handleBackToStep(1)}
          />
        )}

        {currentStep === 3 && recommendation && (
          <RecommendationDisplay
            recommendation={recommendation}
            additionalDetails={additionalDetails}
            onStartOver={handleStartOver}
            onBack={() => handleBackToStep(2)}
          />
        )}
      </div>
    </div>
  )
}
