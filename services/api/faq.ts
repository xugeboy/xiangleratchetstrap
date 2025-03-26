import { Faq } from '@/types/faq'
import { fetchAPI } from '@/utils/fetch-api'

export async function getFaqs(): Promise<Faq[]> {
  try {
    const path = `/faqs`;
    const urlParamsObject = {};
    const data = await fetchAPI(path, urlParamsObject)
    return data.data || []
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
} 