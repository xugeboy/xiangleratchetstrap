"use client";

import { LashingCalculator } from "./LashingCalculator";
import { SingleStepForm } from "./SingleStepForm";
import { useRegion, type Region, type SecuringMethod } from "@/contexts/RegionContext";
import Image from "next/image";
import { getCloudinaryPublicId } from "@/utils/formatUtils";

interface RegionOption {
  id: Region;
  title: string;
  subtitle: string;
  features: string[];
}

export function UnifiedCargoCalculator() {
  const { selectedRegion, setSelectedRegion, securingMethod, setSecuringMethod } = useRegion();

  const regions: RegionOption[] = [
    {
      id: 'north_america',
      title: 'North America',
      subtitle: 'DOT Standards',
      features: [
        'DOT compliance for US and Canada',
        'WLL (Working Load Limit) calculations',
        'Imperial units (lbs, ft)',
        'DOT tie-down requirements',
        'Commercial vehicle regulations'
      ]
    },
    {
      id: 'europe_australia',
      title: 'Europe & Australia',
      subtitle: 'EN 12195-1 / AS/NZS 4380',
      features: [
        'EN 12195-1 (Europe) compliance',
        'AS/NZS 4380 (Australia) compliance',
        'Metric units (kg, m)',
        'STF/LC calculations',
        'Indirect and direct lashing'
      ]
    }
  ];

  const handleRegionChange = (region: Region) => {
    setSelectedRegion(region);
  };

  const handleSecuringMethodChange = (method: SecuringMethod) => {
    setSecuringMethod(method);
  };

  // Method selection data (common for both regions)
  const methods = [
    {
      id: 'indirect' as SecuringMethod,
      title: selectedRegion === 'north_america' ? 'Indirect Tie-Down' : 'Indirect Lashing',
      description: selectedRegion === 'north_america' 
        ? 'Straps go over the top of the cargo' 
        : 'Uses friction between cargo and vehicle bed',
      image: "/v1756717118/indirect_tie_down.png_ko3y9e.png",
    },
    {
      id: 'direct' as SecuringMethod,
      title: selectedRegion === 'north_america' ? 'Direct Tie-Down' : 'Direct Lashing',
      description: selectedRegion === 'north_america'
        ? 'Straps directly connect cargo to vehicle'
        : 'Direct connection between cargo attachment points and vehicle',
      image: "/v1756717118/direct_tie_down_nahkbf.png",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      {/* Region Selection */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Select Your Region
          </h2>
          <p className="text-gray-600">
            Choose your region to see the appropriate cargo securing calculator and standards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regions.map((region) => (
            <div
              key={region.id}
              className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all ${
                selectedRegion === region.id
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleRegionChange(region.id)}
            >
              {selectedRegion === region.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}

              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{region.title}</h3>
              </div>
              <ul className="space-y-2">
                {region.features.map((feature, index) => (
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
      </div>

      {/* Securing Method Selection */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Select Securing Method
          </h2>
          <p className="text-gray-600">
            Choose the method for securing your cargo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {methods.map((method) => (
            <div
              key={method.id}
              className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all ${
                securingMethod === method.id
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleSecuringMethodChange(method.id)}
            >
              {securingMethod === method.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}

              <div className="text-center mb-4">
                <div className="mb-3">
                  <Image
                    src={getCloudinaryPublicId(method.image)}
                    alt={method.title}
                    width={200}
                    height={100}
                    className="object-contain mx-auto"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{method.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{method.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calculator Display */}
      <div className="mt-8">
        {selectedRegion === 'north_america' ? (
            <SingleStepForm />
        ) : (
          <LashingCalculator />
        )}
      </div>
    </div>
  );
}
