"use client";

import { memo } from 'react';
import type { colorSelection } from "@/types/Customizations";
import { TextColor } from './constants';

interface ColorSelectorProps {
  label: string;
  colors: (colorSelection | TextColor)[];
  selectedColor: colorSelection | TextColor;
  onColorSelect: (color: colorSelection | TextColor) => void;
}


function ColorSelector({ label, colors, selectedColor, onColorSelect }: ColorSelectorProps) {
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
          <div key={color.name} className="relative">
            <button
              type="button"
              onClick={() => onColorSelect(color)}
              className={`relative h-10 w-10 rounded-2xl border-3 transition-all duration-200 ease-out hover:scale-110 hover:shadow-lg ${
                selectedColor.hexCode === color.hexCode
                  ? "border-blue-500 scale-110 shadow-lg ring-4 ring-blue-200 ring-opacity-50"
                  : "border-gray-200 hover:border-gray-300 shadow-md"
              }`}
              style={{ backgroundColor: color.hexCode }}
              title={color.name}
            >
              <span className="sr-only">{color.name}</span>
              {(color.hexCode === "#ffffff" || color.hexCode === "#f8f9fa") && (
                <div className="absolute inset-1 rounded-xl border border-gray-200"></div>
              )}
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}


export default memo(ColorSelector);
