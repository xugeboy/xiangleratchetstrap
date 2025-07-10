"use client";

import { useReducer, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useProductLoader } from "@/hooks/useProductLoader";
import { CustomizerProvider, customizerReducer, initialState } from "@/contexts/CustomizerContext";
import OnlineBuilderClient from "./OnlineBuilderClient";
import { getDefaultTextColorForWebbing } from "@/utils/customizer-utils";


/**
 * The shell component acts as the bridge between Server and Client.
 * It loads client-side data (from sessionStorage) and sets up the state provider.
 */
export default function OnlineBuilderShell() {
  const t = useTranslations("OnlineBuilder");
  const { product, isLoading } = useProductLoader();
  const [state, dispatch] = useReducer(customizerReducer, initialState);

  // Initialize state once the product is loaded
  useEffect(() => {
    if (product?.strap_colors?.colorSelection?.length) {
      const initialWebbingColor = product.strap_colors.colorSelection[0];
      dispatch({
        type: 'INITIALIZE_STATE',
        payload: {
          webbingColor: initialWebbingColor,
          textColor: getDefaultTextColorForWebbing(initialWebbingColor),
          printedText: "Custom Text"
        }
      });
    }
  }, [product]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ state, dispatch, product }), [state, dispatch, product]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t("notFound.title")}</h1>
          <p className="text-gray-600">{t("notFound.description")}</p>
        </div>
      </div>
    );
  }

  return (
    <CustomizerProvider value={contextValue}>
      <OnlineBuilderClient />
    </CustomizerProvider>
  );
}
