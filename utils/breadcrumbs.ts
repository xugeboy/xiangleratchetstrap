import { Product } from '@/types/product'
import { ProductCategory } from '@/types/productCategory'
import { BreadcrumbItem } from '@/types/breadcrumbItem'
import { Blog } from '@/types/blog'
import { getBreadcrumbPathPrefix } from './formatUtils'


const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export function generateCategoryBreadcrumbs(category: ProductCategory | null,lang:string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = []
  const pathPrefix = getBreadcrumbPathPrefix(lang);
  items.push({
    name: 'categories',
    href: `${siteUrl}${pathPrefix}/categories`
  })
  if (!category) {
    return items
  }

  // 如果有父分类，先添加父分类
  if (category.parent) {
    const parent = category.parent
    items.push({
      name: parent.name,
      href: `${siteUrl}${pathPrefix}/categories/${parent.slug}`
    })
  }
  
  // 添加当前分类
  items.push({
    name: category.name,
    href: `${siteUrl}${pathPrefix}/categories/${category.slug}`
  })
  
  return items
}

export function generateProductBreadcrumbs(product: Product | null,lang:string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = []
  const pathPrefix = getBreadcrumbPathPrefix(lang);
  items.push({
    name: 'products',
    href: `${siteUrl}${pathPrefix}/products`
  })
  if (!product) {
    return items
  }

  // 添加产品所属分类
  if (product.category) {
    const category = product.category
    items.push({
      name: category.name,
      href: `${siteUrl}${pathPrefix}/categories/${category.slug}`
    })
  }
  
  // 添加产品名称
  items.push({
    name: product.name,
    href: `${siteUrl}${pathPrefix}/products/${product.slug}`
  })
  
  return items
} 

export function generateBlogBreadcrumbs(blog: Blog | null,lang:string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = []
  const pathPrefix = getBreadcrumbPathPrefix(lang);
  items.push({
    name: 'blog',
    href: `${siteUrl}${pathPrefix}/blogs`
  })
  if (!blog) {
    return items
  }

  items.push({
    name: blog.title,
    href: `${siteUrl}${pathPrefix}/blogs/${blog.slug}`
  })
  
  return items
} 

export function generateGeneralBreadcrumbs(pageName: string, slug: string,lang:string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = []
  const pathPrefix = getBreadcrumbPathPrefix(lang);
  items.push({
    name: 'Xiangle Ratchet Strap',
    href: `${siteUrl}${pathPrefix}/`,
  })

  items.push({
    name: pageName,
    href: `${siteUrl}${pathPrefix}/${slug}`,
  })
  
  return items
}

export interface PathSegment {
  name: string;
  slug: string;
}
export function generateBreadcrumbsFromPath(pathSegments: PathSegment[], lang: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [];
  const pathPrefix = getBreadcrumbPathPrefix(lang);
  let currentPath = `${siteUrl}${pathPrefix}`;

  items.push({
    name: 'Xiangle Ratchet Strap',
    href: `${currentPath}/`,
  });

  pathSegments.forEach(segment => {
    // 累加 URL 路径
    currentPath += `/${segment.slug}`;
    
    items.push({
      name: segment.name,
      href: currentPath,
    });
  });
  
  return items;
}