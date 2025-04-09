import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    title: "Retractable Ratchet Strap",
    image: "/placeholder.svg?height=300&width=400",
    link: "/categories/retractable-ratchet-strap",
  },
  {
    title: "Ratchet Straps & Tie Downs",
    image: "/placeholder.svg?height=300&width=400",
    link: "/categories/ratchet-straps-and-tie-downs",
  },
  {
    title: "Kayak & Canoe Strap",
    image: "/placeholder.svg?height=300&width=400",
    link: "/categories/kayak-and-canoe-strap",
  },
  {
    title: "ATV & Motorcycle Strap",
    image: "/placeholder.svg?height=300&width=400",
    link: "/categories/atv-and-motorcycle-strap",
  },
  {
    title: "Spare Tire Y-Strap",
    image: "/placeholder.svg?height=300&width=400",
    link: "/categories/spare-tire-y-strap",
  },
  {
    title: "Webbing & Hardware",
    image: "/placeholder.svg?height=300&width=400",
    link: "/categories/webbing-and-hardware",
  }
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
                <Image src={category.image} alt={category.title} fill className="object-cover" />
              </div>
              <div className="bg-[#0a1f33] p-4 text-center">
                <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
                <Link
                  href={category.link}
                  className="inline-block bg-[#f47321] hover:bg-[#e05e0c] text-white px-8 py-2 font-medium transition-colors"
                >
                  VIEW MORE
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

