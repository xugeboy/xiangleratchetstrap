"use client";

import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/common/Breadcrumb';

import { useCategories } from "@/contexts/CategoryContext";
import { useLocale, useTranslations } from 'next-intl';
import { getCloudinaryPublicId, getCombainedLocalePath } from '@/utils/formatUtils'; 

export default function ProductsPage() {
  const lang = useLocale(); 
  const t = useTranslations("ProductsPage"); 
  const { rootCategories } = useCategories(); 

  const breadcrumbItems = [
    { name: t('breadcrumb.products'), href: getCombainedLocalePath(lang, 'products') }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Breadcrumb items={breadcrumbItems} lang={lang} />
      </div>

      <div className="mb-12 text-center md:text-left"> 
        <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
          {t('mainTitle')} 
        </h1>
        <p className="mt-4 text-lg text-black">
          {t('mainSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {rootCategories?.map((category) => (
          <Link key={category.id} href={getCombainedLocalePath(lang, `categories/${category.slug}`)} className="group block p-4 border border-transparent hover:border-gray-200 hover:shadow-lg rounded-lg transition-all duration-300">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              {category.featured_image && (
                <Image
                  src={getCloudinaryPublicId(category.featured_image.url)}
                  alt={category.name} 
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" // Adjusted sizes
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-black text-center group-hover:text-yellow-600">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 prose prose-lg max-w-none text-center md:text-left">
        <h2>{t('introduction.title')}</h2>
        <p>
          {t('introduction.paragraph')}
        </p>
      </div>
    </div>
  );
}