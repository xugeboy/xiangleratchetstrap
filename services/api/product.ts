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

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await fetchAPI('/api/products?populate=*')
    return data.data || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const path = `/products`
    const urlParamsObject = {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ['category', 'gallery', 'related_products', 'related_blogs'],
    }
    const response = await fetchAPI(path, urlParamsObject)
    return response.data[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}