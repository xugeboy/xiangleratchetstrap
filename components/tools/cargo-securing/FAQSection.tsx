"use client"

import { useRegion } from "@/contexts/RegionContext"


export function FAQSection() {
  const { selectedRegion } = useRegion();

  const regionFAQs = {
    north_america: [
      {
        question: "How many tie down straps do I need for 20 feet cargo?",
        answer: "According to DOT standards (US), you need at least 3 tie-downs for cargo over 20 feet (6.1m). For cargo under 20 feet, minimum 2 tie-downs are required. Additional tie-downs may be needed based on cargo weight and securing method.",
      },
      {
        question: "What is WLL in cargo securement?",
        answer: "WLL (Working Load Limit) is the maximum safe working load that a tie-down strap can handle according to DOT standards. It's used to calculate the required number of tie-downs and ensure cargo weight is properly distributed across securing equipment.",
      },
      {
        question: "What are the main DOT cargo securement requirements?",
        answer: "DOT requirements include: aggregate WLL ≥ 50% of cargo weight for indirect securement, direct tie-downs contribute 100% of their WLL, minimum tie-downs based on cargo length, and compliance with commercial vehicle regulations.",
      },
      {
        question: "How do I calculate tie down requirements for DOT compliance?",
        answer: "Use our North America calculator by selecting your region, entering cargo weight, dimensions, securing method (direct/indirect), and tie-down angle. The tool automatically calculates required WLL and recommends appropriate tie-down configurations based on DOT standards.",
      },
      {
        question: "What's the difference between direct and indirect tie-downs in DOT standards?",
        answer: "Direct tie-downs connect cargo attachment points directly to the vehicle, providing 100% efficiency. Indirect tie-downs go over the top of cargo and require aggregate WLL ≥ 50% of cargo weight under DOT regulations.",
      },
      {
        question: "What safety margin should I use for DOT cargo securement?",
        answer: "DOT standards require minimum 20% safety margin for cargo securement. This ensures adequate capacity to handle dynamic loads during transportation and provides a buffer for unexpected conditions.",
      },
      {
        question: "Are there different requirements for different cargo types under DOT?",
        answer: "Yes, DOT has specific requirements for different cargo types. Heavy machinery often requires direct tie-downs, while general cargo can use indirect methods. Always ensure compliance with DOT regulations for your specific cargo.",
      },
      {
        question: "How does DOT ensure commercial vehicle safety?",
        answer: "DOT ensures commercial vehicle safety through comprehensive regulations covering cargo securement, vehicle maintenance, driver qualifications, and regular inspections. Compliance is enforced by state and federal authorities.",
      },
      {
        question: "Which units should I use for DOT calculations?",
        answer: "DOT standards use imperial units: weight in pounds (lbs), dimensions in feet (ft). Our calculator automatically applies the correct units for North American compliance.",
      },
      {
        question: "How often should I verify my DOT cargo securing calculations?",
        answer: "Verify calculations whenever cargo characteristics change (weight, dimensions, type) or when transporting to different states. Regular verification ensures continued DOT compliance and safety.",
      }
    ],
    europe_australia: [
      {
        question: "How many lashing straps do I need for 6 meter cargo?",
        answer: "According to EN 12195-1 and AS/NZS 4380 standards, you need at least 3 lashing straps for cargo over 6.0m. For cargo under 3.0m, minimum 2 straps are required. Additional straps may be needed based on cargo weight and securing method.",
      },
      {
        question: "What is the difference between STF and LC in lashing?",
        answer: "STF (Standard Tension Force) is used in indirect lashing and represents the force applied when tensioning the strap. LC (Lashing Capacity) is used in direct lashing and represents the maximum allowed force for the strap. They are different values found on different parts of the strap label.",
      },
      {
        question: "What are the main EN 12195-1 and AS/NZS 4380 requirements?",
        answer: "Key requirements include: minimum 2 lashing straps always required, indirect and direct lashing methods supported, STF/LC-based calculations, metric units (kg, m), and comprehensive safety factors for cargo stability.",
      },
      {
        question: "How do I calculate lashing requirements for EN 12195-1 compliance?",
        answer: "Use our Europe & Australia calculator by selecting your region, entering cargo weight, dimensions, securing method (indirect/direct), and lashing angles. The tool automatically calculates required STF/LC and recommends appropriate configurations.",
      },
      {
        question: "What's the difference between indirect and direct lashing in EN standards?",
        answer: "Indirect lashing uses friction between cargo and vehicle bed, while direct lashing connects cargo attachment points directly to the vehicle. Each method has different calculation formulas and efficiency factors.",
      },
      {
        question: "How does tie-down angle affect securing capacity in EN standards?",
        answer: "Angle significantly affects capacity in EN 12195-1 and AS/NZS 4380 where efficiency follows regional references (e.g., 60° ≈ 0.87). The calculator automatically applies angle efficiency factors for accurate results.",
      },
      {
        question: "What safety margin should I use for EN 12195-1 compliance?",
        answer: "EN 12195-1 requires 30% safety margin, while AS/NZS 4380 requires 25% minimum. Our calculator automatically applies the correct safety margin based on your selected region.",
      },
      {
        question: "Are there different requirements for unstable cargo in EN standards?",
        answer: "Yes, EN 12195-1 includes specific tipping calculations for unstable cargo (height > width) with enhanced safety factors. AS/NZS 4380 also addresses unstable cargo scenarios with appropriate safety considerations.",
      },
      {
        question: "Which units should I use for EN 12195-1 and AS/NZS 4380 calculations?",
        answer: "Both standards use metric units: weight in kilograms (kg), dimensions in meters (m). Our calculator automatically applies the correct units for international compliance.",
      },
      {
        question: "How do international standards differ from each other?",
        answer: "EN 12195-1 (Europe) and AS/NZS 4380 (Australia) are very similar but may have slight regional variations. Both use metric units and STF/LC calculations, but local regulations may have additional requirements.",
      }
    ]
  };

  const currentFAQs = regionFAQs[selectedRegion];

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* FAQ Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            {selectedRegion === 'north_america' 
              ? 'Common questions about DOT cargo securing standards and North American compliance requirements'
              : 'Common questions about EN 12195-1 and AS/NZS 4380 cargo securing standards and international compliance requirements'
            }
          </p>
        </div>

        <div className="grid gap-6">
          {currentFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            Need More Help?
          </h3>
          <p className="text-blue-800 mb-6">
            Our {selectedRegion === 'north_america' ? 'DOT-compliant' : 'EN 12195-1 and AS/NZS 4380 compliant'} cargo securing calculator is designed to be comprehensive and user-friendly, 
            but cargo securing can be complex. Always consult with qualified professionals 
            for critical applications or when in doubt.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl mb-2">📚</div>
              <div className="font-medium text-gray-900">Documentation</div>
              <div className="text-gray-600">
                {selectedRegion === 'north_america' ? 'Review DOT standards' : 'Review EN 12195-1 and AS/NZS 4380 standards'}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl mb-2">🔍</div>
              <div className="font-medium text-gray-900">Verification</div>
              <div className="text-gray-600">Double-check calculations</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl mb-2">👨‍💼</div>
              <div className="font-medium text-gray-900">Professional</div>
              <div className="text-gray-600">Consult experts</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
