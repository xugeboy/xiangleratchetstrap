"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/types/product";
import ImageGallery from "@/components/product/ImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import VideoPlayer from "@/components/common/VideoPlayer";
import AlternatingContent from "./AlternatingContent";
import { PreviewData } from "@/types/previewData";

interface ProductDetailClientProps {
  product: Product;
  lang: string;
}

export default function ProductDetailClient({
  product,
  lang,
}: ProductDetailClientProps) {
  // 1. 分别为悬浮和点击创建状态
  const [hoverPreview, setHoverPreview] = useState<PreviewData | null>(null);
  const [clickedPreview, setClickedPreview] = useState<PreviewData | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 2. 处理悬浮的防抖函数 (不变)
  const handlePreviewHover = useCallback((data: PreviewData | null) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (data === null) {
      setHoverPreview(null);
      return;
    }
    timeoutRef.current = setTimeout(() => {
      // 当悬浮时，清除已固定的预览，优先显示悬浮效果
      setClickedPreview(null); 
      setHoverPreview(data);
    }, 150);
  }, []);

  // 3. 处理点击的新函数
  const handlePreviewClick = useCallback((data: PreviewData) => {
    // 点击时，立即清除任何悬浮效果
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoverPreview(null);

    // 实现“开关”效果：如果点击的是已固定的项，则取消固定，否则固定新的项
    if (clickedPreview?.url === data.url) {
      setClickedPreview(null);
    } else {
      setClickedPreview(data);
    }
  }, [clickedPreview]); // 依赖 clickedPreview 以便在比较时获取最新值

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 4. 最终显示的预览图优先展示悬浮效果，其次是点击固定的效果
  const displayedPreview = hoverPreview || clickedPreview;
  return (
    <div>
      <div className="lg:grid lg:grid-cols-[40%_auto] lg:items-start lg:gap-x-8 py-8">
        {/* 左侧栏 */}
        <div>
          <ImageGallery
            images={product.gallery}
            alt={product.name}
            previewData={displayedPreview}
          />
          {product.youtube_url && (
            <VideoPlayer
              videoId={product.youtube_url}
              title={product.youtube_title}
            />
          )}
        </div>

        {/* 右侧栏 */}
        <ProductInfo
          product={product}
          lang={lang}
          // 3. 将状态设置函数传递给 ProductInfo
        setPreviewHover={handlePreviewHover}
        setPreviewClick={handlePreviewClick}
        />
      </div>
      <div>
        {product.alternating_content.length > 0 && (
          <AlternatingContent
            items={product.alternating_content}
          ></AlternatingContent>
        )}
      </div>
    </div>
  );
}
