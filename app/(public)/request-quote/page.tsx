import QuoteForm from '@/components/forms/QuoteForm'
import BentoGrids from '@/components/common/BentoGrids'

export default function RequestQuote() {
  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteForm />
        <BentoGrids />
      </div>
  )
}   
