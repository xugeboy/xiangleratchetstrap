import { ShowCaseApiResponse } from "@/types/showCase";
import { postAPI } from "@/utils/fetch-api";

/**
 * @param {object} options - 包含页码和每页数量的对象
 * @returns {Promise<ShowCaseApiResponse>} - 返回原始的 API 响应结构
 */
async function getShowCases({
  page = 1,
  pageSize = 12,
}: {
  page?: number;
  pageSize?: number;
}): Promise<ShowCaseApiResponse> {
  try {
    const response = await postAPI("/getShowCases", {
      page,
      pageSize,
    });
    return response;
  } catch (error) {
    console.error("Error filtering showcases in action:", error);
    return {
      data: [],
      meta: { pagination: { page, pageSize, pageCount: 0, total: 0 } },
    };
  }
}

export async function getInitialShowCases() {
  return await getShowCases({ page: 1, pageSize: 12 });
}

/**
 * @param {number} page - 要加载的页码
 * @returns {Promise<JSX.Element[] | null>} - 返回渲染好的 ProductCard 组件数组
 */
export const loadMoreProducts = async (
  page: number
): Promise<JSX.Element[] | null> => {
  console.log(`Server Action: Loading page ${page} of show cases.`);

  const { data: nextProducts } = await getShowCases({ page, pageSize: 4 });

  if (nextProducts && nextProducts.length > 0) {
    return nextProducts.map((product) => {
      return <ProductCard key={product.id} product={product} />;
    });
  } else {
    return null;
  }
};
