"use client";

import { memo, useMemo, useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import type { colorSelection } from "@/types/Customizations";
import ColorSelector from "./ColorSelector";
import { useCustomizer } from "@/contexts/CustomizerContext";
import { getTextColorsForWebbing } from "@/utils/customizer-utils";
import { TextColor } from "./constants";

function Customizer() {
  const t = useTranslations("OnlineBuilder.customizer"); // 初始化翻译钩子
  const { state, dispatch, product } = useCustomizer();
  const { webbingColor, textColor, printedText, printInterval, finishedLength, unit, orderQuantity, shippingAddress } = state;

  const webbingColorOptions = product?.strap_colors.colorSelection || [];
  const availableTextColors = useMemo(() => getTextColorsForWebbing(webbingColor), [webbingColor]);

  const [finishedLengthInput, setFinishedLengthInput] = useState(finishedLength.toFixed(2));
  const [printIntervalInput, setPrintIntervalInput] = useState(printInterval.toFixed(2));
  const [orderQuantityInput, setOrderQuantityInput] = useState(orderQuantity.toString());

  useEffect(() => {
    setFinishedLengthInput(finishedLength.toFixed(2));
    setPrintIntervalInput(printInterval.toFixed(2));
    setOrderQuantityInput(orderQuantity.toString());
  }, [finishedLength, printInterval, orderQuantity]);

  const handleFinishedLengthBlur = useCallback(() => {
    const value = parseFloat(finishedLengthInput);
    if (!isNaN(value)) {
        dispatch({ type: 'SET_FINISHED_LENGTH', payload: value });
    }
  }, [dispatch, finishedLengthInput]);

  const handlePrintIntervalBlur = useCallback(() => {
    const value = parseFloat(printIntervalInput);
    if (!isNaN(value)) {
        dispatch({ type: 'SET_PRINT_INTERVAL', payload: value });
    }
  }, [dispatch, printIntervalInput]);

  const handleOrderQuantityBlur = useCallback(() => {
    const value = parseInt(orderQuantityInput, 10);
    if (!isNaN(value)) {
      const normalized = Math.max(100, value);
      setOrderQuantityInput(normalized.toString());
      dispatch({ type: 'SET_ORDER_QUANTITY', payload: normalized });
    }
  }, [dispatch, orderQuantityInput]);

  if (!webbingColor || !textColor) return null;

  return (
    <div className="w-full mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r to-black  from-red-600 px-4 py-3">
          <h3 className="text-xl font-semibold text-white flex items-center gap-3">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            {t('title')}
          </h3>
        </div>

        <div className="p-4 space-y-4">
          {/* Section 1: Webbing Color */}
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">1</div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{t('webbingColor.title')}</h4>
                <p className="text-sm text-gray-500">{t('webbingColor.description')}</p>
              </div>
            </div>
            <div className="pl-4">
              <ColorSelector
                label=""
                colors={webbingColorOptions}
                selectedColor={webbingColor}
                onColorSelect={(color) => dispatch({ type: 'SET_WEBBING_COLOR', payload: color as colorSelection })}
              />
            </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Section 2: Text Color */}
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">2</div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{t('textColor.title')}</h4>
                <p className="text-sm text-gray-500">{t('textColor.description')}</p>
              </div>
            </div>
            <div className="pl-4">
              <ColorSelector
                label=""
                colors={availableTextColors}
                selectedColor={textColor}
                onColorSelect={(color) => dispatch({ type: 'SET_TEXT_COLOR', payload: color as TextColor })}
              />
            </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Section 3: Printed Text */}
          <div className="group">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">3</div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{t('printedText.title')}</h4>
                <p className="text-sm text-gray-500">{t('printedText.description')}</p>
              </div>
            </div>
            <div className="pl-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">Aa</div>
                <input
                  type="text"
                  id="printedText"
                  value={printedText}
                  onChange={(e) => dispatch({ type: 'SET_PRINTED_TEXT', payload: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 placeholder-gray-400 text-lg"
                  placeholder={t('printedText.placeholder')}
                />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p className="text-sm text-gray-500">{t('printedText.helperText')}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Section 4: Length & Interval */}
          <div className="group">
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">4</div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{t('dimensions.title')}</h4>
                  <p className="text-sm text-gray-500">{t('dimensions.description')}</p>
                </div>
              </div>
              <button onClick={() => dispatch({ type: 'SET_UNIT' })} className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold text-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                {unit === "mm" ? "inch" : "mm"}
              </button>
            </div>
            <div className="pl-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="finishedLength" className="block text-sm font-medium text-gray-600 mb-2">{t('dimensions.finishedLength')}</label>
                <div className="relative">
                  <input type="number" id="finishedLength" value={finishedLengthInput} onChange={(e) => setFinishedLengthInput(e.target.value)} onBlur={handleFinishedLengthBlur} className="w-full pl-4 pr-16 py-4 border border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 placeholder-gray-400 text-lg" placeholder="1000" />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium text-sm">{unit}</div>
                </div>
              </div>
              <div>
                <label htmlFor="printInterval" className="block text-sm font-medium text-gray-600 mb-2">{t('dimensions.printInterval')}</label>

                <div className="relative">
                  <input type="number" id="printInterval" value={printIntervalInput} onChange={(e) => setPrintIntervalInput(e.target.value)} onBlur={handlePrintIntervalBlur} className="w-full pl-4 pr-16 py-4 border border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 placeholder-gray-400 text-lg" />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium text-sm">{unit}</div>
                </div>
              </div>
            </div>
            <div className="pl-4 mt-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <p className="text-sm text-gray-500">{t('dimensions.helperText')}</p>
            </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Section 5: Order Info */}
          <div className="group">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">5</div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{t('orderDetails.title')}</h4>
                <p className="text-sm text-gray-500">{t('orderDetails.description')}</p>
              </div>
            </div>
            <div className="pl-4 grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-6">
              <div className="flex flex-col">
                <label htmlFor="orderQuantity" className="block text-sm font-medium text-gray-600 mb-2">{t('orderDetails.orderQuantity')}</label>
                <div className="relative">
                  <input
                    type="number"
                    min={100}
                    id="orderQuantity"
                    value={orderQuantityInput}
                    onChange={(e) => setOrderQuantityInput(e.target.value)}
                    onBlur={handleOrderQuantityBlur}
                    className="w-full pl-4 pr-16 py-4 border border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 placeholder-gray-400 text-lg"
                    placeholder={t('orderDetails.orderQuantityPlaceholder')}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm">pc</div>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-600 mb-2">{t('orderDetails.shippingAddress')}</label>
                <input
                  type="text"
                  id="shippingAddress"
                  value={shippingAddress}
                  onChange={(e) => dispatch({ type: 'SET_SHIPPING_ADDRESS', payload: e.target.value })}
                  className="w-full pl-4 pr-4 py-4 border border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 placeholder-gray-400 text-lg"
                  placeholder={t('orderDetails.shippingAddressPlaceholder')}
                />
              </div>
            </div>
            <div className="pl-4 mt-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <p className="text-sm text-gray-500">{t('orderDetails.helperText')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Customizer);
