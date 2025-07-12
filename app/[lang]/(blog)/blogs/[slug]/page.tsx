import { Metadata, ResolvingMetadata } from "next";
import { generateSchema, embedSchema } from "@/utils/schema";
import {
  getBlogDetail,
  getAllBlogSlug,
  getBlogMetaDataBySlug,
} from "@/services/api/blog";
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

export const dynamic = "force-dynamic";

interface BlogPageProps {
  params: {
    slug: string;
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

export async function generateMetadata(
  { params }: BlogPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const { slug } = await params;
  const currentLocale = await getLocale();
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
  const slugForXDefault = blogData.allLanguageSlugs?.[defaultUrlPrefix];
  if (slugForXDefault) {
    languagesAlternate["x-default"] = `${siteUrl}/blogs/${slugForXDefault}`;
  }

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
    <div className="mx-auto container px-4 sm:px-6 lg:px-8">
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
        />
      </section>
      <div className="relative w-full h-[400px] mb-8">
        <div className="absolute inset-0">
          <Image
            src={getCloudinaryPublicId(blog.cover_image.url)}
            alt={blog.title}
            fill
            className="object-scale-down"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
              {t("relatedArticles")}
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
              {t("getInTouch")}
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
          <h2 className="text-2xl font-bold uppercase mb-4 text-black">
            {t("about.title")}
          </h2>
          <p className="text-black text-sm">{t("about.description")}</p>
        </div>

        {/* Back to Blog Link */}
        <div className="flex justify-center mb-8">
          <Link href="/blogs" className="flex items-center text-black">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            {t("backToBlog")}
          </Link>
        </div>
      </div>
    </div>
  );
}
