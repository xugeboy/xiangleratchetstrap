import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Retractable Ratchet Strap",
    alt: "Retractable Ratchet Strap",
    image:
      "https://res.cloudinary.com/duimeqqch/image/upload/v1745311043/retractable_ratchet_strap_9147cf873f.jpg",
    link: "/categories/retractable-ratchet-strap",
  },
  {
    title: "Ratchet Straps & Tie Downs",
    alt: "Retractable Ratchet Strap",
    image:
      "https://res.cloudinary.com/duimeqqch/image/upload/v1745311043/ratchet_strap_29ce01f81a.jpg",
    link: "/categories/ratchet-straps-and-tie-downs",
  },
  {
    title: "Kayak & Canoe Strap",
    image:
      "https://res.cloudinary.com/duimeqqch/image/upload/v1745307786/cam_buckle_strap_srytzu.jpg",
    link: "/categories/kayak-and-canoe-strap",
  },
  {
    title: "ATV & Motorcycle Strap",
    alt: "Retractable Ratchet Strap",
    image:
      "https://res.cloudinary.com/duimeqqch/image/upload/v1745311045/38_MM_MTD_FB_020_f616857deb.jpg",
    link: "/categories/atv-and-motorcycle-strap",
  },
  {
    title: "Spare Tire Y-Strap",
    alt: "spare_tire_y_strap",
    image:
      "https://res.cloudinary.com/duimeqqch/image/upload/v1745306181/YwayStrap_010_n5xjja.jpg",
    link: "/categories/spare-tire-y-strap",
  },
  {
    title: "Webbing & Hardware",
    alt: "Retractable Ratchet Strap",
    image:
      "https://res.cloudinary.com/duimeqqch/image/upload/v1745311045/webbing_hardware_fde0a59657.png",
    link: "/categories/webbing-and-hardware",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          OUR <span className="text-amber-700">CATEGORIES</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative w-full overflow-hidden rounded-md border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-full aspect-[3/3] bg-gray-50">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={index < 3}
                />
              </div>
              <div className="relative inset-x-0 bottom-0 flex flex-col items-center justify-end p-4 md:p-6 text-center">
                <h3 className="text-lg md:text-xl font-bold text-amber-700 mb-3 md:mb-4">
                  {category.title}
                </h3>
                <Link
                  href={category.link}
                  className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-6 md:px-8 py-2 font-medium transition-all duration-300 text-sm md:text-base"
                >
                  VIEW MORE
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
