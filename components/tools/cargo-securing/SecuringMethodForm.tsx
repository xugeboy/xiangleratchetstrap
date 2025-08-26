"use client"

import type { SecuringMethod } from "@/utils/cargoSecuringCalculation"

interface SecuringMethodFormProps {
  value: SecuringMethod
  onChange: (value: SecuringMethod) => void
  onSubmit: () => void
  onBack: () => void
}

export function SecuringMethodForm({ value, onChange, onSubmit, onBack }: SecuringMethodFormProps) {
  const methods = [
    {
      id: "indirect" as SecuringMethod,
      title: "Indirect Tie-Down (Over-the-top)",
      description: "Straps go over the top of the cargo and connect to the vehicle",
      icon: "🔗",
      features: [
        "Most common method for general cargo",
        "Suitable for most cargo types",
        "Requires angle consideration for efficiency",
        "Good for irregular shaped cargo"
      ],
      image: "📦⬆️🔗"
    },
    {
      id: "direct" as SecuringMethod,
      title: "Direct Tie-Down",
      description: "Straps directly connect cargo attachment points to the vehicle",
      icon: "⚡",
      features: [
        "Maximum efficiency (100% strap capacity)",
        "Requires cargo with attachment points",
        "Best for heavy machinery and equipment",
        "No angle efficiency loss"
      ],
      image: "📦🔗"
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 2: Securing Method</h2>
        <p className="text-gray-600">
          Choose how you plan to secure your cargo. This affects the required tie-down capacity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {methods.map((method) => (
          <div
            key={method.id}
            className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all ${
              value === method.id
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => onChange(method.id)}
          >
            {value === method.id && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
            
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{method.icon}</div>
              <div className="text-2xl mb-2">{method.image}</div>
              <h3 className="text-lg font-semibold text-gray-900">{method.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{method.description}</p>
            </div>
            
            <ul className="space-y-2">
              {method.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Method Comparison */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Method Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">Indirect</div>
            <div className="text-sm text-gray-600">Base WLL × 0.5</div>
            <div className="text-xs text-gray-500 mt-1">Then apply angle factor</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">Direct</div>
            <div className="text-sm text-gray-600">Base WLL × 1.0</div>
            <div className="text-xs text-gray-500 mt-1">Full strap capacity</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">Angle Factor</div>
            <div className="text-sm text-gray-600">90° = 100%</div>
            <div className="text-xs text-gray-500 mt-1">30° = 50% efficiency</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          ← Back to Cargo Info
        </button>
        <button
          onClick={onSubmit}
          disabled={!value}
          className="px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {value === "indirect" ? "Continue to Angle Selection" : "Calculate Results"}
        </button>
      </div>

      {/* Safety Note */}
      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Important Safety Note</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                The indirect tie-down method requires angle consideration as the effective 
                securing force decreases with smaller angles. Always ensure your tie-downs 
                meet or exceed the calculated requirements for safe transportation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
