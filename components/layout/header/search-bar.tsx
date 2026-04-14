"use client";

import { useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bars3Icon, PhoneIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

import type { SearchComboboxProps } from "@/components/layout/header/SearchCombobox";

interface SearchBarProps {
  onMobileMenuOpen: () => void;
}

function SearchFieldShell({
  value,
  onActivate,
  onChange,
  placeholder,
}: {
  value: string;
  onActivate: () => void;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative z-40">
      <div className="relative w-full overflow-hidden rounded-lg border border-gray-300 bg-white text-left transition-all duration-200 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <input
          type="search"
          value={value}
          onFocus={onActivate}
          onChange={(event) => {
            onChange(event.target.value);
            onActivate();
          }}
          placeholder={placeholder}
          className="w-full border-none py-3 pl-4 pr-10 text-sm leading-5 text-black outline-none focus:ring-0"
          autoComplete="off"
          aria-label={placeholder}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
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
        </div>
      </div>
    </div>
  );
}

function DeferredSearchField() {
  const t = useTranslations("SearchBar");
  const [searchQuery, setSearchQuery] = useState("");
  const [SearchCombobox, setSearchCombobox] =
    useState<ComponentType<SearchComboboxProps> | null>(null);

  const activateSearch = () => {
    if (SearchCombobox) {
      return;
    }

    void import("@/components/layout/header/SearchCombobox").then((module) => {
      setSearchCombobox(() => module.default);
    });
  };

  if (SearchCombobox) {
    return <SearchCombobox autoFocus initialQuery={searchQuery} />;
  }

  return (
    <SearchFieldShell
      value={searchQuery}
      onActivate={activateSearch}
      onChange={setSearchQuery}
      placeholder={t("placeholder")}
    />
  );
}

export function SearchBar({ onMobileMenuOpen }: SearchBarProps) {
  return (
    <div className="border-b border-gray-100">
      <div className="hidden md:block md:py-4">
        <div className="container mx-auto flex items-center justify-between px-6">
          <Link href="/" className="flex h-12 w-[200px] flex-shrink-0 items-center">
            <Image
              src="/xiangle_ratchet_strap_mxts89.png"
              alt="xiangle ratchet strap"
              width={200}
              height={60}
              className="h-12 w-[200px] object-contain"
            />
          </Link>
          <div className="ml-auto w-full max-w-md">
            <DeferredSearchField />
          </div>
        </div>
      </div>

      <div className="bg-black text-white md:hidden">
        <div className="flex items-center justify-between px-4 py-2">
          <button
            onClick={onMobileMenuOpen}
            className="p-2 text-white"
            aria-label="Open menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <Link
            href="/"
            className="flex h-8 w-[120px] flex-shrink-0 items-center justify-center"
          >
            <Image
              src="/v1750054336/xiangle_ratchet_strap_mxts89_%E6%8B%B7%E8%B4%9D_woihtv.png"
              alt="xiangle ratchet strap"
              width={120}
              height={40}
              className="h-8 w-[120px] object-contain"
            />
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/contact-us" className="text-white">
              <PhoneIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div className="flex px-4 py-2">
          <div className="flex-1">
            <DeferredSearchField />
          </div>
        </div>
      </div>
    </div>
  );
}
