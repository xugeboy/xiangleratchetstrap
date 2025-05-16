import { Metadata, ResolvingMetadata } from "next";
import { generateSchema, embedSchema } from "@/utils/schema";
import {
  getBlogDetail,
  getAllBlogSlug,
  getBlogMetaDataBySlug,
  getCorrectBlogSlugForLocale,
} from "@/services/api/blog";
import { notFound, redirect } from "next/navigation";
import { generateBlogBreadcrumbs } from "@/utils/breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import BlocksClient from "@/components/common/BlocksClient";
import formatDateToLongEnglish from "@/utils/formatUtils";
import { defaultUrlPrefix, localePrefixMap } from "@/middleware";

export const dynamic = 'force-dynamic';

interface BlogPageProps {
  params: {
    slug: string;
    lang: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
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

// --- 动态生成 Metadata ---
export async function generateMetadata(
  { params }: BlogPageProps,
  parent: ResolvingMetadata // 可以访问父级解析后的元数据
): Promise<Metadata> {
  const slug = params.slug;
  const currentLocale = params.lang;
  const blogData = await getBlogMetaDataBySlug(slug,currentLocale);

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
  const coverImage = blogData.cover_image;
  const ogImageUrl = coverImage.url;
  const ogImageAlt = pageTitle;

  let canonicalUrlPath;
  if (currentLocale === "en") {
    canonicalUrlPath = `/blogs/${blogData.slug}`;
  } else {
    canonicalUrlPath = `/${currentLocale}/blogs/${blogData.slug}`;
  }
  const canonicalUrl = `${siteUrl}${canonicalUrlPath}`;


  const languagesAlternate: Record<string, string> = {};


  for (const ietfTag in localePrefixMap) {
    const targetUrlPrefix = localePrefixMap[ietfTag];

    const slugForTargetPrefix = blogData.allLanguageSlugs?.[targetUrlPrefix];

    if (slugForTargetPrefix) {
      let pathForLang = "";
      if (targetUrlPrefix === defaultUrlPrefix) {
        pathForLang = `${siteUrl}/blogs/${slugForTargetPrefix}`;
      } else {
        pathForLang = `${siteUrl}/${targetUrlPrefix}/blogs/${slugForTargetPrefix}`;
      }
      languagesAlternate[ietfTag] = pathForLang;
    }
  }

  // 设置 x-default
  const slugForXDefault = blogData.allLanguageSlugs?.[defaultUrlPrefix];
  if (slugForXDefault) {
    languagesAlternate['x-default'] = `${siteUrl}/blogs/${slugForXDefault}`;
  }

  // --- 返回页面特定的 Metadata ---
  return {
    // **覆盖核心元数据**
    title: pageTitle, // 会自动应用 layout.tsx 中的 title.template
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl, // 设置当前页面的规范链接
      languages: Object.keys(languagesAlternate).length > 0 ? languagesAlternate : undefined,
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
export default async function BlogPage({ params,searchParams }: BlogPageProps) {
  const slug = params.slug;
  const currentLocale = params.lang;
  const previousLocale = searchParams?.pl;
  if(previousLocale){
    const correctSlug = await getCorrectBlogSlugForLocale(slug, currentLocale, previousLocale);
    if (!correctSlug) {
      notFound();
    }
    if (slug !== correctSlug) {
      let redirectPath;
      const entityTypePath = "blogs";
  
      if (params.lang === defaultUrlPrefix) {
        redirectPath = `/${entityTypePath}/${correctSlug}`;
      } else {
        redirectPath = `/${currentLocale}/${entityTypePath}/${correctSlug}`;
      }
      redirect(redirectPath);
    }
  }

  const blog = await getBlogDetail(slug,currentLocale);
  const breadcrumbItems = generateBlogBreadcrumbs(blog,currentLocale);

  if (!blog) {
    notFound()
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
      <div className="relative w-full h-[400px] mb-8">
        <div className="absolute inset-0">
          <Image
            src={blog.cover_image.url}
            alt={blog.title}
            fill
            className="object-scale-down"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-4xl font-bold uppercase tracking-wide mb-2">
            {blog.title}
          </h1>
          <div className="bg-yellow-400 text-black font-medium py-2 px-4 inline-block">
            {formatDateToLongEnglish(blog.createdAt)}
          </div>
        </div>
      </div>

      <BlocksClient content={blog.content}></BlocksClient>

      {/* Blog Footer - Added from first image */}
      <div className="mt-16 border-t pt-8">
        {/* Related Articles Section */}
        {blog.blogs && blog.blogs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold uppercase mb-6">
              MORE ARTICLES YOU MAY LIKE
            </h2>
            <ul className="space-y-4">
              {blog.blogs.map((blog, index) => (
                <li key={index}>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-amber-700 hover:underline"
                  >
                    {blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact Section */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 items-start">
          <div>
            <h2 className="text-3xl font-bold uppercase mb-4">
              GET IN TOUCH WITH YOUR DEDICATED TEAM
            </h2>
            <p className="mb-1">
              <span className="font-medium">Email:</span>{" "}
              <a
                href={`mailto:info@xiangleratchetstrap.com`}
                className="text-amber-700"
              >
                info@xiangleratchetstrap.com
              </a>
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-12 bg-gray-100 p-6">
          <h2 className="text-2xl font-bold uppercase mb-4">
            ABOUT XIANGLE RATCHET STRAP
          </h2>
          <p className="text-gray-700 text-sm">
            Founded in 2006, Xiangle Ratchet Strap is a specialized manufacturer
            of cargo tie-down solutions, focusing exclusively on tie-down
            products for transportation and logistics. With nearly two decades
            of industry experience, we offer reliable OEM & ODM services,
            tailored to meet the unique requirements of our global B2B clients.
            Backed by consistent quality, fast lead times, and responsive
            service, Xiangle is your trusted partner for high-performance cargo
            securing solutions.
          </p>
        </div>

        {/* Back to Blog Link */}
        <div className="flex justify-center mb-8">
          <Link
            href="/blogs"
            className="flex items-center text-gray-700 hover:text-black"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to blog
          </Link>
        </div>
      </div>
    </div>
  );
}
