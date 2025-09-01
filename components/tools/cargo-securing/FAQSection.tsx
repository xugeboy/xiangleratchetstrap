"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "How many tie down straps do I need for 20 feet cargo?",
    answer: "According to DOT regulations, cargo over 20 feet (6.1 meters) requires at least 3 tie-downs. Our calculator determines the exact number based on your specific cargo weight and dimensions. For cargo between 10-20 feet, you need at least 2 tie-downs, and for cargo under 10 feet, 1 tie-down is typically sufficient."
  },
  {
    question: "What is AWLL in cargo securement?",
    answer: "AWLL (Aggregate Working Load Limit) is the total working load limit of all tie-downs used to secure cargo. It must be at least 50% of the cargo weight for indirect tie-downs and 100% for direct tie-downs. This ensures that your tie-downs can handle the forces exerted during transportation."
  },
  {
    question: "What are the main international cargo securement standards?",
    answer: "The main international cargo securement standards include: DOT (United States), AS/NS 4380 (Australia/New Zealand), EN12195-2 (Europe), and others. Each standard has specific requirements for minimum tie-downs, AWLL calculations, and safety factors. Our calculator provides guidance based on these international standards."
  },
  {
    question: "How do I calculate tie down requirements?",
    answer: "Use our calculator by entering cargo weight, dimensions, securing method (direct/indirect), and tie-down angle. The tool automatically calculates required AWLL and recommends appropriate tie-down configurations based on DOT regulations and industry standards."
  },
  {
    question: "What's the difference between direct and indirect tie-downs?",
    answer: "Direct tie-downs connect cargo attachment points directly to the vehicle, providing 100% efficiency. Indirect tie-downs go over the top of cargo and require angle consideration - steeper angles provide better efficiency. Our calculator accounts for these differences automatically."
  },
  {
    question: "How does tie-down angle affect securing capacity?",
    answer: "Tie-down angle significantly affects securing capacity. 90° angles provide 100% efficiency, while 30° angles only provide 50% efficiency. Our calculator shows the exact efficiency factor for your chosen angle and adjusts the required AWLL accordingly."
  },
  {
    question: "What safety margin should I use for cargo securement?",
    answer: "Industry best practices recommend a 10-20% safety margin above the calculated requirements. Our calculator provides recommendations with appropriate safety margins to ensure your cargo is securely fastened even under unexpected conditions."
  },
  {
    question: "Are there different requirements for different cargo types?",
    answer: "Yes, different cargo types may have specific requirements. Heavy machinery often requires direct tie-downs, while general cargo can use indirect methods. Our calculator provides recommendations based on your specific cargo characteristics and international regulations."
  },
  {
    question: "How do international standards differ from each other?",
    answer: "International standards differ in specific requirements: DOT (US) focuses on minimum tie-down counts and AWLL calculations, AS/NS 4380 (Australia) emphasizes load restraint assemblies, while EN12195-2 (Europe) provides detailed lashing and securing guidelines. Our calculator helps navigate these differences."
  },
  {
    question: "Which standard should I follow for international shipping?",
    answer: "For international shipping, follow the standard of your destination country or the most stringent standard applicable to your route. Our calculator provides guidance based on major international standards, but always verify specific requirements with local authorities and qualified professionals."
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
