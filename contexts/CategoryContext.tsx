'use client'

import { createContext, useContext, ReactNode, useMemo } from 'react'
import type { ProductCategory } from '@/types/productCategory'

interface CategoryContextType {
  categories: ProductCategory[]
  categoryMap: Map<number, ProductCategory>
  rootCategories: ProductCategory[]
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export function CategoryProvider({
  children,
  categories,
}: {
  children: ReactNode
  categories: ProductCategory[]
}) {
  // 建立 categoryMap
  const categoryMap = useMemo(() => {
    const map = new Map<number, ProductCategory>()
    categories.forEach((category) => {
      map.set(category.id, category)
    })
    return map
  }, [categories])

  // 筛选 rootCategories（不是其他分类的子类）
  const rootCategories = useMemo(() => {
    const childIds = new Set<number>()
    categories.forEach((category) => {
      category.children?.forEach((child) => {
        childIds.add(child.id)
      })
    })

    return categories.filter(
      (category) =>
        !childIds.has(category.id) &&
        category.name &&
        category.name.trim() !== ''
    )
  }, [categories])

  return (
    <CategoryContext.Provider value={{ categories, categoryMap, rootCategories }}>
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategories() {
  const context = useContext(CategoryContext)
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider')
  }
  return context
}
