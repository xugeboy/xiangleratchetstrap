"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bars3Icon, PhoneIcon } from "@heroicons/react/24/outline"
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from "@headlessui/react"
import type { Product } from "@/types/product"
import { searchProducts } from "@/services/api/product"
import LocaleSwitcher from "@/components/common/LocaleSwitcher"
import { getBreadcrumbPathPrefix, getCombainedLocalePath } from "@/utils/formatUtils"
import { useLocale, useTranslations } from "next-intl"

// 定义搜索结果项的类型
interface SearchResultItem {
  id: number
  name: string
  url: string
  imageUrl: string
}

interface SearchBarProps {
  onMobileMenuOpen: () => void
}

export function SearchBar({ onMobileMenuOpen }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([])
  const t = useTranslations("SearchBar");
  const locale = useLocale();
  // 获取搜索结果
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 1) {
        setIsSearching(true)
        try {
          const products: Product[] = await searchProducts(searchQuery,locale)
          // 转换产品数据为搜索结果项格式
          const formattedResults: SearchResultItem[] = products.map((product) => ({
            id: product.id,
            name: product.name,
            url: getCombainedLocalePath(locale,"products/"+product.slug),
            imageUrl: product.gallery?.[0]?.url || product.featured_image?.url || "/placeholder.jpg",
          }))
          setSearchResults(formattedResults)
        } catch (error) {
          console.error("Error searching products:", error)
        } finally {
          setIsSearching(false)
        }
      } else {
        setSearchResults([])
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  // Handle search submission
  const handleSearchSubmit = (item: SearchResultItem) => {
    // Navigate to product page
    window.location.href = item.url
  }

  // Search component that's shared between desktop and mobile
  const renderSearchCombobox = () => (
    <Combobox as="div" onChange={handleSearchSubmit}>
      <div className="relative z-40">
        <div
          className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all duration-200"
        >
          <ComboboxInput
            className="w-full border-none py-3 pl-4 pr-10 text-sm leading-5 text-black focus:ring-0 outline-none"
            placeholder={t("placeholder")}
            onChange={(event) => setSearchQuery(event.target.value)}
            displayValue={(item: SearchResultItem | null) => item?.name || ""}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isSearching ? (
              <svg
                className="h-5 w-5 text-black animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
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
                  className="mr-2 h-5 w-5 text-indigo-500 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t("searchingStatus")}
              </div>
            ) : searchResults.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-black">{t("noProductsFound", { searchQuery: searchQuery })}</div>
            ) : (
              <>
                <div className="sticky top-0 z-10 bg-white px-4 py-2 text-xs font-semibold text-black uppercase tracking-wider border-b">
                {t("searchResultsTitle", { count: searchResults.length })}
                </div>
                {searchResults.map((item) => (
                  <ComboboxOption
                    key={item.id}
                    value={item}
                    className="cursor-pointer select-none relative py-3 px-4 text-black data-[focus]:bg-indigo-50"
                  >
                    {({ focus }) => (
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-50 border border-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                          <Image
                            src={item.imageUrl || "/placeholder.svg"}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="object-contain max-h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${focus ? "text-indigo-700" : "text-black"} truncate`}>
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-black truncate">{t("clickToViewDetails")}</p>
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
  )

  return (
    <div className="border-b border-gray-100">
      {/* Desktop layout */}
      <div className="md:py-4 md:block hidden">
        <div className="mx-auto container px-6 flex justify-between items-center">
          <Link href="/" className="flex-shrink-0">
            <Image src="https://res.cloudinary.com/duimeqqch/image/upload/xiangle_ratchet_strap_mxts89.png" 
            alt="xiangle ratchet strap" width={200} height={60} className="h-12 w-auto" />
          </Link>
          <div className="w-full max-w-md ml-auto">{renderSearchCombobox()}</div>
        </div>
      </div>

      {/* Mobile layout (below 768px) */}
      <div className="md:hidden bg-black text-white">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Hamburger menu */}
          <button onClick={onMobileMenuOpen} className="text-white p-2" aria-label="Open menu">
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src="https://res.cloudinary.com/duimeqqch/image/upload/xiangle_ratchet_strap_mxts89.png" alt="xiangle ratchet strap" width={120} height={40} className="h-8 w-auto" />
          </Link>

          
          {/* Right */}
          <div className="flex items-center space-x-4">
          <LocaleSwitcher></LocaleSwitcher>
            <Link href="/contact-us" className="text-white">
              <PhoneIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="px-4 py-2 flex">
          <div className="flex-1">{renderSearchCombobox()}</div>
        </div>
      </div>
    </div>
  )
}

