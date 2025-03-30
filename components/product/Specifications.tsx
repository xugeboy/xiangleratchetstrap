'use client'

import { Product } from '@/types/product'

interface SpecificationsProps {
  product: Product
}

interface SpecItem {
  label: string
  value?: string
}

export default function Specifications({ product }: SpecificationsProps) {
  const specifications: SpecItem[] = [
    { label: 'Assembly break strength', value: product.assembly_break_strength },
    { label: 'Working load limit', value: product.working_load_limit },
    { label: 'Webbing break strength', value: product.webbing_break_strength },
    { label: 'Width', value: product.width },
    { label: 'Length', value: product.length },
    { label: 'End fitting', value: product.end_fitting },
    { label: 'Fixed End Length', value: product.fixed_end_length },
    { label: 'Ratchet handle', value: product.ratchet_handle },
    { label: 'Product weight', value: product.product_weight },
  ]

  // Filter out specs without values
  const validSpecs = specifications.filter(spec => spec.value)

  return (
    <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
      <h2 className="text-lg font-semibold bg-gray-100 px-4 py-2 border-b border-gray-200">
        Specifications
      </h2>
      <div>
        <table className="w-full border-collapse">
          <tbody>
            {Array.from({ length: Math.ceil(validSpecs.length / 2) }).map((_, rowIndex) => (
              <tr 
                key={rowIndex}
                className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="py-3 px-4 w-1/2">
                  <span className="text-gray-600 font-medium">
                    {validSpecs[rowIndex * 2]?.label}:
                  </span>
                  {' '}
                  <span className="text-gray-800">
                    {validSpecs[rowIndex * 2]?.value}
                  </span>
                </td>
                {validSpecs[rowIndex * 2 + 1] && (
                  <td className="py-3 px-4 w-1/2">
                    <span className="text-gray-600 font-medium">
                      {validSpecs[rowIndex * 2 + 1].label}:
                    </span>
                    {' '}
                    <span className="text-gray-800">
                      {validSpecs[rowIndex * 2 + 1].value}
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 