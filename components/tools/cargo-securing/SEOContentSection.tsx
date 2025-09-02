"use client";

export function SEOContentSection() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Global Cargo Securement Calculator for International Standards
            Compliance
          </h2>

          <p className="text-gray-700 mb-6">
            Our <strong>cargo securement calculator</strong> is the ultimate
            tool for determining
            <strong> tie down strap</strong> requirements and ensuring full
            compliance with
            <strong> international tie down standards</strong>. Whether
            you&apos;re transporting heavy machinery, construction materials, or
            general cargo, this <strong>WLL/LC calculator</strong> provides
            precise calculations based on current{" "}
            <strong>global cargo securement regulations</strong>.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            How Many Tie Down Straps Do I Need?
          </h3>

          <p className="text-gray-700 mb-6">
            The number of <strong>tie down straps</strong> required depends on
            your cargo weight, dimensions, securing method, and regional
            standards. Our calculator automatically determines the optimal
            configuration based on your selected region:
          </p>

          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>
              <strong>North America (DOT):</strong> 10+ feet requires 2+ straps,
              20+ feet requires 3+ straps
            </li>
            <li>
              <strong>Australia (AS/NZS 4380):</strong> 3+ meters requires 2+
              straps, 6+ meters requires 3+ straps
            </li>
            <li>
              <strong>Europe (EN12195-2):</strong> 3+ meters requires 2+ straps,
              6+ meters requires 3+ straps
            </li>
            <li>
              <strong>Heavy cargo:</strong> Additional straps based on weight
              requirements and regional standards
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Understanding WLL/LC
          </h3>

          <p className="text-gray-700 mb-6">
            The <strong>WLL/LC calculator</strong> determines the total working
            load limit needed for your cargo securement system. This critical
            calculation ensures your
            <strong> tie down straps</strong> can handle the forces exerted
            during transportation:
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">
              Regional WLL/LC Requirements:
            </h4>
            <ul className="text-blue-800 space-y-1">
              <li>
                • <strong>Direct tie-downs:</strong> 100% of cargo weight (all
                regions)
              </li>
              <li>
                • <strong>Indirect tie-downs:</strong> 50% (DOT/EN12195-2) or
                60% (AS/NZS 4380) of cargo weight
              </li>
              <li>
                • <strong>Safety margin:</strong> 20% (DOT), 25% (AS/NZS 4380),
                or 30% (EN12195-2) minimum
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Minimum Tie-Down Count Rules (By Region)
          </h3>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 text-gray-800">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">North America (DOT)</h4>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Aggregate WLL ≥ 50% of cargo weight; direct contributes 50%, indirect (across vehicle) contributes 100%</li>
                  <li>Minimum tie-downs: 2 for first 10 ft, then +1 per additional 10 ft (or fraction)</li>
                </ul>
                <div className="text-xs text-gray-600 mt-2">Example: 22 ft cargo → 2 + ceil((22 − 10)/10) = 4 tie-downs</div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Australia / Europe</h4>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Method × Angle efficiency model (e.g., AU 0.8, EU 0.7; 60° ≈ 0.87)</li>
                  <li>Minimum tie-downs: ≥3.0 m → ≥2; ≥6.0 m → ≥3; beyond 6.0 m +1 per 3.0 m (or fraction)</li>
                </ul>
                <div className="text-xs text-gray-600 mt-2">Example: 9.2 m cargo → 3 + ceil((9.2 − 6.0)/3.0) = 4 tie-downs</div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Regional Standards and Automatic Unit Selection
          </h3>

          <p className="text-gray-700 mb-6">
            Our <strong>cargo securement calculator</strong> automatically
            adapts to your selected region, applying the correct units and
            calculation standards. North America uses lbs/ft with DOT standards,
            while Australia and Europe use kg/m with their respective standards.
            The tool automatically sets the appropriate indirect tie-down
            factors and safety margins for each region.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            International Cargo Securement Standards Compliance
          </h3>

          <p className="text-gray-700 mb-6">
            Our <strong>cargo securement calculator</strong> ensures compliance
            with major international standards and regulations. The tool
            considers:
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">
                🇺🇸 DOT (United States)
              </h4>
              <p className="text-blue-800 text-sm mb-2">
                Federal Motor Carrier Safety Administration regulations for
                cargo securement
              </p>
              <a
                href="https://www.fmcsa.dot.gov/regulations/cargo-securement/cargo-securement-rules"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-xs hover:underline"
              >
                Learn More →
              </a>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">
                🇦🇺 AS/NS 4380 (Australia)
              </h4>
              <p className="text-green-800 text-sm mb-2">
                Australian/New Zealand standard for load restraint assemblies
              </p>
              <a
                href="https://www.ntc.gov.au/sites/default/files/assets/files/NTC%20Load%20Restraint%20Guide%202018%20%28updated%20design%202024%29.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 text-xs hover:underline"
              >
                Learn More →
              </a>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">
                🇪🇺 EN12195-2 (Europe)
              </h4>
              <p className="text-purple-800 text-sm mb-2">
                European standard for lashing and securing of cargo on road
                vehicles
              </p>
              <a
                href="https://www.en-standard.eu/bs-en-12195-2-2001-load-restraint-assemblies-on-road-vehicles-safety-web-lashing-made-from-man-made-fibres/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 text-xs hover:underline"
              >
                Learn More →
              </a>
            </div>
          </div>

          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Minimum tie-down requirements based on cargo length</li>
            <li>Proper AWLL calculations for different securing methods</li>
            <li>Angle efficiency factors for indirect tie-downs</li>
            <li>Safety margins for unexpected conditions</li>
            <li>Industry best practices for cargo securement</li>
            <li>Cross-border compliance considerations</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Advanced Tie Down Strap Calculator Features
          </h3>

          <p className="text-gray-700 mb-6">
            This comprehensive <strong>tie down strap calculator</strong>{" "}
            provides:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                Precise Calculations
              </h4>
              <p className="text-gray-700 text-sm">
                Accurate AWLL and tie-down requirements based on your specific
                cargo parameters
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                DOT Compliance
              </h4>
              <p className="text-gray-700 text-sm">
                Automatic compliance checking with current DOT and FMCSA
                regulations
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                Safety Recommendations
              </h4>
              <p className="text-gray-700 text-sm">
                Professional recommendations with appropriate safety margins
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                Multiple Methods
              </h4>
              <p className="text-gray-700 text-sm">
                Support for both direct and indirect tie-down securing methods
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="font-semibold text-yellow-900 mb-2">
              Important Safety Note
            </h4>
            <p className="text-yellow-800 text-sm">
              While our <strong>cargo securement calculator</strong> provides
              accurate calculations based on{" "}
              <strong>international tie down standards</strong>, always consult
              with qualified professionals for specific cargo types and
              transportation conditions. Different regions may have specific
              requirements, and regular inspection and maintenance of tie-down
              equipment is essential for safe transportation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
