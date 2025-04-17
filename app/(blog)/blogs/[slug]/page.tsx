import { Metadata, ResolvingMetadata } from "next";
import { generateSchema, embedSchema } from "@/utils/schema";
import { getBlogDetail, getAllBlogSlug } from "@/services/api/blog";
import { redirect } from "next/navigation";
import { fetchAPI } from "@/utils/fetch-api";
import { generateBlogBreadcrumbs } from "@/utils/breadcrumbs";

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
  const blogData = await fetchAPI(`/getBlogMetaDataBySlug/${slug}`); // 假设返回 { data: { attributes: {...} } } 或 null

  if (!blogData) {
    return null; // 文章未找到
  }
  return blogData;
}

// --- 动态生成 Metadata ---
export async function generateMetadata(
  { params }: BlogPageProps,
  parent: ResolvingMetadata // 可以访问父级解析后的元数据
): Promise<Metadata> {
  const slug = params.slug;
  const blogData = await getPageData(slug);

  // --- 处理未找到的情况 ---
  if (!blogData) {
    // 可以返回一个简单的 404 元数据
    return {
      title: "blog not found",
      description: "Sorry, the blog you requested could not be found.",
      robots: { index: false },
    };
  }

  // --- 准备元数据所需信息 ---
  const pageTitle = blogData.seo_title; // 优先使用 Strapi 中定义的 SEO 标题
  const pageDescription = blogData.seo_description; // 优先 SEO 描述，然后是摘要
  const canonicalUrl = `${siteUrl}/blogs/${slug}`;
  const featured_image = blogData.featured_image;
  const ogImageUrl = featured_image.url;
  const ogImageAlt = pageTitle;

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
      images: [
        // 提供具体图片
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
      title: pageTitle,
      description: pageDescription,
    },

    // **覆盖或添加其他元数据**
    // robots: { index: true, follow: true }, // 通常继承 layout 的设置
    other: {
      ["og:type"]: "blog",
    },
  };
}

// ✅ SSR Blog Page
export default async function BlogPage({ params }: BlogPageProps) {
  const slug = params.slug;
  const blog = await getBlogDetail(slug);
  const breadcrumbItems = generateBlogBreadcrumbs(blog);

  if (!blog) {
    redirect("/404");
  }

  // --- 生成 Schema ---
  const articleSchema = generateSchema({ type: "Article", data: blog, slug });
  const breadcrumbSchema = generateSchema({
    type: "BreadcrumbList",
    breadcrumbItems,
  });
  const schemaMetadataJson = embedSchema(
    [articleSchema, breadcrumbSchema].filter(Boolean)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <section>
        {/* Add JSON-LD to your page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
        />
        {/* ... */}
      </section>
    </div>
  );
}
