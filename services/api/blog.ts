import { fetchAPI } from "@/utils/fetch-api";
import { Blog } from "@/types/blog";

export async function getBlogDetail(slug: string): Promise<Blog | null> {
  return await fetchAPI(`/getBlogDetail/${slug}`);
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

export async function getBlogList(
  page: number = 1
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
    const response = await fetchAPI("/getBlogList", {
      page
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
