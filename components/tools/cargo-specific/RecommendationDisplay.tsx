"use client"

import { type CargoRecommendation } from "@/utils/cargoRecommendationEngine"

interface RecommendationDisplayProps {
  recommendation: CargoRecommendation
  additionalDetails: Record<string, string>
  onStartOver: () => void
  onBack: () => void
}

export default function RecommendationDisplay({ 
  recommendation, 
  additionalDetails, 
  onStartOver, 
  onBack 
}: RecommendationDisplayProps) {
  const { cargoType, recommendation: strapRecommendation } = recommendation

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{cargoType.icon}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Personalized Recommendation
        </h2>
        <p className="text-gray-600">
          Here's what we recommend for securing your {cargoType.name.toLowerCase()}
        </p>
      </div>

      {/* Main Recommendation Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 mb-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">
            Recommended Strap Kit
          </h3>
          <p className="text-blue-700">
            Complete solution for safe and secure transport
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strap Specifications */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-3">Strap Specifications</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium text-gray-900">{strapRecommendation.quantity} straps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Length:</span>
                  <span className="font-medium text-gray-900">{strapRecommendation.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Working Load Limit:</span>
                  <span className="font-medium text-gray-900">{strapRecommendation.wll}</span>
                </div>
              </div>
            </div>

            {/* Accessories */}
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-3">Recommended Accessories</h4>
              <div className="space-y-2">
                {strapRecommendation.accessories.map((accessory, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{accessory}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pro Tip & Bundle Info */}
          <div className="space-y-4">
            {/* Pro Tip */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-yellow-800">Pro Tip</h4>
                  <p className="mt-1 text-sm text-yellow-700">{strapRecommendation.proTip}</p>
                </div>
              </div>
            </div>

            {/* Bundle Discount */}
            {strapRecommendation.bundleDiscount && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {strapRecommendation.bundleDiscount}% OFF
                  </div>
                  <p className="text-sm text-green-700">
                    Save money when you buy the complete kit!
                  </p>
                </div>
              </div>
            )}

            {/* Additional Details Summary */}
            {Object.keys(additionalDetails).length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Your Selections</h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(additionalDetails).map(([field, value]) => (
                    <div key={field} className="flex justify-between">
                      <span className="text-gray-600">{field}:</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            View Recommended Products
          </button>
          <button className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
            Buy Complete Kit
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
          >
            Back to Details
          </button>
          <button
            onClick={onStartOver}
            className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Related Article */}
        {strapRecommendation.relatedArticle && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h4 className="font-semibold text-gray-900">Learn More</h4>
            </div>
            <p className="text-gray-600 mb-3">
              Read our detailed guide on how to properly secure your {cargoType.name.toLowerCase()}.
            </p>
            <a
              href={strapRecommendation.relatedArticle}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Read Article
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}

        {/* Video Tutorial */}
        {strapRecommendation.videoUrl && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h4 className="font-semibold text-gray-900">Video Tutorial</h4>
            </div>
            <p className="text-gray-600 mb-3">
              Watch our step-by-step video guide for proper securing techniques.
            </p>
            <a
              href={strapRecommendation.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
            >
              Watch Video
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Feedback Section */}
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <h4 className="font-semibold text-gray-900 mb-2">Didn't find what you were looking for?</h4>
        <p className="text-gray-600 mb-4">
          Help us improve by telling us about your specific cargo type.
        </p>
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors">
          Suggest New Cargo Type
        </button>
      </div>
    </div>
  )
}
