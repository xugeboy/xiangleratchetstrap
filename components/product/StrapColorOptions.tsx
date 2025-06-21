import React, { useState } from 'react'; // 仍然需要 useState 来管理鼠标悬停的图片
import Image from 'next/image'; // 假设您在使用 Next.js 的 Image 组件


export default function StrapColorOptions( options: JSON) {

  // 状态：鼠标悬停的颜色选项的图片ID
  const [hoveredOption, setHoveredOption] = useState<Option | null>(null); // 存储整个选项对象

  if (!options || options.length === 0) {
    return null; // 或者显示一个加载/无选项的提示
  }

  // 获取当前显示图片的 src
  const currentImageSrc = hoveredOption ? getImageUrl(hoveredOption.imageId) : null;

  // 获取当前显示图片的 alt 文本
  const currentImageAlt = hoveredOption
    ? t("imageAlts.strapColorOption", { colorName: hoveredOption.name })
    : t("imageAlts.defaultStrapImage"); // 提供一个默认的alt文本

  return (
    <div className="bg-gray-100 p-6 rounded-lg"> {/* 整体背景和内边距 */}
      {/* 由于没有“选中”概念， COLOR 文本可能需要调整或移除 */}
      {/* 如果您仍希望显示一个默认颜色，可以设置 options[0].name */}
      <div className="mb-4 text-lg font-bold text-gray-800">
        COLOR : {hoveredOption ? hoveredOption.name : (options[0]?.name || 'Select a Color')}
      </div>

      <div className="flex items-center space-x-4">
        {options.map((option) => (
          <div
            key={option.id} // 使用唯一的id作为key
            className={`
              relative w-12 h-12 rounded-full border-2 border-transparent cursor-pointer
              flex items-center justify-center
              hover:border-black transition-all duration-200
            `}
            onMouseEnter={() => setHoveredOption(option)} // 鼠标进入时设置整个选项对象
            onMouseLeave={() => setHoveredOption(null)} // 鼠标离开时清除
          >
            {/* 内部的颜色圆形 */}
            <div
              className="w-10 h-10 rounded-full border border-gray-300"
              style={{ backgroundColor: option.hexCode }}
            >
              {/* 如果hexCode是复合颜色（如Black/Black），这里可能需要更复杂的实现 */}
              {option.name === 'Black/Black' && (
                <>
                  {/* 这里可以实现半圆，或更简单的黑色填充 */}
                  <div className="absolute inset-0 rounded-full bg-black"></div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 鼠标悬停时显示织带图片 */}
      {currentImageSrc && (
        <div className="mt-6 w-full max-w-sm mx-auto"> {/* 图片容器 */}
          <Image
            alt={currentImageAlt}
            src={currentImageSrc}
            width={600}
            height={600}
            className="object-scale-down rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
}