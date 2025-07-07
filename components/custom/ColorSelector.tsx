'use client';

import { colorSelection } from '@/types/Customizations';
import { WebbingColor, TextColor } from './constants';
import Image from 'next/image';

interface ColorSelectorProps {
  label: string;
  colors: colorSelection[] | TextColor[];
  selectedColor: colorSelection | TextColor;
  onColorSelect: (color: colorSelection | TextColor) => void;
}

export default function ColorSelector({ label, colors, selectedColor, onColorSelect }: ColorSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700">{label}</h3>
      <div className="mt-2 flex flex-wrap gap-3">
        {colors.map((color) => (
          // 使用 'in' 操作符检查 imageUrl 属性是否存在，以区分 WebbingColor
          'imageUrl' in color ? (
            // --- 渲染 WebbingColor (带悬浮预览) ---
            <div key={color.name} className="relative group">
              <button
                type="button"
                onClick={() => onColorSelect(color)}
                className={`relative h-10 w-10 rounded-full border-2 transition-transform duration-150 ease-in-out ${
                  selectedColor.hexCode === color.hexCode ? 'border-indigo-600 scale-110' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.hexCode }}
                title={color.name}
              >
                <span className="sr-only">{color.name}</span>
              </button>
              {/* 悬浮预览图片 */}
              <div className="absolute bottom-full mb-2 w-48 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none invisible group-hover:visible z-10">
                <div className="relative overflow-hidden rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5">
                   <Image
                      src={(color as WebbingColor).imageUrl} // 类型断言以访问 imageUrl
                      alt={`${color.name} webbing preview`}
                      width={200}
                      height={50}
                      className="object-cover"
                    />
                </div>
              </div>
            </div>
          ) : (
            // --- 渲染 TextColor (无悬浮预览) ---
            <button
              key={color.name}
              type="button"
              onClick={() => onColorSelect(color)}
              className={`relative h-10 w-10 rounded-full border-2 transition-transform duration-150 ease-in-out ${
                selectedColor.hexCode === color.hexCode ? 'border-indigo-600 scale-110' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.hexCode }}
              title={color.name}
            >
              <span className="sr-only">{color.name}</span>
            </button>
          )
        ))}
      </div>
    </div>
  );
}
