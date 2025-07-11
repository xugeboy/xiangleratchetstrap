"use client";

import React from "react";

/**
 * 生成要在分页中显示的页码和省略号的辅助函数
 * @param currentPage - 当前活动页
 * @param totalPages - 总页数
 * @param siblingCount - 当前页码两侧要显示的页码数
 * @returns 返回一个包含页码（数字）和省略号（字符串）的数组
 */
const getPaginationItems = (
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1
): (number | string)[] => {
  const totalPageNumbers = siblingCount + 5; // 核心页码数：1(首) + 1(尾) + 1(当前) + siblingCount*2

  // Case 1: 如果总页数小于我们要显示的数量，则显示所有页码
  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // Case 2: 只在右侧显示省略号
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "...", totalPages];
  }

  // Case 3: 只在左侧显示省略号
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [firstPageIndex, "...", ...rightRange];
  }

  // Case 4: 在两侧都显示省略号
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
  }

  // 默认返回一个空数组，尽管逻辑上不应该到达这里
  return [];
};

interface ResponsivePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  // 假设您使用 i18next 或类似的库
  t: (key: string) => string;
}

/**
 * 一个响应式的分页组件，在移动设备上会自动折叠页码。
 */
export const ResponsivePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  t,
}: ResponsivePaginationProps) => {
  if (totalPages <= 1) {
    return null; // 如果只有一页或没有，则不渲染分页
  }

  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <div className="flex justify-center mt-8">
      <nav aria-label="Pagination" className="flex items-center gap-1 sm:gap-2">
        {/* 上一页按钮 */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-sm font-medium rounded-md border bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("pagination.previous")}
        </button>

        {/* 页码和省略号 */}
        {paginationItems.map((item, index) => {
          if (typeof item === "string") {
            // 这是省略号
            return (
              <span
                key={`dots-${index}`}
                className="px-3 py-1.5 text-sm rounded-md text-gray-500"
              >
                ...
              </span>
            );
          }

          // 这是页码按钮
          return (
            <button
              key={item}
              onClick={() => onPageChange(item)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md border ${
                currentPage === item
                  ? "bg-blue-600 text-white border-blue-600 z-10"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {item}
            </button>
          );
        })}

        {/* 下一页按钮 */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-sm font-medium rounded-md border bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("pagination.next")}
        </button>
      </nav>
    </div>
  );
};
