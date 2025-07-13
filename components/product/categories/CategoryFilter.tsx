"use client"

import { useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { ProductFilter } from "@/types/productFilter"
import { useTranslations } from "next-intl"

interface CategoryFilterProps {
  filter: ProductFilter
  selectedValues: string[]
  onChange: (filterId: string, value: string) => void
}

export function toCamelCase(inputString: string): string {
  if (!inputString) {
    return "";
  }
  const words = inputString.split(' ').filter(word => word.length > 0);

  if (words.length === 0) {
    return "";
  }
  let result = words[0].toLowerCase();
  for (let i = 1; i < words.length; i++) {
    result += words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }

  return result;
}
export function CategoryFilter({ filter, selectedValues, onChange }: CategoryFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleOptionClick = (value: string) => {
    onChange(filter.id, value)
  }

  const t = useTranslations("ProductSpecifications");
  return (
    <div className="p-4">
      <button
        type="button"
        className="flex items-center justify-between w-full text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-medium text-black">{t(toCamelCase(filter.label))}</span>
        <ChevronDownIcon
          className={`h-5 w-5 text-black transition-transform ${
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
                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-blue-500"
              />
              <span className="text-black">
                {option.label} ({option.count})
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

