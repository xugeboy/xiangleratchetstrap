"use client";

import { useState, useEffect, useReducer } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { CustomizerProvider, customizerReducer, initialState } from "@/contexts/CustomizerContext";
import ProductSelector from "./ProductSelector";
import OnlineBuilderClient from "./OnlineBuilderClient";
import { Product } from "@/types/product";
import { getDefaultTextColorForWebbing } from "@/utils/customizer-utils";
import { getProductBySlug } from "@/services/api/product";

type Step = 'product-selection' | 'customization';

interface StepDrivenBuilderProps {
  initialStep?: Step;
  initialProduct?: Product;
}

export default function StepDrivenBuilder({ 
  initialStep = 'product-selection', 
  initialProduct 
}: StepDrivenBuilderProps) {
  const t = useTranslations("OnlineBuilder");
  const locale = useLocale();
  const [currentStep, setCurrentStep] = useState<Step>(initialStep);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(initialProduct || null);
  const [state, dispatch] = useReducer(customizerReducer, initialState);
  const [isInitializing, setIsInitializing] = useState(false);

  console.log("StepDrivenBuilder: initialStep:", initialStep);
  console.log("StepDrivenBuilder: initialProduct:", initialProduct);
  console.log("StepDrivenBuilder: selectedProduct:", selectedProduct);

  // 确定当前产品
  const currentProduct = selectedProduct;
  
  console.log("StepDrivenBuilder: currentProduct:", currentProduct);

  // 当有产品时，初始化颜色状态
  useEffect(() => {
    if (currentProduct && !isInitializing) {
      setIsInitializing(true);
      
      // 检查产品是否已经有完整的颜色数据
      if (currentProduct.strap_colors?.colorSelection?.length) {
        const initialWebbingColor = currentProduct.strap_colors.colorSelection[0];
        const defaultTextColor = getDefaultTextColorForWebbing(initialWebbingColor);
        
        dispatch({
          type: 'INITIALIZE_STATE',
          payload: {
            webbingColor: initialWebbingColor,
            textColor: defaultTextColor,
            printedText: t("defaults.customText")
          }
        });
        setIsInitializing(false);
      }
    }
  }, [currentProduct, isInitializing, t]);

  // 处理产品选择
  const handleProductSelect = async (product: Product) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("customPrintingProduct", JSON.stringify(product));
    }
    setSelectedProduct(product);
    setIsInitializing(true);
    
    try {
      // 检查产品是否已经有完整的颜色数据
      if (product?.strap_colors?.colorSelection?.length) {
        const initialWebbingColor = product.strap_colors.colorSelection[0];
        const defaultTextColor = getDefaultTextColorForWebbing(initialWebbingColor);
        
        dispatch({
          type: 'INITIALIZE_STATE',
          payload: {
            webbingColor: initialWebbingColor,
            textColor: defaultTextColor,
            printedText: t("defaults.customText")
          }
        });
        setIsInitializing(false);
        setCurrentStep('customization');
      } else {
        // 调用API获取完整的颜色数据
        try {
          const fullProduct = await getProductBySlug(product.slug, locale);
          if (fullProduct && fullProduct.strap_colors?.colorSelection?.length) {
            // 更新产品数据
            setSelectedProduct(fullProduct);
            if (typeof window !== 'undefined') {
              sessionStorage.setItem("customPrintingProduct", JSON.stringify(fullProduct));
            }
            
            // 初始化颜色状态
            const initialWebbingColor = fullProduct.strap_colors.colorSelection[0];
            const defaultTextColor = getDefaultTextColorForWebbing(initialWebbingColor);
            
            dispatch({
              type: 'INITIALIZE_STATE',
              payload: {
                webbingColor: initialWebbingColor,
                textColor: defaultTextColor,
                printedText: t("defaults.customText")
              }
            });
            setIsInitializing(false);
            setCurrentStep('customization');
          } else {
            setIsInitializing(false);
          }
        } catch {
          setIsInitializing(false);
        }
      }
    } catch {
      setIsInitializing(false);
    }
  };

  // 处理返回产品选择
  const handleBackToProductSelection = () => {
    setCurrentStep('product-selection');
    setSelectedProduct(null);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem("customPrintingProduct");
    }
  };

  // 步骤导航组件
  const StepNavigation = () => (
    <div>
      {/* 步骤指示器 */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-4">
          {/* 步骤1 */}
          <div 
            className={`flex items-center ${currentStep === 'product-selection' ? 'text-blue-600' : currentProduct ? 'text-green-600 cursor-pointer hover:text-green-700' : 'text-gray-400'}`}
            onClick={currentProduct && currentStep === 'customization' ? handleBackToProductSelection : undefined}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep === 'product-selection' 
                ? 'bg-blue-600 text-white' 
                : currentProduct 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <span className="ml-2 font-medium">{t("steps.step1")}</span>
          </div>
          
          <div className={`w-12 h-0.5 ${currentProduct ? 'bg-green-600' : 'bg-gray-300'}`}></div>
          
          {/* 步骤2 */}
          <div className={`flex items-center ${currentStep === 'customization' ? 'text-blue-600' : currentProduct ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep === 'customization' 
                ? 'bg-blue-600 text-white' 
                : currentProduct 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <span className="ml-2 font-medium">{t("steps.step2")}</span>
          </div>
        </div>
      </div>
      
      {/* 当前步骤的标题和说明 */}
      <div className="text-center">
        {currentStep === 'product-selection' && (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("steps.selectProduct.title")}</h1>
            <p className="text-gray-600">{t("steps.selectProduct.description")}</p>
          </>
        )}
        {currentStep === 'customization' && currentProduct && (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("steps.designProduct.title")}</h1>
            <p className="text-gray-600">{t("steps.designProduct.description")}</p>
          </>
        )}
      </div>
    </div>
  );

  // 步骤内容
  const renderStepContent = () => {
    switch (currentStep) {
      case 'product-selection':
        return (
          <div>
            <ProductSelector onProductSelect={handleProductSelect} />
          </div>
        );
      
      case 'customization':
        if (!currentProduct) {
          return (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t("noProductSelected.title")}</h2>
              <button
                onClick={handleBackToProductSelection}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t("noProductSelected.button")}
              </button>
            </div>
          );
        }

        // 显示初始化状态
        if (isInitializing) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">{t("loading.productColors")}</p>
              </div>
            </div>
          );
        }

        if (!currentProduct.strap_colors?.colorSelection?.length) {
          return (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t("productSetupError.title")}</h2>
              <p className="text-gray-600 mb-6">{t("productSetupError.description")}</p>
              <button
                onClick={handleBackToProductSelection}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t("productSetupError.button")}
              </button>
            </div>
          );
        }

        return (
          <div>
            <CustomizerProvider value={{ state, dispatch, product: currentProduct }}>
              <OnlineBuilderClient />
            </CustomizerProvider>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <StepNavigation />
        {renderStepContent()}
      </div>
    </div>
  );
}
