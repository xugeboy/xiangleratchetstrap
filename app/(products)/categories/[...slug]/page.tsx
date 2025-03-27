import { Metadata } from 'next'
import { getCategoryBySlug } from '@/services/api/productCategory'
import CategoryContent from './CategoryContent'

interface CategoryPageProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug)
  if (!category) {
    return {
      title: '分类未找到 - Xiangle Ratchet Strap',
      description: '抱歉，您请求的分类不存在。',
    }
  }
  return {
    title: `${category.name} - Xiangle Ratchet Strap`,
    description: category.description || `浏览我们的${category.name}产品系列`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryContent slug={params.slug} />
}
