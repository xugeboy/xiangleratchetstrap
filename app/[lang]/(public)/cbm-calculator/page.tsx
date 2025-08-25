import Breadcrumb from '@/components/common/Breadcrumb'
import CbmCalculator from '@/components/tools/cbm/CbmCalculator'
import { getCombainedLocalePath } from '@/utils/formatUtils'

interface PageProps {
  params: { lang: string }
}

export default function Page({ params }: PageProps) {
  const { lang } = params
  const items = [
    { name: 'CBM Calculator', href: getCombainedLocalePath(lang, '/cbm-calculator') },
  ]

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb lang={lang} items={items} />
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Smart CBM & Pallet Calculator</h1>
        <p className="mt-3 text-sm text-black/70">Two-in-one: CBM calculation, pallet stacking plan, and container fit estimate.</p>
      </div>
      <div className="mt-8">
        <CbmCalculator />
      </div>
    </div>
  )
}


