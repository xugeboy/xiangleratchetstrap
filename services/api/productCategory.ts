import { fetchAPI } from "@/utils/fetch-api";
import { CategoryNavigationItem } from "@/types/categoryNavigation";
import { ProductCategory } from "@/types/productCategory";
import { getFullLocale, getPreviousFullLocale } from "@/utils/formatUtils";
import { toNavigationCategories } from "@/utils/categoryNavigation";

/**
 * 获取所有产品分类的slug
 */
export async function getAllCategorySlug(): Promise<ProductCategory[] | null> {
    try {
      const path = `/getAllCategorySlug`;
      const response = await fetchAPI(path);
      return response.data;
    } catch (error) {
      console.error("Error fetching Category:", error);
      return null;
    }
}

export async function getCategoryMetaDataBySlug(slug: string,locale:string): Promise<ProductCategory | null> {
  try {
    const path = `/getCategoryMetaDataBySlug/${slug}`;
    const localeParams = getFullLocale(locale);
    const response = await fetchAPI(path, localeParams, {
      next: {
        revalidate: 3600,
        tags: ["categories", `category:${localeParams.locale}:${slug}`],
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Category:", error);
    return null;
  }
}

export async function getCorrectCategorySlugForLocale(slug: string,locale:string,previousLocale:string): Promise<string | null> {
  try {
    const path = `/getCorrectCategorySlugForLocale/${slug}`;
    const response = await fetchAPI(path,getPreviousFullLocale(locale,previousLocale));
    return response.data;
  } catch (error) {
    console.error("Error fetching Category:", error);
    return null;
  }
}

export async function getAllCategorySlugByLocale(locale:string): Promise<ProductCategory[] | null> {
  try {
    const path = `/getAllCategorySlug`;
    const response = await fetchAPI(path,getFullLocale(locale));
    return response.data;
  } catch (error) {
    console.error("Error fetching Category:", error);
    return null;
  }
}

export async function getNavigationCategories(
  locale: string
): Promise<CategoryNavigationItem[]> {
  try {
    const localeParams = getFullLocale(locale);
    const response = await fetchAPI("/getAllCategories", localeParams, {
      next: {
        revalidate: 3600,
        tags: ["categories:navigation", `categories:navigation:${localeParams.locale}`],
      },
    });
    return toNavigationCategories(response.data || []);
  } catch (error) {
    console.error("Error fetching navigation categories:", error);
    return [];
  }
}


/**
 * 获取产品详情页面所需的完整产品信息
 */
export async function getProductBySlug(slug: string,locale:string): Promise<ProductCategory | null> {
  try {
    const path = `/getProductBySlug/${slug}`;
    const response = await fetchAPI(path,getFullLocale(locale));
    return response.data;
  } catch (error) {
    console.error("Error fetching Category:", error);
    return null;
  }
}
