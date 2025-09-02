"use client"

import { CargoInput, SecuringMethod, CalculationResult, calculateRequiredWLL } from "@/utils/cargoSecuringCalculation"
import { useState } from "react"
import { AngleSelector } from "./AngleSelector"
import { CargoInputForm } from "./CargoInputForm"
import { ResultsDisplay } from "./ResultsDisplay"
import { SecuringMethodForm } from "./SecuringMethodForm"

const initialCargoInput: CargoInput = {
  region: "north_america",
  weight: 0,
  weightUnit: "lbs",
  length: 0,
  width: 0,
  height: 0,
  dimensionUnit: "ft",
}

const initialSecuringMethod: SecuringMethod = "indirect"

export default function CargoSecuringCalculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [cargoInput, setCargoInput] = useState<CargoInput>(initialCargoInput)
  const [securingMethod, setSecuringMethod] = useState<SecuringMethod>(initialSecuringMethod)
  const [angle, setAngle] = useState<number>(90)
  const [results, setResults] = useState<CalculationResult | null>(null)

  const handleCargoSubmit = () => {
    setCurrentStep(2)
  }

  const handleMethodSubmit = () => {
    // For North America, skip angle selection (DOT aggregate rule)
    if (cargoInput.region === "north_america") {
      calculateResults()
      return
    }

    if (securingMethod === "indirect") {
      setCurrentStep(3)
    } else {
      calculateResults()
    }
  }

  const handleAngleSubmit = () => {
    calculateResults()
  }

  const calculateResults = () => {
    const calculationResults = calculateRequiredWLL(cargoInput, securingMethod, angle)
    setResults(calculationResults)
    setCurrentStep(4)
  }

  const handleReset = () => {
    setCurrentStep(1)
    setCargoInput(initialCargoInput)
    setSecuringMethod(initialSecuringMethod)
    setAngle(90)
    setResults(null)
  }

  const goToStep = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step)
    }
  }

  return (
    <div className="mx-auto container">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[
            { step: 1, title: "Cargo Info", icon: "📦" },
            { step: 2, title: "Securing Method", icon: "🔗" },
            { step: 3, title: "Angle", icon: "📐" },
            { step: 4, title: "Results", icon: "✅" },
          ].map(({ step, title, icon }) => (
            <div
              key={step}
              className={`flex items-center space-x-2 cursor-pointer transition-all ${
                step <= currentStep
                  ? "text-blue-600"
                  : "text-gray-400"
              }`}
              onClick={() => goToStep(step)}
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
          <CargoInputForm
            value={cargoInput}
            onChange={setCargoInput}
            onSubmit={handleCargoSubmit}
          />
        )}

        {currentStep === 2 && (
          <SecuringMethodForm
            value={securingMethod}
            onChange={setSecuringMethod}
            onSubmit={handleMethodSubmit}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && cargoInput.region !== "north_america" && (
          <AngleSelector
            value={angle}
            onChange={setAngle}
            onSubmit={handleAngleSubmit}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && results && (
          <ResultsDisplay
            results={results}
            cargoInput={cargoInput}
            securingMethod={securingMethod}
            angle={angle}
            onReset={handleReset}
            onRecalculate={() => setCurrentStep(1)}
          />
        )}
      </div>
    </div>
  )
}
