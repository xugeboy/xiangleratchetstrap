import Image from "next/image";
import Link from "next/link";

export default function CapabilitiesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative w-full h-[700px]">
            <Image
              alt="why-xiangle-apart"
              src="https://res.cloudinary.com/duimeqqch/image/upload/v1744186569/why-us-apart_j1wowp.jpg"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                What Sets Xiangle Ratchet Strap Apart?
              </h2>
              <h3 className="text-4xl font-bold text-cyan-600 mb-6">
                Our Strengths
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  Continuous Innovation
                </h4>
                <p className="text-gray-600">
                  At Xiangle Ratchet Strap, product innovation never stops. Our
                  dedicated R&D team consistently develops new ratchet strap and
                  tie-down solutions to meet the evolving needs of industries
                  worldwide. From enhanced safety designs to multi-purpose
                  buckle systems, we are always pushing boundaries to deliver
                  better performance, greater versatility, and smarter utility.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  Global Inventory & Rapid Supply
                </h4>
                <p className="text-gray-600">
                  Backed by massive ready-to-ship inventory and a global
                  logistics network, Xiangle Ratchet Strap ensures fast and
                  efficient product delivery wherever you are. Whether you need
                  a standard ratchet strap or a complex tie-down configuration,
                  our supply chain is optimized to keep your operations
                  moving—on time, every time.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  Low MOQ & Fully Custom Solutions
                </h4>
                <p className="text-gray-600">
                  We understand the importance of flexibility. That’s why
                  Xiangle Ratchet Strap offers low minimum order quantities and
                  tailored manufacturing to meet your specific project needs.
                  From custom colors and lengths to private labeling and
                  packaging, we help small businesses and large enterprises
                  alike create exclusive solutions without the high volume
                  barrier.
                </p>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-block bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 font-medium transition-colors"
            >
              ABOUT US
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
