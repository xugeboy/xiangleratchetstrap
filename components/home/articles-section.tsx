"use client"
import Image from "next/image"
import Link from "next/link"

const articles = [
  {
    title: "2025 Out-Of-Service Criteria Update: What You Need To Know",
    date: "02.27.25",
    readTime: "3 MINUTE READ",
    excerpt:
      "The CVSA has announced an important update to its Out-of-Service Criteria (OOSC) that will take effect on April 1, 2025.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/articles/out-of-service-criteria-update",
  },
  {
    title: "Celebrating 20 Years Of US Cargo Control: A Legacy Of Growth, Innovation, & Commitment",
    date: "02.10.25",
    readTime: "3 MINUTE READ",
    excerpt:
      "From a bold vision born in a garage with two employees to a multi-location leader in cargo securement, lifting, and rigging solutions, US Cargo Control has been on an incredible...",
    image: "/placeholder.svg?height=200&width=300",
    link: "/articles/celebrating-20-years",
  },
  {
    title: "US Cargo Control Earns AWRF Accreditation: A Commitment To Quality And Safety In Manufacturing",
    date: "11.20.24",
    readTime: "6 MINUTE READ",
    excerpt:
      "Learn more about our latest accreditation from the Associated Wire Rope Fabricators (AWRF), emphasizing our commitment to safe, quality cargo control products.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/articles/awrf-accreditation",
  },
  {
    title: "Testing The Break Strength Of Our Transport Chain",
    date: "11.07.24",
    readTime: "5 MINUTE READ",
    excerpt:
      "Learn how we conducted break strength testing on our transport chain and how it held up against a lower-priced competitor assembly.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/articles/break-strength-testing",
  },
]

export default function ArticlesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          NEWEST <span className="text-amber-700">BLOGS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="flex flex-col">
              <div className="aspect-[4/3] relative mb-4">
                <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">{article.title}</h3>
              <div className="text-sm text-gray-500 text-center mb-2">
                {article.date} • {article.readTime}
              </div>
              <p className="text-gray-600 mb-4 flex-grow">{article.excerpt}</p>
              <Link href={article.link} className="text-[#1a3b5d] font-medium hover:underline">
                Read More
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blogs"
            className="inline-block border-2 border-black bg-white hover:bg-gray-100 text-black px-8 py-3 font-medium transition-colors"
          >
            VIEW ALL
          </Link>
        </div>
      </div>
    </section>
  )
}

