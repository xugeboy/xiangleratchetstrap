"use client"

import { useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { ProductFilter, FilterOption } from "@/types/productFilter"

interface CategoryFilterProps {
  filter: ProductFilter
  selectedValues: string[]
  onChange: (filterId: string, value: string) => void
}

export function CategoryFilter({ filter, selectedValues, onChange }: CategoryFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleOptionClick = (value: string) => {
    onChange(filter.id, value)
  }

  return (
    <div className="p-4">
      <button
        type="button"
        className="flex items-center justify-between w-full text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-medium text-gray-900">{filter.label}</span>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-400 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-2">
          {filter.options.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 text-sm"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => handleOptionClick(option.value)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">
                {option.label} ({option.count})
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

