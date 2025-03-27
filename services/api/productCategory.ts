import { fetchAPI } from '@/utils/fetch-api';
import { ProductCategory } from '@/types/productCategory';

export async function getProductCategory(slug: string): Promise<ProductCategory | null> {
  const response = await fetchAPI('/product-categories',
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        products: {
          populate: ['gallery', 'category', 'related_products', 'related_blogs'],
        },
      },
    });
  return response.data[0];
}

export async function getAllProductCategories(): Promise<ProductCategory[]> {
  try {
    const response = await fetchAPI('/product-categories',
        {
            populate: {
              children: { fields: ['id', 'name', 'slug'] },
              parent: { fields: ['id', 'name', 'slug'] }
            }
          }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string | string[]): Promise<ProductCategory | null> {
  try {
    const path = `/product-categories`
    const urlParamsObject = {
      filters: {
        slug: {
          $eq: Array.isArray(slug) ? slug[slug.length - 1] : slug,
        },
      },
      populate: ['parent', 'products'],
    }
    const response = await fetchAPI(path, urlParamsObject)
    return response.data[0] || null
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

export async function getAllCategories(): Promise<ProductCategory[]> {
  const path = `/product-categories`
  const urlParamsObject = {
    populate: ['parent', 'products'],
  }
  const response = await fetchAPI(path, urlParamsObject)
  return response.data
} 