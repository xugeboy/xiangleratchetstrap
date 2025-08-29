import { Faq } from '@/types/faq'
import { fetchAPI } from '@/utils/fetch-api'
import { getFullLocale } from '@/utils/formatUtils'

export async function getFaqs(locale: string): Promise<Faq[]> {
  try {
    const data = await fetchAPI(`/faqs`, getFullLocale(locale))
    return data.data || []
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
}

// 获取全局FAQ（通过自定义路由）
export async function getGlobalFaqs(locale: string): Promise<Faq[]> {
  try {
    const params = {
      ...getFullLocale(locale)
    }
    const data = await fetchAPI(`/getGlobalFaqs`, params)
    // 自定义路由可能直接返回数组或包裹在data里，两者都兼容
    return (data?.data ?? data ?? []) as Faq[]
  } catch (error) {
    console.error('Error fetching global FAQs:', error)
    return []
  }
}

// 获取特定产品(通过slug)的FAQ（通过自定义路由）
export async function getProductFaqsBySlug(productSlug: string, locale: string): Promise<Faq[]> {
  try {
    const params = {
      ...getFullLocale(locale)
    }
    const data = await fetchAPI(`/getFaqsByProductSlug/${encodeURIComponent(productSlug)}`, params)
    return (data?.data ?? data ?? []) as Faq[]
  } catch (error) {
    console.error('Error fetching product FAQs by slug:', error)
    return []
  }
}

// 获取产品的所有FAQ（包括全局FAQ和产品关联的FAQ）
export async function getAllProductFaqs(productSlug: string, locale: string): Promise<Faq[]> {
  try {
    const [globalFaqs, productFaqs] = await Promise.all([
      getGlobalFaqs(locale),
      getProductFaqsBySlug(productSlug, locale)
    ])
    
    // 合并全局FAQ和产品关联的FAQ，并按sortOrder排序（若无sortOrder则置后）
    const allFaqs = [...globalFaqs, ...productFaqs]
    return allFaqs.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  } catch (error) {
    console.error('Error fetching all product FAQs:', error)
    return []
  }
} 

// 获取特定博客(通过slug)的FAQ（通过自定义路由）
export async function getBlogFaqsBySlug(blogSlug: string, locale: string): Promise<Faq[]> {
  try {
    const params = {
      ...getFullLocale(locale)
    }
    const data = await fetchAPI(`/getFaqsByBlogSlug/${encodeURIComponent(blogSlug)}`, params)
    return (data?.data ?? data ?? []) as Faq[]
  } catch (error) {
    console.error('Error fetching blog FAQs by slug:', error)
    return []
  }
}