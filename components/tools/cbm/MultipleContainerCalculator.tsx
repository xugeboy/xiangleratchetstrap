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
  cost: number
}

interface Product {
  id: string
  name: string
  quantity: number
  qtyPerPack: number
  dimensionUnit: "cm" | "inch" | "ft" | "m"
  length: number
  width: number
  height: number
  productWeight: number
  productWeightUnit: "kg" | "lbs"
  packingWeight: number
  packingWeightUnit: "kg" | "lbs"
}

interface ContainerRecommendation {
  container: Container
  numberOfContainers: number
  totalWeight: number
  totalVolume: number
  weightUtilization: number
  volumeUtilization: number
  costEfficiency: number
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
    key: "20ft",
    name: "STANDARD 20 FEET",
    length: 589,
    width: 230,
    height: 230,
    maxWeight: 28200,
    maxVolume: 31.15,
    cost: 2500
  },
  {
    key: "40ft",
    name: "STANDARD 40 FEET",
    length: 1200,
    width: 230,
    height: 230,
    maxWeight: 28200,
    maxVolume: 63.48,
    cost: 3500
  },
  {
    key: "40ft-hc",
    name: "40 FEET HIGH CUBE CONTAINER",
    length: 1200,
    width: 230,
    height: 260,
    maxWeight: 28200,
    maxVolume: 71.65,
    cost: 3800
  }
]

const initialProduct: Product = {
  id: "",
  name: "Product 1",
  quantity: 0,
  qtyPerPack: 0,
  dimensionUnit: "cm",
  length: 0,
  width: 0,
  height: 0,
  productWeight: 0,
  productWeightUnit: "kg",
  packingWeight: 0,
  packingWeightUnit: "kg"
}

