import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    title: "Flatbed",
    image: "/placeholder.svg?height=300&width=400",
    link: "/categories/flatbed",
  },
  {
    title: "Step Deck",
    image: "/placeholder.svg?height=300&width=400",
    link: "/categories/step-deck",
  },
  {
    title: "Ratchet Straps",
    image: "/placeholder.svg?height=300&width=400",
    link: "/categories/ratchet-straps",
  },
  {
    title: "Auto Ramps",
    image: "/placeholder.svg?height=300&width=400",
    link: "/categories/auto-ramps",
  },
  {
    title: "L-Track Systems",
    image: "/placeholder.svg?height=300&width=400",
    link: "/categories/l-track-systems",
  },
  {
    title: "Cable Ramps",
    image: "/placeholder.svg?height=300&width=400",
    link: "/categories/cable-ramps",
  },
]

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#1a3b5d]">SHOP OUR CATEGORIES</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="group overflow-hidden">
              <div className="aspect-[4/3] relative">
                <Image src={category.image || "/placeholder.svg"} alt={category.title} fill className="object-cover" />
              </div>
              <div className="bg-[#0a1f33] p-4 text-center">
                <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
                <Link
                  href={category.link}
                  className="inline-block bg-[#f47321] hover:bg-[#e05e0c] text-white px-8 py-2 font-medium transition-colors"
                >
                  SHOP
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

