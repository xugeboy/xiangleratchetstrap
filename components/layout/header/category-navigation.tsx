"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useCategories } from "@/contexts/CategoryContext";
import { useLocale } from "next-intl";
import { getCombainedLocalePath } from "@/utils/formatUtils";


export function CategoryNavigation() {
  const [activeTabIndex, setActiveTabIndex] = useState(-1);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  // 从 Context 获取分类数据
  const { rootCategories, categoryMap } = useCategories();

  // 处理鼠标进入标签
  const handleTabMouseEnter = (index: number) => {
    setActiveTabIndex(index);
  };

  // 处理鼠标离开标签
  const handleTabMouseLeave = () => {
    // Don't immediately hide the panel when leaving the tab
    // We'll let the panel's mouse leave event handle this
  };

  // 处理鼠标离开面板
  const handlePanelMouseLeave = () => {
    setActiveTabIndex(-1);
  };

  // Handle mouse events for the entire menu container
  const handleMenuContainerMouseLeave = () => {
    setActiveTabIndex(-1);
  };
  const locale = useLocale()
  return (
    <nav
      aria-label="Global"
      className="hidden md:flex mx-auto container items-center justify-center p-6"
    >
      <div
        className="hidden md:block w-full"
        ref={menuContainerRef}
        onMouseLeave={handleMenuContainerMouseLeave}
      >
        <TabGroup
          selectedIndex={activeTabIndex !== -1 ? activeTabIndex : undefined}
          onChange={(index) => setActiveTabIndex(index)}
        >
          <div className="border-b border-transparent relative">
            <TabList className="flex space-x-4 items-center justify-center">
              {rootCategories.map((category, idx) => (
                  <Tab
                    key={category.id}
                    className={({ selected }) => `
                    relative md:px-2 lg:px-8 py-2 text-sm font-medium text-black
                    outline-none transition-colors duration-200 cursor-pointer
                    block
                    ${selected ? "text-amber-700" : "hover:text-amber-700"}
                  `}
                    onMouseEnter={() => handleTabMouseEnter(idx)}
                  >
                    <Link
                      prefetch={false}
                      href={getCombainedLocalePath(locale,`categories/${category.slug}`)}
                      className="group flex items-center text-black hover:text-amber-700 transition-colors duration-200"
                    >
                      <span className="whitespace-nowrap">{category.name}</span>
                    </Link>
                    {activeTabIndex === idx && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-700 transform transition-transform duration-200"></span>
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
              {rootCategories.map((category) => (
                <TabPanel key={category.id} className="py-6 px-8">
                  {category.children && category.children.length > 0 && (
                    <div className="container mx-auto">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4">
                        {category.children?.map((subCategoryRef) => {
                          const subCategory = categoryMap.get(
                            subCategoryRef.id
                          );
                          if (!subCategory) return null;

                          return (
                            <div key={subCategory.id} className="mb-4">
                              {/* 二级分类标题 */}
                              <Link
                                prefetch={false}
                                href={getCombainedLocalePath(locale,`categories/${subCategory.slug}`)}
                                className="block text-black hover:text-amber-700 font-semibold text-sm mb-1"
                              >
                                {subCategory.name}
                              </Link>

                              {/* 三级分类列表 */}
                              {subCategory.children &&
                                subCategory.children.length > 0 && (
                                  <div className="space-y-1">
                                    {subCategory.children.map((thirdRef) => {
                                      const thirdCategory = categoryMap.get(
                                        thirdRef.id
                                      );
                                      if (!thirdCategory) return null;

                                      return (
                                        <Link
                                          prefetch={false}
                                          key={thirdCategory.id}
                                          href={getCombainedLocalePath(locale,`categories/${thirdCategory.slug}`)}
                                          className="block text-black hover:text-amber-700 text-sm"
                                        >
                                          {thirdCategory.name}
                                        </Link>
                                      );
                                    })}
                                  </div>
                                )}
                            </div>
                          );
                        })}
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
  );
}
