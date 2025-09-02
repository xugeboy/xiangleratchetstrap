"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "How many tie down straps do I need for 20 feet cargo?",
    answer:
      "Requirements vary by region: DOT (US) requires at least 3 tie-downs for cargo over 20 feet (6.1m), AS/NZS 4380 (Australia) requires 3+ for cargo over 6.0m, and EN12195-2 (Europe) requires 3+ for cargo over 6.0m. Our calculator automatically applies the correct standard based on your selected region.",
  },
  {
    question: "What is WLL/LC in cargo securement?",
    answer:
      "WLL (Working Load Limit) in North America or LC (Load Capacity) in Australia/Europe is the total working load limit of all tie-downs used to secure cargo. DOT (US) requires the aggregate WLL to be at least 50% of the cargo weight for indirect (over-the-top) securement; AS/NZS 4380 requires 60%; EN12195-2 requires 50%. Direct tie-downs require 100% across all standards.",
  },
  {
    question: "What are the main international cargo securement standards?",
    answer:
      "The main international cargo securement standards include: DOT (United States), AS/NS 4380 (Australia/New Zealand), EN12195-2 (Europe), and others. Each standard has specific requirements for minimum tie-downs, WLL/LC calculations, and safety factors. Our calculator provides guidance based on these international standards.",
  },
  {
    question: "How do I calculate tie down requirements?",
    answer:
      "Use our calculator by selecting your region, entering cargo weight, dimensions, securing method (direct/indirect), and tie-down angle. The tool automatically calculates required WLL/LC and recommends appropriate tie-down configurations based on regional standards.",
  },
  {
    question: "What's the difference between direct and indirect tie-downs?",
    answer:
      "Direct tie-downs connect cargo attachment points directly to the vehicle, providing 100% efficiency. Indirect tie-downs go over the top of cargo and require angle consideration in AU/EU; DOT (US) uses a 50% aggregate WLL rule without angle reduction. Our calculator accounts for these differences automatically.",
  },
  {
    question: "How does tie-down angle affect securing capacity?",
    answer:
      "Angle significantly affects capacity in AU/EU where efficiency follows regional references (e.g., 60° ≈ 0.87). Under DOT (US) the aggregate WLL rule (50% of load) is applied for indirect methods; angle is not used to reduce the capacity requirement.",
  },
  {
    question: "What safety margin should I use for cargo securement?",
    answer:
      "Safety margins vary by region: DOT (US) requires minimum 20%, AS/NZS 4380 (Australia) requires 25%, and EN12195-2 (Europe) requires 30%. Our calculator automatically applies the correct safety margin based on your selected region and provides recommendations accordingly.",
  },
  {
    question: "Are there different requirements for different cargo types?",
    answer:
      "Yes, different cargo types may have specific requirements. Heavy machinery often requires direct tie-downs, while general cargo can use indirect methods. Our calculator provides recommendations based on your specific cargo characteristics and international regulations.",
  },
  {
    question: "How do international standards differ from each other?",
    answer:
      "International standards differ in specific requirements: DOT (US) uses an aggregate 50% WLL rule for indirect securement; AS/NS 4380 (Australia) emphasizes 60% with angle considerations; EN12195-2 (Europe) sets detailed lashing guidance with 50% and angle factors. Our calculator helps navigate these differences.",
  },
  {
    question: "Which standard should I follow for international shipping?",
    answer:
      "For international shipping, follow the standard of your destination country or the most stringent standard applicable to your route. Our calculator provides guidance based on major international standards, but always verify specific requirements with local authorities and qualified professionals.",
  },
  {
    question: "How does the region selection affect calculations?",
    answer:
      "The region selection automatically sets the appropriate units (lbs/ft for North America, kg/m for Australia/Europe) and applies the correct calculation standards. DOT (US): aggregate WLL ≥ 50% of cargo weight and 20% safety margin. AS/NZS 4380: 60% factor and 25% safety margin. EN12195-2: 50% factor and 30% safety margin.",
  },
];

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
            Common questions about international cargo securement standards and tie-down requirements
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
              Our cargo securement calculator is designed to help you comply with international regulations. 
              For specific questions about your cargo or transportation requirements, consult with qualified professionals.
            </p>
            <div className="text-sm text-blue-600">
              <p>• Always follow local and federal regulations</p>
              <p>• Inspect tie-downs before each trip</p>
              <p>• Ensure proper tension and angle</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
