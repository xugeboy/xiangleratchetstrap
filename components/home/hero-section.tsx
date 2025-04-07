import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative w-full h-[600px] bg-black">
      <div className="absolute inset-0 z-0 opacity-60">
        <Image
          src="/placeholder.svg?height=600&width=1920"
          alt="Industrial machinery background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            ENGINEERING EXCELLENCE <br />
            SINCE <span className="text-cyan-500">1985</span>
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Engineering a better tomorrow by manufacturing solutions for today.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 font-medium transition-colors"
            >
              ABOUT US
            </Link>
            <Link
              href="/solutions"
              className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 font-medium transition-colors"
            >
              SOLUTIONS
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

