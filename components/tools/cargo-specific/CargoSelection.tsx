"use client"

import { useState } from "react"
import { getAllCargoTypes, getCargoTypesByCategory, searchCargoTypes, type CargoType } from "@/utils/cargoRecommendationEngine"

interface CargoSelectionProps {
  onSelect: (cargoId: string) => void
}

export default function CargoSelection({ onSelect }: CargoSelectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  
  const allCargoTypes = getAllCargoTypes()
  const categories = [
    { id: "all", name: "All Categories", icon: "📋" },
    { id: "vehicles", name: "Vehicles", icon: "🚗" },
    { id: "home", name: "Home & Moving", icon: "🏠" },
    { id: "construction", name: "Construction", icon: "🏗️" },
    { id: "general", name: "General", icon: "📦" }
  ]

  // 过滤货物类型
  let filteredCargoTypes = allCargoTypes
  if (selectedCategory !== "all") {
    filteredCargoTypes = getCargoTypesByCategory(selectedCategory)
  }
  if (searchQuery) {
    filteredCargoTypes = searchCargoTypes(searchQuery)
  }

  return (
    <div className="mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 1: What are you securing?</h2>
        <p className="text-gray-600">
          Select the type of cargo you need to secure. We'll provide personalized recommendations.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for cargo type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all ${
                selectedCategory === category.id
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cargo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCargoTypes.map((cargo) => (
          <div
            key={cargo.id}
            onClick={() => onSelect(cargo.id)}
            className="group cursor-pointer bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            <div className="text-center">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                {cargo.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {cargo.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {cargo.description}
              </p>
              <div className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                <span>Select</span>
                <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredCargoTypes.length === 0 && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No cargo types found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Help Text */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Can't find your cargo type?</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                If you don't see your specific cargo type, select "General Cargo" for a safe, 
                general-purpose recommendation, or contact us for custom advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
