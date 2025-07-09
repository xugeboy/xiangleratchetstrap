"use client"

import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { ChevronDownIcon as ChevronDownIconSolid } from "@heroicons/react/20/solid"
import { useCategories } from "@/contexts/CategoryContext" 

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  company: Array<{
    name: string
    href: string
  }>
}

export function MobileMenu({ isOpen, onClose, company }: MobileMenuProps) {
  // 从 Context 获取分类数据
  const { rootCategories } = useCategories();
  return (
    <Dialog as="div" className="relative z-50" open={isOpen} onClose={onClose}>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container for mobile menu */}
      <div className="fixed inset-0 z-50 flex">
        <DialogPanel className="relative w-full max-w-xs bg-white p-6 overflow-y-auto">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Company Logo</span>
              <Image className="h-8 w-auto" src="/xiangle_ratchet_strap_mxts89.png" alt="Company Logo" width={100} height={32} />
            </Link>
            <button type="button" className="-m-2.5 rounded-md p-2.5 text-black" onClick={onClose}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden={true} />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base font-semibold text-black hover:bg-gray-50">
                    Categories
                    <ChevronDownIconSolid
                      className="size-5 flex-none group-data-[open]:rotate-180"
                      aria-hidden={true}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {rootCategories.map((category) => (
                      <div key={category.id} className="py-1">
                        <DisclosureButton
                          as="a"
                          href={`/categories/${category.slug}`}
                          className="block rounded-lg py-2 pr-3 pl-6 text-sm font-semibold text-black hover:bg-gray-50"
                        >
                          {category.name}
                        </DisclosureButton>
                      </div>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base font-semibold text-black hover:bg-gray-50">
                    Company
                    <ChevronDownIconSolid
                      className="size-5 flex-none group-data-[open]:rotate-180"
                      aria-hidden={true}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {company.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm font-semibold text-black hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              </div>

              <div className="py-6">
              <Link
                  href="/custom-print"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-black hover:bg-gray-50"
                >
                  Custom Print
                </Link>
                <Link
                  href="/business-solutions"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-black hover:bg-gray-50"
                >
                  Business Solutions
                </Link>
                <Link
                  href="/contact-us"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-black hover:bg-gray-50"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

