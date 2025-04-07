'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { ProductCategory } from '@/types/productCategory';

interface CategoryContextType {
  categories: ProductCategory[];
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children, categories }: { children: ReactNode; categories: ProductCategory[] }) {
  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
} 