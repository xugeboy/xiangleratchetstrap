interface ProductModelsProps {
    categoryName: string
    description: string
  }
  
  export function ProductModels({ categoryName, description }: ProductModelsProps) {
    return (
      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-bold mb-4">{categoryName} Models:</h2>
        <div className="prose max-w-none">
          <ul className="list-disc pl-5 space-y-2">
            {description
              .split("\n")
              .filter((line) => line.trim())
              .map((line, index) => (
                <li key={index}>{line}</li>
              ))}
          </ul>
        </div>
  
        <p className="mt-6 text-sm">
          Ancra straps meet DOT specifications and are tested for strength and durability. Meets or exceeds WSTDA T-1
          Recommended Standard Specifications for synthetic web tie downs.
        </p>
      </div>
    )
  }
  
  