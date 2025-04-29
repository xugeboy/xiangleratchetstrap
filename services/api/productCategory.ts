import { fetchAPI } from "@/utils/fetch-api";
import { ProductCategory } from "@/types/productCategory";

/**
 * 获取所有产品分类的slug
 */
export async function getAllCategorySlug(locale:string): Promise<ProductCategory[] | null> {
    try {
      const path = `/getAllCategorySlug`;
      const response = await fetchAPI(path,locale);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
}

/**
 * 获取产品详情页面所需的完整产品信息
 */
export async function getProductBySlug(slug: string,locale:string): Promise<ProductCategory | null> {
  try {
    const path = `/getProductBySlug/${slug}`;
    const response = await fetchAPI(path,locale);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}