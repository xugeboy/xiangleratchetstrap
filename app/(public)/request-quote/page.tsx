import QuoteForm from '@/components/forms/QuoteForm'
import BentoGrids from '@/components/common/BentoGrids'

export default function RequestQuote() {
  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Bulk Pricing
          Quote Request
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          Contact our experts to discuss a custom pricing program that fits your particular business needs. Just fill out the form below and we'll be in touch!
          </p>
        </div>

        <div className="mb-16">
          <QuoteForm />
        </div>

        <BentoGrids />
      </div>
  )
}   
