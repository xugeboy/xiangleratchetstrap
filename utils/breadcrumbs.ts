import { Product } from '@/types/product'
import { ProductCategory } from '@/types/productCategory'
import { BreadcrumbItem } from '@/types/breadcrumbItem'
import { Blog } from '@/types/blog'
import { getBreadcrumbPathPrefix } from './formatUtils'


export function generateCategoryBreadcrumbs(category: ProductCategory | null,lang:string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = []
  const pathPrefix = getBreadcrumbPathPrefix(lang);
  items.push({
    name: 'categories',
    href: `${pathPrefix}/categories`
  })
  if (!category) {
    return items
  }

  // 如果有父分类，先添加父分类
  if (category.parent) {
    const parent = category.parent
    items.push({
      name: parent.name,
      href: `${pathPrefix}/categories/${parent.slug}`
    })
  }
  
  // 添加当前分类
  items.push({
    name: category.name,
    href: `${pathPrefix}/categories/${category.slug}`
  })
  
  return items
}

export function generateProductBreadcrumbs(product: Product | null,lang:string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = []
  const pathPrefix = getBreadcrumbPathPrefix(lang);
  items.push({
    name: 'products',
    href: `${pathPrefix}/products`
  })
  if (!product) {
    return items
  }

  // 添加产品所属分类
  if (product.category) {
    const category = product.category
    items.push({
      name: category.name,
      href: `${pathPrefix}/categories/${category.slug}`
    })
  }
  
  // 添加产品名称
  items.push({
    name: product.name,
    href: `${pathPrefix}/products/${product.slug}`
  })
  
  return items
} 

export function generateBlogBreadcrumbs(blog: Blog | null,lang:string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = []
  const pathPrefix = getBreadcrumbPathPrefix(lang);
  items.push({
    name: 'blog',
    href: `${pathPrefix}/blogs`
  })
  if (!blog) {
    return items
  }

  items.push({
    name: blog.title,
    href: `${pathPrefix}/blogs/${blog.slug}`
  })
  
  return items
} 