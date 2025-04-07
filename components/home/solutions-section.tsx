import Link from "next/link"
import { ChevronRightIcon } from "@heroicons/react/24/outline"

const solutions = [
  {
    title: "Custom Engineering",
    description: "Tailored engineering solutions to meet your specific requirements and challenges.",
    icon: <div className="w-12 h-12 rounded-full bg-cyan-600 flex items-center justify-center">CE</div>,
    link: "/solutions/custom-engineering",
  },
  {
    title: "Product Development",
    description: "End-to-end product development from concept to manufacturing.",
    icon: <div className="w-12 h-12 rounded-full bg-cyan-600 flex items-center justify-center">PD</div>,
    link: "/solutions/product-development",
  },
  {
    title: "Technical Consulting",
    description: "Expert technical consulting to optimize your manufacturing processes.",
    icon: <div className="w-12 h-12 rounded-full bg-cyan-600 flex items-center justify-center">TC</div>,
    link: "/solutions/technical-consulting",
  },
]

export default function SolutionsSection() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">CUSTOM OEM SOLUTIONS</h2>
          <p className="text-lg text-gray-300">
            We provide tailored engineering solutions to meet your specific requirements. Our team of experts works
            closely with you to develop innovative products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-sm hover:bg-gray-700 transition-colors">
              <div className="mb-4">{solution.icon}</div>
              <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
              <p className="text-gray-300 mb-4">{solution.description}</p>
              <Link
                href={solution.link}
                className="inline-flex items-center text-cyan-400 font-medium hover:text-cyan-300"
              >
                Learn More
                <ChevronRightIcon className="ml-1 h-5 w-5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

