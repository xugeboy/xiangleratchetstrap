import { fetchAPI } from "@/utils/fetch-api";
import { Product } from "@/types/product";

/**
 * 获取产品详情页面所需的完整产品信息
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const path = `/products`;
    const urlParamsObject = {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      fields: [
        "id",
        "name",
        "slug",
        "code",
        "about",
        "see_more",
        "youtube_url",
        "assembly_break_strength",
        "length",
        "fixed_end_length",
        "end_fitting",
        "width",
        "working_load_limit",
        "material",
        "webbing_break_strength",
        "grade",
        "ratchet_handle",
        "finish",
        "product_weight",
      ],
      populate: {
        featured_image: { fields: ["url"] },
        gallery: { fields: ["url"] },
        category: { fields: ["id", "name", "slug"] },
        related_products: {
          fields: ["id", "name", "slug", "code"],
          populate: {
            featured_image: { fields: ["url"] },
          },
        },
        related_blogs: { fields: ["id", "title", "slug"] },
      },
    };
    const response = await fetchAPI(path, urlParamsObject);
    return response.data[0] || null;
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
    const path = `/products`;
    const urlParamsObject = {
      filters: {
        category: {
          slug: {
            $eq: categorySlug,
          },
        },
      },
      fields: ["id", "name", "slug", "code"],
      populate: {
        featured_image: { fields: ["url"] },
      },
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
 * 获取首页或特色产品列表（简化信息）
 */
export async function getFeaturedProducts(
  limit: number = 8
): Promise<Product[]> {
  try {
    const path = `/products`;
    const urlParamsObject = {
      sort: ["id:desc"], // 可根据需要修改排序方式
      pagination: {
        limit,
      },
      fields: ["id", "name", "slug", "code"],
      populate: {
        featured_image: { fields: ["url"] },
      },
    };
    const response = await fetchAPI(path, urlParamsObject);
    return response.data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}
