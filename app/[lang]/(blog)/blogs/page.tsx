import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { getBlogList } from "@/services/api/blog";
import formatDateToLongEnglish, { getCloudinaryPublicId, getCombainedLocalePath } from "@/utils/formatUtils";
import { getLocale } from "next-intl/server";

// --- Component ---
interface BlogsPageProps {
  searchParams?: {
    page?: string;
  };
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  // 1. Get and validate current page from searchParams
  const pageQuery = await searchParams?.page;
  const parsedPage = pageQuery ? Number.parseInt(pageQuery, 10) : 1;
  const currentPage = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const locale = await getLocale();

  // 2. Fetch blog list data
  // Add error handling for the API call if needed (try/catch)
  const { data, meta } = await getBlogList(currentPage,locale);

  // 3. Extract total pages from meta (ADJUST BASED ON YOUR API RESPONSE)
  const totalPages = meta?.pagination?.pageCount || 1;

  // Helper function for pagination logic (optional, but cleans up JSX)
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Max buttons including ellipsis
    const sidePages = 1; // Pages to show around current page

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page
      pageNumbers.push(1);

      // Ellipsis after first page?
      if (currentPage > sidePages + 2) {
        pageNumbers.push("...");
      }

      // Pages around current page
      const startPage = Math.max(2, currentPage - sidePages);
      const endPage = Math.min(totalPages - 1, currentPage + sidePages);
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Ellipsis before last page?
      if (currentPage < totalPages - sidePages - 1) {
        pageNumbers.push("...");
      }

      // Show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((page, index) => {
      if (typeof page === "string") {
        return (
          <span key={`ellipsis-${index}`} className="px-3 py-2">
            ...
          </span>
        );
      }

      return (
        <Link
          key={page}
          href={getCombainedLocalePath(locale,`blogs?page=${page}`)}
          className={`px-3 py-2 border rounded ${
            currentPage === page ? "bg-black text-white" : "hover:bg-gray-100"
          }`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </Link>
      );
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Blogs</h1>

      {/* Blog Grid */}
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((blog) => (
            <div key={blog.id} className="flex flex-col">
              <Link
                href={getCombainedLocalePath(locale,`blogs/${blog.slug}`)}
                aria-label={`Read more about ${blog.title}`}
              >
                <div className="relative h-48 mb-2 overflow-hidden rounded-lg group">
                  <Image
                    src={getCloudinaryPublicId(blog.cover_image.url)}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Optional overlay */}
                </div>
              </Link>
              {/* Use optional chaining for date if it might be missing */}
              {blog.createdAt && (
                <div className="text-sm text-center text-black mb-1">
                  {formatDateToLongEnglish(blog.createdAt)}
                </div>
              )}
              <Link href={getCombainedLocalePath(locale,`blogs/${blog.slug}`)} className="mb-2">
                <h2 className="text-md font-semibold text-center hover:text-black transition-colors line-clamp-2">
                  {blog.title}
                </h2>
                {/* Use optional chaining for excerpt */}
                {blog.excerpt && (
                  <p className="text-sm text-black text-center line-clamp-3">
                    {blog.excerpt}
                  </p>
                )}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-black">No news articles found.</p> // Handle case with no blogs
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-1 sm:space-x-2">
          {/* Previous Button */}
          {currentPage > 1 && (
            <Link
              href={`/blogs?page=${currentPage - 1}`}
              className="p-2 border rounded hover:bg-gray-100 transition-colors"
              aria-label="Go to previous page"
            >
              <ChevronRightIcon className="h-5 w-5 rotate-180" />
            </Link>
          )}

          {/* Page Numbers */}
          {renderPageNumbers()}

          {/* Next Button */}
          {currentPage < totalPages && (
            <Link
              href={`/blogs?page=${currentPage + 1}`}
              className="p-2 border rounded hover:bg-gray-100 transition-colors"
              aria-label="Go to next page"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
