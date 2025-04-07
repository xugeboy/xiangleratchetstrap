import Image from "next/image"
import Link from "next/link"

export default function CapabilitiesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="col-span-1 row-span-1">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Welding process"
                width={400}
                height={300}
                className="w-full h-auto rounded-md"
              />
            </div>
            <div className="col-span-1 row-span-1">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Laser cutting"
                width={400}
                height={300}
                className="w-full h-auto rounded-md"
              />
            </div>
            <div className="col-span-1 row-span-1">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Manufacturing facility"
                width={400}
                height={300}
                className="w-full h-auto rounded-md"
              />
            </div>
            <div className="col-span-1 row-span-1">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Product assembly"
                width={400}
                height={300}
                className="w-full h-auto rounded-md"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">WHAT MAKES US DIFFERENT?</h2>
              <h3 className="text-4xl font-bold text-cyan-600 mb-6">OUR CAPABILITIES</h3>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Engineering Excellence</h4>
                <p className="text-gray-600">
                  At our company, innovation begins with our in-house engineers. They design manufactured housing
                  products, workplace safety products, roofing tools, marine parts, replacement OEM Trailer parts,
                  agriculture accessories, and outdoor living supplies tailored to address your project challenges,
                  prioritizing quality control to surpass industry standards like OSHA and HUD Code.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Cutting-Edge Manufacturing</h4>
                <p className="text-gray-600">
                  Empowered by evolving technologies, our capabilities know no bounds. Utilizing advanced processes,
                  from CNC cutting to robotic welding, we produce innovative solutions. Rigorous testing follows
                  production, guaranteeing durability and reliability for every product shipped to your job site.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Seamless Operations and Advancing Warehouses</h4>
                <p className="text-gray-600">
                  Our company operates within multiple warehouses, handling logistics, customer service, marketing, and
                  more from our corporate office. Our in-house approach sets us apart, allowing us to engineer solutions
                  within the USA. As one of America's largest family-owned manufacturing companies, we take pride in our
                  continual evolution and commitment to production excellence.
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
  )
}

