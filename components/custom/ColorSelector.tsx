"use client"

import type { colorSelection } from "@/types/Customizations"
import type { TextColor } from "./constants"
import { useState } from "react"

interface ColorSelectorProps {
  label: string
  colors: colorSelection[] | TextColor[]
  selectedColor: colorSelection | TextColor
  onColorSelect: (color: colorSelection | TextColor) => void
}

export default function ColorSelector({ label, colors, selectedColor, onColorSelect }: ColorSelectorProps) {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {label && (
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
          <div className="h-px bg-gradient-to-r from-gray-300 to-transparent flex-1"></div>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {colors.map((color) => (
          // 统一渲染逻辑，移除悬浮预览
          <div key={color.name} className="relative">
            <button
              type="button"
              onClick={() => onColorSelect(color)}
              onMouseEnter={() => setHoveredColor(color.name)}
              onMouseLeave={() => setHoveredColor(null)}
              className={`relative h-14 w-14 rounded-2xl border-3 transition-all duration-200 ease-out hover:scale-110 hover:shadow-lg ${
                selectedColor.hexCode === color.hexCode
                  ? "border-blue-500 scale-110 shadow-lg ring-4 ring-blue-200 ring-opacity-50"
                  : "border-gray-200 hover:border-gray-300 shadow-md"
              }`}
              style={{ backgroundColor: color.hexCode }}
              title={color.name}
            >
              <span className="sr-only">{color.name}</span>
              {/* 特殊处理白色和浅色，添加内边框 */}
              {(color.hexCode === "#ffffff" || color.hexCode === "#f8f9fa") && (
                <div className="absolute inset-1 rounded-xl border border-gray-200"></div>
              )}
            </button>

            {/* 颜色名称标签 */}
            {hoveredColor === color.name && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-md shadow-sm whitespace-nowrap">
                  {color.name}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 选中颜色信息显示 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg border-2 border-gray-200 shadow-sm"
            style={{ backgroundColor: selectedColor.hexCode }}
          ></div>
          <div>
            <p className="text-sm font-medium text-gray-800">{selectedColor.name}</p>
            <p className="text-xs text-gray-500 font-mono">{selectedColor.hexCode}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
