"use client";

import { memo } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getCloudinaryPublicId } from '@/utils/formatUtils';
import Specifications from '@/components/product/Specifications';
import { useCustomizer } from '@/contexts/CustomizerContext';

function ProductInfoPanel() {
  const t = useTranslations("OnlineBuilder.productPanel");
  const { product, state } = useCustomizer();
  const { webbingColor } = state;

  if (!product || !webbingColor) return null;

  return (
    <div className="top-8 w-full">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-black  to-red-600 px-4 py-3">
          <h3 className="text-xl font-semibold text-white flex items-center gap-3">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            {t("title")}
          </h3>
        </div>

        <div className="px-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                {t("itemNumberLabel")}
                {product.code}
              </h3>
              <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner">
                <Image
                  src={getCloudinaryPublicId(product.featured_image.url)}
                  alt={product.name}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                {t("selectedWebbingLabel")}
              </h3>
              <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner">
                <Image
                  src={webbingColor.imageId}
                  alt={`${webbingColor.name} webbing`}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4">
          <Specifications product={product} />
        </div>
      </div>
    </div>
  );
}

export default memo(ProductInfoPanel);