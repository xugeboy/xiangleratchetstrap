"use client"
import ImageTrail from "@/reactbits/Animations/ImageTrail/ImageTrail"

const partners = [
  "https://res.cloudinary.com/duimeqqch/image/upload/v1744183210/manufacturer_jgqytx.jpg",
  "https://res.cloudinary.com/duimeqqch/image/upload/v1744183210/manufacturer_jgqytx.jpg",
  "https://res.cloudinary.com/duimeqqch/image/upload/v1744183210/manufacturer_jgqytx.jpg",
]

export default function LogoClouds() {
  return (
    <div className="mx-auto max-w-7xl mb-10">
      <div className="relative isolate h-full overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
        {/* 内容区域 */}
        <div className="relative z-10">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Our customers love us
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg/8 text-gray-300">
            From the very first use, they notice the difference — the reliable quality, thoughtful design, and
            unwavering service. Every purchase is a vote of confidence, and we're committed to honoring that trust by
            perfecting every detail. Thank you for being part of our journey. Because of you, we keep getting better.
          </p>
        </div>

        {/* ImageTrail 绝对定位，填充整个容器 */}
        <div className="absolute inset-0 z-20">
          <ImageTrail key="ImageTrail" items={partners} variant={2} />
        </div>

        {/* 背景装饰 */}
        <div aria-hidden="true" className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl">
          <div
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
            className="aspect-1404/767 w-[87.75rem] bg-linear-to-r from-[#80caff] to-[#4f46e5] opacity-25"
          />
        </div>
      </div>
    </div>
  )
}
