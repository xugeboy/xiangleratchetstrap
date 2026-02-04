"use client";

import { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';

const faqs = [
  {
    id: 1,
    question: "Monthly Production Capacity?",
    answer:
      "150,000+ units monthly. We scale production lines to meet wholesale demand for Amazon FBA and global distribution.",
  },
  {
    id: 2,
    question: "OEM / Private Label Options?",
    answer:
      "Yes. We offer custom logo weaving, custom casing colors, and specialized base plates (M8/M12) for OEM integrations.",
  },
  {
    id: 3,
    question: "Safety Certification Details?",
    answer:
      "Tested to ISO9001 standards. Every batch undergoes break strength verification at 1760 lbs with verified safety coefficients.",
  },
  {
    id: 4,
    question: "Minimum Order Quantity?",
    answer:
      "Minimum order quantity is 500 pieces for standard configurations. Custom configurations may have higher MOQs.",
  },
  {
    id: 5,
    question: "Lead Time for Production?",
    answer:
      "Standard lead time is 30-45 days for orders up to 10,000 units. Larger orders can be discussed for custom timelines.",
  },
];

export default function FAQSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <section className="py-40 px-6 lg:px-24 bg-white text-black relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-8">
            Engineered <span className="text-rose-600">QA</span>
          </h2>
          <div className="w-24 h-1 bg-rose-600 mx-auto mb-8" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div key={faq.id} className="border-b border-black/10 py-2">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex w-full justify-between items-center text-left py-8 hover:bg-slate-50 px-6 rounded-2xl transition-all"
                >
                  <span className="text-2xl font-black uppercase italic tracking-tighter">
                    {faq.question}
                  </span>
                  <div
                    className={`w-6 h-6 text-rose-600 transition-transform duration-300 ${
                      isOpen ? 'rotate-90' : ''
                    }`}
                  >
                    <FiChevronRight className="w-full h-full" />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 py-6' : 'max-h-0 opacity-0'
                  } px-8`}
                >
                  <p className="text-xl text-slate-500 font-light italic leading-relaxed text-left">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
