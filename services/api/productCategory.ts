import { fetchAPI } from '@/utils/fetch-api';
import { ProductCategory } from '@/types/productCategory';

/**
 * 获取产品分类列表（用于导航栏和分类列表页面）
 * 仅返回分类的基本信息，不包含产品
 */
export async function getAllProductCategories(): Promise<ProductCategory[]> {
  try {
    const response = await fetchAPI('/product-categories', {
      fields: ['id', 'name', 'slug', 'description'],
      populate: {
        featured_image: { fields: ['url'] },
        children: { fields: ['id', 'name', 'slug'] },
        parent: { fields: ['id', 'name', 'slug'] }
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return [];
  }
}

/**
 * 获取分类详情页（根据分类slug）
 * 包含该分类的基本信息，以及该分类下的产品列表（不含产品详情）
 */
export async function getCategoryBySlug(slug: string | string[]): Promise<ProductCategory | null> {
  try {
    const path = `/product-categories`;
    const urlParamsObject = {
      filters: {
        slug: {
          $eq: Array.isArray(slug) ? slug[slug.length - 1] : slug,
        },
      },
      fields: ['id', 'name', 'slug', 'description'],
      populate: {
        featured_image: { fields: ['url'] },
        parent: { fields: ['id', 'name', 'slug'] },
        children: { fields: ['id', 'name', 'slug'] },
      }
    };
    const response = await fetchAPI(path, urlParamsObject);
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}