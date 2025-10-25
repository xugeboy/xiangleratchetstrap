"use client";

import { createContext, useContext, Dispatch } from 'react';
import type { Product } from "@/types/product";
import type { colorSelection } from "@/types/Customizations";
import { MM_PER_INCH, TextColor } from '@/components/custom/constants';
import { getDefaultTextColorForWebbing, isTextColorValidForWebbing } from '@/utils/customizer-utils';

// 1. STATE AND ACTION TYPES
export interface CustomizerState {
  webbingColor?: colorSelection;
  textColor?: TextColor;
  printedText: string;
  printInterval: number;
  finishedLength: number;
  unit: "mm" | "inch";
}

export type CustomizerAction =
  | { type: "SET_WEBBING_COLOR"; payload: colorSelection }
  | { type: "SET_TEXT_COLOR"; payload: TextColor }
  | { type: "SET_PRINTED_TEXT"; payload: string }
  | { type: "SET_PRINT_INTERVAL"; payload: number }
  | { type: "SET_FINISHED_LENGTH"; payload: number }
  | { type: "SET_UNIT" }
  | { type: "INITIALIZE_STATE"; payload: Partial<CustomizerState> };

// 2. INITIAL STATE
export const initialState: CustomizerState = {
  printedText: "Custom Text",
  printInterval: 6,
  finishedLength: 40,
  unit: "inch",
};

// 3. REDUCER FUNCTION
export const customizerReducer = (state: CustomizerState, action: CustomizerAction): CustomizerState => {
  switch (action.type) {
    case "INITIALIZE_STATE":
      return { ...state, ...action.payload };
    case "SET_WEBBING_COLOR": {
      const newWebbingColor = action.payload;
      if (!state.textColor || !isTextColorValidForWebbing(newWebbingColor, state.textColor)) {
        return { ...state, webbingColor: newWebbingColor, textColor: getDefaultTextColorForWebbing(newWebbingColor) };
      }
      return { ...state, webbingColor: newWebbingColor };
    }
    case "SET_TEXT_COLOR":
      return { ...state, textColor: action.payload };
    case "SET_PRINTED_TEXT":
      return { ...state, printedText: action.payload };
    case "SET_PRINT_INTERVAL":
      return { ...state, printInterval: action.payload };
    case "SET_FINISHED_LENGTH":
      return { ...state, finishedLength: action.payload };
    case "SET_UNIT": {
      const newUnit = state.unit === 'mm' ? 'inch' : 'mm';
      const convert = (val: number) => newUnit === 'mm' ? val * MM_PER_INCH : val / MM_PER_INCH;
      return { 
        ...state, 
        unit: newUnit, 
        finishedLength: convert(state.finishedLength), 
        printInterval: convert(state.printInterval) 
      };
    }
    default:
      return state;
  }
};

// 4. CONTEXT DEFINITION
interface CustomizerContextType {
  state: CustomizerState;
  dispatch: Dispatch<CustomizerAction>;
  product?: Product;
  onReselectProduct?: () => void;
}

const CustomizerContext = createContext<CustomizerContextType | null>(null);

// 5. PROVIDER COMPONENT
export const CustomizerProvider = CustomizerContext.Provider;

// 6. CUSTOM HOOK
export const useCustomizer = () => {
  const context = useContext(CustomizerContext);
  if (!context) {
    throw new Error("useCustomizer must be used within a CustomizerProvider");
  }
  return context;
};
