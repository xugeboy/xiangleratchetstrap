"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What is the recommended tie-down angle range?",
    answer: "The recommended tie-down angle range is 30°–60° in accordance with EN 12195-1. This range provides the optimal balance between downward pressure (friction) and horizontal restraining force. Angles below 30° provide insufficient friction, while angles above 60° lack adequate horizontal restraining force."
  },
  {
    question: "Why is 30°–60° the optimal angle range?",
    answer: "In the 30°–60° range, straps provide both sufficient downward pressure for friction and effective horizontal force to prevent cargo movement. Below 30°, straps mainly 'pull' rather than 'press down', causing insufficient friction. Above 60°, straps mainly 'press down' but can't effectively prevent sliding."
  },
  {
    question: "How do I calculate effective strap capacity at any angle?",
    answer: "Multiply the strap's nominal WLL/LC by the sine of the angle. For example: 2000 lbs strap at 45° = 2000 × sin(45°) = 2000 × 0.707 = 1414 lbs effective capacity. Our calculator handles this automatically for any angle between 15° and 90°."
  },
  {
    question: "What's the difference between nominal and effective WLL/LC?",
    answer: "Nominal WLL/LC is the rating printed on the strap (measured at 90° angle). Effective WLL/LC is the actual restraining capacity at your specific tie-down angle. The effective capacity is always equal to or less than the nominal capacity, depending on the angle."
  },
  {
    question: "How do I measure tie-down angles accurately?",
    answer: "Use a digital angle finder, smartphone app, or protractor to measure the angle between the strap and the horizontal surface. Measure from where the strap leaves the cargo to where it connects to the vehicle. For best accuracy, measure multiple points along the strap length."
  },
  {
    question: "What are the practical angle recommendations for different cargo heights?",
    answer: "For low cargo, position tie-down points slightly lower (closer to floor) to maintain around 45°. For high cargo, you can raise tie-down points slightly, but avoid exceeding 60°. The goal is to stay within the 30°–60° optimal range for maximum effectiveness."
  },
  {
    question: "Can I use trigonometry to calculate angle efficiency?",
    answer: "Yes! The efficiency calculation is based on trigonometry. The vertical component of force = Total Force × sin(angle). This is why 30° gives 50% efficiency (sin 30° = 0.5) and 60° gives 86.6% efficiency (sin 60° = 0.866)."
  },
  {
    question: "How does the region selection affect angle calculations?",
    answer: "The physics of angle efficiency is universal across all regions. However, different regions use different terminology (WLL vs LC) and units (lbs vs kg). Our calculator automatically adjusts the display while keeping the same sine-based calculations."
  },
  {
    question: "Are there industry standards for minimum tie-down angles?",
    answer: "EN 12195-1 recommends tie-down angles of 30°–60°. DOT regulations require adequate restraining force, which typically means angles above 30°. Our calculator uses a minimum of 15° for practical applications, but angles below 30° require careful consideration and additional safety measures."
  },
  {
    question: "How do I optimize my tie-down setup for better angles?",
    answer: "Position tie-down points higher on your cargo or lower on your vehicle to create steeper angles. Use longer straps when possible to achieve better angles. Consider using multiple shorter straps instead of fewer long straps if it improves the angles. Aim for the 30°–60° optimal range."
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
            Common questions about tie-down angle efficiency, trigonometry calculations, and strap capacity optimization
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
              Our angle efficiency calculator uses trigonometry to help you understand how tie-down angles affect strap performance. 
              For complex cargo securement requirements, consult with qualified professionals.
            </p>
            <div className="text-sm text-blue-600">
              <p>• Measure angles with precision tools</p>
              <p>• Understand the sine function relationship</p>
              <p>• Optimize angles for maximum efficiency</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
