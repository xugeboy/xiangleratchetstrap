"use client"

import { useState, useEffect, useCallback } from "react"

interface Container {
  key: string
  name: string
  length: number
  width: number
  height: number
  maxWeight: number
  maxVolume: number
}

interface Product {
  id: string
  length: number
  width: number
  height: number
  quantity: number
  weight: number
}

interface ContainerResult {
  container: Container
  totalProducts: number
  totalWeight: number
  totalVolume: number
  weightUtilization: number
  volumeUtilization: number
  products: Array<{
    id: string
    name: string
    quantity: number
    totalVolume: number
    totalWeight: number
  }>
}

const containers: Container[] = [
  {
    key: "standard20",
    name: "Standard 20 Feet Container",
    length: 589,
    width: 235,
    height: 239,
    maxWeight: 28200, // kg
    maxVolume: 33.0 // m3
  },
  {
    key: "standard40",
    name: "Standard 40 Feet Container",
    length: 1203,
    width: 235,
    height: 239,
    maxWeight: 26780, // kg
    maxVolume: 67.7 // m3
  },
  {
    key: "highcube40",
    name: "High Cube 40 Feet Container",
    length: 1203,
    width: 235,
    height: 269,
    maxWeight: 29100, // kg
    maxVolume: 76.0 // m3
  },
  {
    key: "refer20",
    name: "Refer 20 Feet Container",
    length: 545,
    width: 227,
    height: 220,
    maxWeight: 27400, // kg
    maxVolume: 27.2 // m3
  },
  {
    key: "refer40",
    name: "Refer 40 Feet Container",
    length: 1157,
    width: 227,
    height: 220,
    maxWeight: 25700, // kg
    maxVolume: 56.1 // m3
  },
  {
    key: "refer40hc",
    name: "Refer 40 Feet High Cube Container",
    length: 1157,
    width: 227,
    height: 251,
    maxWeight: 27600, // kg
    maxVolume: 64.6 // m3
  }
]

const initialProduct: Product = {
  id: "",
  length: 0,
  width: 0,
  height: 0,
  quantity: 1,
  weight: 0
}

