import Image from "next/image";
import Link from "next/link";
import formatDateToLongEnglish, { getCloudinaryPublicId, getCombainedLocalePath } from "@/utils/formatUtils";
import { getLatestBlogs } from "@/services/api/blog";
import { getLocale, getTranslations } from "next-intl/server";

export default async function ArticlesSection() {
  const lang = await getLocale();
  const t = await getTranslations('ArticlesSection');
  const blogs = await getLatestBlogs(lang);

  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          {t.rich("title", {
            span: (chunks) => <span className="text-red-600">{chunks}</span>,
          })}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => {
            const articleLink = getCombainedLocalePath(lang,`blogs/${blog.slug}`);

            return (
              <div key={blog.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* 图片区域 */}
                <div className="relative">
                  <Link
                    href={articleLink}
                    className="block h-[155px] relative"
                  >
                    <Image
                      src={getCloudinaryPublicId(blog.cover_image.url)}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </Link>
                </div>

                {/* 内容区域 */}
                <div className="p-6">
                  {/* 标题 */}
                  <h3 className="text-xl font-bold mb-3 text-gray-900 leading-tight">
                    <Link
                      href={articleLink}
                      className="hover:text-red-600 transition-colors"
                    >
                      {blog.title}
                    </Link>
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* 日期 */}
                  <div className="text-gray-500 text-sm mb-2">
                    {formatDateToLongEnglish(blog.createdAt)}
                  </div>

                  {/* Read More 按钮 */}
                  <Link
                    href={articleLink}
                    className="inline-flex items-center bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    {t("readMoreLink")} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href={getCombainedLocalePath(lang,"blogs")}
            className="inline-block border-2 border-black bg-white hover:bg-gray-100 text-black px-8 py-3 font-medium transition-colors"
          >
            {t("viewAllButton")}
          </Link>
        </div>
      </div>
    </section>
  );
}
