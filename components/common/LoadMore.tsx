// app/components/LoadMore.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaSpinner } from 'react-icons/fa';
import { loadMoreProducts } from '@/app/actions';

type ProductCardJSX = JSX.Element;

interface LoadMoreProps {
  initialPageCount: number;
}

export function LoadMore({ initialPageCount }: LoadMoreProps) {
  const [products, setProducts] = useState<ProductCardJSX[]>([]);
  const [page, setPage] = useState(2); // 从第2页开始加载
  const [hasMore, setHasMore] = useState(page <= initialPageCount);
  const [isLoading, setIsLoading] = useState(false);

  // ref 用于标记触发加载的元素
  // inView 是一个布尔值，表示 ref 标记的元素是否在视口内
  const { ref, inView } = useInView({
    threshold: 0, // 元素一进入视口就触发
    triggerOnce: false, // 每次进入都触发
  });

  const loadMore = async () => {
    // 如果正在加载或没有更多数据，则直接返回
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const newProducts = await loadMoreProducts(page);
    setIsLoading(false);

    if (newProducts && newProducts.length > 0) {
      setPage((prevPage) => prevPage + 1);
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      // 如果当前页已经是最后一页，则更新 hasMore 状态
      if (page + 1 > initialPageCount) {
        setHasMore(false);
      }
    } else {
      // 如果返回 null 或空数组，说明没有更多数据了
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]); // 依赖 inView 状态
  
  return (
    <>
      {/* 渲染通过 Server Action 加载的额外产品 */}
      {products}
      
      {/* 加载触发器和加载动画 */}
      {hasMore && (
        <div ref={ref} className="col-span-full flex w-full items-center justify-center p-8">
          {/* 只有在加载时才显示 spinner */}
          {isLoading && <FaSpinner className="h-8 w-8 animate-spin text-gray-500" />}
        </div>
      )}
    </>
  );
}
