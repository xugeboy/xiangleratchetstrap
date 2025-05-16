import { fetchAPI, postAPI } from "@/utils/fetch-api";
import { Product } from "@/types/product";
import { getFullLocale, getPreviousFullLocale } from "@/utils/formatUtils";

/**
 * 获取所有产品的slug
 */
export async function getAllProductSlug(): Promise<Product[] | null> {
  try {
    const response = await fetchAPI("/getAllProductSlug");
    return response.data || null;
  } catch (error) {
    console.error("Error fetching product slug:", error);
    return null;
  }
}

export async function getAllProductSlugByLocale(
  locale: string
): Promise<Product[] | null> {
  try {
    const response = await fetchAPI(
      "/getAllProductSlug",
      getFullLocale(locale)
    );
    return response.data || null;
  } catch (error) {
    console.error("Error fetching product slug:", error);
    return null;
  }
}

/**
 * 获取产品详情页面所需的完整产品信息
 */
export async function getProductBySlug(
  slug: string,
  locale: string
): Promise<Product | null> {
  try {
    const path = `/getProductBySlug/${slug}`;
    const response = await fetchAPI(path, getFullLocale(locale));
    return response.data || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
export async function getCorrectProductSlugForLocale(slug: string,locale:string, previousLocale:string): Promise<string | null> {
  try {
    const path = `/getCorrectProductSlugForLocale/${slug}`;
    const response = await fetchAPI(path,getPreviousFullLocale(locale,previousLocale));
    return response.data;
  } catch (error) {
    console.error("Error fetching Category:", error);
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
  pageSize: number = 12,
  filters: Record<string, string[]>,
  locale: string
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
      filters: filters,
      pagination: {
        page,
        pageSize,
      },
      locale: locale,
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
export async function searchProducts(
  query: string,
  locale: string
): Promise<Product[]> {
  try {
    const path = `/searchProducts/${query}`;
    const response = await fetchAPI(path, getFullLocale(locale));
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
  slug: string,
  locale: string
): Promise<Record<string, Record<string, number>>> {
  try {
    const path = `/getAttributeFiltersByCategorySlug/${slug}`;
    const response = await fetchAPI(path, getFullLocale(locale));
    return response || {};
  } catch (error) {
    console.error("Error fetching product filters:", error);
    return {};
  }
}

/**
 * 根据筛选条件获取产品列表
 * @param categorySlug 类别slug
 * @param page 页码，默认为1
 * @param pageSize 每页数量，默认为12
 * @param attributeFilters 属性筛选条件
 * @returns 包含产品列表和分页信息的对象
 */
export async function filterProducts(
  categorySlug: string,
  page: number = 1,
  pageSize: number = 12,
  attributeFilters: Record<string, string[]> = {},
  locale: string
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
    const urlParamsObject = getFullLocale(locale);
    const response = await postAPI("/filterProducts", {
      categorySlug,
      page,
      pageSize,
      attributeFilters,
      ...urlParamsObject,
    });
    return {
      data: response.data,
      meta: response.meta,
    };
  } catch (error) {
    console.error("Error filtering products:", error);
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
