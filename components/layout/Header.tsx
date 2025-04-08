"use client"
import { useCategories } from '@/contexts/CategoryContext';
import { useState } from "react"
import { TopNavigation } from "@/components/layout/header/top-navigation"
import { SearchBar } from "@/components/layout/header/search-bar"
import { CategoryNavigation } from "@/components/layout/header/category-navigation"
import { MobileMenu } from "@/components/layout/header/mobile-menu"


export default function Header() {
    // 从 Context 获取分类数据
    const { categories } = useCategories();
    // 过滤出顶级分类（没有父分类的分类）
    const topLevelCategories = categories.filter(category => !category.parent);
    const company = [
      { name: 'About us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Support', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Blog', href: '#' },
    ]
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
