"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { useTranslations } from "next-intl"

const industries = [
  { key: "marine", image: "/v1744251245/marine_u25sc0.jpg" },
  { key: "outdoor", image: "/v1744251355/outdoor_xshdnu.jpg" },
  { key: "powersport", image: "/v1744251356/powersport_wjxbcg.jpg" },
  { key: "transportation", image: "/v1744251356/transportation_u6wtya.jpg" },
  { key: "oilAndGas", image: "/v1744251354/gas_oil_gzdhvv.jpg" },
  { key: "construction", image: "/v1744251245/construction_wbl5fs.jpg" },
  { key: "agriculture", image: "/v1744251354/agriculture_ztkx7q.jpg" }
];

export default function IndustriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // 计算在不同屏幕尺寸下显示的项目数量
  const [itemsToShow, setItemsToShow] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1)
      } else if (window.innerWidth < 768) {
        setItemsToShow(2)
      } else if (window.innerWidth < 1024) {
        setItemsToShow(3)
      } else {
        setItemsToShow(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalSlides = industries.length
  const maxIndex = totalSlides - itemsToShow

  const nextSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex >= maxIndex ? 0 : prevIndex + 1
      return newIndex
    })

    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex <= 0 ? maxIndex : prevIndex - 1
      return newIndex
    })

    setTimeout(() => setIsAnimating(false), 500)
  }
  const t = useTranslations("IndustriesSection");
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
        {t.rich("title", {
            span: (chunks) => <span className="text-amber-700">{chunks}</span>,
          })}
        </h2>

        <div className="relative">
          {/* 轮播容器 - 添加overflow-hidden确保内容不会超出容器 */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
              }}
            >
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden flex-shrink-0"
                  style={{ width: `${100 / itemsToShow}%`, padding: "0 0.5rem" }}
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={industry.image}
                      alt={t(`industries.${industry.key}.title`)}
                      fill
                      className="object-cover transition-transform duration-500 rounded-t-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white">{t(`industries.${industry.key}.title`)}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Previous slide"
            disabled={isAnimating}
          >
            <ChevronLeftIcon className="h-6 w-6 text-black" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Next slide"
            disabled={isAnimating}
          >
            <ChevronRightIcon className="h-6 w-6 text-black" />
          </button>
        </div>

        {/* 轮播指示器 */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true)
                  setCurrentIndex(index)
                  setTimeout(() => setIsAnimating(false), 500)
                }
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-cyan-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
