"use client";

import { useState, useEffect, useCallback } from "react";

// 定义包裹和计算结果的数据结构
interface Package {
  id: string;
  unit: "inch" | "ft" | "cm" | "m";
  width: number;
  height: number;
  length: number;
  weight: number;
  weightUnit: "lb" | "kg";
  quantity: number;
}

interface CalculationResult {
  volumeM3: number;
  volumeFt3: number;
  weightKg: number;
  weightLb: number;
  container20ft: number;
  container40ft: number;
  container40hc: number;
  volumetricWeightKg: number;
  volumetricWeightLbs: number;
}

// 初始化一个空的包裹对象
const initialPackage: Package = {
  id: "",
  unit: "inch",
  width: 0,
  height: 0,
  length: 0,
  weight: 0,
  weightUnit: "lb",
  quantity: 1,
};

export default function CubicFeetCalculator() {
  // 使用 state 管理包裹列表和计算结果
  const [packages, setPackages] = useState<Package[]>([
    { ...initialPackage, id: String(Date.now()) }, // 使用时间戳确保ID唯一
  ]);
  const [results, setResults] = useState<Record<string, CalculationResult>>({});

  // 更新指定包裹的字段值
  const updatePackage = (
    id: string,
    field: keyof Package,
    value: string | number
  ) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, [field]: value } : pkg))
    );
  };

  // 添加一个新的包裹输入行
  const addMoreRows = () => {
    const newId = String(Date.now());
    setPackages((prev) => [...prev, { ...initialPackage, id: newId, quantity: 1 }]);
  };

  // 执行计算
  const calculateResults = useCallback(() => {
    const newResults: Record<string, CalculationResult> = {};
    packages.forEach((pkg) => {
      if (!pkg.length || !pkg.width || !pkg.height) {
        return;
      }
      
      // 将所有尺寸单位转换为英尺(feet)进行计算
      let lengthFt = pkg.length;
      let widthFt = pkg.width;
      let heightFt = pkg.height;

      switch (pkg.unit) {
        case "inch":
          lengthFt /= 12;
          widthFt /= 12;
          heightFt /= 12;
          break;
        case "cm":
          lengthFt /= 30.48;
          widthFt /= 30.48;
          heightFt /= 30.48;
          break;
        case "m":
          lengthFt *= 3.28084;
          widthFt *= 3.28084;
          heightFt *= 3.28084;
          break;
        // 'ft' 单位无需转换
      }

      const singleVolumeFt3 = lengthFt * widthFt * heightFt;
      const totalVolumeFt3 = singleVolumeFt3 * pkg.quantity;
      const totalVolumeM3 = totalVolumeFt3 / 35.3147;

      // 重量转换和计算
      let totalWeightLb = 0;
      let totalWeightKg = 0;

      if (pkg.weightUnit === "lb") {
        totalWeightLb = pkg.weight * pkg.quantity;
        totalWeightKg = totalWeightLb / 2.20462;
      } else { // weightUnit is 'kg'
        totalWeightKg = pkg.weight * pkg.quantity;
        totalWeightLb = totalWeightKg * 2.20462;
      }

      // 集装箱可装载数量估算 (取整数)
      const container20ft = totalVolumeM3 > 0 ? Math.floor(33.2 / totalVolumeM3 * pkg.quantity) : 0;
      const container40ft = totalVolumeM3 > 0 ? Math.floor(67.7 / totalVolumeM3 * pkg.quantity) : 0;
      const container40hc = totalVolumeM3 > 0 ? Math.floor(76.4 / totalVolumeM3 * pkg.quantity) : 0;

      // 体积重计算 (基于IATA标准: 167 kg/m³)
      const volumetricWeightKg = totalVolumeM3 * 167;
      const volumetricWeightLbs = volumetricWeightKg * 2.20462;

      newResults[pkg.id] = {
        volumeM3: totalVolumeM3,
        volumeFt3: totalVolumeFt3,
        weightKg: totalWeightKg,
        weightLb: totalWeightLb,
        container20ft,
        container40ft,
        container40hc,
        volumetricWeightKg,
        volumetricWeightLbs,
      };
    });

    setResults(newResults);
  }, [packages]);

  // 当包裹数据变化时自动重新计算
  useEffect(() => {
    calculateResults();
  }, [packages, calculateResults]);

  return (
    <div className="bg-gray-100 font-sans">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* 页面主标题和描述 */}
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Cubic Feet Calculator
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Calculate package volume in cubic feet and meters for shipping, freight, and logistics. Get accurate measurements for containers, volumetric weight, and shipping costs.
          </p>
        </header>

        {/* 计算器主体 */}
        <div className="space-y-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {/* 输入区域头部 */}
              <div className="bg-blue-100 px-6 py-3 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">
                  Enter Package Details
                </h3>
              </div>
              
              {/* 输入表单 */}
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 items-end">
                  {/* 各个输入字段 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                    <select value={pkg.unit} onChange={(e) => updatePackage(pkg.id, "unit", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="inch">inch</option>
                      <option value="ft">ft</option>
                      <option value="cm">cm</option>
                      <option value="m">m</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                    <input type="number" value={pkg.width || ""} onChange={(e) => updatePackage(pkg.id, "width", Number.parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                    <input type="number" value={pkg.height || ""} onChange={(e) => updatePackage(pkg.id, "height", Number.parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
                    <input type="number" value={pkg.length || ""} onChange={(e) => updatePackage(pkg.id, "length", Number.parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight/box</label>
                    <input type="number" value={pkg.weight || ""} onChange={(e) => updatePackage(pkg.id, "weight", Number.parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                    <select value={pkg.weightUnit} onChange={(e) => updatePackage(pkg.id, "weightUnit", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="lb">lb</option>
                      <option value="kg">kg</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input type="number" value={pkg.quantity || ""} onChange={(e) => updatePackage(pkg.id, "quantity", Number.parseInt(e.target.value, 10) || 1)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="1" min="1" />
                  </div>
                </div>

                {/* 计算结果展示区域 */}
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-3">
                    Calculation Result
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <tbody>
                        {/* 第一行结果 */}
                        <tr className="border border-gray-300">
                          <td className="p-3 text-center border-r border-gray-300">
                            <div className="text-sm font-medium text-gray-700">Volume m³</div>
                            <div className="text-lg font-bold text-gray-900">{results[pkg.id]?.volumeM3.toFixed(3) || "–"}</div>
                          </td>
                          <td className="p-3 text-center border-r border-gray-300 bg-purple-700 text-white">
                            <div className="text-sm font-medium">Volume ft³</div>
                            <div className="text-lg font-bold">{results[pkg.id]?.volumeFt3.toFixed(3) || "–"}</div>
                          </td>
                          <td className="p-3 text-center border-r border-gray-300">
                            <div className="text-sm font-medium text-gray-700">Weight (Kg)</div>
                            <div className="text-lg font-bold text-gray-900">{results[pkg.id]?.weightKg.toFixed(2) || "–"}</div>
                          </td>
                          <td className="p-3 text-center">
                            <div className="text-sm font-medium text-gray-700">Weight (Lb)</div>
                            <div className="text-lg font-bold text-gray-900">{results[pkg.id]?.weightLb.toFixed(2) || "–"}</div>
                          </td>
                        </tr>
                        {/* 第二行结果 */}
                        <tr className="border border-gray-300 border-t-0">
                          <td className="p-3 text-center border-r border-gray-300">
                            <div className="text-sm font-medium text-gray-700">20 FT</div>
                            <div className="text-lg font-bold text-gray-900">{results[pkg.id]?.container20ft || "–"}</div>
                          </td>
                          <td className="p-3 text-center border-r border-gray-300">
                            <div className="text-sm font-medium text-gray-700">40 FT</div>
                            <div className="text-lg font-bold text-gray-900">{results[pkg.id]?.container40ft || "–"}</div>
                          </td>
                          <td className="p-3 text-center border-r border-gray-300">
                            <div className="text-sm font-medium text-gray-700">40 HC</div>
                            <div className="text-lg font-bold text-gray-900">{results[pkg.id]?.container40hc || "–"}</div>
                          </td>
                          <td className="p-3 text-center border-r border-gray-300">
                             <div className="text-sm font-medium text-gray-700">Volumetric Wt Kg</div>
                            <div className="text-lg font-bold text-gray-900">{results[pkg.id]?.volumetricWeightKg.toFixed(2) || "–"}</div>
                          </td>
                           <td className="p-3 text-center">
                             <div className="text-sm font-medium text-gray-700">Volumetric Wt lbs</div>
                            <div className="text-lg font-bold text-gray-900">{results[pkg.id]?.volumetricWeightLbs.toFixed(2) || "–"}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 添加更多行按钮 */}
        <div className="text-center">
          <button onClick={addMoreRows} className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-md shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
            Add more rows
          </button>
        </div>

        {/* --- 从网站抓取的说明文案 --- */}
        <div className="bg-white p-8 rounded-lg shadow-sm border space-y-8">
            {/* ... 以下为直接从 cbmcalculator.com 抓取的文案内容 ... */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Cubic Feet Calculator</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    Our <strong>Cubic Feet Calculator</strong> helps you quickly <strong>calculate the volume of multiple products and shipments</strong>. You can easily convert dimensions into <strong>cubic feet (ft³)</strong> and also check CBM (Cubic Meter) values for accurate <strong>shipping, packaging, and freight planning</strong>. This calculator supports multiple units of measurement for dimensions: <strong>(cm), Meter (m), Millimeter (mm), Feet (ft), and Inch (in)</strong>. For weight, you can enter values in <strong>Grams (gm), Kilograms (kg), and Pounds (lb)</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Feet.Inch format support</strong>: You can enter dimensions in a combined feet and inch format using a decimal. For example, 1.2 will be calculated as 1 Foot and 2 Inches.
                </p>
                <p className="text-gray-700 leading-relaxed">With this cubic feet calculator, you can:</p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                    <li>Calculate <strong>volume in cubic feet (ft³) and cubic meters (m³)</strong></li>
                    <li>Get accurate <strong>volume weight</strong> for shipping</li>
                    <li>Add <strong>multiple products</strong> for combined CBM and weight calculation</li>
                    <li>Estimate how many packages fit inside <strong>20 ft, 40 ft, and 40 ft High Cube containers</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                    Use this free online cubic feet calculator to simplify your cargo planning, shipping estimates, and freight forwarding.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">How Cubic Feet Calculator Works</h2>
                <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                        <span className="font-semibold text-blue-600">•</span>
                        <div><strong>Select your unit of measurement</strong> – choose from cm, mm, m, ft, or in.</div>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="font-semibold text-blue-600">•</span>
                        <div><strong>Enter your package details</strong> – input length × width × height along with the quantity of items.</div>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="font-semibold text-blue-600">•</span>
                        <div><strong>Get instant results</strong> – see total volume in cubic meters (m³) and cubic feet (ft³), volumetric weight, and how many items can fit into standard containers (20 ft, 40 ft, and 40 ft High Cube).</div>
                    </li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Volume Calculation Formula in Cubic Feet Calculator</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    To calculate the volume in <strong>cubic feet (ft³)</strong>, use:
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Formula:</strong> Cubic Feet (ft³) = (Length <sub>(inches)</sub> × Width <sub>(inches)</sub> × Height <sub>(inches)</sub>) ÷ 1728
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Why 1728?</strong> 1 cubic foot equals 12 × 12 × 12 = 1728 cubic inches (in³).
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Example</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                    <li>Length = 24 in</li>
                    <li>Width = 12 in</li>
                    <li>Height = 36 in</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Calculation:</strong> `(24 × 12 × 36) ÷ 1728 = 6 ft³`
                </p>
                <p className="text-gray-700 leading-relaxed">
                    <strong>Result:</strong> 6 cubic feet (ft³)
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Understand How the Calculator Works</h2>
                <div className="overflow-x-auto mb-6">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-300 bg-gray-50 text-left text-sm font-semibold text-gray-600">Input</th>
                                <th className="py-2 px-4 border-b border-gray-300 bg-gray-50 text-left text-sm font-semibold text-gray-600">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">Length (inch)</td>
                                <td className="py-2 px-4 border-b border-gray-300">Your package length in inches</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">Breadth (inch)</td>
                                <td className="py-2 px-4 border-b border-gray-300">Your package breadth in inches</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">Height (inch)</td>
                                <td className="py-2 px-4 border-b border-gray-300">Your package height in inches</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">Weight (lb)</td>
                                <td className="py-2 px-4 border-b border-gray-300">Your package weight in pounds</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">Quantity</td>
                                <td className="py-2 px-4 border-b border-gray-300">Number of packages; affects Weight, Volume Weight, and shipment volume</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="overflow-x-auto mb-6">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-300 bg-gray-50 text-left text-sm font-semibold text-gray-600">Result</th>
                                <th className="py-2 px-4 border-b border-gray-300 bg-gray-50 text-left text-sm font-semibold text-gray-600">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">Weight (kg/lbs)</td>
                                <td className="py-2 px-4 border-b border-gray-300">Shipment weight in kilograms or pounds</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">Volume Weight (kg/lbs)</td>
                                <td className="py-2 px-4 border-b border-gray-300">Volume (dimensional) weight of shipment in kilograms or pounds</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">Volume (m³/ft³)</td>
                                <td className="py-2 px-4 border-b border-gray-300">Shipment volume in cubic meters or cubic feet</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">20 FT min/max</td>
                                <td className="py-2 px-4 border-b border-gray-300">Approx min & max number of packages that can fit in a standard 20 FT container</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">40 FT min/max</td>
                                <td className="py-2 px-4 border-b border-gray-300">Approx min & max number of packages that can fit in a standard 40 FT container</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">40 FT HC min/max</td>
                                <td className="py-2 px-4 border-b border-gray-300">Approx min & max number of packages that can fit in a standard 40 FT High Cube container</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-gray-700 leading-relaxed mt-4 mb-4">
                    For above <strong>cubic feet calculator</strong> we had used following container dimensions
                </p>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-300 bg-gray-50 text-left text-sm font-semibold text-gray-600">Container / Dimensions</th>
                                <th className="py-2 px-4 border-b border-gray-300 bg-gray-50 text-left text-sm font-semibold text-gray-600">Length (cm)</th>
                                <th className="py-2 px-4 border-b border-gray-300 bg-gray-50 text-left text-sm font-semibold text-gray-600">Width (cm)</th>
                                <th className="py-2 px-4 border-b border-gray-300 bg-gray-50 text-left text-sm font-semibold text-gray-600">Height (cm)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">20 FT Container</td>
                                <td className="py-2 px-4 border-b border-gray-300">589</td>
                                <td className="py-2 px-4 border-b border-gray-300">230</td>
                                <td className="py-2 px-4 border-b border-gray-300">230</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">40 FT Container</td>
                                <td className="py-2 px-4 border-b border-gray-300">1200</td>
                                <td className="py-2 px-4 border-b border-gray-300">230</td>
                                <td className="py-2 px-4 border-b border-gray-300">230</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">40 FT HIGH CUBE Container</td>
                                <td className="py-2 px-4 border-b border-gray-300">1200</td>
                                <td className="py-2 px-4 border-b border-gray-300">230</td>
                                <td className="py-2 px-4 border-b border-gray-300">260</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Calculate Cubic Feet</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    Calculating cubic feet means determining the volume of an object in cubic feet. One cubic foot is the volume of a cube measuring 1 ft × 1 ft × 1 ft.
                </p>
                <div className="my-4 text-center">
                    {/* You might want to replace this with an actual image or remove it if not needed */}
                    <p className="text-gray-500 italic">cube of 1 feet (Image Placeholder)</p>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Formula for Calculating Cubic Feet</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    To find the volume of a box-shaped object, use the formula:
                    <br />
                    If all dimensions are in feet, the result will be in cubic feet.
                </p>
                <p className="text-lg font-bold text-gray-900 mb-4">
                    Volume = length x width x height
                </p>
                <p className="text-gray-700 leading-relaxed">
                    Here the Volume is in Cubic Feet and dimensions (length x width x height are in “Feet”)
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Practical Applications of Cubic Feet Calculation</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    Cubic feet calculations are widely used in various real-world applications, including:
                </p>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                    <li>
                        <strong>Home & Appliances</strong>
                        <ul className="list-disc list-inside ml-5 text-gray-600">
                            <li>Estimating the <strong>capacity of refrigerators, dishwashers, and ovens</strong> to ensure proper fit in kitchens.</li>
                            <li>Determining <strong>storage space</strong> in cabinets, closets, and sheds.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Moving & Shipping</strong>
                        <ul className="list-disc list-inside ml-5 text-gray-600">
                            <li>Calculating <strong>box volumes</strong> for packing and shipping to estimate required truck or container space.</li>
                            <li>Determining how much <strong>luggage</strong> or cargo can fit in a vehicle, trailer, or moving truck.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Construction & Renovation</strong>
                        <ul className="list-disc list-inside ml-5 text-gray-600">
                            <li>Measuring <strong>concrete, sand, or gravel</strong> needed for foundations, driveways, and landscaping.</li>
                            <li>Estimating <strong>paint, insulation, or drywall</strong> coverage for rooms and buildings.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Gardening & Landscaping</strong>
                        <ul className="list-disc list-inside ml-5 text-gray-600">
                            <li>Calculating the <strong>amount of soil, mulch, or compost</strong> needed for garden beds and planters.</li>
                            <li>Estimating water volume for <strong>ponds, fountains, and irrigation systems</strong>.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Storage & Warehousing</strong>
                        <ul className="list-disc list-inside ml-5 text-gray-600">
                            <li>Assessing <strong>warehouse storage capacity</strong> for goods and inventory management.</li>
                            <li>Determining the <strong>space required</strong> for stacking boxes, pallets, or shelving units.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Water & Liquid Storage</strong>
                        <ul className="list-disc list-inside ml-5 text-gray-600">
                            <li>Estimating water volume in <strong>pools, tanks, or aquariums</strong> (often converted to gallons).</li>
                            <li>Measuring the <strong>storage capacity</strong> of barrels and cisterns for rainwater collection.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>HVAC & Airflow Systems</strong>
                        <ul className="list-disc list-inside ml-5 text-gray-600">
                            <li>Calculating the <strong>air volume in a room</strong> for proper HVAC system sizing and ventilation.</li>
                            <li>Determining the <strong>capacity of air ducts and vents</strong> to ensure efficient air circulation.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Fuel & Gas Storage</strong>
                        <ul className="list-disc list-inside ml-5 text-gray-600">
                            <li>Measuring <strong>propane, natural gas, or other fuel storage tanks</strong> for consumption estimates.</li>
                            <li>Calculating <strong>engine displacement volumes</strong> for vehicles and machinery.</li>
                        </ul>
                    </li>
                </ol>
                <p className="text-gray-700 leading-relaxed mt-4">
                    Cubic feet calculations simplify planning, resource allocation, and cost estimation across multiple industries.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Convert Other Units to Cubic Feet</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    If the dimensions are not in feet, convert them before calculating the volume. Use the following conversions:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                    <li>Inches to feet: Divide by 12.</li>
                    <li>Yards to feet: Multiply by 3.</li>
                    <li>Centimeters to feet: Divide by 30.48.</li>
                    <li>Meters to feet: Multiply by 3.281.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                    Alternatively, calculate the volume in the given units first, then convert:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                    <li>Inches to cubic feet: Divide by 1,728.</li>
                    <li>Yards to cubic feet: Multiply by 27.</li>
                    <li>Centimeters to cubic feet: Divide by 28,316.847.</li>
                    <li>Meters to cubic feet: Multiply by 35.315.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                    For mixed-unit dimensions, converting to feet before calculation is recommended to prevent errors.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Volume & Unit Conversion Formulas</h2>
                <div className="overflow-x-auto mb-6">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-300 bg-gray-50 text-left text-sm font-semibold text-gray-600">Measurement Type</th>
                                <th className="py-2 px-4 border-b border-gray-300 bg-gray-50 text-left text-sm font-semibold text-gray-600">Formula / Tip</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">Cubic Feet (ft³)</td>
                                <td className="py-2 px-4 border-b border-gray-300">ft × ft × ft</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">Inches → ft³</td>
                                <td className="py-2 px-4 border-b border-gray-300">(in × in × in) ÷ 1,728</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">Meters → ft³</td>
                                <td className="py-2 px-4 border-b border-gray-300">(m³ × 35.315)</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">Yards → ft³</td>
                                <td className="py-2 px-4 border-b border-gray-300">yd³ × 27</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">Inches → feet (separate)</td>
                                <td className="py-2 px-4 border-b border-gray-300">Divide inches by 12 to convert to feet</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Example: Converting Inches to Cubic Feet</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    Consider an oven with dimensions:
                </p>
                <ol className="list-decimal list-inside text-gray-700 space-y-1 mb-4">
                    <li>Width: 21 inches</li>
                    <li>Height: 12 inches</li>
                    <li>Depth: 17 inches</li>
                </ol>
                <div className="my-4 text-center">
                    {/* You might want to replace this with an actual image or remove it if not needed */}
                    <p className="text-gray-500 italic">microwave with dimensions (Image Placeholder)</p>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Method 1: Convert Inches to Feet First</h4>
                <p className="text-gray-700 leading-relaxed mb-2">
                    Step: 1
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                    First, we will convert the dimension Length, Width & Height from “Inch” to “Feet”
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                    <li>Length: 21 inches divided by 12 = 1.75 Feet</li>
                    <li>Width: 12 inches divided by 12 = 1 Feet</li>
                    <li>Height: 17 inches divided by 12 = 1.41 Feet</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                    So, now the converted dimensions are 1.75 ft x 1 ft x 1.41 ft = 2.47 Cubic Feet
                </p>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Method 2: Convert After Multiplication</h4>
                <p className="text-gray-700 leading-relaxed mb-2">
                    Volume in Cubic Inch = 21 x 12 x 17 = 4284 Cubic Inch
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                    Volume in Cubic Feet = 4284 / 1728 = 2.47 Cubic Feet
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                    Both methods yield the same result: <strong>2.47 ft³</strong>.
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Calculating Cubic Feet of Soil</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    To determine the cubic feet of soil needed:
                </p>
                <ol className="list-decimal list-inside text-gray-700 space-y-1 mb-4">
                    <li><strong>Find the area</strong> by multiplying length and width. Example: 20 yards × 6 yards = 120 yd²</li>
                    <li><strong>Multiply by depth</strong> to get volume. Example: 120 yd² × 0.5 yd = 60 yd³</li>
                    <li><strong>Convert to cubic</strong> feet by multiplying by 27.</li>
                </ol>
                <p className="text-gray-700 leading-relaxed mb-4">
                    Volume = 60 yd³ x 27 = 1620 Cubic Feet
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Help? – FAQs</h2>
                <ol className="list-decimal list-inside text-gray-700 space-y-4">
                    <li>
                        <p className="font-semibold text-gray-800 mb-1">How do I enter feet and inches correctly?</p>
                        <p className="leading-relaxed mb-2">
                            At the moment, the calculator uses a feet.inch format. For example:
                        </p>
                        <ul className="list-disc list-inside ml-5 text-gray-600 space-y-1">
                            <li>Enter 2.6 to represent 2 feet 6 inches.</li>
                            <li>Enter 5.11 to represent 5 feet 11 inches.</li>
                        </ul>
                    </li>
                    <li>
                        <p className="font-semibold text-gray-800 mb-1">Why does quantity sometimes only change the total volume but not the unit weight?</p>
                        <p className="leading-relaxed">
                            The calculator works by multiplying the dimensions × quantity to find total volume. Unit weight is based on the weight you enter for a single item. If no unit weight is entered, only the volume updates when you change the quantity. To get correct total weight, make sure you enter the weight per item as well.
                        </p>
                    </li>
                    <li>
                        <p className="font-semibold text-gray-800 mb-1">What is volumetric weight and why does it matter for shipping?</p>
                        <p className="leading-relaxed mb-2">
                            Volumetric (or chargeable) weight reflects how much space your package occupies compared to its actual weight. If a package is light but bulky, carriers charge you based on its volume, not its physical weight. Example: A box of pillows may weigh only 10 kg, but if it takes up the space of a 50 kg shipment, you’ll be billed for 50 kg (volumetric weight). This ensures fair pricing for cargo that fills containers or aircraft space but doesn’t weigh much.
                        </p>
                        <p className="leading-relaxed">
                            👉 Tip: If you’re calculating for shipping, always compare actual weight vs. volumetric weight—thehigher one will usually be the chargeable weight.
                        </p>
                    </li>
                    <li>
                        <p className="font-semibold text-gray-800 mb-1">How do I convert cubic feet to cubic meters?</p>
                        <p className="leading-relaxed mb-2">
                            To convert: 1 cubic foot (ft³) = 0.0283 cubic meters (m³). To go the other way, 1 cubic meter (m³) = 35.315 cubic feet (ft³).
                        </p>
                        <p className="leading-relaxed">
                            👉 The calculator does this automatically, but you can use the formula if you need a quick manual conversion.
                        </p>
                    </li>
                    <li>
                        <p className="font-semibold text-gray-800 mb-1">How many cubic feet are in a standard container?</p>
                        <p className="leading-relaxed mb-2">
                            Here are approximate internal volumes of common ocean containers: 20 ft container → ~1,170 ft³ (33.2 m³) 40 ft container → ~2,390 ft³ (67.7 m³) 40 ft High Cube container → ~2,700 ft³ (76.4 m³)
                        </p>
                        <p className="leading-relaxed">
                            👉 These values can vary slightly by manufacturer, but they’re the standard reference for shipping calculations.
                        </p>
                    </li>
                </ol>
            </section>

            {/* ... 其他所有从网站抓取的文案部分都应放在这里 ... */}
        </div>
      </div>
    </div>
  );
}
