import Link from 'next/link';
import Image from 'next/image';
import { Blog } from '@/types/blog';

interface RelatedArticlesProps {
  blogs?: Blog[];
}

export default function RelatedArticles({ blogs = [] }: RelatedArticlesProps) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <Link 
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="flex items-center gap-4 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <div className="relative w-20 h-20 flex-shrink-0">
              {blog.cover_image && (
                <Image
                  src={blog.cover_image}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-lg"
                />
              )}
            </div>
            <h3 className="text-lg font-medium group-hover:text-green-600 transition-colors">
              {blog.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
} 