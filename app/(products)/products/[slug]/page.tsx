import { Metadata } from 'next'
import { getProductBySlug } from '@/services/api/product'
import ProductContent from './ProductContent'
import { redirect } from 'next/navigation'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const slug = await Promise.resolve(params.slug)
  const product = await getProductBySlug(slug)
  
  if (!product) {
    redirect("/404");
  }
  
  return {
    title: product.seo_title,
    description: product.seo_description,
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductContent slug={params.slug} />
} 