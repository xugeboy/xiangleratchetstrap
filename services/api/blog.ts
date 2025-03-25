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

export async function getAllBlogs(): Promise<Blog[]> {
  const path = `/blogs`;
  const urlParamsObject = {
    populate: ['products', 'cover_image'],
  };
  const response = await fetchAPI(path, urlParamsObject);
  return response.data;
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