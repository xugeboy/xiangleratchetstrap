import { Metadata, ResolvingMetadata } from "next";
import { generateSchema, embedSchema } from "@/utils/schema";
import { getBlogDetail, getAllBlogSlug } from "@/services/api/blog";
import { redirect } from "next/navigation";
import { fetchAPI } from "@/utils/fetch-api";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const allBlogs = await getAllBlogSlug();
  return allBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// --- 环境变量 ---
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// --- 数据获取辅助函数 (获取页面和元数据所需的所有数据) ---
async function getPageData(slug: string) {
  // 获取数据 (确保选择所有需要的字段: title, excerpt, cover_image, author, publishedAt, etc.)
  const blogData = await fetchAPI(`/getBlogMetaDataBySlug/${slug}`);; // 假设返回 { data: { attributes: {...} } } 或 null

  if (!blogData || !blogData.data || !blogData.data.attributes) {
    return null; // 文章未找到
  }

  // 生成面包屑数据
  const breadcrumbItems = [
    { name: 'Xiangle Ratchet Strap', path: siteUrl },
    { name: 'XRS Blogs', path: `${siteUrl}/blogs` },
    { name: blogData.title, path: `${siteUrl}/blogs/${slug}` }, // 当前页面
  ];

  return { blogData, breadcrumbItems };
}

// --- 动态生成 Metadata ---
export async function generateMetadata(
  { params }: BlogPageProps,
  parent: ResolvingMetadata // 可以访问父级解析后的元数据
): Promise<Metadata> {
  const slug = params.slug;
  const pageData = await getPageData(slug);

  // --- 处理未找到的情况 ---
  if (!pageData) {
    // 可以返回一个简单的 404 元数据
    return {
      title: 'blog not found',
      description: 'Sorry, the blog you requested could not be found.',
      robots: { index: false },
    };
  }

  const { blogData, breadcrumbItems } = pageData;

  // --- 准备元数据所需信息 ---
  const pageTitle = blogData.seo_title; // 优先使用 Strapi 中定义的 SEO 标题
  const pageDescription = blogData.seo_description; // 优先 SEO 描述，然后是摘要
  const canonicalUrl = `${siteUrl}/blogs/${slug}`;
  const cover_image = blogData.cover_image;
  const ogImageUrl = cover_image.url
  const ogImageAlt = pageTitle;

  // --- 生成 Schema ---
  const articleSchema = generateSchema({ type: 'Article', data: blogData, slug });
  const breadcrumbSchema = generateSchema({ type: 'BreadcrumbList', breadcrumbItems });
  const schemaMetadata = embedSchema([articleSchema, breadcrumbSchema].filter(Boolean)); // 过滤掉可能为 null 的 schema

  // --- 返回页面特定的 Metadata ---
  return {
    // **覆盖核心元数据**
    title: pageTitle, // 会自动应用 layout.tsx 中的 title.template
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl, // 设置当前页面的规范链接
      // languages: { 'en-US': `${siteUrl}/en/blogs/${slug}` }, // 如果有英文版
    },

    // **覆盖 Open Graph 元数据**
    openGraph: {
      // 继承 layout 中的 siteName, locale
      title: pageTitle, // 使用页面标题
      description: pageDescription, // 使用页面描述
      url: canonicalUrl, // 使用页面的规范链接
      publishedTime: blogData.publishedAt, // ISO 8601 格式
      modifiedTime: blogData.updatedAt, // 更新时间或发布时间
      images: [ // 提供具体图片
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },

    // **覆盖 Twitter 卡片元数据 (可选, 否则继承 Open Graph)**
    twitter: {
      // card: 'summary_large_image', // 通常继承 layout
      title: pageTitle,
      description: pageDescription,
      // images: [ogImageUrl], // 通常继承 openGraph.images
      // creator: 作者的 Twitter Handle (如果 Strapi 有存)
    },

    // **覆盖或添加其他元数据**
    // robots: { index: true, follow: true }, // 通常继承 layout 的设置
    other: {
      ...schemaMetadata, // 嵌入 Article 和 BreadcrumbList Schema
    },
  };
}


// ✅ SSR Blog Page
export default async function BlogPage({ params }: BlogPageProps) {
  const product = await getBlogDetail(params.slug);

  if (!product) {
    redirect("/404");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    </div>
  );
}
