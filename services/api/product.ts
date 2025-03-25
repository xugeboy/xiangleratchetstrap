import { fetchAPI } from '@/utils/fetch-api';
import { Product } from '@/types/product';

export async function getProduct(slug: string): Promise<Product | null> {
  const path = `/products`;
  const urlParamsObject = {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: ['gallery', 'category', 'related_products', 'related_blogs'],
  };
  const response = await fetchAPI(path, urlParamsObject);
  return response.data[0];
}

export async function getAllProducts(): Promise<Product[]> {
  const path = `/products`;
  const urlParamsObject = {
    populate: ['gallery', 'category', 'related_products', 'related_blogs'],
  };
  const response = await fetchAPI(path, urlParamsObject);
  return response.data;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const path = `/products`;
  const urlParamsObject = {
    filters: {
      category: {
        slug: {
          $eq: categorySlug,
        },
      },
    },
    populate: ['gallery', 'category', 'related_products', 'related_blogs'],
  };
  const response = await fetchAPI(path, urlParamsObject);
  return response.data;
} 