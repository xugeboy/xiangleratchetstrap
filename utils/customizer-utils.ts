import { defaultTextColors, TextColor, webbingToTextColorMapping } from "@/components/custom/constants";
import type { colorSelection } from "@/types/Customizations";


export const getTextColorsForWebbing = (webbingColor?: colorSelection): TextColor[] => {
  if (!webbingColor) return defaultTextColors;
  return webbingToTextColorMapping[webbingColor.hexCode.toUpperCase()] || defaultTextColors;
};

export const getDefaultTextColorForWebbing = (webbingColor?: colorSelection): TextColor => {
  return getTextColorsForWebbing(webbingColor)[0];
};

export const isTextColorValidForWebbing = (webbingColor: colorSelection, textColor: TextColor): boolean => {
  const validTextColors = getTextColorsForWebbing(webbingColor);
  return validTextColors.some((color) => color.hexCode.toUpperCase() === textColor.hexCode.toUpperCase());
};
