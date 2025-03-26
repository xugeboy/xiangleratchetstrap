'use client'

import { useState, useEffect } from 'react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // 监听滚动事件，控制按钮显示/隐藏
  useEffect(() => {
    const toggleVisibility = () => {
      // 当页面滚动超过 300px 时显示按钮
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // 点击滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black/10 backdrop-blur-sm text-white shadow-lg transition-all hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
          aria-label="Back to top"
        >
          <ChevronUpIcon className="h-6 w-6 text-white" />
        </button>
      )}
    </>
  )
}