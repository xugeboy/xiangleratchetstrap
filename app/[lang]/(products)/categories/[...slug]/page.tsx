import { Metadata, ResolvingMetadata } from 'next'
import { fetchAPI } from '@/utils/fetch-api'
import CategoryContent from './CategoryContent'
import { ProductCategory } from '@/types/productCategory'
import { defaultUrlPrefix, localePrefixMap } from '@/middleware'
import { getCategoryMetaDataBySlug, getCorrectCategorySlugForLocale } from '@/services/api/productCategory'
import { notFound, redirect } from 'next/navigation'
interface CategoryPageProps {
  params: {
    slug: string[];
    lang: string;
  }
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export async function generateMetadata(
  { params }: CategoryPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const lastSlug = params.slug[params.slug.length - 1];
  const currentLocale = params.lang;
  const categoryData = await getCategoryMetaDataBySlug(lastSlug,currentLocale);

  if (!categoryData) {
    return {
      title: "product not found",
      description: "Sorry, the product you requested could not be found.",
      robots: { index: false },
    };
  }

  const pageTitle = categoryData.seo_title;
  const pageDescription = categoryData.seo_description;
  const featured_image = categoryData.featured_image;
  const ogImageUrl = featured_image?featured_image.url:undefined;
  const ogImageAlt = pageTitle;

  let canonicalUrlPath;
  if (currentLocale === "en") {
    canonicalUrlPath = `/categories/${categoryData.slug}`;
  } else {
    canonicalUrlPath = `/${currentLocale}/categories/${categoryData.slug}`;
  }
  const canonicalUrl = `${siteUrl}${canonicalUrlPath}`;


  const languagesAlternate: Record<string, string> = {};


  for (const ietfTag in localePrefixMap) {
    const targetUrlPrefix = localePrefixMap[ietfTag];

    const slugForTargetPrefix = categoryData.allLanguageSlugs?.[targetUrlPrefix];

    if (slugForTargetPrefix) {
      let pathForLang = "";
      if (targetUrlPrefix === defaultUrlPrefix) {
        pathForLang = `${siteUrl}/categories/${slugForTargetPrefix}`;
      } else {
        pathForLang = `${siteUrl}/${targetUrlPrefix}/categories/${slugForTargetPrefix}`;
      }
      languagesAlternate[ietfTag] = pathForLang;
    }
  }

  // 设置 x-default
  const slugForXDefault = categoryData.allLanguageSlugs?.[defaultUrlPrefix];
  if (slugForXDefault) {
    languagesAlternate['x-default'] = `${siteUrl}/categories/${slugForXDefault}`;
  }

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl, // 设置当前页面的规范链接
      languages: Object.keys(languagesAlternate).length > 0 ? languagesAlternate : undefined,
    },
    openGraph: {
      title: pageTitle, // 使用页面标题
      description: pageDescription, // 使用页面描述
      url: canonicalUrl, // 使用页面的规范链接
      publishedTime: categoryData.publishedAt, // ISO 8601 格式
      modifiedTime: categoryData.updatedAt, // 更新时间或发布时间
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      title: pageTitle,
      description: pageDescription,
    },
    other: {
      ["og:type"]: "category",
    },
  };
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
      paths.push(currentPath);
      if (category.children && category.children.length > 0) {
        const childPaths = getAllSlugPaths(category.children, currentPath);
        paths.push(...childPaths);
      }
    }
  
    return paths;
  }

export default async function CategoryPage({ params }: CategoryPageProps) {
  const slug = params.slug;
  const targetSlug = slug[slug.length - 1];
  const lang = params.lang;
  const correctSlug = await getCorrectCategorySlugForLocale(targetSlug, params.lang);
  if (correctSlug) {
    notFound();
  }
  if (targetSlug !== correctSlug) {
    let redirectPath;
    const entityTypePath = "categories";

    if (lang === defaultUrlPrefix) {
      redirectPath = `/${entityTypePath}/${correctSlug}`;
    } else {
      redirectPath = `/${lang}/${entityTypePath}/${correctSlug}`;
    }
    redirect(redirectPath);
  }

  return <CategoryContent slug={slug} lang={lang}/>
}
