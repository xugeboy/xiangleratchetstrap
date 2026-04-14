"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";

import type { Product } from "@/types/product";
import { searchProducts } from "@/services/api/product";
import {
  getCloudinaryPublicId,
  getCombainedLocalePath,
} from "@/utils/formatUtils";

interface SearchResultItem {
  id: number;
  name: string;
  url: string;
  imageUrl: string;
}

export interface SearchComboboxProps {
  autoFocus?: boolean;
  initialQuery?: string;
}

export default function SearchCombobox({
  autoFocus = false,
  initialQuery = "",
}: SearchComboboxProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("SearchBar");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 1) {
        setIsSearching(true);

        try {
          const products: Product[] = await searchProducts(searchQuery, locale);
          const formattedResults: SearchResultItem[] = products.map((product) => ({
            id: product.id,
            name: product.name,
            url: getCombainedLocalePath(locale, `products/${product.slug}`),
            imageUrl:
              product.gallery?.[0]?.url ||
              product.featured_image?.url ||
              "/placeholder.jpg",
          }));
          setSearchResults(formattedResults);
        } catch (error) {
          console.error("Error searching products:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [locale, searchQuery]);

  const handleSearchSubmit = (item: SearchResultItem) => {
    router.push(item.url);
  };

  return (
    <Combobox as="div" onChange={handleSearchSubmit}>
      <div className="relative z-40">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg border border-gray-300 bg-white text-left transition-all duration-200 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
          <ComboboxInput
            autoFocus={autoFocus}
            className="w-full border-none py-3 pl-4 pr-10 text-sm leading-5 text-black outline-none focus:ring-0"
            placeholder={t("placeholder")}
            onChange={(event) => setSearchQuery(event.target.value)}
            displayValue={(item: SearchResultItem | null) => item?.name || searchQuery}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
            {isSearching ? (
              <svg
                className="h-5 w-5 animate-spin text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>

        {searchQuery.length > 0 && (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-96 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {isSearching ? (
              <div className="flex items-center justify-center px-4 py-6 text-sm text-black">
                <svg
                  className="mr-2 h-5 w-5 animate-spin text-indigo-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {t("searchingStatus")}
              </div>
            ) : searchResults.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-black">
                {t("noProductsFound", { searchQuery })}
              </div>
            ) : (
              <>
                <div className="sticky top-0 z-10 border-b bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black">
                  {t("searchResultsTitle", { count: searchResults.length })}
                </div>
                {searchResults.map((item) => (
                  <ComboboxOption
                    key={item.id}
                    value={item}
                    className="relative cursor-pointer select-none px-4 py-3 text-black data-[focus]:bg-indigo-50"
                  >
                    {({ focus }) => (
                      <div className="flex items-center space-x-4">
                        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-100 bg-gray-50">
                          <Image
                            src={getCloudinaryPublicId(item.imageUrl)}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="max-h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`truncate text-sm font-medium ${
                              focus ? "text-indigo-700" : "text-black"
                            }`}
                          >
                            {item.name}
                          </p>
                          <p className="mt-1 truncate text-xs text-black">
                            {t("clickToViewDetails")}
                          </p>
                        </div>
                        {focus && (
                          <div className="flex-shrink-0 text-indigo-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                  </ComboboxOption>
                ))}
              </>
            )}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  );
}
