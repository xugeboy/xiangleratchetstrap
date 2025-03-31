"use client"

import { useState } from "react"
import type { ProductCategory } from "@/types/productCategory"
import { TopNavigation } from "@/components/layout/header/top-navigation"
import { SearchBar } from "@/components/layout/header/search-bar"
import { CategoryNavigation } from "@/components/layout/header/category-navigation"
import { MobileMenu } from "@/components/layout/header/mobile-menu"

interface HeaderClientProps {
  topLevelCategories: ProductCategory[]
  company: Array<{
    name: string
    href: string
  }>
}

export default function HeaderClient({ topLevelCategories, company }: HeaderClientProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
    return (
      <header className="bg-white">
        {/* Top navigation bar - hide on mobile */}
        <div className="hidden md:block">
          <TopNavigation />
        </div>
  
        {/* Search bar with logo */}
        <SearchBar onMobileMenuOpen={() => setMobileMenuOpen(true)} />
  
        {/* Category navigation - hide on mobile */}
        <div className="hidden md:block">
          <CategoryNavigation topLevelCategories={topLevelCategories} onMobileMenuOpen={() => setMobileMenuOpen(true)} />
          <div className="w-full border-b border-gray-200 mt-1"></div>
        </div>
  
        {/* Mobile menu */}
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          topLevelCategories={topLevelCategories}
          company={company}
        />
      </header>
    )
  }
