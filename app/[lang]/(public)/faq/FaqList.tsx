'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Faq } from '@/types/faq'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";

interface FaqListProps {
  faqs: Faq[]
}

export default function FaqList({ faqs }: FaqListProps) {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <dl className="space-y-4">
      {faqs.map((faq) => (
        <div key={faq.id} className="border-b border-gray-200">
          <button
            className="flex w-full items-center justify-between py-6 text-left"
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
          >
            <span className="text-base font-semibold leading-7 text-gray-900">
              {faq.Question}
            </span>
            <ChevronDownIcon
              className={`h-6 w-6 text-gray-600 transition-transform duration-200 ${
                openId === faq.id ? 'rotate-180 transform' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              openId === faq.id ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="pb-6 text-base leading-7 text-gray-600">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{faq.Answer}</ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
    </dl>
  )
} 