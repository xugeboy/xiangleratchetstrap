"use client";
import { useState } from "react";
import { SearchBar } from "@/components/layout/header/search-bar";
import { CategoryNavigation } from "@/components/layout/header/category-navigation";
import { MobileMenu } from "@/components/layout/header/mobile-menu";
import Link from "next/link";
import LocaleSwitcher from "../common/LocaleSwitcher";
import { useLocale, useTranslations } from "next-intl";
import { getCombainedLocalePath } from "@/utils/formatUtils";

export default function Header() {
  const locale = useLocale();
  const tNav = useTranslations("Navigation");
  const company = [
    {
      name: tNav("company.aboutUs"),
      href: getCombainedLocalePath(locale, "about-us"),
    },
    {
      name: tNav("company.contactUs"),
      href: getCombainedLocalePath(locale, "contact-us"),
    },
    {
      name: tNav("company.blogs"),
      href: getCombainedLocalePath(locale, "blogs"),
    },
    {
      name: tNav("company.meetTheTeam"),
      href: getCombainedLocalePath(locale, "business-solutions#meet-the-team"),
    },
  ];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      {/* Top navigation bar - hide on mobile */}
      <div className="hidden md:block bg-gray-900 text-white">
        <div className="mx-auto container px-4">
          <div className="flex h-10 items-center justify-end space-x-8">
            <Link
              href={getCombainedLocalePath(locale, "custom-print")}
              className="text-sm font-medium bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
            >
              {tNav("products.customPrint")}
            </Link>
            <Link
              href={getCombainedLocalePath(locale, "business-solutions")}
              className="text-sm font-medium hover:text-red-600"
            >
              {tNav("support.businessSolutions")}
            </Link>
            <Link
              href={getCombainedLocalePath(locale, "contact-us")}
              className="text-sm font-medium hover:text-red-600"
            >
              {tNav("company.contactUs")}
            </Link>
            <LocaleSwitcher></LocaleSwitcher>
          </div>
        </div>
      </div>

      {/* Search bar with logo */}
      <SearchBar onMobileMenuOpen={() => setMobileMenuOpen(true)} />

      {/* Category navigation - hide on mobile */}
      <div className="hidden md:block">
        <CategoryNavigation />
        <div className="w-full border-b border-gray-200 mt-1"></div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        company={company}
      />
    </header>
  );
}
