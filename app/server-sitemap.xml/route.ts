// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server'
import { getAllProductSlug } from '@/services/api/product'
import { getAllCategorySlug } from '@/services/api/productCategory'
import { getAllBlogSlug } from '@/services/api/blog'

const BASE_URL = 'https://xiangleratchetstrap.com'

export async function GET() {
  const categorySlugs = await getAllCategorySlug()
  const productSlugs = await getAllProductSlug()
  const blogSlugs = await getAllBlogSlug()

  const staticUrls = [`${BASE_URL}`, `${BASE_URL}/about-us`, `${BASE_URL}/contact-us`]

  const dynamicCategoryUrls = categorySlugs?.map(slug => `${BASE_URL}/products/${slug}`) || [];
  const dynamicProductUrls = productSlugs?.map(slug => `${BASE_URL}/products/${slug}`) || [];
  const dynamicBlogUrls = blogSlugs?.map(slug => `${BASE_URL}/blog/${slug}`) || [];
  
  const allUrls = [...staticUrls, ...dynamicCategoryUrls, ...dynamicProductUrls, ...dynamicBlogUrls];
  

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=60', // 缓存 5 分钟
    },
  })
}
