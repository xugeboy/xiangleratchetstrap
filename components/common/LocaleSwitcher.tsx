"use client";

import { defaultUrlPrefix } from "@/middleware"; // Assuming this still provides a default or base locale
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import "flag-icons/css/flag-icons.min.css";

type Locale = {
  code: string;
  label: string;
  flag: string;
  hreflang: string;
};

const localesData: Locale[] = [
  { code: "en", label: "US", flag: "US", hreflang:"en" },
  { code: "au", label: "Australia", flag: "AU", hreflang:"en-AU" },
  { code: "uk", label: "UK", flag: "GB", hreflang:"en-GB" },
  { code: "de", label: "Deutsch", flag: "DE", hreflang:"de-DE" },
  { code: "fr", label: "Français", flag: "FR", hreflang:"fr-FR" },
  { code: "es", label: "Español", flag: "ES", hreflang:"es-ES" },
];

const findLocaleObjectByCode = (
  code: string | undefined
): Locale | undefined => {
  if (!code) return undefined;
  return localesData.find((l) => l.code === code);
};

const defaultLocaleObject = findLocaleObjectByCode(defaultUrlPrefix);

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname(); // <-- 这里的 pathname 会在 URL 变化时更新
  const [isPending, startTransition] = useTransition();

  // State to store the extracted hreflang URLs
  const [hreflangUrls, setHreflangUrls] = useState<
    Record<string, string | null>
  >({});

  const [selectedLocale, setSelectedLocale] = useState<Locale>(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const potentialLocaleCodeFromUrl = pathSegments[0];
    const urlLocaleObject = findLocaleObjectByCode(potentialLocaleCodeFromUrl);

    if (urlLocaleObject) {
      return urlLocaleObject;
    }
    return defaultLocaleObject;
  });

  // 关键修改：将 pathname 添加到 useEffect 的依赖数组中
  useEffect(() => {
    // 确保在客户端环境运行
    if (typeof document === 'undefined') {
        return;
    }

    const links: Record<string, string | null> = {};
    const alternateLinks = document.querySelectorAll(
      'link[rel="alternate"][hreflang]'
    );
    const canonicalLink = document.querySelector('link[rel="canonical"]');

    alternateLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const hreflang = link.getAttribute("hreflang");
      if (href && hreflang) {
        links[hreflang] = href;
      }
    });

    if (canonicalLink) {
      const canonicalHref = canonicalLink.getAttribute("href");
      if (canonicalHref && !links["x-default"]) {
        const pathSegments = new URL(canonicalHref).pathname.split("/").filter(Boolean);
        const inferredLocaleFromCanonical = findLocaleObjectByCode(pathSegments[0]);
        if (inferredLocaleFromCanonical) {
            links[inferredLocaleFromCanonical.code] = canonicalHref;
        } else {
            links[defaultUrlPrefix] = canonicalHref;
        }
      }
    }

    const xDefaultLink = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    if (xDefaultLink) {
      const href = xDefaultLink.getAttribute("href");
      if (href) {
        links["x-default"] = href;
        if (defaultLocaleObject && !links[defaultLocaleObject.code]) {
            links[defaultLocaleObject.code] = href;
        }
      }
    }

    setHreflangUrls(links);
  }, [pathname]); // <-- 这里是修改！当 pathname 变化时，重新执行此 effect

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const potentialLocaleCodeFromUrl = pathSegments[0];
    const urlLocaleObject = findLocaleObjectByCode(potentialLocaleCodeFromUrl);

    if (urlLocaleObject) {
      setSelectedLocale(urlLocaleObject);
    } else {
      setSelectedLocale(defaultLocaleObject);
    }
  }, [pathname]); // 这个 useEffect 保持不变，它也是依赖 pathname 更新选中语言的

  const handleLocaleChange = (newlySelectedLocaleObject: Locale) => {
    const newLocaleCode = newlySelectedLocaleObject.hreflang;
    const targetUrl = hreflangUrls[newLocaleCode];

    if (targetUrl) {
      // Use the exact URL found in the hreflang links
      startTransition(() => {
        router.push(targetUrl);
      });
    }
  };

  return (
    <div className="w-30">
      <Listbox value={selectedLocale} onChange={handleLocaleChange}>
        <div className="relative">
          <ListboxButton className="relative w-full cursor-pointer text-sm font-medium shadow-sm">
            <div className="flex items-center gap-2">
              {selectedLocale?.flag && (
                <span
                  className={`fi fi-${selectedLocale.flag.toLowerCase()}`}
                  style={{ width: 20, height: 15, display: "block" }}
                  aria-label={selectedLocale.flag}
                />
              )}
              <span>{selectedLocale?.label || ""}</span>{" "}
            </div>
          </ListboxButton>

          <ListboxOptions className="absolute z-50 mt-1 w-auto min-w-full rounded-md bg-white shadow-lg border border-gray-200 text-sm focus:outline-none max-h-70 overflow-auto">
            {localesData.map((localeOption) => (
              <ListboxOption
                key={localeOption.code}
                value={localeOption}
                className={({ active, selected }) =>
                  `cursor-pointer px-3 py-2 flex items-center gap-2 ${
                    active ? "bg-indigo-50 text-indigo-700" : "text-black"
                  } ${selected ? "font-semibold" : "font-normal"}`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`fi fi-${localeOption.flag.toLowerCase()}`}
                      style={{ width: 20, height: 15, display: "block" }}
                      aria-label={localeOption.label}
                    />
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {localeOption.label}
                    </span>
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}