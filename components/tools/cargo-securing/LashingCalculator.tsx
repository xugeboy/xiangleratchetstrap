"use client";

import { useState, useMemo, useEffect } from "react";
import type { LashingMethod, EN12195Inputs } from "@/hooks/useEN12195Calculation";
import { useEN12195Calculation } from "@/hooks/useEN12195Calculation";
import { InputForm } from "./InputForm";
import { ResultsDisplay } from "./ResultsDisplay";
import { useRegion } from "@/contexts/RegionContext";

export function LashingCalculator() {
  const { securingMethod } = useRegion();
  const lashingMethod = securingMethod as LashingMethod;
  const [inputs, setInputs] = useState<EN12195Inputs>({
    lashingMethod: 'indirect',
    cargoWeight: 0,
    forceDirection: 'forward',
    frictionCoefficient: 'wood_wood',
    customFrictionValue: undefined,
    stf: undefined,
    verticalAngle: 90,
    isUnstableCargo: false,
    cargoHeight: undefined,
    cargoWidth: undefined,
    lashingCapacity: undefined,
    horizontalAngle: 90
  });

  // Update inputs when method changes (from context)
  useEffect(() => {
    setInputs(prev => ({ ...prev, lashingMethod }));
  }, [lashingMethod]);

  // Update inputs when form values change
  const handleInputChange = (newInputs: EN12195Inputs) => {
    setInputs(newInputs);
  };

  // Get calculation result using the custom hook
  const result = useEN12195Calculation(inputs);

  // Check if inputs are complete for calculation
  const isInputComplete = useMemo(() => {
    if (!inputs.cargoWeight || inputs.cargoWeight <= 0) return false;
    
    if (lashingMethod === 'indirect') {
      return !!(inputs.stf && inputs.stf > 0 && inputs.verticalAngle && inputs.verticalAngle > 0);
    } else {
      return !!(inputs.lashingCapacity && inputs.lashingCapacity > 0 && 
                inputs.verticalAngle && inputs.verticalAngle > 0 &&
                inputs.horizontalAngle && inputs.horizontalAngle > 0);
    }
  }, [inputs, lashingMethod]);



  return (
    <div className="mx-auto max-w-6xl">
      <div className="space-y-8">
        {/* Input Form */}
        <InputForm
          lashingMethod={lashingMethod}
          inputs={inputs}
          onChange={handleInputChange}
        />

        {/* Results Display */}
        <ResultsDisplay
          result={result}
          isLoading={isInputComplete && !result}
          lashingMethod={lashingMethod}
        />
      </div>
    </div>
  );
}
