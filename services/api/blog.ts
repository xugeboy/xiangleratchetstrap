import { fetchAPI } from "@/utils/fetch-api";
import { Blog } from "@/types/blog";
import { getFullLocale, getPreviousFullLocale } from "@/utils/formatUtils";

export async function getBlogDetail(slug: string,locale:string): Promise<Blog | null> {
  try {
    const response = await fetchAPI(`/getBlogDetail/${slug}`,getFullLocale(locale));
    return response.data || null;
  } catch (error) {
    console.error("Error fetching blog slug:", error);
    return null;
  }
}

export async function getBlogMetaDataBySlug(slug: string,locale:string): Promise<Blog | null> {
  try {
    const response = await fetchAPI(`/getBlogMetaDataBySlug/${slug}`,getFullLocale(locale));
    return response.data || null;
  } catch (error) {
    console.error("Error fetching blog slug:", error);
    return null;
  }
}
export async function getCorrectBlogSlugForLocale(slug: string,locale:string,previousLocale:string): Promise<string | null> {
  try {
    const path = `/getCorrectBlogSlugForLocale/${slug}`;
    const response = await fetchAPI(path,getPreviousFullLocale(locale,previousLocale));
    return response.data;
  } catch (error) {
    console.error("Error fetching Category:", error);
    return null;
  }
}
export async function getAllBlogSlug(): Promise<Blog[] | null> {
  try {
    const response = await fetchAPI("/getAllBlogSlug");
    return response.data || null;
  } catch (error) {
    console.error("Error fetching blog slug:", error);
    return null;
  }
}

export async function getAllBlogSlugByLocale(locale:string): Promise<Blog[] | null> {
  try {
    const response = await fetchAPI("/getAllBlogSlug",getFullLocale(locale));
    return response.data || null;
  } catch (error) {
    console.error("Error fetching blog slug:", error);
    return null;
  }
}

export async function getLatestBlogs(locale:string): Promise<Blog[] | null> {
  try {
    const response = await fetchAPI("/getLatestArticles",getFullLocale(locale));
    return response.data || null;
  } catch (error) {
    console.error("Error fetching latest articles:", error);
    return null;
  }
}

export async function getBlogList(
  page: number = 1,
  locale:string
): Promise<{
  data: Blog[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      total: number;
    };
  };
}> {
  try {
    const urlParamsObject = getFullLocale(locale)
    const response = await fetchAPI("/getBlogList", {
      page,
      ...urlParamsObject
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
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
}
