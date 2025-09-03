"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What is the difference between indirect and direct lashing?",
    answer: "Indirect lashing (friction lashing) uses sin(α) calculation and relies on friction between cargo and vehicle surface. Direct lashing uses cos(α) × cos(β) calculation and directly restrains cargo movement. The choice depends on your cargo securing method and EN 12195-1 requirements."
  },
  {
    question: "How do I calculate geometric efficiency for indirect lashing?",
    answer: "For indirect lashing, geometric efficiency = sin(α) × 100%, where α is the vertical angle. At 90° (vertical), you get 100% efficiency. At 45°, you get 70.7% efficiency. At 30°, you get 50% efficiency. Our calculator shows real-time efficiency as you adjust the angle."
  },
  {
    question: "How do I calculate geometric efficiency for direct lashing?",
    answer: "For direct lashing, geometric efficiency = cos(α) × cos(β) × 100%, where α is the vertical angle and β is the horizontal angle. Both angles must be optimized for maximum efficiency. Perfect alignment (0° both angles) gives 100% efficiency."
  },
  {
    question: "What efficiency levels are considered good for cargo securing?",
    answer: "High efficiency (>85%) is excellent for optimal force transfer. Medium efficiency (50-85%) is acceptable but consider optimization. Low efficiency (<50%) requires stronger straps or angle adjustment. Our calculator provides specific recommendations based on your efficiency level."
  },
  {
    question: "How do EN 12195-1 and AS/NZS 4380 standards affect angle calculations?",
    answer: "Both European (EN 12195-1) and Australian (AS/NZS 4380) standards use the same geometric efficiency principles. The physics of angle efficiency is universal - only the terminology and units differ. Our calculator applies the correct trigonometric formulas for both standards."
  },
  {
    question: "What are the practical angle recommendations for different lashing methods?",
    answer: "For indirect lashing, aim for steeper angles (60°-90°) to maximize sin(α) efficiency. For direct lashing, keep both vertical and horizontal angles as small as possible (0°-30°) to maximize cos(α) × cos(β) efficiency. Our calculator provides specific recommendations for each method."
  },
  {
    question: "Can I use trigonometry to calculate angle efficiency?",
    answer: "Yes! The efficiency calculation is based on trigonometry. For indirect lashing: Efficiency = sin(α) × 100%. For direct lashing: Efficiency = cos(α) × cos(β) × 100%. This is why angle selection is critical for cargo securing compliance."
  },
  {
    question: "How do I measure lashing angles accurately?",
    answer: "Use a digital angle finder, smartphone app, or protractor to measure the angle between the strap and the reference surface. For indirect lashing, measure the vertical angle α. For direct lashing, measure both vertical angle α and horizontal angle β. Measure multiple points along the strap for accuracy."
  },
  {
    question: "Are there industry standards for minimum lashing angles?",
    answer: "EN 12195-1 and AS/NZS 4380 standards require adequate geometric efficiency for cargo securing compliance. While there are no specific minimum angles, low efficiency (<50%) typically requires stronger straps or angle adjustment. Our calculator helps ensure compliance with these standards."
  },
  {
    question: "How do I optimize my lashing setup for better efficiency?",
    answer: "For indirect lashing, position lashing points to achieve steeper angles (60°-90°). For direct lashing, minimize both vertical and horizontal angles (0°-30°). Use longer straps when possible to achieve better angles. Our calculator provides specific optimization recommendations based on your current setup."
  }
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Common questions about European and Australian angle efficiency standards, indirect vs direct lashing, and geometric efficiency optimization
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors"
              >
                <span className="text-lg font-medium text-gray-900">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    openItems.has(index) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              {openItems.has(index) && (
                <div className="px-6 pb-4">
                  <div className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Need More Help?
            </h3>
            <p className="text-blue-700 mb-4">
              Our European and Australian angle efficiency calculator uses trigonometry to help you understand how lashing angles affect strap performance. 
              For complex cargo securing requirements, consult with qualified professionals familiar with EN 12195-1 and AS/NZS 4380 standards.
            </p>
            <div className="text-sm text-blue-600">
              <p>• Choose the correct lashing mode (indirect vs direct)</p>
              <p>• Understand the trigonometric function relationships</p>
              <p>• Optimize angles for maximum geometric efficiency</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
