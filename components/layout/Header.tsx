"use client"
import { useState } from "react"
import { TopNavigation } from "@/components/layout/header/top-navigation"
import { SearchBar } from "@/components/layout/header/search-bar"
import { CategoryNavigation } from "@/components/layout/header/category-navigation"
import { MobileMenu } from "@/components/layout/header/mobile-menu"

interface HeaderProps {
  lang: string
}
export default function Header({ lang }: HeaderProps) {
    const company = [
      { name: 'About Us', href: '/about-us' },
      { name: 'Contact Us', href: '/contact-us' },
      { name: 'Blogs', href: '/blogs' },
      { name: 'Meet The Team', href: '/business-solutions/#meet-the-team' }
    ]
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
    return (
      <header className="bg-white">
        {/* Top navigation bar - hide on mobile */}
        <div className="hidden md:block">
          <TopNavigation />
        </div>
  
        {/* Search bar with logo */}
        <SearchBar onMobileMenuOpen={() => setMobileMenuOpen(true)} lang={lang} />
  
        {/* Category navigation - hide on mobile */}
        <div className="hidden md:block">
          <CategoryNavigation />
          <div className="w-full border-b border-gray-200 mt-1"></div>
        </div>
  
        {/* Mobile menu */}
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          company={company}
        />
      </header>
    )
  }
