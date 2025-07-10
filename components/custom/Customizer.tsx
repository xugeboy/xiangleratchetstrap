"use client";

import {
  getDefaultTextColorForWebbing,
  getTextColorsForWebbing,
  isTextColorValidForWebbing,
  type TextColor,
} from "./constants";
import ColorSelector from "./ColorSelector";
import type { colorSelection } from "@/types/Customizations";
import { useEffect, useState } from "react";

interface CustomizerProps {
  webbingColor: colorSelection;
  setWebbingColor: (color: colorSelection) => void;
  textColor: TextColor;
  setTextColor: (color: TextColor) => void;
  printedText: string;
  setPrintedText: (text: string) => void;
  printInterval: number;
  setPrintInterval: (interval: number) => void;
  finishedLength: number;
  setFinishedLength: (length: number) => void;
  unit: string;
  setUnit: (text: string) => void;
  webbingColorOptions: colorSelection[];
}

export default function Customizer({
  webbingColor,
  setWebbingColor,
  textColor,
  setTextColor,
  printedText,
  setPrintedText,
  printInterval,
  setPrintInterval,
  finishedLength,
  setFinishedLength,
  unit,
  setUnit,
  webbingColorOptions,
}: CustomizerProps) {
  const availableTextColors = getTextColorsForWebbing(webbingColor);
  
  useEffect(() => {
    if (!isTextColorValidForWebbing(webbingColor, textColor)) {
      const defaultTextColor = getDefaultTextColorForWebbing(webbingColor);
      setTextColor(defaultTextColor);
    }
  }, [webbingColor, textColor, setTextColor]);

  const [finishedLengthInput, setFinishedLengthInput] = useState(
    finishedLength.toString()
  );
  const [printIntervalInput, setPrintIntervalInput] = useState(
    printInterval.toString()
  );
  useEffect(() => {
      setFinishedLengthInput(finishedLength.toFixed(2));
      setPrintIntervalInput(printInterval.toFixed(2));
  }, [finishedLength, printInterval, unit]);

  useEffect(() => {
    const MM_PER_INCH = 25;
    if (unit === 'mm') {
      setFinishedLength(Number((finishedLength * MM_PER_INCH).toFixed(2)));
      setPrintInterval(Number((printInterval * MM_PER_INCH).toFixed(2)));
    } else {
      setFinishedLength(Number((finishedLength / MM_PER_INCH).toFixed(2)));
      setPrintInterval(Number((printInterval / MM_PER_INCH).toFixed(2)));
    }
  }, [unit]);
  
  
  const handleFinishedLengthInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFinishedLengthInput(e.target.value);
  };

  const handlePrintIntervalInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrintIntervalInput(e.target.value);
  };

  const handleFinishedLengthBlur = () => {
    setFinishedLength(parseFloat(finishedLengthInput));
  };

  const handlePrintIntervalBlur = () => {
    setPrintInterval(parseFloat(printIntervalInput));
  };

  return (
    <div className="w-full mx-auto">
      {/* 主要定制区域 */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* 渐变头部 */}
        <div className="bg-gradient-to-r to-black  from-amber-700 px-4 py-3">
          <h3 className="text-xl font-semibold text-white flex items-center gap-3">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            Design Options
          </h3>
        </div>

        {/* 选项区域 */}
        <div className="p-4 space-y-4">
          {/* 织带颜色选择 */}
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                1
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Webbing Color
                </h4>
                <p className="text-sm text-gray-500">
                  Choose the base color for your webbing
                </p>
              </div>
            </div>
            <div className="pl-4">
              <ColorSelector
                label=""
                colors={webbingColorOptions}
                selectedColor={webbingColor}
                onColorSelect={(color) =>
                setWebbingColor(color as colorSelection)
                }
              />
            </div>
          </div>

          {/* 分隔线 */}
          <div className="border-t border-gray-100"></div>

          {/* 文字颜色选择 */}
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                2
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Text Color
                </h4>
                <p className="text-sm text-gray-500">
                  Select the color for your printed text
                </p>
              </div>
            </div>
            <div className="pl-4">
              <ColorSelector
                label=""
                colors={availableTextColors}
                selectedColor={textColor}
                onColorSelect={(color) => setTextColor(color as TextColor)}
              />
            </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* 打印文字输入 */}
          <div className="group">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                3
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Printed Text
                </h4>
                <p className="text-sm text-gray-500">
                  Enter the text to be printed on your webbing
                </p>
              </div>
            </div>
            <div className="pl-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">
                  Aa
                </div>
                <input
                  type="text"
                  id="printedText"
                  value={printedText}
                  onChange={(e) => setPrintedText(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 placeholder-gray-400 text-lg"
                  placeholder="Enter your custom text here..."
                />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p className="text-sm text-gray-500">
                  This text will appear repeatedly on your webbing
                </p>
              </div>
            </div>
          </div>

          {/* 分隔线 */}
          <div className="border-t border-gray-100"></div>

          {/* 4. 长度与间隔设置 */}
          <div className="group">
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  4
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    Length & Interval
                  </h4>
                  <p className="text-sm text-gray-500">
                    Set length and text repetition distance
                  </p>
                </div>
              </div>
              {/* 单位切换按钮 */}
              <button
                onClick={() =>
                  setUnit((prev) => (prev === "mm" ? "inch" : "mm"))
                }
                className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold text-gray-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                {unit === "mm" ? "inch" : "mm"}
              </button>
            </div>
            <div className="pl-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* 成品织带长度 */}
              <div>
                <label
                  htmlFor="finishedLength"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Finished Length
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="finishedLength"
                    value={finishedLengthInput}
                    onChange={handleFinishedLengthInputChange}
                    onBlur={handleFinishedLengthBlur}
                    className="w-full pl-4 pr-16 py-4 border border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 placeholder-gray-400 text-lg"
                    placeholder="1000"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium text-sm">
                    {unit}
                  </div>
                </div>
              </div>
              {/* 打印间隔 */}
              <div>
                <label
                  htmlFor="printInterval"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Print Interval
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="printInterval"
                    value={printIntervalInput}
                    onChange={handlePrintIntervalInputChange}
                    onBlur={handlePrintIntervalBlur}
                    className="w-full pl-4 pr-16 py-4 border border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 placeholder-gray-400 text-lg"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium text-sm">
                    {unit}
                  </div>
                </div>
              </div>
            </div>
            <div className="pl-4 mt-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <p className="text-sm text-gray-500">
                Recommended interval: 100-200mm for optimal appearance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
