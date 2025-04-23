import { Metadata } from 'next'
import { fetchAPI } from '@/utils/fetch-api'
import CategoryContent from './CategoryContent'
import { notFound } from 'next/navigation'
import { ProductCategory } from '@/types/productCategory'
interface CategoryPageProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  // Get the last slug part
  const innerParams = await params;
  const lastSlug = innerParams.slug[innerParams.slug.length - 1];
  
  try {
    const response = await fetchAPI(`/getCategoryMetaDataBySlug/${lastSlug}`);
    const category = response.data as ProductCategory;
    if (!category) {
      notFound()
    }
    return {
      title: category.seo_title,
      description: category.seo_description,
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
    notFound()
  }
}

export async function generateStaticParams() {
    const categories = await fetchAPI(`/getAllCategorySlugAndChildren`);
    const paths = getAllSlugPaths(categories.data);

    return paths.map((slugArray) => ({ slug: slugArray }));
}


// 递归生成所有可能的 slug 路径组合
function getAllSlugPaths(categories: ProductCategory[], parentSlugs: string[] = []): string[][] {
    const paths: string[][] = [];
  
    for (const category of categories) {
      const currentPath = [...parentSlugs, category.slug];
      paths.push(currentPath); // 当前分类路径
      if (category.children && category.children.length > 0) {
        const childPaths = getAllSlugPaths(category.children, currentPath);
        paths.push(...childPaths);
      }
    }
  
    return paths;
  }

export default async function CategoryPage({ params }: CategoryPageProps) {

  
  const innerParams = await params;
  return <CategoryContent slug={innerParams.slug} />
}
