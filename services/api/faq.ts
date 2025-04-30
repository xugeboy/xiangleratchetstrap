import { Faq } from '@/types/faq'
import { fetchAPI } from '@/utils/fetch-api'
import { getFullLocale } from '@/utils/formatUtils'

export async function getFaqs(locale:string): Promise<Faq[]> {
  try {
    const data = await fetchAPI(`/faqs`, getFullLocale(locale))
    return data.data || []
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
} 