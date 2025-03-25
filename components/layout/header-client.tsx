"use client";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  ChartPieIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ProductCategory } from "@/types/productCategory";

interface HeaderClientProps {
  topLevelCategories: ProductCategory[];
  company: Array<{
    name: string;
    href: string;
  }>;
}

export default function HeaderClient({
  topLevelCategories,
  company,
}: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">XiangleRatchetstrap</span>
            <img
              alt=""
              src="/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
        </div>
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

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              product
              <ChevronDownIcon
                className="size-5 flex-none text-gray-400"
                aria-hidden={true}
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute left-1/2 z-10 mt-3 w-screen max-w-7xl -translate-x-1/2 transform px-4 overflow-hidden rounded-xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                <div className="grid grid-cols-4 gap-6">
                  {topLevelCategories.map((category) => (
                    <div
                      key={category.id}
                      className="border-r border-gray-100 last:border-r-0 p-2"
                    >
                      <div className="flex items-center gap-x-4 pb-2">
                        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-gray-50">
                          <ChartPieIcon
                            className="h-5 w-5 text-gray-600"
                            aria-hidden={true}
                          />
                        </div>
                        <div>
                          <a
                            href={`/categories/${category.slug}`}
                            className="font-medium text-base text-gray-900 hover:text-indigo-600"
                          >
                            {category.name}
                          </a>
                          {category.description && (
                            <p className="mt-1 text-xs text-gray-500">
                              {category.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {category.children && category.children.length > 0 && (
                        <div className="mt-3 ml-2 grid grid-cols-2 gap-x-3 gap-y-1">
                          {category.children.map((child) => (
                            <a
                              key={child.id}
                              href={`/categories/${category.slug}/${
                                child.slug || ""
                              }`}
                              className="text-sm text-gray-500 hover:text-indigo-500 py-1"
                            >
                              {child.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </PopoverPanel>
          </Popover>

          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            特性
          </a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            商城
          </a>

          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              公司
              <ChevronDownIcon
                className="size-5 flex-none text-gray-400"
                aria-hidden={true}
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute top-full -left-8 z-10 mt-3 w-56 rounded-xl bg-white p-2 ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              {company.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </PopoverPanel>
          </Popover>
        </PopoverGroup>
      </nav>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">XiangleRatchetstrap</span>
              <img
                className="h-8 w-auto"
                src="/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
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
                    <ChevronDownIcon
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
                    <ChevronDownIcon
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
