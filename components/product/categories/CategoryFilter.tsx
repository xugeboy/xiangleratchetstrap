"use client"

import { useState } from "react"

interface FilterOption {
  value: string
  label: string
  count: number
}

interface Filter {
  id: string
  label: string
  options: FilterOption[]
}

interface CategoryFilterProps {
  filter: Filter
  selectedValues: string[]
  onChange: (filterId: string, value: string) => void
}

export function CategoryFilter({ filter, selectedValues, onChange }: CategoryFilterProps) {
  const [showAll, setShowAll] = useState(false)

  // Show only first 5 options initially, unless showAll is true
  const visibleOptions = showAll ? filter.options : filter.options.slice(0, 5)
  const hasMoreOptions = filter.options.length > 5

  return (
    <div className="py-4">
      <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase">{filter.label}</h3>
      <div className="space-y-2">
        {visibleOptions.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="checkbox"
              id={`${filter.id}-${option.value}`}
              value={option.value}
              checked={selectedValues?.includes(option.value) || false}
              onChange={() => onChange(filter.id, option.value)}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={`${filter.id}-${option.value}`} className="ml-2 text-sm text-gray-700">
              {option.label} ({option.count})
            </label>
          </div>
        ))}

        {hasMoreOptions && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-2 text-sm text-blue-600 hover:underline flex items-center"
          >
            {showAll ? "- Show less" : "+ Show more"}
          </button>
        )}
      </div>
    </div>
  )
}

