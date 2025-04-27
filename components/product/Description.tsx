"use client";

import { useState } from "react";
import BlocksClient from "@/components/common/BlocksClient";

interface DescriptionProps {
    description?: [];
  }
  
  
  export default function Description({ description }: DescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    return (
      <div className="bg-white">
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <h2 className="text-lg font-semibold bg-gray-100 px-4 py-2 border-b border-gray-200">
          Description
        </h2>
        <div className="p-4">
          <div 
            className={`prose max-w-none relative ${
              !isExpanded ? 'max-h-[10em] overflow-hidden' : ''
            }`}
          >
            {/* <BlocksClient content={description} /> */}
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-amber-700 text-sm font-medium flex items-center"
          >
            {isExpanded ? (
              <>
                See Less
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                See More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
      </div>
    )
  }
  