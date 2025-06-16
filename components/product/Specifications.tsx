"use client";

import { Product } from '@/types/product';
import { useTranslations } from 'next-intl';

interface SpecificationsProps {
  product: Product;
}

interface SpecItemDefinition {
  labelKey: string; 
  value?: string | number | null;
  accessor: (product: Product) => string | number | null | undefined; 
}

export default function Specifications({ product }: SpecificationsProps) {
  const t = useTranslations("ProductSpecifications");

  const specDefinitions: SpecItemDefinition[] = [
    { labelKey: "assemblyBreakStrength", accessor: (p) => p.assembly_break_strength },
    { labelKey: "workingLoadLimit", accessor: (p) => p.working_load_limit },
    { labelKey: "webbingBreakStrength", accessor: (p) => p.webbing_break_strength },
    { labelKey: "width", accessor: (p) => p.width },
    { labelKey: "length", accessor: (p) => p.length },
    { labelKey: "endFitting", accessor: (p) => p.end_fitting },
    { labelKey: "fixedEndLength", accessor: (p) => p.fixed_end_length },
    { labelKey: "ratchetHandle", accessor: (p) => p.ratchet_handle },
    { labelKey: "material", accessor: (p) => p.material },
    { labelKey: "finish", accessor: (p) => p.finish },
    { labelKey: "elongation_at_lc", accessor: (p) => p.elongation_at_lc },
    { labelKey: "compliance", accessor: (p) => p.compliance },
    { labelKey: "grade", accessor: (p) => p.grade },
    { labelKey: "productWeight", accessor: (p) => p.product_weight },
  ];

  const validSpecs = specDefinitions
    .map(specDef => ({
      label: t(specDef.labelKey),
      value: specDef.accessor(product),
    }))
    .filter(spec => spec.value !== null && spec.value !== undefined && spec.value !== '');


  if (validSpecs.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm"> {/* Added shadow */}
      <h2 className="text-lg font-semibold bg-gray-100 px-4 py-3 border-b border-gray-200 text-black"> {/* Adjusted padding and text color */}
        {t("Specifications")}
      </h2>
      <div>
        <table className="w-full border-collapse">
          <tbody>
            {Array.from({ length: Math.ceil(validSpecs.length / 2) }).map((_, rowIndex) => {
              const spec1 = validSpecs[rowIndex * 2];
              const spec2 = validSpecs[rowIndex * 2 + 1];

              return (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                >
                  {spec1 && (
                    <td className="py-3 px-4 w-1/2 border-r border-gray-200 last:border-r-0"> {/* Added border */}
                      <span className="text-sm text-black font-medium">
                        {spec1.label}:
                      </span>
                      {' '}
                      <span className="text-sm text-black">
                        {spec1.value}
                      </span>
                    </td>
                  )}

                  {spec2 ? (
                    <td className="py-3 px-4 w-1/2">
                      <span className="text-sm text-black font-medium">
                        {spec2.label}:
                      </span>
                      {' '}
                      <span className="text-sm text-black">
                        {spec2.value}
                      </span>
                    </td>
                  ) : (
                    spec1 && <td className="py-3 px-4 w-1/2"></td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}