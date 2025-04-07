import { Metadata } from 'next'
import { fetchAPI } from '@/utils/fetch-api'
import CategoryContent from './CategoryContent'
import { redirect } from 'next/navigation'
import { ProductCategory } from '@/types/productCategory'
interface CategoryPageProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const path = `/getCategoryMetaDataBySlug`;
    const urlParamsObject = {
        slug: params.slug
    };
    const response = await fetchAPI(path, urlParamsObject);
    const category = response.data as ProductCategory;
  if (!category) {
    redirect("/404");
  }
  return {
    title: category.seo_title,
    description: category.seo_description,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryContent slug={params.slug} />
}
