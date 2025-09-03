"use client";

import { useRegion } from "@/contexts/RegionContext";

export function SEOContentSection() {
  const { selectedRegion } = useRegion();

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {selectedRegion === 'north_america' 
              ? 'Mastering North American Cargo Securement: A Guide to FMCSA & NSC Rules'
              : 'The Engineer\'s Approach: Load Restraint with EN 12195-1 Standard'
            }
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            {selectedRegion === 'north_america'
              ? 'Navigating the complexities of cargo securement regulations in North America can be challenging. Governed by the Federal Motor Carrier Safety Administration (FMCSA) in the United States and Canada&apos;s National Safety Code (NSC) Standard 10, these rules are built on a foundation of performance standards designed to withstand real-world forces.'
              : 'Unlike North America&apos;s prescriptive rules, the European cargo securement standard, EN 12195-1, is a comprehensive, physics-based system. It treats cargo securement as an engineering calculation, requiring a deeper understanding of the forces at play to create a securement plan that is both safe and efficient.'
            }
          </p>
        </div>

        {selectedRegion === 'north_america' ? (
          <NorthAmericaContent />
        ) : (
          <EuropeContent />
        )}
      </div>
    </section>
  );
}

function NorthAmericaContent() {
  return (
    <div className="space-y-12">
      {/* Core Principles */}
      <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Core Principles of North American Cargo Securement
        </h3>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            The core principle of the North American system is that your cargo securement must be strong enough to resist <strong>0.8g of forward force</strong> (hard braking), <strong>0.5g of rearward force</strong> (acceleration), and <strong>0.5g of sideways force</strong> (turning). To simplify these physics, the regulations provide two parallel, mandatory pillars for compliance:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-blue-900 mb-3">
                Pillar 1: Aggregate Working Load Limit (AWLL)
              </h4>
              <p className="text-blue-800">
                The total strength of your securement system must be at least <strong>50% of your cargo&apos;s total weight</strong>.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-green-900 mb-3">
                Pillar 2: Minimum Number of Tie-Downs
              </h4>
              <p className="text-green-800">
                You must use a minimum number of straps based on the cargo&apos;s length and positioning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pillar 1: AWLL */}
      <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Pillar 1: Calculating Your Aggregate Working Load Limit (AWLL)
        </h3>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            The fundamental rule is that the total strength of your securement system (the AWLL) must be at least <strong>50% of your cargo&apos;s total weight</strong>. However, calculating the AWLL isn&apos;t as simple as adding up the Working Load Limits (WLL) of your straps. The contribution of each tie-down depends on how it&apos;s used:
          </p>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">
                Direct Tie-Downs
              </h4>
              <p className="text-blue-800 mb-3">
                Each strap attached directly from the vehicle to the cargo contributes <strong>100% of its WLL</strong> to the AWLL. This method is common for heavy machinery with dedicated attachment points.
              </p>
              <div className="bg-blue-100 rounded-lg p-4">
                <p className="text-blue-900 font-medium">
                  Formula: Direct Tie-Down Contribution = 50% × WLL
                </p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-green-900 mb-3">
                Indirect Tie-Downs (Cross-Vehicle)
              </h4>
              <p className="text-green-800 mb-3">
                Straps that go over or around the cargo and anchor to opposite sides of the vehicle contribute <strong>100% of their WLL</strong>. This is the most common method for palletized goods or lumber.
              </p>
              <div className="bg-green-100 rounded-lg p-4">
                <p className="text-green-900 font-medium">
                  Formula: Cross-Vehicle Contribution = 100% × WLL
                </p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-amber-900 mb-3">
                Indirect Tie-Downs (Same Side)
              </h4>
              <p className="text-amber-800 mb-3">
                If a strap goes around the cargo but anchors back to the same side of the vehicle, it only contributes <strong>50% of its WLL</strong>. This is a critical and often overlooked detail that can lead to non-compliance.
              </p>
              <div className="bg-amber-100 rounded-lg p-4">
                <p className="text-amber-900 font-medium">
                  Formula: Same-Side Contribution = 50% × WLL
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pillar 2: Minimum Tie-Down Count */}
      <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Pillar 2: Meeting the Minimum Tie-Down Count
        </h3>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            Independently of the AWLL strength calculation, you must also use a minimum number of straps based on the cargo&apos;s length and how it&apos;s positioned. For cargo not blocked by a headboard or bulkhead:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-900 mb-2">1</div>
              <h4 className="font-semibold text-blue-900 mb-2">Tie-Down</h4>
              <p className="text-sm text-blue-800">
                For articles ≤ 5 feet in length and ≤ 1,100 lbs.
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-900 mb-2">2</div>
              <h4 className="font-semibold text-green-900 mb-2">Tie-Downs</h4>
              <p className="text-sm text-green-800">
                For articles ≤ 5 feet but over 1,100 lbs, or for any article between 5 and 10 feet long, regardless of weight.
              </p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-900 mb-2">3+</div>
              <h4 className="font-semibold text-purple-900 mb-2">Tie-Downs</h4>
              <p className="text-sm text-purple-800">
                For articles longer than 10 feet, you need 2 tie-downs for the first 10 feet, plus one additional tie-down for every 10 feet (or portion thereof) after that.
              </p>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-amber-900 mb-2">⚠️</div>
              <h4 className="font-semibold text-amber-900 mb-2">Critical</h4>
              <p className="text-sm text-amber-800">
                Don&apos;t guess on safety. These dual requirements make manual calculation complex and prone to error.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EuropeContent() {
  return (
    <div className="space-y-12">
      {/* Key Principles */}
      <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Key Principles of EN 12195-1
        </h3>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            The standard is built to counteract the same forces as the North American rules—<strong>0.8g forward</strong>, <strong>0.5g rearward</strong>, and <strong>0.5g sideways</strong>—but it does so through detailed formulas that account for the real-world variables of each unique load.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">
                Friction is a Calculated Force
              </h4>
              <p className="text-blue-800 text-sm">
                EN 12195-1 formally includes the coefficient of friction (µ) in its calculations. The friction between your cargo and the vehicle deck is a measurable force that helps secure the load.
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-green-900 mb-3">
                STF vs. LC: A Critical Distinction
              </h4>
              <p className="text-green-800 text-sm">
                European standards make a crucial distinction between STF (Standard Tension Force) and LC (Lashing Capacity) values on a lashing&apos;s label.
              </p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-purple-900 mb-3">
                Angles Matter Mathematically
              </h4>
              <p className="text-purple-800 text-sm">
                The angle of your lashing straps is not just a best practice—it&apos;s a critical variable in the formula that affects efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* STF vs LC */}
      <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          STF vs. LC: Understanding the Critical Distinction
        </h3>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            European standards make a crucial distinction between two values on a lashing&apos;s label, which are used for different methods. Using the wrong value in your calculation is a common and dangerous mistake.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-blue-900 mb-4">
                STF (Standard Tension Force)
              </h4>
              <div className="space-y-3">
                <p className="text-blue-800">
                  This is the <strong>residual tension</strong>, or &ldquo;pre-tension,&rdquo; applied by a tensioning device like a ratchet.
                </p>
                <p className="text-blue-800">
                  It is the <strong>single most important value</strong> for indirect (top-over) lashing, as this tension creates the pressure that generates friction.
                </p>
                <div className="bg-blue-100 rounded-lg p-4">
                  <p className="text-blue-900 font-medium">
                    Used for: Indirect lashing calculations
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-green-900 mb-4">
                LC (Lashing Capacity)
              </h4>
              <div className="space-y-3">
                <p className="text-green-800">
                  This is the <strong>maximum force</strong> a strap can handle in a straight pull.
                </p>
                <p className="text-green-800">
                  It is the <strong>key value</strong> used for direct lashing, where the strap directly opposes the cargo&apos;s movement.
                </p>
                <div className="bg-green-100 rounded-lg p-4">
                  <p className="text-green-900 font-medium">
                    Used for: Direct lashing calculations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Friction and Anti-slip */}
      <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Friction: A Measurable Force in Your Calculations
        </h3>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            A major difference is that EN 12195-1 formally includes the coefficient of friction (µ) in its calculations. The friction between your cargo and the vehicle deck is a measurable force that helps secure the load.
          </p>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-green-900 mb-3">
              💡 Pro Tip: Anti-Slip Materials
            </h4>
            <p className="text-green-800">
              Using high-friction materials like <strong>anti-slip mats</strong> can dramatically reduce the number of lashings needed, an effect you can quantify with our calculator.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Common Friction Coefficients:</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Wood on Wood: 0.4-0.6</li>
                <li>• Steel on Steel: 0.1-0.2</li>
                <li>• Rubber on Steel: 0.6-0.8</li>
                <li>• Anti-slip mat: 0.8-1.0</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Impact on Calculations:</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Higher friction = Fewer straps needed</li>
                <li>• Lower friction = More straps required</li>
                <li>• Wet conditions reduce friction</li>
                <li>• Surface condition matters</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Angles */}
      <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Angles Matter Mathematically
        </h3>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            The angle of your lashing straps (α for vertical, β for horizontal) is not just a best practice—it&apos;s a critical variable in the formula. A poor angle can render a strong lashing almost useless, and the EN 12195-1 calculation will reflect this loss of efficiency precisely.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-900 mb-2">90°</div>
              <h4 className="font-semibold text-green-900 mb-2">Optimal</h4>
              <p className="text-sm text-green-800">
                Maximum efficiency, 100% of strap capacity
              </p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-900 mb-2">60°</div>
              <h4 className="font-semibold text-yellow-900 mb-2">Good</h4>
              <p className="text-sm text-yellow-800">
                ~87% efficiency, acceptable for most loads
              </p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-900 mb-2">30°</div>
              <h4 className="font-semibold text-red-900 mb-2">Poor</h4>
              <p className="text-sm text-red-800">
                ~50% efficiency, may require additional straps
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}