"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { useTranslations } from 'next-intl';
// 轮播图数据
const heroSlides = [
  {
    id: 1,
    image: "/v1744183210/manufacturer_jgqytx.jpg",
  },
  {
    id: 2,
    image: "/v1744965567/cargo_control_xaiwx5.webp",
  },
  {
    id: 3,
    image: "/v1744966920/quality_guaranteed_my88ns.jpg",
  },
]

export default function HeroSection() {
  const t = useTranslations('HeroSection');
  const slides = heroSlides.map((slide, index) => ({
    ...slide,
    title: t(`slides.${index}.title`),
    subtitle: t(`slides.${index}.subtitle`),
    description: t(`slides.${index}.description`),
  }));
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [autoplay, setAutoplay] = useState(true)

  const totalSlides = slides.length

  // 切换到下一张幻灯片
  const nextSlide = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 700)
  }, [isAnimating, totalSlides])

  // 切换到上一张幻灯片
  const prevSlide = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 700)
  }, [isAnimating, totalSlides])

  // 直接跳转到指定幻灯片
  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return

    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 700)
  }

  // 自动播放
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoplay) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000) // 5秒切换一次
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoplay, nextSlide])

  // 鼠标悬停时暂停自动播放
  const pauseAutoplay = () => setAutoplay(false)
  const resumeAutoplay = () => setAutoplay(true)

  return (
    <section
      className="relative w-full h-[600px] overflow-hidden"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* 轮播图片 */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* 内容 */}
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-700 ${
                index === currentSlide
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-8 absolute"
              }`}
              style={{ display: index === currentSlide ? "block" : "none" }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {slide.title} <br />
                <span className="text-amber-700">{slide.subtitle}</span>
              </h1>
              <p className="text-xl text-white/90 mb-8">{slide.description}</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about-us"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 font-medium transition-colors"
                >
                  ABOUT US
                </Link>
                <Link
                  href="/business-solutions"
                  className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 font-medium transition-colors"
                >
                  SOLUTIONS
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 导航按钮 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* 指示器 */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white scale-110" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          />
        ))}
      </div>
    </section>
  )
}
