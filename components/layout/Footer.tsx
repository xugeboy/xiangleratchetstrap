"use client";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NewsLetter from "../forms/NewsLetter";
import {
  getBreadcrumbPathPrefix,
  getCombainedLocalePath,
} from "@/utils/formatUtils";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const tF = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const [isOpenProducts, setIsOpenProducts] = useState(false);
  const [isOpenSupport, setIsOpenSupport] = useState(false);
  const [isOpenCompany, setIsOpenCompany] = useState(false);
  const [isOpenContact, setIsOpenContact] = useState(false);
  const navigation = {
    company: [
      { nameKey: "company.aboutUs", href: "about-us" },
      { nameKey: "company.contactUs", href: "contact-us" },
      { nameKey: "company.blogs", href: "blogs" },
      {
        nameKey: "company.meetTheTeam",
        href: "business-solutions/#meet-the-team",
      },
    ],
    support: [
      { nameKey: "support.requestQuote", href: "request-quote" },
      { nameKey: "support.downloadCatalog", href: "download-catalog" },
      { nameKey: "support.faq", href: "faq" },
      { nameKey: "support.businessSolutions", href: "business-solutions" },
      { nameKey: "support.sitemap", href: "sitemap.xml" },
      // { nameKey: "support.onlineCustomizer", href: "online-customizer" },
    ],
    products: [
      {
        nameKey: "products.retractableRatchetStrap",
        href: "categories/retractable-ratchet-strap",
      },
      {
        nameKey: "products.ratchetStrapAndTieDowns",
        href: "categories/ratchet-straps-and-tie-downs",
      },
      {
        nameKey: "products.powersportsStraps",
        href: "categories/powersports-strap",
      },
      {
        nameKey: "products.webbingAndHardware",
        href: "categories/webbing-and-hardware",
      },
    ],
    contactUs: [
      {
        name: "Address",
        value:
          "No. 18 Zhenxing Road, Yangshe Town, Zhangjiagang City, Suzhou, China, 215600",
        icon: MapPinIcon,
        href: "https://maps.google.com/?q=No. 18 Zhenxing Road, Yangshe Town, Zhangjiagang City, Suzhou, China, 215600",
      },
      {
        name: "Phone",
        value: "+8619952792557",
        icon: PhoneIcon,
        href: "tel:+8619952792557",
      },
      {
        name: "Mail",
        value: "info@xiangleratchetstrap.com",
        icon: EnvelopeIcon,
        href: "mailto:info@xiangleratchetstrap.com",
      },
    ],
    social: [
      {
        name: "Facebook",
        href: "https://www.facebook.com/xiangleratchetstrap",
        icon: (props) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: "Instagram",
        href: "https://www.instagram.com/xiangleratchetstrap",
        icon: (props) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/xiangle-tools",
        icon: (props) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: "YouTube",
        href: "https://www.youtube.com/@XiangleRatchetStrap",
        icon: (props) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
    ],
  };
  const locale = useLocale();
  const pathPrefix = getBreadcrumbPathPrefix(locale);
  return (
    <footer className="bg-gray-900 mt-10">
      <div className="mx-auto container px-4 py-2">
        <div className="hidden md:block pt-12 xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="flex flex-col gap-2">
            <Link href={`${pathPrefix}/`} className="flex-shrink-0">
              <Image
                src="/v1744006735/xiangle_ratchet_strap_w_m7aeic.png"
                alt="xiangle ratchet strap"
                width={200}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <h3 className="text-base font-semibold text-amber-700">
              {tF("customMadeStrapsTitle")}
            </h3>
            <span className="text-sm/6 text-white">
              {tF("customMadeStrapsDescription")}
            </span>
            <NewsLetter></NewsLetter>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-base font-semibold text-amber-700">
                {tNav("headings.products")}
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.products.map((item) => (
                  <li key={item.nameKey}>
                    <a
                      href={getCombainedLocalePath(locale, item.href)}
                      className="text-sm/6 text-white hover:text-amber-700"
                    >
                      {tNav(item.nameKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-amber-700">
                {tNav("headings.support")}
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.support.map((item) => {
                  const isSitemapLink = item.nameKey === "support.sitemap";
                  const href = isSitemapLink
                    ? item.href
                    : getCombainedLocalePath(locale, item.href);
                  return (
                    <li key={item.nameKey}>
                      <a
                        href={href}
                        className="text-sm/6 text-white hover:text-amber-700"
                      >
                        {tNav(item.nameKey)}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-amber-700">
                {tNav("headings.company")}
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.company.map((item) => (
                  <li key={item.nameKey}>
                    <a
                      href={getCombainedLocalePath(locale, item.href)}
                      className="text-sm/6 text-white hover:text-amber-700"
                    >
                      {tNav(item.nameKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-amber-700">
                {tNav("headings.contactUs")}
              </h3>
              <div className="mt-6 space-y-4">
                {navigation.contactUs.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-4 text-white hover:text-amber-700"
                  >
                    <item.icon
                      className="h-6 w-6 text-gray-600"
                      aria-hidden="true"
                    />
                    <span className="whitespace-normal break-words w-full">
                      {item.value}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 md:hidden">
          <div>
            <button
              onClick={() => setIsOpenProducts(!isOpenProducts)}
              className="flex items-center justify-between w-full p-2 text-white hover:text-amber-700"
            >
              <h3 className="text-base font-semibold text-amber-700">
                Products
              </h3>
              <svg
                className={`h-5 w-5 transition-transform ${
                  isOpenProducts ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            {isOpenProducts && (
              <div className="mt-2 space-y-2">
                {navigation.products.map((item) => (
                  <a
                    key={item.nameKey}
                    href={getCombainedLocalePath(locale, item.href)}
                    className="block text-sm/6 text-white hover:text-amber-700 px-2"
                  >
                    {tNav(item.nameKey)}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setIsOpenSupport(!isOpenSupport)}
              className="flex items-center justify-between w-full p-2 text-white hover:text-amber-700"
            >
              <h3 className="text-base font-semibold text-amber-700">
                Support
              </h3>
              <svg
                className={`h-5 w-5 transition-transform ${
                  isOpenSupport ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            {isOpenSupport && (
              <div className="mt-2 space-y-2">
                {navigation.support.map((item) => (
                  <a
                    key={item.nameKey}
                    href={getCombainedLocalePath(locale, item.href)}
                    className="block text-sm/6 text-white hover:text-amber-700 px-2"
                  >
                    {tNav(item.nameKey)}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setIsOpenCompany(!isOpenCompany)}
              className="flex items-center justify-between w-full p-2 text-white hover:text-amber-700"
            >
              <h3 className="text-base font-semibold text-amber-700">
                {tNav("headings.company")}
              </h3>
              <svg
                className={`h-5 w-5 transition-transform ${
                  isOpenCompany ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            {isOpenCompany && (
              <div className="mt-2 space-y-2">
                {navigation.company.map((item) => (
                  <a
                    key={item.nameKey}
                    href={getCombainedLocalePath(locale, item.href)}
                    className="block text-sm/6 text-white hover:text-amber-700 px-2"
                  >
                    {tNav(item.nameKey)}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setIsOpenContact(!isOpenContact)}
              className="flex items-center justify-between w-full p-2 text-white hover:text-amber-700"
            >
              <h3 className="text-base font-semibold text-amber-700">
                {tNav("headings.contactUs")}
              </h3>
              <svg
                className={`h-5 w-5 transition-transform ${
                  isOpenContact ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            {isOpenContact && (
              <div className="mt-2 space-y-2">
                {navigation.contactUs.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-sm/6 text-white hover:text-amber-700 px-2"
                  >
                    {item.value}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex gap-x-6 md:order-2">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-gray-300"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm/6 text-white md:order-1 md:mt-0">
            &copy; 2025 Xiangle Ratchet Strap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
