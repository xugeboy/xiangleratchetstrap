"use client";

import { useState } from "react";
import type { LashingMethod, EN12195Inputs, ForceDirection, FrictionCoefficient } from "@/hooks/useEN12195Calculation";

interface InputFormProps {
  lashingMethod: LashingMethod;
  inputs: EN12195Inputs;
  onChange: (inputs: EN12195Inputs) => void;
}

export function InputForm({ lashingMethod, inputs, onChange }: InputFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateInput = (field: keyof EN12195Inputs, value: any) => {
    const newInputs = { ...inputs, [field]: value };
    onChange(newInputs);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateInput = (field: keyof EN12195Inputs, value: any) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'cargoWeight':
        if (!value || value <= 0) {
          newErrors[field] = 'Cargo weight must be greater than 0';
        } else {
          delete newErrors[field];
        }
        break;
      case 'stf':
        if (lashingMethod === 'indirect' && (!value || value <= 0)) {
          newErrors[field] = 'STF must be greater than 0 for indirect lashing';
        } else {
          delete newErrors[field];
        }
        break;
      case 'lashingCapacity':
        if (lashingMethod === 'direct' && (!value || value <= 0)) {
          newErrors[field] = 'Lashing capacity must be greater than 0 for direct lashing';
        } else {
          delete newErrors[field];
        }
        break;
      case 'verticalAngle':
        if (!value || value <= 0 || value >= 90) {
          newErrors[field] = 'Vertical angle must be between 0° and 90°';
        } else {
          delete newErrors[field];
        }
        break;
      case 'horizontalAngle':
        if (lashingMethod === 'direct' && (!value || value <= 0 || value >= 90)) {
          newErrors[field] = 'Horizontal angle must be between 0° and 90°';
        } else {
          delete newErrors[field];
        }
        break;
      case 'customFrictionValue':
        if (inputs.frictionCoefficient === 'custom' && (!value || value <= 0 || value >= 1)) {
          newErrors[field] = 'Custom friction coefficient must be between 0 and 1';
        } else {
          delete newErrors[field];
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const forceDirections: { value: ForceDirection; label: string; description: string }[] = [
    { value: 'forward', label: 'Forward (Braking)', description: 'Forces during braking maneuvers' },
    { value: 'sideways', label: 'Sideways (Turning)', description: 'Forces during turning and acceleration' }
  ];

  const frictionCoefficients: { value: FrictionCoefficient; label: string; description: string }[] = [
    { value: 'wood_wood', label: 'Wood on Wood', description: 'μ = 0.45' },
    { value: 'metal_wood', label: 'Metal on Wood', description: 'μ = 0.30' },
    { value: 'concrete_wood', label: 'Concrete on Wood', description: 'μ = 0.55' },
    { value: 'anti_slip', label: 'Anti-slip Matting', description: 'μ = 0.60' },
    { value: 'custom', label: 'Custom Value', description: 'Enter your own friction coefficient' }
  ];

  return (
    <div className="space-y-6">
      {/* Basic Cargo Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Cargo Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cargo Weight (kg) *
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={inputs.cargoWeight || ""}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                updateInput('cargoWeight', value);
                validateInput('cargoWeight', value);
              }}
              className={`w-full rounded-md border px-3 py-2 text-sm ${
                errors.cargoWeight ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              placeholder="Enter cargo weight in kg"
            />
            {errors.cargoWeight && (
              <p className="mt-1 text-sm text-red-600">{errors.cargoWeight}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Force Direction *
            </label>
            <select
              value={inputs.forceDirection}
              onChange={(e) => updateInput('forceDirection', e.target.value as ForceDirection)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {forceDirections.map((direction) => (
                <option key={direction.value} value={direction.value}>
                  {direction.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              {forceDirections.find(d => d.value === inputs.forceDirection)?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Friction Coefficient */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Friction Coefficient
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Surface Type *
            </label>
            <select
              value={inputs.frictionCoefficient}
              onChange={(e) => updateInput('frictionCoefficient', e.target.value as FrictionCoefficient)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {frictionCoefficients.map((friction) => (
                <option key={friction.value} value={friction.value}>
                  {friction.label} - {friction.description}
                </option>
              ))}
            </select>
          </div>

          {inputs.frictionCoefficient === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Friction Coefficient *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={inputs.customFrictionValue || ""}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  updateInput('customFrictionValue', value);
                  validateInput('customFrictionValue', value);
                }}
                className={`w-full rounded-md border px-3 py-2 text-sm ${
                  errors.customFrictionValue ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter friction coefficient (0-1)"
              />
              {errors.customFrictionValue && (
                <p className="mt-1 text-sm text-red-600">{errors.customFrictionValue}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Method-specific inputs */}
      {lashingMethod === 'indirect' ? (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Indirect Lashing Parameters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                STF - Standard Tension Force (daN) *
              </label>
              <input
                type="number"
                step="1"
                min="0"
                value={inputs.stf || ""}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  updateInput('stf', value);
                  validateInput('stf', value);
                }}
                className={`w-full rounded-md border px-3 py-2 text-sm ${
                  errors.stf ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter STF in daN"
              />
              {errors.stf && (
                <p className="mt-1 text-sm text-red-600">{errors.stf}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Standard tension force rating of your lashing strap
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vertical Angle (degrees) *
              </label>
              <input
                type="number"
                step="1"
                min="1"
                max="89"
                value={inputs.verticalAngle || ""}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  updateInput('verticalAngle', value);
                  validateInput('verticalAngle', value);
                }}
                className={`w-full rounded-md border px-3 py-2 text-sm ${
                  errors.verticalAngle ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter angle in degrees"
              />
              {errors.verticalAngle && (
                <p className="mt-1 text-sm text-red-600">{errors.verticalAngle}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Angle between strap and horizontal plane (1° - 89°)
              </p>
            </div>
          </div>

          {/* Unstable cargo options */}
          <div className="mt-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="unstableCargo"
                checked={inputs.isUnstableCargo || false}
                onChange={(e) => updateInput('isUnstableCargo', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="unstableCargo" className="ml-2 text-sm font-medium text-gray-700">
                Unstable cargo (requires tipping check)
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Check this if your cargo has a high center of gravity or is prone to tipping
            </p>
          </div>

          {inputs.isUnstableCargo && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cargo Height (m)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={inputs.cargoHeight || ""}
                  onChange={(e) => updateInput('cargoHeight', parseFloat(e.target.value) || 0)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter height in meters"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cargo Width (m)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={inputs.cargoWidth || ""}
                  onChange={(e) => updateInput('cargoWidth', parseFloat(e.target.value) || 0)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter width in meters"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Direct Lashing Parameters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LC - Lashing Capacity (daN) *
              </label>
              <input
                type="number"
                step="1"
                min="0"
                value={inputs.lashingCapacity || ""}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  updateInput('lashingCapacity', value);
                  validateInput('lashingCapacity', value);
                }}
                className={`w-full rounded-md border px-3 py-2 text-sm ${
                  errors.lashingCapacity ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter LC in daN"
              />
              {errors.lashingCapacity && (
                <p className="mt-1 text-sm text-red-600">{errors.lashingCapacity}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Lashing capacity rating of your strap
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vertical Angle (degrees) *
              </label>
              <input
                type="number"
                step="1"
                min="1"
                max="89"
                value={inputs.verticalAngle || ""}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  updateInput('verticalAngle', value);
                  validateInput('verticalAngle', value);
                }}
                className={`w-full rounded-md border px-3 py-2 text-sm ${
                  errors.verticalAngle ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter angle in degrees"
              />
              {errors.verticalAngle && (
                <p className="mt-1 text-sm text-red-600">{errors.verticalAngle}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Vertical angle (1° - 89°)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horizontal Angle (degrees) *
              </label>
              <input
                type="number"
                step="1"
                min="1"
                max="89"
                value={inputs.horizontalAngle || ""}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  updateInput('horizontalAngle', value);
                  validateInput('horizontalAngle', value);
                }}
                className={`w-full rounded-md border px-3 py-2 text-sm ${
                  errors.horizontalAngle ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter angle in degrees"
              />
              {errors.horizontalAngle && (
                <p className="mt-1 text-sm text-red-600">{errors.horizontalAngle}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Horizontal angle (1° - 89°)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Information section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-800">Input Guidelines</h4>
            <div className="mt-1 text-sm text-blue-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>All angles are measured from the horizontal plane</li>
                <li>STF and LC values are typically provided by the strap manufacturer</li>
                <li>Friction coefficients vary based on surface materials and conditions</li>
                <li>Unstable cargo requires additional safety considerations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
