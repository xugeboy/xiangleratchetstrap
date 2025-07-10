export interface TextColor {
  name: string;
  hexCode: string;
}
export const webbingToTextColorMapping: Record<string, TextColor[]> = {
  "#FFFFFF": [
    { name: "Black", hexCode: "#000000" },
    { name: "Red", hexCode: "#FF0000" },
    { name: "Blue", hexCode: "#0000FF" },
  ],
  // 黄色织带 (#FFFF00) - 适合深色文字
  "#FFFF00": [
    { name: "Black", hexCode: "#000000" },
    { name: "Red", hexCode: "#FF0000" },
    { name: "Blue", hexCode: "#0000FF" },
  ],

  // --- 鲜艳色织带 ---

  // 红色织带 (#FF0000) - 适合高对比度颜色
  "#FF0000": [
    { name: "White", hexCode: "#FFFFFF" },
    { name: "Black", hexCode: "#000000" },
    { name: "Yellow", hexCode: "#FFFF00" },
  ],
  // 橙色织带 (#FFA500) - 适合高对比度颜色
  "#FFA500": [
    { name: "White", hexCode: "#FFFFFF" },
    { name: "Black", hexCode: "#000000" },
  ],
  // 绿色织带 (#008000) - 适合浅色或黑色文字
  "#008000": [
    { name: "White", hexCode: "#FFFFFF" },
    { name: "Yellow", hexCode: "#FFFF00" },
    { name: "Black", hexCode: "#000000" },
  ],
  // 蓝色织带 (#0000FF) - 适合浅色文字
  "#0000FF": [
    { name: "White", hexCode: "#FFFFFF" },
    { name: "Yellow", hexCode: "#FFFF00" },
    { name: "Grey", hexCode: "#808080" },
  ],

  // --- 深色织带 ---

  // 黑色织带 (#000000) - 适合所有亮色文字
  "#000000": [
    { name: "White", hexCode: "#FFFFFF" },
    { name: "Yellow", hexCode: "#FFFF00" },
    { name: "Red", hexCode: "#FF0000" },
    { name: "Orange", hexCode: "#FFA500" },
    { name: "Grey", hexCode: "#808080" },
  ],
  // 灰色织带 (#808080) - 适合黑、白及鲜艳亮色
  "#808080": [
    { name: "White", hexCode: "#FFFFFF" },
    { name: "Black", hexCode: "#000000" },
    { name: "Red", hexCode: "#FF0000" },
    { name: "Yellow", hexCode: "#FFFF00" },
  ],
  // 军绿色织带 (#4B5320) - 适合亮色文字
  "#4B5320": [
    { name: "White", hexCode: "#FFFFFF" },
    { name: "Yellow", hexCode: "#FFFF00" },
    { name: "Orange", hexCode: "#FFA500" },
  ],
};

export const defaultTextColors = [
      { name: "Pure White", hexCode: "#ffffff" },
      { name: "Deep Black", hexCode: "#000000" },
      { name: "Golden Yellow", hexCode: "#fbbf24" },
      { name: "Silver Gray", hexCode: "#d1d5db" },
    ];

export const MM_PER_INCH = 25.4;