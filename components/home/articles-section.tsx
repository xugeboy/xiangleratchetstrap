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
            span: (chunks) => <span className="text-amber-700">{chunks}</span>,
          })}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => {
            const articleLink = getCombainedLocalePath(lang,`blogs/${blog.slug}`);

            return (
              <div key={blog.id} className="flex flex-col">
                <Link
                  href={articleLink}
                  className="aspect-[4/3] relative mb-4 block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src={getCloudinaryPublicId(blog.cover_image.url)}
                    alt={blog.title}
                    fill
                    className="object-scale-down"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </Link>
                <h3 className="text-xl font-bold mb-2 text-center">
                  <Link
                    href={articleLink}
                    className="hover:text-amber-700 transition-colors"
                  >
                    {blog.title}
                  </Link>
                </h3>
                <div className="text-sm text-black text-center mb-2">
                  {formatDateToLongEnglish(blog.createdAt)}
                </div>
                <p className="text-black mb-4 flex-grow">{blog.excerpt}</p>
                <Link
                  href={articleLink}
                  className="text-[#1a3b5d] font-medium hover:underline self-center"
                >
                  {t("readMoreLink")} 
                </Link>
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
