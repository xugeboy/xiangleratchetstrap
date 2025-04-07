import Image from "next/image"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

const industries = [
  {
    title: "MANUFACTURING",
    image: "/placeholder.svg?height=300&width=400",
    link: "/industries/manufacturing",
  },
  {
    title: "CONSTRUCTION",
    image: "/placeholder.svg?height=300&width=400",
    link: "/industries/construction",
  },
  {
    title: "TRANSPORTATION",
    image: "/placeholder.svg?height=300&width=400",
    link: "/industries/transportation",
  },
  {
    title: "AGRICULTURE",
    image: "/placeholder.svg?height=300&width=400",
    link: "/industries/agriculture",
  },
]

export default function IndustriesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          OUR <span className="text-cyan-600">INDUSTRIES</span>
        </h2>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="group relative overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={industry.image || "/placeholder.svg"}
                    alt={industry.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white">{industry.title}</h3>
                </div>
                <Link
                  href={industry.link}
                  className="absolute inset-0"
                  aria-label={`Learn more about ${industry.title}`}
                ></Link>
              </div>
            ))}
          </div>

          <button
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hidden md:block"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
          </button>
          <button
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hidden md:block"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  )
}

