import { Metadata, ResolvingMetadata } from "next";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { generateSchema, embedSchema } from "@/utils/schema";
import { getBlogDetail, getBlogMetaDataBySlug } from "@/services/api/blog";
import { notFound } from "next/navigation";
import { generateBlogBreadcrumbs } from "@/utils/breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import BlocksClient from "@/components/common/BlocksClient";
import formatDateToLongEnglish, {
  getCloudinaryPublicId,
} from "@/utils/formatUtils";
import { defaultUrlPrefix, localePrefixMap } from "@/middleware";
import { getLocale, getTranslations } from "next-intl/server";
import TableOfContents from "@/components/common/TableOfContents";
import BlogQuickInquiryForm from "@/components/forms/BlogQuickInquiryForm";
import RelatedContent from "@/components/blog/RelatedContent";
import { getBlogFaqsBySlug } from "@/services/api/faq";
import FaqList from "@/app/[lang]/(public)/faq/FaqList";
// 辅助类型与函数，用于从 Strapi 的块状内容节点中提取纯文本
type StrapiNode = {
  type?: string;
  text?: string;
  children?: StrapiNode[];
  level?: number;
};

const getPlainTextFromStrapi = (nodes: StrapiNode[]): string => {
  return nodes
    .map((node) => {
      if (node.type === "text") {
        return node.text;
      }
      if (node.children) {
        return getPlainTextFromStrapi(node.children);
      }
      return "";
    })
    .join("");
};

// --- 元数据生成 (保持不变) ---
interface BlogPageProps {
  params: {
    slug: string;
    lang: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

export async function generateMetadata(
  { params }: BlogPageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  void _parent;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const { slug, lang } = await params;
  const currentLocale = lang;
  const blogData = await getBlogMetaDataBySlug(slug, currentLocale);

  if (!blogData) {
    notFound();
  }

  const pageTitle = blogData.seo_title;
  const pageDescription = blogData.seo_description;
  const coverImage = blogData.cover_image;
  const ogImageUrl = coverImage.url;
  const ogImageAlt = pageTitle;

  let canonicalUrlPath;
  if (currentLocale === defaultUrlPrefix || currentLocale === undefined) {
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
  // const slugForXDefault = blogData.allLanguageSlugs?.[defaultUrlPrefix];
  // if (slugForXDefault) {
  //   languagesAlternate["x-default"] = `${siteUrl}/blogs/${slugForXDefault}`;
  // }

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
      languages:
        Object.keys(languagesAlternate).length > 0
          ? languagesAlternate
          : undefined,
    },

    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      publishedTime: blogData.publishedAt,
      modifiedTime: blogData.updatedAt,
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
      ["og:type"]: "blog",
    },
  };
}

// --- 页面组件 (主要修改部分) ---
export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const lang = await getLocale();
  const t = await getTranslations({
    locale: lang,
    namespace: "BlogPage",
  });

  const blog = await getBlogDetail(slug, lang);
  const breadcrumbItems = generateBlogBreadcrumbs(blog, lang);

  if (!blog) {
    notFound();
  }

  // --- 修改: 从博客内容中提取标题，并使用递增数字生成ID ---
  const headings: { id: string; text: string; level: number }[] = [];
  const headingCounters: { [key: number]: number } = { 2: 0, 3: 0 }; // 分别为 h2, h3 设置计数器

  // 遍历内容块，为标题块注入ID，并生成目录所需的数据
  const contentNodes: StrapiNode[] = (blog.content ??
    []) as unknown as StrapiNode[];
  const contentWithIds = contentNodes.map((block) => {
    if (block.type === "heading" && (block.level === 2 || block.level === 3)) {
      const level = block.level;
      if (level === 2 || level === 3) {
        headingCounters[level]++; // 对应级别的计数器加一
        const id = `h${level}_${headingCounters[level]}`; // 生成ID，如 h2_1
        const text = getPlainTextFromStrapi(block.children);

        // 将生成的标题信息推入目录数组
        headings.push({ id, text, level });

        // 返回带有新 'id' 属性的块对象
        return { ...block, id } as StrapiNode & { id: string };
      }
    }
    return block;
  });

  // 加载 FAQ（全局 + 博客关联）
  const faqs = await getBlogFaqsBySlug(blog.slug, lang);

  // Publisher info from env (Organization)
  const publisherName = "Dustin Xu";
  const publisherLogoUrl = "/v1744176226/dustin_io6avf.png";

  // --- 生成优化的 Schema 结构 ---
  const articleSchema = generateSchema({
    lang: lang,
    type: "Article",
    data: blog,
    faqs,
    slug,
  });
  const breadcrumbSchema = generateSchema({
    type: "BreadcrumbList",
    breadcrumbItems,
  });
  const schemaMetadataJson = embedSchema(
    [articleSchema, breadcrumbSchema].filter(Boolean)
  );

  return (
    <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-8">
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
        />
      </section>

      {/* 头部区域 */}
      <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={getCloudinaryPublicId(blog.cover_image.url)}
            alt={blog.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* 标题和元信息区域 */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-gray-900 mb-4">
          {blog.title}
        </h1>

        {/* 日期和作者信息 */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
          <div className="bg-yellow-400 text-black font-medium py-2 px-4 inline-block text-sm">
            {formatDateToLongEnglish(blog.createdAt)}
          </div>
          {publisherName && publisherLogoUrl && (
            <div className="flex items-center gap-3">
              <Image
                src={publisherLogoUrl}
                alt={publisherName}
                width={40}
                height={40}
                className="rounded-full bg-white p-1 object-contain"
                sizes="40px"
              />
              <span className="text-sm font-medium text-gray-900">
                {publisherName}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 修改: 主体内容改为网格布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">
        {/* 左侧：使用一个粘性容器包裹两个独立组件，避免相互重叠 */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 space-y-6 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
            <TableOfContents headings={headings} />
            <BlogQuickInquiryForm />
          </div>
        </aside>

        {/* 右侧文章内容 */}
        <main className="lg:col-span-3">
          <BlocksClient content={contentWithIds as unknown as BlocksContent} />
          <div className="mt-12">
            <RelatedContent
              products={blog.products}
              blogs={blog.blogs}
              lang={lang}
            />
          </div>
          {faqs && faqs.length > 0 && (
            <section className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                FREQUENTLY ASKED QUESTIONS:
              </h2>
              <FaqList faqs={faqs} />
            </section>
          )}
        </main>
      </div>

      {/* 博客页脚 */}
      <div className="mt-16 border-t pt-8 mx-auto">
        {/* 联系我们 */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 items-start">
          <div>
            <h2 className="text-2xl font-bold uppercase mb-4">
              {t("getInTouch")}
            </h2>
            <p className="mb-1">
              <span className="font-medium">Email:</span>{" "}
              <a
                href={`mailto:info@xiangleratchetstrap.com`}
                className="text-red-600"
              >
                info@xiangleratchetstrap.com
              </a>
            </p>
          </div>
        </div>

        {/* 关于我们 */}
        <div className="mb-12 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold uppercase mb-4 text-black">
            {t("about.title")}
          </h2>
          <p className="text-black text-sm">{t("about.description")}</p>
        </div>

        {/* 返回博客列表 */}
        <div className="flex justify-center mb-8">
          <Link
            href="/blogs"
            className="flex items-center text-black hover:text-red-600 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            {t("backToBlog")}
          </Link>
        </div>
      </div>
    </div>
  );
}
