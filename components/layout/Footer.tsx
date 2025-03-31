"use client"
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from 'react';

const navigation = {
  company: [
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Blog", href: "/blog" },
    { name: "Meet The Team", href: "/business-solutions/#meet-the-team" },
  ],
  support: [
    { name: "Request Quote", href: "/request-quote" },
    { name: "Download Catalog", href: "/download-catalog" },
    { name: "FAQ", href: "/faq" },
    { name: "Business Solutions", href: "/business-solutions" },
    { name: "Online Customizer", href: "/online-customizer" },
  ],
  products: [
    {
      name: "Retractable Ratchet Strap",
      href: "/categories/retractable-ratchet-strap",
    },
    { name: "Ratchet Strap", href: "/categories/ratchet-strap" },
    { name: "Cam Buckle Strap", href: "/categories/cam-buckle-strap" },
    {
      name: "Powersports & Utility Trailer Straps",
      href: "/categories/powersports-utility-trailer-straps",
    },
    {
      name: "Interior Van & Moving Supplies",
      href: "/categories/interior-van-moving-supplies",
    },
    { name: "Webbing & Hardware", href: "/categories/webbing-hardware" },
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
      value: "+8618921978916",
      icon: PhoneIcon,
      href: "tel:+8618921978916",
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
      href: "#",
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
      href: "#",
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
      href: "#",
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
      href: "#",
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

export default function Footer() {
  const [isOpenProducts, setIsOpenProducts] = useState(false);
  const [isOpenSupport, setIsOpenSupport] = useState(false);
  const [isOpenCompany, setIsOpenCompany] = useState(false);
  const [isOpenContact, setIsOpenContact] = useState(false);

  return (
    <footer className="bg-gray-900 mt-32">
      <div className="mx-auto max-w-7xl px-6 py-2">
        <div className="hidden md:block border-t border-white/10 pt-12 xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="flex flex-col gap-2">
          <Image
            alt="Company name"
            src="/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="h-9"
            width={100}
            height={100}
          />
          <h3 className="text-base font-semibold text-[#00e41b]">
          Custom Made Straps
          </h3>
          <span className="text-gray-400">
          All straps on XiangleRatchetStrap.com are made to order. This give you the ability to choose the length, color, and other options that fit your needs
          </span>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-base font-semibold text-[#00e41b]">
                Products
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.products.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm/6 text-gray-400 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#00e41b]">
                Support
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm/6 text-gray-400 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#00e41b]">
                Company
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm/6 text-gray-400 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#00e41b]">
                Contact Us
              </h3>
              <div className="mt-6 space-y-4">
                {navigation.contactUs.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-4 text-gray-400 hover:text-white"
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
            <button onClick={() => setIsOpenProducts(!isOpenProducts)} className="flex items-center justify-between w-full p-2 text-gray-400 hover:text-white">
            <h3 className="text-base font-semibold text-[#00e41b]">
                Products
              </h3>
              <svg className={`h-5 w-5 transition-transform ${isOpenProducts ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            {isOpenProducts && (
              <div className="mt-2 space-y-2">
                {navigation.products.map((item) => (
                  <a key={item.name} href={item.href} className="block text-sm/6 text-gray-400 hover:text-white px-2">
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <button onClick={() => setIsOpenSupport(!isOpenSupport)} className="flex items-center justify-between w-full p-2 text-gray-400 hover:text-white">
              <h3 className="text-base font-semibold text-[#00e41b]">
                Support
              </h3>
              <svg className={`h-5 w-5 transition-transform ${isOpenSupport ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            {isOpenSupport && (
              <div className="mt-2 space-y-2">
                {navigation.support.map((item) => (
                  <a key={item.name} href={item.href} className="block text-sm/6 text-gray-400 hover:text-white px-2">
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <button onClick={() => setIsOpenCompany(!isOpenCompany)} className="flex items-center justify-between w-full p-2 text-gray-400 hover:text-white">
              <h3 className="text-base font-semibold text-[#00e41b]">
                Company
              </h3>
              <svg className={`h-5 w-5 transition-transform ${isOpenCompany ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            {isOpenCompany && (
              <div className="mt-2 space-y-2">
                {navigation.company.map((item) => (
                  <a key={item.name} href={item.href} className="block text-sm/6 text-gray-400 hover:text-white px-2">
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <button onClick={() => setIsOpenContact(!isOpenContact)} className="flex items-center justify-between w-full p-2 text-gray-400 hover:text-white">
              <h3 className="text-base font-semibold text-[#00e41b]">
                Contact Us
              </h3>
              <svg className={`h-5 w-5 transition-transform ${isOpenContact ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            {isOpenContact && (
              <div className="mt-2 space-y-2">
                {navigation.contactUs.map((item) => (
                  <a key={item.name} href={item.href} className="block text-sm/6 text-gray-400 hover:text-white px-2">
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
                className="text-gray-400 hover:text-gray-300"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm/6 text-gray-400 md:order-1 md:mt-0">
            &copy; 2025 Xiangle Ratchet Strap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
