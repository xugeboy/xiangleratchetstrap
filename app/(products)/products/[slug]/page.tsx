import { Metadata } from 'next'
import { getProductBySlug } from '@/services/api/product'
import ProductContent from './ProductContent'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const slug = await Promise.resolve(params.slug)
  const product = await getProductBySlug(slug)
  
  if (!product) {
    return {
      title: '产品未找到 - Xiangle Ratchet Strap',
      description: '抱歉，您请求的产品不存在。',
    }
  }
  
  return {
    title: `${product.name} - Xiangle Ratchet Strap`,
    description: product.about || `查看${product.name}的详细信息`,
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductContent slug={params.slug} />
} 