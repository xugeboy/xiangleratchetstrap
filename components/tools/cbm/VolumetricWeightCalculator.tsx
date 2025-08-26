"use client"

import { useState } from 'react'

interface Package {
  id: string
  dimensionUnit: 'mm' | 'cm' | 'meter' | 'inch' | 'ft'
  weightUnit: 'gm' | 'kg' | 'lb'
  width: string
  height: string
  length: string
  weight: string
  quantity: string
}

interface CalculationResult {
  volume: number
  volumeFt3: number
  totalWeight: number
  totalWeightLb: number
  volumetricWeight: number
  volumetricWeightLb: number
  chargeableWeight: number
  chargeableWeightLb: number
}

export default function VolumetricWeightCalculator() {
  const [packages, setPackages] = useState<Package[]>([
    {
      id: '1',
      dimensionUnit: 'cm',
      weightUnit: 'kg',
      width: '',
      height: '',
      length: '',
      weight: '',
      quantity: '1'
    }
  ])
  
  const [dimFactor, setDimFactor] = useState<'1000' | '3000' | '5000' | '6000'>('1000')
  const [results, setResults] = useState<CalculationResult | null>(null)

  const addPackage = () => {
    const newPackage: Package = {
      id: Date.now().toString(),
      dimensionUnit: 'cm',
      weightUnit: 'kg',
      width: '',
      height: '',
      length: '',
      weight: '',
      quantity: '1'
    }
    setPackages([...packages, newPackage])
  }

  const removePackage = (id: string) => {
    if (packages.length > 1) {
      setPackages(packages.filter(pkg => pkg.id !== id))
    }
  }

  const updatePackage = (id: string, field: keyof Package, value: string) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, [field]: value } : pkg
    ))
  }

  const convertToMeters = (value: string, unit: string): number => {
    const numValue = parseFloat(value) || 0
    switch (unit) {
      case 'mm': return numValue / 1000
      case 'cm': return numValue / 100
      case 'meter': return numValue
      case 'inch': return numValue * 0.0254
      case 'ft': return numValue * 0.3048
      default: return numValue
    }
  }

  const convertToKg = (value: string, unit: string): number => {
    const numValue = parseFloat(value) || 0
    switch (unit) {
      case 'gm': return numValue / 1000
      case 'kg': return numValue
      case 'lb': return numValue * 0.453592
      default: return numValue
    }
  }

  const calculateVolumetricWeight = () => {
    let totalVolume = 0
    let totalWeight = 0

    packages.forEach(pkg => {
      const width = convertToMeters(pkg.width, pkg.dimensionUnit)
      const height = convertToMeters(pkg.height, pkg.dimensionUnit)
      const length = convertToMeters(pkg.length, pkg.dimensionUnit)
      const weight = convertToKg(pkg.weight, pkg.weightUnit)
      const quantity = parseInt(pkg.quantity) || 1

      const volume = width * height * length * quantity
      totalVolume += volume
      totalWeight += weight * quantity
    })

    const dimFactorNum = parseInt(dimFactor)
    const volumetricWeight = (totalVolume * 1000000) / dimFactorNum // Convert m³ to cm³
    const chargeableWeight = Math.max(totalWeight, volumetricWeight)

    setResults({
      volume: totalVolume,
      volumeFt3: totalVolume * 35.3147,
      totalWeight,
      totalWeightLb: totalWeight * 2.20462,
      volumetricWeight,
      volumetricWeightLb: volumetricWeight * 2.20462,
      chargeableWeight,
      chargeableWeightLb: chargeableWeight * 2.20462
    })
  }

  const getDimFactorDescription = (factor: string) => {
    switch (factor) {
      case '1000': return 'Ocean LCL (Less than Container Load)'
      case '3000': return 'Truck LTL (Less than Truck Load) - EU'
      case '5000': return 'Express/Courier Services'
      case '6000': return 'Air Freight Services'
      default: return ''
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Professional Description Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          What is Volumetric Weight?
        </h3>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Volumetric weight represents the calculated weight of a parcel based on its length, width, and height, 
          converted to volumetric kilograms. The calculation method for volumetric weight can vary depending on 
          the courier and the specific service. For example, some couriers may use different formulas for express 
          versus economy services.
        </p>
        <p className="text-gray-700 leading-relaxed">
          When sending bulky parcels, many couriers charge based on volumetric weight instead of actual weight. 
          This weight is calculated from the dimensions of the parcel, ensuring fair pricing for space utilization 
          in transportation vehicles.
        </p>
      </div>

      {/* Calculator Form */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-bold">Chargeable Weight Calculator</h2>
          <p className="text-green-100 text-sm mt-1">Enter Package Details</p>
        </div>

        <div className="p-6">
          {/* DIM Factor Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Select Chargeable Weight DIM (Dimensional) Factor
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: '1000', label: 'Ocean LCL', desc: '1:1000' },
                { value: '3000', label: 'Truck LTL (EU)', desc: '1:3000' },
                { value: '5000', label: 'Express/Courier', desc: '1:5000' },
                { value: '6000', label: 'Air Freight', desc: '1:6000' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setDimFactor(option.value as '1000' | '3000' | '5000' | '6000')}
                  className={`
                    p-3 rounded-lg border-2 transition-all duration-200 text-left
                    ${dimFactor === option.value
                      ? 'border-purple-600 bg-purple-600 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }
                  `}
                >
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs opacity-75">{option.desc}</div>
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {getDimFactorDescription(dimFactor)}
            </p>
          </div>

          {/* Package Input Table */}
          <div className="mb-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
                      Unit
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
                      Width
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
                      Height
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
                      Length
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
                      Weight/box
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
                      Unit
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
                      Quantity
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg) => (
                    <tr key={pkg.id}>
                      <td className="border border-gray-300 px-3 py-2">
                        <select
                          value={pkg.dimensionUnit}
                          onChange={(e) => updatePackage(pkg.id, 'dimensionUnit', e.target.value as 'mm' | 'cm' | 'meter' | 'inch' | 'ft')}
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        >
                          <option value="mm">mm</option>
                          <option value="cm">cm</option>
                          <option value="meter">meter</option>
                          <option value="inch">Inch</option>
                          <option value="ft">Feet</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="number"
                          value={pkg.width}
                          onChange={(e) => updatePackage(pkg.id, 'width', e.target.value)}
                          placeholder="0"
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="number"
                          value={pkg.height}
                          onChange={(e) => updatePackage(pkg.id, 'height', e.target.value)}
                          placeholder="0"
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="number"
                          value={pkg.length}
                          onChange={(e) => updatePackage(pkg.id, 'length', e.target.value)}
                          placeholder="0"
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="number"
                          value={pkg.weight}
                          onChange={(e) => updatePackage(pkg.id, 'weight', e.target.value)}
                          placeholder="0"
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <select
                          value={pkg.weightUnit}
                          onChange={(e) => updatePackage(pkg.id, 'weightUnit', e.target.value as 'gm' | 'kg' | 'lb')}
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        >
                          <option value="gm">gm</option>
                          <option value="kg">kg</option>
                          <option value="lb">lb</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="number"
                          value={pkg.quantity}
                          onChange={(e) => updatePackage(pkg.id, 'quantity', e.target.value)}
                          placeholder="1"
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <button
                          onClick={() => removePackage(pkg.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Delete package"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 11 2 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4">
              <button
                onClick={addPackage}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add more packages</span>
              </button>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="text-center mb-6">
            <button
              onClick={calculateVolumetricWeight}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg"
            >
              Calculate Volumetric Weight
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Calculation Result
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{results.volume.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Volume m³</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{results.volumeFt3.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Volume ft³</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{results.totalWeight.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Weight (Kg)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{results.totalWeightLb.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Weight (Lb)</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{results.volumetricWeight.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Volumetric Weight Kg</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{results.volumetricWeightLb.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Volumetric Weight lbs</div>
                </div>
                <div className="text-center col-span-2">
                  <div className="text-2xl font-bold text-red-600">{results.chargeableWeight.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Chargeable Weight (Kg)</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Professional Explanations */}
      <div className="space-y-6 mt-8">
        {/* Why Volumetric Weight is Charged */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Why is Volumetric Weight Charged?
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Larger items occupy more space on vehicles or aircraft, increasing the cost to transport them. 
            Therefore, if an item is bulky but not heavy, shipping costs are often based on size instead of actual weight. 
            This ensures fair pricing for space utilization and prevents carriers from losing money on undercharged shipments.
          </p>
        </div>

        {/* Courier Delivery Section */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Calculate Volumetric Weight for Courier Delivery
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Different courier companies may use various formulas, but the most common method involves multiplying 
            the parcel&apos;s three dimensions in centimeters and dividing by 5,000.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-blue-800 text-sm">
              <strong>No need to worry</strong>—the tool above automatically calculates this for you. However, 
              if you&apos;d like to do it manually, simply multiply the length, width, and height (in cm) of your 
              parcel and then divide by 5,000.
            </p>
          </div>
        </div>

        {/* Physical Weight Comparison */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Compare to Physical Weight
          </h3>
          <p className="text-gray-700 leading-relaxed">
            If the volumetric weight is higher than the actual physical weight, your shipment will be billed 
            based on the volumetric weight. This is particularly important for large, lightweight items that 
            take up significant space in a cargo hold or container.
          </p>
        </div>

        {/* Freight Delivery Section */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Calculate Volumetric Weight for Freight Delivery
          </h3>
          <p className="text-gray-700 leading-relaxed">
            For most road freight, air freight services, and airlines, a divisor of 6,000 is used. To find 
            the volumetric weight for freight, multiply the length, width, and height of the shipment in 
            centimeters, then divide by 6,000.
          </p>
        </div>

        {/* Total Chargeable Weight */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Calculate Total Chargeable Weight of a Shipment
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Different couriers have their own methods for calculating the total chargeable weight, which can 
            impact the cost significantly.             It&apos;s important to understand how these variations might affect the 
            final price of your shipment.
          </p>
        </div>

        {/* Importance Section */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Why Correct Volumetric Weight Calculation is Important?
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Accurate volumetric weight calculation is essential when shipping bulky packages with low actual 
            weight because shipping costs are often based on the space a package occupies rather than its 
            physical weight. This is particularly important for large, lightweight items that take up significant 
            space in a cargo hold or container.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            By calculating the volumetric weight, which reflects the package&apos;s dimensions, shipping carriers 
            can ensure that pricing accurately reflects the space utilized. Without this, carriers may incur 
            losses from undercharged shipments, and shippers might face unexpected costs due to inaccurate 
            weight estimates. Therefore, correctly calculating volumetric weight helps in fair cost allocation 
            and efficient use of space, benefiting both carriers and customers.
          </p>
        </div>

        {/* How to Use Section */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            How to Use Volumetric Weight Calculator
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              <strong>Select Divisor (Chargeable Weight DIM Factor):</strong> Choose the divisor according 
              to your shipping agent. By default, the calculation uses a divisor of 1000.
            </li>
            <li>
              <strong>Select the Unit of Measurement for Package Dimensions:</strong> Choose from cm/mm/inch/meter/feet.
            </li>
            <li>
              <strong>Enter the Package Dimensions:</strong> Input Length, Width (Breadth), and Height.
            </li>
            <li>
              <strong>Select the Unit of Measurement for Package Weight:</strong> Choose from kg/lb/gm.
            </li>
            <li>
              <strong>Enter the Package Weight:</strong> Input the weight of a single package.
            </li>
            <li>
              <strong>Enter the Package Quantity:</strong> Specify how many packages you have.
            </li>
            <li>
              <strong>Add More Packages:</strong> Use the &quot;Add More Package&quot; option for multiple items.
            </li>
            <li>
              <strong>Delete a Package:</strong> Use the &quot;Delete&quot; icon to remove unwanted entries.
            </li>
          </ol>
        </div>

        {/* Understanding Results */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Understand the Result
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Volume Measurements:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• <strong>Volume (m³):</strong> Total volume of all packages in cubic meters</li>
                <li>• <strong>Volume (ft³):</strong> Total volume of all packages in cubic feet</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Weight Measurements:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• <strong>Weight (kg):</strong> Total weight in kilograms</li>
                <li>• <strong>Weight (lb):</strong> Total weight in pounds</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Volumetric Weight:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• <strong>Volumetric Weight (kg):</strong> Calculated weight based on dimensions</li>
                <li>• <strong>Volumetric Weight (lb):</strong> Calculated weight in pounds</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Final Result:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• <strong>Chargeable Weight:</strong> The higher of actual vs volumetric weight</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
