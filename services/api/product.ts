import { fetchAPI } from "@/utils/fetch-api";
import { Product } from "@/types/product";

/**
 * 获取产品详情页面所需的完整产品信息
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const path = `/products/${slug}`;
    const response = await fetchAPI(path);
    return response.data || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

/**
 * 根据分类获取产品列表（用于分类产品列表页面）
 * @param categorySlug 类别slug
 * @param page 页码，默认为1
 * @param pageSize 每页数量，默认为12
 * @returns 包含产品列表和分页信息的对象
 */
export async function getProductsByCategorySlug(
  categorySlug: string,
  page: number = 1,
  pageSize: number = 12
): Promise<{
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}> {
  try {
    const path = `/products/${categorySlug}`;
    const urlParamsObject = {
      pagination: {
        page,
        pageSize,
      },
    };
    const response = await fetchAPI(path, urlParamsObject);
    return {
      data: response.data,
      meta: response.meta,
    };
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return {
      data: [],
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
}

/**
 * 搜索产品
 */
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const path = `/products/search`;
    const urlParamsObject = {
      query,
    };
    const response = await fetchAPI(path, urlParamsObject);
    return response.data || [];
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

/**
 * 获取产品筛选条件数据
 * @returns 返回产品筛选条件数据，包含各种属性及其选项
 */
export async function getProductFilters(
  slug: string
): Promise<Record<string, Record<string, number>>> {
  try {
    const path = `/products/attribute-filters`;
    const urlParamsObject = {
      categorySlug: slug
    };
    const response = await fetchAPI(path, urlParamsObject);
    return response || {};
  } catch (error) {
    console.error("Error fetching product filters:", error);
    return {};
  }
}
