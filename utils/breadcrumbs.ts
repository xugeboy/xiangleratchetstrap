import { Product } from '@/types/product'
import { ProductCategory } from '@/types/productCategory'
import { BreadcrumbItem } from '@/types/breadcrumbItem'
import { Blog } from '@/types/blog'

export function generateCategoryBreadcrumbs(category: ProductCategory | null): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = []
  items.push({
    name: 'categories',
    href: '/categories'
  })
  if (!category) {
    return items
  }

  // 如果有父分类，先添加父分类
  if (category.parent) {
    const parent = category.parent
    items.push({
      name: parent.name,
      href: `/categories/${parent.slug}`
    })
  }
  
  // 添加当前分类
  items.push({
    name: category.name,
    href: `/categories/${category.slug}`
  })
  
  return items
}

export function generateProductBreadcrumbs(product: Product | null): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = []
  items.push({
    name: 'products',
    href: '/products'
  })
  if (!product) {
    return items
  }

  // 添加产品所属分类
  if (product.category) {
    const category = product.category
    items.push({
      name: category.name,
      href: `/categories/${category.slug}`
    })
  }
  
  // 添加产品名称
  items.push({
    name: product.name,
    href: `/products/${product.slug}`
  })
  
  return items
} 

export function generateBlogBreadcrumbs(blog: Blog | null): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = []
  items.push({
    name: 'blog',
    href: '/blogs'
  })
  if (!blog) {
    return items
  }

  items.push({
    name: blog.title,
    href: `/blogs/${blog.slug}`
  })
  
  return items
} 