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