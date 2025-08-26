"use client"

import { useState } from "react"
import InputForm from "./InputForm"
import ResultsDisplay from "./ResultsDisplay"
import { calculateCbmAndPallets } from "@/utils/calculation"
import type { CalculatorInput, CalculatorOutput } from "@/utils/calculation"

const initialInput: CalculatorInput = {
  unit: "ft",
  weightUnit: "lbs",
  length: 0,
  width: 0,
  height: 0,
  weightPerCarton: 0,
  quantity: 0,
  calculatePallet: true,
  palletPresetKey: "standard_48x40",
  palletLength: undefined,
  palletWidth: undefined,
  maxPalletHeight: 72,
  maxPalletWeight: 2200,
  containerKey: "none",
}

export default function CbmCalculator() {
  const [input, setInput] = useState<CalculatorInput>(initialInput)
  const [output, setOutput] = useState<CalculatorOutput | null>(null)

  const handleCalculate = () => {
    const results = calculateCbmAndPallets(input)
    setOutput(results)
  }

  const handleReset = () => {
    setInput(initialInput)
    setOutput(null)
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <InputForm value={input} onChange={setInput} onCalculate={handleCalculate} onReset={handleReset} />
      <ResultsDisplay data={output} />
    </div>
  )
}


