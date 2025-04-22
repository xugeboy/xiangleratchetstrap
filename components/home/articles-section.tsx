import Image from "next/image";
import Link from "next/link";
import formatDateToLongEnglish from "@/utils/formatUtils";
import { getLatestBlogs } from "@/services/api/blog";

export default async function ArticlesSection() {
  const blogs = await getLatestBlogs();

  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          NEWEST <span className="text-amber-700">BLOGS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog) => {
            const articleLink = `/blogs/${blog.slug}`;

            return (
              <div key={blog.id} className="flex flex-col">
                <Link
                  href={articleLink}
                  className="aspect-[4/3] relative mb-4 block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src={blog.cover_image.url}
                    alt={blog.seo_title}
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
                <div className="text-sm text-gray-500 text-center mb-2">
                  {formatDateToLongEnglish(blog.createdAt)}
                </div>
                <p className="text-gray-600 mb-4 flex-grow">{blog.excerpt}</p>
                <Link
                  href={articleLink}
                  className="text-[#1a3b5d] font-medium hover:underline self-center"
                >
                  Read More
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blogs" // 指向博客列表页
            className="inline-block border-2 border-black bg-white hover:bg-gray-100 text-black px-8 py-3 font-medium transition-colors"
          >
            VIEW ALL
          </Link>
        </div>
      </div>
    </section>
  );
}