export default function MultipleContainerCalculator() {
  const [products, setProducts] = useState<Product[]>([])
  const [recommendations, setRecommendations] = useState<ContainerRecommendation[]>([])

  const addProduct = () => {
    setProducts(prevProducts => [
      ...prevProducts,
      { ...initialProduct, id: Date.now().toString(), name: `Product ${prevProducts.length + 1}` }
    ])
  }

  const removeProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const updateProduct = (id: string, field: keyof Product, value: string | number) => {
    setProducts(products.map(p => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const calculateProductMetrics = (product: Product) => {
    let lengthCm = product.length
    let widthCm = product.width
    let heightCm = product.height

    switch (product.dimensionUnit) {
      case "inch":
        lengthCm = product.length * 2.54
        widthCm = product.width * 2.54
        heightCm = product.height * 2.54
        break
      case "ft":
        lengthCm = product.length * 30.48
        widthCm = product.width * 30.48
        heightCm = product.height * 30.48
        break
      case "m":
        lengthCm = product.length * 100
        widthCm = product.width * 100
        heightCm = product.height * 100
        break
    }

    const singleCbmCm3 = lengthCm * widthCm * heightCm
    const singleCbmM3 = singleCbmCm3 / 1000000

    const noOfCartons = product.qtyPerPack > 0 ? Math.ceil(product.quantity / product.qtyPerPack) : 0
    const totalCbm = singleCbmM3 * noOfCartons

    let netWeightKg = product.productWeight
    if (product.productWeightUnit === "lbs") {
      netWeightKg = product.productWeight / 2.20462
    }
    const totalNetWeight = netWeightKg * product.quantity

    let packingWeightKg = product.packingWeight
    if (product.packingWeightUnit === "lbs") {
      packingWeightKg = product.packingWeight / 2.20462
    }
    const totalPackingWeight = packingWeightKg * noOfCartons

    const grossWeight = totalNetWeight + totalPackingWeight

    return {
      singleCbm: singleCbmM3,
      totalCbm,
      noOfCartons,
      totalNetWeight,
      grossWeight,
      totalProductVolume: totalCbm,
      totalProductWeight: grossWeight
    }
  }

  const findBestContainer = useCallback(() => {
    if (products.length === 0) {
      setRecommendations([])
      return
    }

    let totalCargoVolume = 0
    let totalCargoWeight = 0

    products.forEach(product => {
      const metrics = calculateProductMetrics(product)
      totalCargoVolume += metrics.totalProductVolume
      totalCargoWeight += metrics.totalProductWeight
    })

    const containerRecommendations: ContainerRecommendation[] = containers.map(container => {
      const neededVolumeContainers = Math.ceil(totalCargoVolume / container.maxVolume)
      const neededWeightContainers = Math.ceil(totalCargoWeight / container.maxWeight)
      const numberOfContainers = Math.max(neededVolumeContainers, neededWeightContainers)

      const usedVolume = numberOfContainers > 0 ? totalCargoVolume : 0
      const usedWeight = numberOfContainers > 0 ? totalCargoWeight : 0

      const volumeUtilization = (totalCargoVolume / (numberOfContainers * container.maxVolume)) * 100
      const weightUtilization = (totalCargoWeight / (numberOfContainers * container.maxWeight)) * 100

      const costEfficiency = numberOfContainers * container.cost

      return {
        container,
        numberOfContainers,
        totalVolume: usedVolume,
        totalWeight: usedWeight,
        volumeUtilization,
        weightUtilization,
        costEfficiency,
        products: products.map(p => ({
          id: p.id,
          name: p.name,
          quantity: p.quantity,
          totalVolume: calculateProductMetrics(p).totalProductVolume,
          totalWeight: calculateProductMetrics(p).totalProductWeight
        }))
      }
    })

    setRecommendations(containerRecommendations)
  }, [products])

  useEffect(() => {
    findBestContainer()
  }, [findBestContainer])

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Enter product details.</h3>
        {products.map((product, index) => (
          <div key={product.id} className="mb-8 p-6 border rounded-lg bg-gray-50 relative">
            <button
              onClick={() => removeProduct(product.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <h4 className="font-medium text-gray-900 mb-4">Product {index + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => updateProduct(product.id, "quantity", parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qty/Pack</label>
                <input
                  type="number"
                  value={product.qtyPerPack}
                  onChange={(e) => updateProduct(product.id, "qtyPerPack", parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <select
                  value={product.dimensionUnit}
                  onChange={(e) => updateProduct(product.id, "dimensionUnit", e.target.value as "cm" | "inch" | "ft" | "m")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="cm">cm</option>
                  <option value="inch">inch</option>
                  <option value="ft">ft</option>
                  <option value="m">m</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
                <input
                  type="number"
                  value={product.length}
                  onChange={(e) => updateProduct(product.id, "length", parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="0"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                <input
                  type="number"
                  value={product.width}
                  onChange={(e) => updateProduct(product.id, "width", parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="0"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                <input
                  type="number"
                  value={product.height}
                  onChange={(e) => updateProduct(product.id, "height", parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="0"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Weight</label>
                <input
                  type="number"
                  value={product.productWeight}
                  onChange={(e) => updateProduct(product.id, "productWeight", parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="0"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <select
                  value={product.productWeightUnit}
                  onChange={(e) => updateProduct(product.id, "productWeightUnit", e.target.value as "kg" | "lbs")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Packing Weight</label>
                <input
                  type="number"
                  value={product.packingWeight}
                  onChange={(e) => updateProduct(product.id, "packingWeight", parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="0"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <select
                  value={product.packingWeightUnit}
                  onChange={(e) => updateProduct(product.id, "packingWeightUnit", e.target.value as "kg" | "lbs")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-4">
              {/* Calculated metrics will go here */}
              {`No of Cartons: ${calculateProductMetrics(product).noOfCartons} Single CBM: ${calculateProductMetrics(product).singleCbm.toFixed(5)} Total CBM: ${calculateProductMetrics(product).totalCbm.toFixed(5)} Net Weight: ${calculateProductMetrics(product).totalNetWeight.toFixed(2)} Gross Weight: ${calculateProductMetrics(product).grossWeight.toFixed(2)}`}
            </div>
          </div>
        ))}
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

      <div className="mt-6 flex justify-center">
        <button
          onClick={findBestContainer}
          className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
        >
          Calculate Container Load
        </button>
      </div>

      {recommendations.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Result : Container Details</h3>
          {
            recommendations.sort((a, b) => a.container.name.localeCompare(b.container.name)).map((recommendation, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Container # {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <span className="text-gray-600 text-sm">Used Weight (kg)</span>
                    <div className="font-medium">{recommendation.totalWeight.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Name:</span>
                    <div className="font-medium uppercase">{recommendation.container.name}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Used Volume (m3)</span>
                    <div className="font-medium">{recommendation.totalVolume.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Weight (kg): {(recommendation.numberOfContainers * recommendation.container.maxWeight).toLocaleString()}</span>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className={`h-2.5 rounded-full ${recommendation.weightUtilization > 100 ? 'bg-red-600' : 'bg-purple-600'}`}
                        style={{ width: `${Math.min(recommendation.weightUtilization, 100).toFixed(1)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">Weight {recommendation.weightUtilization.toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Volume (m3): {(recommendation.numberOfContainers * recommendation.container.maxVolume).toFixed(2)}</span>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className={`h-2.5 rounded-full ${recommendation.volumeUtilization > 100 ? 'bg-red-600' : 'bg-blue-600'}`}
                        style={{ width: `${Math.min(recommendation.volumeUtilization, 100).toFixed(1)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">Volume {recommendation.volumeUtilization.toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Number of Containers Needed:</span>
                    <div className="font-medium">{recommendation.numberOfContainers}</div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      )}

      {products.length === 0 && recommendations.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <div className="text-4xl mb-2">🚛</div>
          <p>Add products to find the best container for your mixed cargo shipment</p>
        </div>
      )}
    </div>
  )
}
