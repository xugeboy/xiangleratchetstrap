"use client";

import { defaultUrlPrefix } from "@/middleware";
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
  { code: "en", label: "US", flag: "US", hreflang: "en-US" },
  { code: "au", label: "Australia", flag: "AU", hreflang: "en-AU" },
  { code: "uk", label: "UK", flag: "GB", hreflang: "en-GB" },
  { code: "de", label: "Deutsch", flag: "DE", hreflang: "de-DE" },
  { code: "fr", label: "Français", flag: "FR", hreflang: "fr-FR" },
  { code: "es", label: "Español", flag: "ES", hreflang: "es-ES" },
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
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [selectedLocale, setSelectedLocale] = useState<Locale>(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const potentialLocaleCodeFromUrl = pathSegments[0];
    const urlLocaleObject = findLocaleObjectByCode(potentialLocaleCodeFromUrl);

    if (urlLocaleObject) {
      return urlLocaleObject;
    }
    return defaultLocaleObject;
  });

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const potentialLocaleCodeFromUrl = pathSegments[0];
    const urlLocaleObject = findLocaleObjectByCode(potentialLocaleCodeFromUrl);

    if (urlLocaleObject) {
      setSelectedLocale(urlLocaleObject);
    } else {
      setSelectedLocale(defaultLocaleObject);
    }
  }, [pathname, defaultLocaleObject]); // Added defaultLocaleObject as dependency

  const handleLocaleChange = (newlySelectedLocaleObject: Locale) => {
    if (typeof document === "undefined") {
      console.warn("Document object is not available.");
      return;
    }

    const currentHreflangUrls: Record<string, string | null> = {};
    const alternateLinks = document.querySelectorAll(
      'link[rel="alternate"][hreflang]'
    );

    alternateLinks.forEach((link) => {
      let href = link.getAttribute("href");
      const hreflang = link.getAttribute("hreflang");

      if (href && hreflang) {
        const url = new URL(href);
        const pathSegments = url.pathname.split('/').filter(Boolean);
        if ((hreflang === 'en' || hreflang === 'en-US') && pathSegments[0] !== 'en') {
            url.pathname = '/en' + url.pathname;
            href = url.toString();
        }
        currentHreflangUrls[hreflang] = href;
      }
    });

    const targetHreflang = newlySelectedLocaleObject.hreflang;
    const targetUrl = currentHreflangUrls[targetHreflang];

    if (targetUrl) {
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