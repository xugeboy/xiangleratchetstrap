"use client";
import Image from "next/image";
import Link from "next/link";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon, DocumentTextIcon, VideoCameraIcon, LightBulbIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon as ChevronDownIconSolid } from "@heroicons/react/20/solid";
import { ProductCategory } from "@/types/productCategory";
import { searchProducts } from "@/services/api/product";
import { Product } from "@/types/product";

interface HeaderClientProps {
  topLevelCategories: ProductCategory[];
  company: Array<{
    name: string;
    href: string;
  }>;
}

// 定义搜索结果项的类型，使用 Product 类型
interface SearchResultItem {
  id: number;
  name: string;
  url: string;
  imageUrl: string;
}

export default function HeaderClient({
  topLevelCategories,
  company,
}: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(-1);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState('US');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  
  // 获取搜索结果
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 1) {
        setIsSearching(true);
        try {
          const products: Product[] = await searchProducts(searchQuery);
          // 转换产品数据为搜索结果项格式
          const formattedResults: SearchResultItem[] = products.map(product => ({
            id: product.id,
            name: product.name,
            url: `/products/${product.slug}`,
            imageUrl: product.gallery?.[0]?.url || product.featured_image?.url || '/placeholder.jpg',
          }));
          setSearchResults(formattedResults);
        } catch (error) {
          console.error('Error searching products:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);
  
  const filteredResults = searchResults;

  // 处理鼠标进入标签
  const handleTabMouseEnter = (index: number) => {
    setActiveTabIndex(index);
  };

  // 处理鼠标进入标签
  const handleTabMouseLeave = () => {
    setActiveTabIndex(-1);
  };

  

  // 处理鼠标离开面板
  const handlePanelMouseLeave = () => {
    setActiveTabIndex(-1);
  };

  return (
    <header className="bg-white">
      {/* 顶部导航栏 */}
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl flex justify-end">
          <div className="flex divide-x divide-gray-200">
            <Link href="/literature" className="px-6 py-3 flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600">
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              LITERATURE
            </Link>
            <Link href="/videos" className="px-6 py-3 flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600">
              <VideoCameraIcon className="h-5 w-5 mr-2" />
              VIDEOS
            </Link>
            <Link href="/submission" className="px-6 py-3 flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600">
              <LightBulbIcon className="h-5 w-5 mr-2" />
              SUBMISSION OF IDEA
            </Link>
            <Menu as="div" className="relative">
              <MenuButton className="px-6 py-3 flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600">
                <Image src={`/flags/${language.toLowerCase()}.svg`} alt={language} className="h-5 w-5 mr-2"
                 width={20}
                 height={20}
                 />
                {language}
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem>
                  <button
                    onClick={() => setLanguage('US')}
                    className="text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 flex w-full items-center px-4 py-2 text-sm"
                  >
                    <Image src="/flags/us.svg" alt="US" className="h-5 w-5 mr-2"
                     width={20}
                     height={20}
                     />
                    US
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => setLanguage('CN')}
                    className="text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 flex w-full items-center px-4 py-2 text-sm"
                  >
                    <Image src="/flags/cn.svg" alt="CN" className="h-5 w-5 mr-2"
                     width={20}
                     height={20}
                     />
                    CN
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* 搜索栏 */}
      <div className=" py-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </Link>
          <div className="w-full max-w-md ml-auto">
            <Combobox as="div" onChange={(item: SearchResultItem) => window.location.href = item.url}>
              <div className="relative rounded-md shadow-sm">
                <ComboboxInput
                  className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="search product..."
                  onChange={(event) => setSearchQuery(event.target.value)}
                  displayValue={(item: SearchResultItem | null) => item?.name || ''}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {isSearching ? (
                    <svg className="h-5 w-5 text-gray-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <ComboboxOptions className="absolute z-10 mt-1 max-h-96 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm divide-y divide-gray-200">
                {isSearching ? (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    searching...
                  </div>
                ) : filteredResults.length === 0 && searchQuery !== '' ? (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    no results found
                  </div>
                ) : (
                  filteredResults.map((item) => (
                    <ComboboxOption 
                      key={item.id} 
                      value={item}
                      className="cursor-pointer select-none py-2 px-4 text-gray-900 data-[focus]:bg-gray-100"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-50 flex items-center justify-center">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="object-contain max-h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </ComboboxOption>
                  ))
                )}
              </ComboboxOptions>
            </Combobox>
          </div>
        </div>
      </div>

      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="size-6" aria-hidden={true} />
          </button>
        </div>

        <div className="hidden lg:block" ref={menuContainerRef}>
          <TabGroup
            selectedIndex={activeTabIndex !== -1 ? activeTabIndex : undefined}
            onChange={(index) => setActiveTabIndex(index)}
          >
            <div className="border-b border-transparent relative">
              <TabList className="flex space-x-4 lg:space-x-6 xl:space-x-8">
                {/* 始终显示的标签 (最大3个) */}
                {topLevelCategories.slice(0, 3).map((category, index) => (
                  <Tab
                    key={category.id}
                    className={({ selected }) => `
                      relative px-2 py-2 text-sm font-medium text-gray-800
                      outline-none transition-colors duration-200 cursor-pointer
                      ${selected ? "text-indigo-600" : "hover:text-indigo-500"}
                    `}
                    onMouseEnter={() => handleTabMouseEnter(index)}
                    onMouseLeave={() => handleTabMouseLeave()}
                  >
                    <Link
                      href={`/categories/${category.slug}`}
                      className="group flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                    >
                      <span className="whitespace-nowrap">{category.name}</span>
                    </Link>

                    {activeTabIndex === index && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-600 transform transition-transform duration-200"></span>
                    )}
                  </Tab>
                ))}
                
                {/* 中等屏幕显示的额外标签 (2个) */}
                {topLevelCategories.length > 3 && topLevelCategories.slice(3, 5).map((category, idx) => (
                  <Tab
                    key={category.id}
                    className={({ selected }) => `
                      relative px-2 py-2 text-sm font-medium text-gray-800
                      outline-none transition-colors duration-200 cursor-pointer
                      hidden lg:block
                      ${selected ? "text-indigo-600" : "hover:text-indigo-500"}
                    `}
                    onMouseEnter={() => handleTabMouseEnter(idx + 3)}
                  >
                    <Link
                      href={`/categories/${category.slug}`}
                      className="group flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                    >
                      <span className="whitespace-nowrap">{category.name}</span>
                    </Link>

                    {activeTabIndex === (idx + 3) && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-600 transform transition-transform duration-200"></span>
                    )}
                  </Tab>
                ))}
                
                {/* 大屏幕显示的额外标签 */}
                {topLevelCategories.length > 5 && topLevelCategories.slice(5).map((category, idx) => (
                  <Tab
                    key={category.id}
                    className={({ selected }) => `
                      relative px-2 py-2 text-sm font-medium text-gray-800
                      outline-none transition-colors duration-200 cursor-pointer
                      hidden xl:block
                      ${selected ? "text-indigo-600" : "hover:text-indigo-500"}
                    `}
                    onMouseEnter={() => handleTabMouseEnter(idx + 5)}
                  >
                    <Link
                      href={`/categories/${category.slug}`}
                      className="group flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                    >
                      <span className="whitespace-nowrap">{category.name}</span>
                    </Link>

                    {activeTabIndex === (idx + 5) && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-600 transform transition-transform duration-200"></span>
                    )}
                  </Tab>
                ))}
              </TabList>
            </div>

            <div
              className={`absolute left-0 w-full z-50 transform transition-all duration-200 ease-in-out ${
                activeTabIndex === -1
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
              onMouseLeave={handlePanelMouseLeave}
            >
              <TabPanels className="bg-white shadow-lg rounded-b-lg border-t border-gray-100">
                {topLevelCategories.map((category) => (
                  <TabPanel key={category.id} className="py-6 px-8">
                    {category.children && category.children.length > 0 && (
                      <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4">
                          {category.children.map((item) => (
                            <Link
                              key={item.id}
                              href={`/categories/${category.slug}/${
                                item.slug || ""
                              }`}
                              className="group flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                            >
                              <span className="text-sm font-medium">
                                {item.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabPanel>
                ))}
              </TabPanels>
            </div>
          </TabGroup>
          
        </div>
      </nav>
      <div className="w-full border-b border-gray-200 mt-1"></div>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">XiangleRatchetstrap</span>
              <Image
                className="h-8 w-auto"
                src="/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
                width={100}
                height={100}
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden={true} />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    product
                    <ChevronDownIconSolid
                      className="size-5 flex-none group-data-open:rotate-180"
                      aria-hidden={true}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {topLevelCategories.map((category) => (
                      <div key={category.id} className="py-1">
                        <DisclosureButton
                          as="a"
                          href={`/categories/${category.slug}`}
                          className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                        >
                          {category.name}
                        </DisclosureButton>
                      </div>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  特性
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  商城
                </a>

                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    公司
                    <ChevronDownIconSolid
                      className="size-5 flex-none group-data-open:rotate-180"
                      aria-hidden={true}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {company.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
