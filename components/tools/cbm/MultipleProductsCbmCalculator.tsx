"use client"

import { useState, useCallback } from "react"
import Head from 'next/head' // Import Head for SEO metadata

interface Product {
  id: string // Add id to uniquely identify products
  unit: "mm" | "cm" | "m" | "inch" | "ft" | "yard" // Removed "feet.inch" for now, simpler input. Add it back if needed.
  width: number
  height: number
  length: number
  weight: number
  weightUnit: "gm" | "kg" | "lb"
  quantity: number
}

// Removed CalculationResult interface as it's no longer needed for global summary

// Container dimensions in cm
const CONTAINER_DIMENSIONS = {
  "20FT": { length: 589, width: 230, height: 230 },
  "40FT": { length: 1200, width: 230, height: 230 },
  "40HC": { length: 1200, width: 230, height: 260 },
}

const initialProduct: Product = {
  id: Date.now().toString(), // Initialize with a unique ID
  unit: "cm",
  width: 0,
  height: 0,
  length: 0,
  weight: 0,
  weightUnit: "kg",
  quantity: 1,
}

export default function MultipleProductsCbmCalculator() {
  const [products, setProducts] = useState<Product[]>([initialProduct]) // Initialize with one product row

  const updateProduct = useCallback((id: string, field: keyof Product, value: string | number) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, [field]: value } : product
      )
    )
  }, [])

  const addRow = useCallback(() => {
    if (products.length < 10) { // Limit to 10 rows
      setProducts(prevProducts => [...prevProducts, { ...initialProduct, id: Date.now().toString() }])
    }
  }, [products.length])

  const removeRow = useCallback((id: string) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id))
  }, [])

  const calculateSingleProductVolume = useCallback((product: Product) => {
    let lengthCm = product.length
    let widthCm = product.width
    let heightCm = product.height

    // Convert dimensions to cm
    switch (product.unit) {
      case "mm":
        lengthCm = product.length / 10
        widthCm = product.width / 10
        heightCm = product.height / 10
        break
      case "cm":
        // Already in cm
        break
      case "m":
        lengthCm = product.length * 100
        widthCm = product.width * 100
        heightCm = product.height * 100
        break
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
      case "yard":
        lengthCm = product.length * 91.44
        widthCm = product.width * 91.44
        heightCm = product.height * 91.44
        break
      // case "feet.inch": This unit requires special parsing if both feet and inches are in one input,
      // for now assuming it's handled externally or a separate input field
    }

    const volumeCm3 = lengthCm * widthCm * heightCm
    return volumeCm3 / 1_000_000 // cm³ to m³ for a single product
  }, [])

  const convertWeightToKg = useCallback((weight: number, unit: Product["weightUnit"]) => {
    switch (unit) {
      case "gm":
        return weight / 1000
      case "kg":
        return weight
      case "lb":
        return weight / 2.20462
    }
    return 0; // Fallback for undefined unit
  }, [])

  const getContainerCapacityForProduct = useCallback((productVolumeM3: number, container: { length: number; width: number; height: number }) => {
    if (productVolumeM3 === 0) return 0;
    const containerVolumeM3 = (container.length * container.width * container.height) / 1_000_000;
    const maxProducts = Math.floor(containerVolumeM3 / productVolumeM3);
    return isFinite(maxProducts) ? maxProducts : 0;
  }, []);

  // Removed useEffect for global calculations as they are no longer displayed
  // Removed handleReset as it's no longer exposed via a button

  return (
    <>
        {products.map((product, index) => {
          const singleProductVolumeM3 = calculateSingleProductVolume(product);
          const singleProductTotalVolumeM3 = singleProductVolumeM3 * product.quantity;
          const singleProductTotalVolumeFt3 = singleProductTotalVolumeM3 * 35.3147;
          const singleProductWeightKg = convertWeightToKg(product.weight, product.weightUnit);
          const singleProductTotalWeightKg = singleProductWeightKg * product.quantity;
          const singleProductTotalWeightLbs = singleProductTotalWeightKg * 2.20462;
          const singleProductVolumetricWeightKg = singleProductTotalVolumeM3 * 167; // Assuming 1 CBM = 167 kg
          const singleProductVolumetricWeightLbs = singleProductVolumetricWeightKg * 2.20462;

          const container20FtCapacity = getContainerCapacityForProduct(singleProductVolumeM3, CONTAINER_DIMENSIONS["20FT"]);
          const container40FtCapacity = getContainerCapacityForProduct(singleProductVolumeM3, CONTAINER_DIMENSIONS["40FT"]);
          const container40HcCapacity = getContainerCapacityForProduct(singleProductVolumeM3, CONTAINER_DIMENSIONS["40HC"]);

          return (
            <div key={product.id} className="bg-white rounded-lg shadow-md mb-8">
              <div className="bg-purple-200 text-gray-800 font-semibold p-3 rounded-t-lg">
                Enter Package Details
              </div>
              <div className="p-4">
                <div className="relative grid grid-cols-7 gap-2 items-center">
                  {/* Labels */}
                  <div className="text-xs font-medium text-gray-500">Unit</div>
                  <div className="text-xs font-medium text-gray-500">Width</div>
                  <div className="text-xs font-medium text-gray-500">Height</div>
                  <div className="text-xs font-medium text-gray-500">Length</div>
                  <div className="text-xs font-medium text-gray-500">Weight/box</div>
                  <div className="text-xs font-medium text-gray-500">Unit</div>
                  <div className="text-xs font-medium text-gray-500">Quantity</div>

                  {/* Inputs */}
                  <div>
                    <select
                      id={`unit-${product.id}`}
                      value={product.unit}
                      onChange={(e) => updateProduct(product.id, "unit", e.target.value as Product["unit"])}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                      aria-label={`Product ${index + 1} Dimension Unit`}
                    >
                      <option value="cm">cm</option>
                      <option value="mm">mm</option>
                      <option value="m">m</option>
                      <option value="inch">inch</option>
                      <option value="ft">ft</option>
                      <option value="yard">yard</option>
                    </select>
                  </div>
                  <div>
                    <input
                      id={`width-${product.id}`}
                      type="number"
                      value={product.width}
                      onChange={(e) => updateProduct(product.id, "width", parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                      placeholder="37"
                      min="0"
                      step="0.01"
                      aria-label={`Product ${index + 1} Width`}
                    />
                  </div>
                  <div>
                    <input
                      id={`height-${product.id}`}
                      type="number"
                      value={product.height}
                      onChange={(e) => updateProduct(product.id, "height", parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                      placeholder="26"
                      min="0"
                      step="0.01"
                      aria-label={`Product ${index + 1} Height`}
                    />
                  </div>
                  <div>
                    <input
                      id={`length-${product.id}`}
                      type="number"
                      value={product.length}
                      onChange={(e) => updateProduct(product.id, "length", parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                      placeholder="22"
                      min="0"
                      step="0.01"
                      aria-label={`Product ${index + 1} Length`}
                    />
                  </div>
                  <div>
                    <input
                      id={`weight-${product.id}`}
                      type="number"
                      value={product.weight}
                      onChange={(e) => updateProduct(product.id, "weight", parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                      placeholder="17"
                      min="0"
                      step="0.01"
                      aria-label={`Product ${index + 1} Weight per Box`}
                    />
                  </div>
                  <div>
                    <select
                      id={`weightUnit-${product.id}`}
                      value={product.weightUnit}
                      onChange={(e) => updateProduct(product.id, "weightUnit", e.target.value as Product["weightUnit"])}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                      aria-label={`Product ${index + 1} Weight Unit`}
                    >
                      <option value="kg">kg</option>
                      <option value="gm">gm</option>
                      <option value="lb">lb</option>
                    </select>
                  </div>
                  <div>
                    <input
                      id={`quantity-${product.id}`}
                      type="number"
                      value={product.quantity}
                      onChange={(e) => updateProduct(product.id, "quantity", parseInt(e.target.value) || 1)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                      placeholder="100"
                      min="1"
                      aria-label={`Product ${index + 1} Quantity`}
                    />
                  </div>
                </div>
              </div>

              {/* Per-row Calculation Result */}
              <div className="p-4 pt-0">
                <div className="bg-purple-200 text-gray-800 font-semibold p-3 -mx-4">
                  Calculation Result
                </div>
                <div className="grid grid-cols-4 border-t border-l border-r border-gray-300">
                  <div className="p-2 border-b border-gray-300 bg-purple-600 text-white text-center">
                    <p className="text-xs opacity-90">Volume m³</p>
                    <p className="text-base font-bold">
                      {(singleProductTotalVolumeM3).toFixed(3) || '-'} m³
                    </p>
                  </div>
                  <div className="p-2 border-b border-gray-300 text-center">
                    <p className="text-xs text-gray-600">Volume ft³</p>
                    <p className="text-base font-bold">
                      {(singleProductTotalVolumeFt3).toFixed(2) || '-'} ft³
                    </p>
                  </div>
                  <div className="p-2 border-b border-gray-300 text-center">
                    <p className="text-xs text-gray-600">Weight (Kg)</p>
                    <p className="text-base font-bold">
                      {(singleProductTotalWeightKg).toFixed(0) || '-'} Kg
                    </p>
                  </div>
                  <div className="p-2 border-b border-gray-300 text-center">
                    <p className="text-xs text-gray-600">Weight (Lb)</p>
                    <p className="text-base font-bold">
                      {(singleProductTotalWeightLbs).toFixed(3) || '-'} Lb
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-5 border-b border-l border-r border-gray-300">
                  <div className="p-2 text-center">
                    <p className="text-xs text-gray-600">20 FT</p>
                    <p className="text-base font-bold">
                      {container20FtCapacity === 0 ? '-' : container20FtCapacity}
                    </p>
                  </div>
                  <div className="p-2 border-l border-gray-300 text-center">
                    <p className="text-xs text-gray-600">40 FT</p>
                    <p className="text-base font-bold">
                      {container40FtCapacity === 0 ? '-' : container40FtCapacity}
                    </p>
                  </div>
                  <div className="p-2 border-l border-gray-300 text-center">
                    <p className="text-xs text-gray-600">40 HC</p>
                    <p className="text-base font-bold">
                      {container40HcCapacity === 0 ? '-' : container40HcCapacity}
                    </p>
                  </div>
                  <div className="p-2 border-l border-gray-300 text-center">
                    <p className="text-xs text-gray-600">Volumetric Wt Kg</p>
                    <p className="text-base font-bold">
                      {(singleProductVolumetricWeightKg).toFixed(2) || '-'} Kg
                    </p>
                  </div>
                  <div className="p-2 border-l border-gray-300 text-center">
                    <p className="text-xs text-gray-600">Volumetric Wt Lbs</p>
                    <p className="text-base font-bold">
                      {(singleProductVolumetricWeightLbs).toFixed(3) || '-'} Lbs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex justify-center mt-6">
          <button
            onClick={addRow}
            disabled={products.length >= 10}
            className="bg-purple-600 text-white py-2 px-6 rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Add more rows
          </button>
        </div>

        {products.every(p => p.length === 0 && p.width === 0 && p.height === 0 && p.quantity === 1) && products.length === 1 && (
          <div className="text-center text-gray-500 py-12">
            <div className="text-4xl mb-2">📦</div>
            <p>Enter package details to begin calculation</p>
          </div>
        )}

        {/* What is Cubic Meter (CBM)? */}
        <section className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is Cubic Meter (CBM)?</h2>
          <p className="text-gray-700 leading-relaxed">
            The **Cubic Meter (CBM)** is a unit of measurement for volume, representing the space occupied by a cargo shipment. It is a fundamental calculation in international shipping and logistics, as freight charges for sea and air cargo are often determined by either the actual weight or the volumetric weight (CBM), whichever is greater. Understanding CBM is crucial for efficient load planning, cost estimation, and optimizing shipping container utilization.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            One cubic meter is equivalent to a cube that measures 1 meter in length, 1 meter in width, and 1 meter in height. For smaller items, measurements are often taken in centimeters or millimeters, which are then converted to cubic meters for international shipping standards.
          </p>
        </section>

        {/* How to Calculate CBM? */}
        <section className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Calculate Cubic Meter (CBM)?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Calculating CBM is straightforward: you multiply the length, width, and height of a package. When dealing with multiple packages, you calculate the CBM for a single package and then multiply by the total quantity. Ensure all dimensions are in the same unit before calculation, then convert to meters for the final CBM value.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
            <p className="text-blue-800 text-sm">
              <strong>Formula:</strong> Length (m) &times; Width (m) &times; Height (m) = Volume (m³)
            </p>
            <p className="text-blue-800 text-sm mt-2">
              If your dimensions are in centimeters (cm), divide each dimension by 100 before multiplying. For millimeters (mm), divide by 1000. Our CBM calculator handles these conversions automatically.
            </p>
          </div>
        </section>

        {/* Understanding Container Capacity */}
        <section className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Understanding Container Capacity</h2>
          <p className="text-gray-700 leading-relaxed">
            Maximizing container capacity is essential for cost-effective shipping. Our calculator provides estimates for how many of your packages will fit into standard 20ft, 40ft, and 40ft High Cube (40HC) containers. These estimates are based on the total volume of your cargo and the internal dimensions of the containers.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            **Typical Internal Dimensions:**
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>**20ft Container:** 5.89m (L) x 2.34m (W) x 2.38m (H) - Approx. 33 CBM</li>
              <li>**40ft Container:** 12.03m (L) x 2.34m (W) x 2.38m (H) - Approx. 67 CBM</li>
              <li>**40ft High Cube Container:** 12.03m (L) x 2.34m (W) x 2.69m (H) - Approx. 76 CBM</li>
            </ul>
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            Keep in mind that these are theoretical maximums based purely on volume. Actual loading capacity may vary due to package shapes, packing efficiency, and weight restrictions.
          </p>
        </section>

        {/* Volumetric Weight vs. Actual Weight */}
        <section className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Volumetric Weight vs. Actual Weight</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            In shipping, carriers charge based on either the **actual gross weight** of your cargo or its **volumetric (dimensional) weight**, whichever is higher. This 'chargeable weight' ensures that freight costs accurately reflect both the weight and the space a shipment occupies.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            **Actual Weight:** The literal weight of your package(s) as measured on a scale.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            **Volumetric Weight:** A calculated weight based on the dimensions (length &times; width &times; height) of your package. This accounts for bulky, lightweight items that take up significant space. The formula often involves a 'dimensional factor' (e.g., dividing by 5000 or 6000 for air freight), which can vary by carrier and service.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mt-4">
            <p className="text-yellow-800 text-sm">
              **Our calculator automatically determines both actual and volumetric weights, indicating the chargeable weight to help you avoid unexpected shipping costs.**
            </p>
          </div>
        </section>
    </>
  )
}
