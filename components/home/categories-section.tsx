import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    title: "Retractable Ratchet Strap",
    alt: "Retractable Ratchet Strap",
    image: "https://res.cloudinary.com/duimeqqch/image/upload/v1744272807/auto_retractable_ratchet_strap_lg7pxh.jpg",
    link: "/categories/retractable-ratchet-strap",
  },
  {
    title: "Ratchet Straps & Tie Downs",
    alt: "Retractable Ratchet Strap",
    image: "/placeholder.svg?height=300&width=400",
    link: "/categories/ratchet-straps-and-tie-downs",
  },
  {
    title: "Kayak & Canoe Strap",
    image: "https://res.cloudinary.com/duimeqqch/image/upload/v1744272794/kayak_tie_down_sneyzl.jpg",
    link: "/categories/kayak-and-canoe-strap",
  },
  {
    title: "ATV & Motorcycle Strap",
    alt: "Retractable Ratchet Strap",
    image: "/placeholder.svg?height=300&width=400",
    link: "/categories/atv-and-motorcycle-strap",
  },
  {
    title: "Spare Tire Y-Strap",
    alt: "spare_tire_y_strap",
    image: "https://res.cloudinary.com/duimeqqch/image/upload/v1744273892/spare_tire_y_strap_jemgzg.jpg",
    link: "/categories/spare-tire-y-strap",
  },
  {
    title: "Webbing & Hardware",
    alt: "Retractable Ratchet Strap",
    image: "/placeholder.svg?height=300&width=400",
    link: "/categories/webbing-and-hardware",
  },
]

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          OUR <span className="text-amber-700">CATEGORIES</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="group relative w-full overflow-hidden rounded-md">
              {/* Using min-height instead of aspect ratio to accommodate variable image heights */}
              <div className="relative w-full min-h-[480px]">
                {/* Image covering the entire card with contain instead of cover */}
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                  priority={index < 3}
                />

                {/* Content overlay - now with solid background instead of gradient */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end p-4 md:p-6 text-center">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">{category.title}</h3>
                  <Link
                    href={category.link}
                    className="inline-block bg-amber-600 hover:bg-amber-600/70 text-white px-6 md:px-8 py-2 font-medium transition-all duration-300 text-sm md:text-base"
                  >
                    VIEW MORE
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
