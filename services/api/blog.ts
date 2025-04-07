import { fetchAPI } from '@/utils/fetch-api';
import { Blog } from '@/types/blog';

export async function getBlog(slug: string): Promise<Blog | null> {
  const path = `/blogs`;
  const urlParamsObject = {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: ['products', 'cover_image'],
  };
  const response = await fetchAPI(path, urlParamsObject);
  return response.data[0];
}

/**
 * 获取所有产品分类的slug
 */
export async function getAllBlogSlug(): Promise<Blog[] | null> {
    try {
      const path = `/getAllBlogSlug`;
      const response = await fetchAPI(path);
      return response.data || null;
    } catch (error) {
      console.error("Error fetching blog:", error);
      return null;
    }
}

export async function getBlogsByProduct(productSlug: string): Promise<Blog[]> {
  const path = `/blogs`;
  const urlParamsObject = {
    filters: {
      products: {
        slug: {
          $eq: productSlug,
        },
      },
    },
    populate: ['products', 'cover_image'],
  };
  const response = await fetchAPI(path, urlParamsObject);
  return response.data;
} 