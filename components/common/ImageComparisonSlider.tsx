"use client";

import {
  useState,
  useRef,
  useEffect,
  type MouseEvent,
  type TouchEvent,
} from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface ImageComparisonSliderProps {
  beforeImage: string
  afterImage: string
}

export default function ImageComparisonSlider({
  beforeImage,
  afterImage
}: ImageComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  // Update container width on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    // Initial measurement
    updateDimensions()

    // Add resize listener
    window.addEventListener("resize", updateDimensions)

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width

    const newPosition = Math.min(Math.max((x / width) * 100, 0), 100)
    setSliderPosition(newPosition)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !containerRef.current || !e.touches[0]) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const width = rect.width

    const newPosition = Math.min(Math.max((x / width) * 100, 0), 100)
    setSliderPosition(newPosition)
  }

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false)
    }

    window.addEventListener("mouseup", handleMouseUpGlobal)
    window.addEventListener("touchend", handleMouseUpGlobal)

    return () => {
      window.removeEventListener("mouseup", handleMouseUpGlobal)
      window.removeEventListener("touchend", handleMouseUpGlobal)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-lg select-none w-full h-full"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* Before Image (Full width) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={beforeImage}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority
        />
      </div>

      {/* After Image (Clipped) */}
      <div className="absolute top-0 bottom-0 left-0 overflow-hidden h-full" style={{ width: `${sliderPosition}%` }}>
        <div className="relative h-full" style={{ width: containerWidth ? `${containerWidth}px` : "100%" }}>
          <Image
            src={afterImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority
          />
        </div>
      </div>

      {/* Slider Control */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
          <div className="flex items-center justify-center">
            <ChevronLeftIcon className="h-4 w-4 text-black" />
            <ChevronRightIcon className="h-4 w-4 text-black" />
          </div>
        </div>
      </div>
    </div>
  )
}