export default function SingleContainerCalculator() {
  const [selectedContainer, setSelectedContainer] = useState<string>("standard40")
  const [products, setProducts] = useState<Product[]>([])
  const [globalUnit, setGlobalUnit] = useState<"kg/cm" | "lb/inch">("kg/cm")
  const [result, setResult] = useState<ContainerResult | null>(null)

  const calculateContainerLoad = useCallback(() => {
    if (products.length === 0) {
      setResult(null)
      return
    }

    const container = containers.find(c => c.key === selectedContainer)
    if (!container) {
      setResult(null)
      return
    }

    let totalVolume = 0
    let totalWeight = 0

    products.forEach(product => {
      let length = product.length
      let width = product.width
      let height = product.height
      let weight = product.weight

      // Convert dimensions based on global unit
      if (globalUnit === "lb/inch") {
        length = length * 2.54 // inch to cm
        width = width * 2.54   // inch to cm
        height = height * 2.54 // inch to cm
        weight = weight / 2.20462 // lbs to kg
      }

      const productVolumeCm3 = length * width * height
      const productVolumeM3 = productVolumeCm3 / 1000000 // cm3 to m3

      totalVolume += productVolumeM3 * product.quantity
      totalWeight += weight * product.quantity
    })

    const weightUtilization = (totalWeight / container.maxWeight) * 100
    const volumeUtilization = (totalVolume / container.maxVolume) * 100

    setResult({
      container,
      totalProducts: products.reduce((sum, p) => sum + p.quantity, 0),
      totalWeight,
      totalVolume,
      weightUtilization,
      volumeUtilization,
      products: products.map(p => ({
        id: p.id,
        name: `Product ${p.id}`, // Placeholder name, will be removed later
        quantity: p.quantity,
        totalVolume: (p.length * p.width * p.height / 1000000) * p.quantity,
        totalWeight: p.weight * p.quantity
      }))
    })
  }, [products, selectedContainer, globalUnit])

  useEffect(() => {
    calculateContainerLoad()
  }, [calculateContainerLoad])

  const addProduct = () => {
    const newProduct = {
      ...initialProduct,
      id: Date.now().toString()
    }
    setProducts([...products, newProduct])
  }

  const removeProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const updateProduct = (id: string, field: keyof Product, value: string | number) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ))
  }


  return (
    <div className="space-y-8">
      {/* Unit of Measurement Selection */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Select Unit of Measurement</h3>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="unit-measurement"
              value="kg/cm"
              checked={globalUnit === "kg/cm"}
              onChange={() => setGlobalUnit("kg/cm")}
            />
            <span className="ml-2 text-gray-700">kg/cm</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="unit-measurement"
              value="lb/inch"
              checked={globalUnit === "lb/inch"}
              onChange={() => setGlobalUnit("lb/inch")}
            />
            <span className="ml-2 text-gray-700">lb/inch</span>
          </label>
        </div>
      </div>

      {/* Container Selection */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Select Container</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {containers.map((container) => (
            <div
              key={container.key}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedContainer === container.key
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedContainer(container.key)}
            >
              <h4 className="font-medium text-gray-900 mb-2">{container.name}</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Dimensions: {container.length} × {container.width} × {container.height} cm</div>
                <div>Max Weight: {container.maxWeight.toLocaleString()} kg</div>
                <div>Max Volume: {container.maxVolume.toFixed(2)} m³</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Result Section (Moved and updated as per image) */}
      {result && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Result</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filled Volume : {result.totalVolume.toFixed(2)} m³
              </label>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className={`h-2.5 rounded-full ${result.volumeUtilization > 100 ? 'bg-red-600' : 'bg-blue-600'}`}
                  style={{ width: `${Math.min(result.volumeUtilization, 100).toFixed(1)}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{result.volumeUtilization.toFixed(1)}%</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filled Weight : {result.totalWeight.toFixed(2)} kg.
              </label>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className={`h-2.5 rounded-full ${result.weightUtilization > 100 ? 'bg-red-600' : 'bg-purple-600'}`}
                  style={{ width: `${Math.min(result.weightUtilization, 100).toFixed(1)}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{result.weightUtilization.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Enter Product Details (Input Section) */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Enter product details</h3>
        
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Length ({globalUnit === "kg/cm" ? "cm" : "inch"})</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Width ({globalUnit === "kg/cm" ? "cm" : "inch"})</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Height ({globalUnit === "kg/cm" ? "cm" : "inch"})</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Weight ({globalUnit === "kg/cm" ? "kg" : "lbs"})</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="number"
                      value={product.length}
                      onChange={(e) => updateProduct(product.id, "length", parseFloat(e.target.value) || 0)}
                      className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                      placeholder="0"
                      step="0.01"
                      min="0"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="number"
                      value={product.width}
                      onChange={(e) => updateProduct(product.id, "width", parseFloat(e.target.value) || 0)}
                      className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                      placeholder="0"
                      step="0.01"
                      min="0"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="number"
                      value={product.height}
                      onChange={(e) => updateProduct(product.id, "height", parseFloat(e.target.value) || 0)}
                      className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                      placeholder="0"
                      step="0.01"
                      min="0"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="number"
                      value={product.weight}
                      onChange={(e) => updateProduct(product.id, "weight", parseFloat(e.target.value) || 0)}
                      className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                      placeholder="0"
                      step="0.01"
                      min="0"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => updateProduct(product.id, "quantity", parseInt(e.target.value) || 1)}
                      className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                      min="1"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={addProduct}
          className="mt-4 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add more row
        </button>
      </div>

      {/* Total Volume and Weight Display */}
      {products.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mt-4 text-right">
          <p className="text-sm font-medium text-gray-700">
            Total Volume: {result?.totalVolume.toFixed(3) || 0} m³, Total Weight: {result?.totalWeight.toFixed(2) || 0} kg
          </p>
        </div>
      )}

      {products.length === 0 && !result && (
        <div className="text-center text-gray-500 py-12">
          <div className="text-4xl mb-2">🚢</div>
          <p>Add products to calculate container loading analysis</p>
        </div>
      )}
    </div>
  )
}

