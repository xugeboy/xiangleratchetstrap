"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Faq } from "@/types/faq";
import BlocksClient from "@/components/common/BlocksClient";

interface FaqListProps {
  faqs: Faq[];
}

export default function FaqList({ faqs }: FaqListProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <dl className="space-y-4">
      {faqs.map((faq) => (
        <div key={faq.id} className="border-b border-gray-200">
          <dt>
            <button
              className="flex w-full items-center justify-between py-6 text-left"
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            >
              <h3 className="text-base font-semibold leading-7 text-black">
                {faq.Question}
              </h3>
              <ChevronDownIcon
                className={`h-6 w-6 text-black transition-transform duration-200 ${
                  openId === faq.id ? "rotate-180 transform" : ""
                }`}
              />
            </button>
          </dt>
          <dd
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              openId === faq.id ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="pb-6 text-base leading-7 text-black">
              <BlocksClient content={faq.BlockAnswer} />
            </div>
          </dd>
        </div>
      ))}
    </dl>
  );
}
