"use client"

import { useState } from 'react'

interface Calculator {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

interface CalculatorTabsProps {
  calculators: Calculator[]
  children: React.ReactNode[]
}

export default function CalculatorTabs({ calculators, children }: CalculatorTabsProps) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {calculators.map((calculator, index) => (
            <button
              key={calculator.id}
              onClick={() => setActiveTab(index)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === index
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{calculator.icon}</span>
                <span>{calculator.title}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {children.map((child, index) => (
          <div
            key={index}
            className={activeTab === index ? 'block' : 'hidden'}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
