"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useRouter, usePathname } from "next/navigation"; // next/navigation for App Router
import { useEffect, useState, useTransition } from "react"; // Added useTransition
import Flag from "react-world-flags";

const DEFAULT_LOCALE_CODE = "en"; // Renamed for clarity

type Locale = {
  code: string;
  label: string;
  flag: string;
};

// 这些应该与你的 next-intl 中间件配置的 locales 一致
const localesData: Locale[] = [
  { code: "en", label: "US", flag: "US" },
  { code: "au", label: "Australia", flag: "AU" },
  { code: "ca", label: "Canada", flag: "CA" },
  { code: "uk", label: "UK", flag: "GB" },
  { code: "de", label: "Deutsch", flag: "DE" },
  { code: "fr", label: "Français", flag: "FR" },
  { code: "es", label: "Español", flag: "ES" },
];

// Helper function to find locale object by code
const findLocaleObjectByCode = (
  code: string | undefined
): Locale | undefined => {
  if (!code) return undefined;
  return localesData.find((l) => l.code === code);
};

const defaultLocaleObject =
  findLocaleObjectByCode(DEFAULT_LOCALE_CODE) || localesData[0];

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname(); // Example: /en/about or /about
  const [isPending, startTransition] = useTransition(); // For smoother navigation

  // Initialize selectedLocale based on the current URL path
  const [selectedLocale, setSelectedLocale] = useState<Locale>(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const potentialLocaleCodeFromUrl = pathSegments[0];
    const urlLocaleObject = findLocaleObjectByCode(potentialLocaleCodeFromUrl);

    if (urlLocaleObject) {
      return urlLocaleObject;
    }
    // If no locale in URL, assume it's the default locale (for as-needed prefixing)
    return defaultLocaleObject;
  });

  // Update selectedLocale when the pathname changes (e.g., browser back/forward)
  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const potentialLocaleCodeFromUrl = pathSegments[0];
    const urlLocaleObject = findLocaleObjectByCode(potentialLocaleCodeFromUrl);

    if (urlLocaleObject) {
      setSelectedLocale(urlLocaleObject);
    } else {
      // If the path does not start with a known locale code,
      // it implies it's the default locale (e.g., /about for en)
      setSelectedLocale(defaultLocaleObject);
    }
  }, [pathname]);

  const handleLocaleChange = (newlySelectedLocaleObject: Locale) => {
    const newLocaleCode = newlySelectedLocaleObject.code;
    const segments = pathname.split("/").filter(Boolean);
    const currentPathFirstSegment = segments[0];
    const hasLocalePrefixInCurrentPath = localesData.some(
      (l) => currentPathFirstSegment === l.code
    );
    const basePathSegments = hasLocalePrefixInCurrentPath
      ? segments.slice(1)
      : segments;

    const newPath = `/${newLocaleCode}${
      basePathSegments.length > 0 ? `/${basePathSegments.join("/")}` : ""
    }`;

    if (pathname !== newPath) {
      startTransition(() => {
        router.push(newPath);
      });
    }
  };

  return (
    <div className="w-30">
      <Listbox value={selectedLocale} onChange={handleLocaleChange}>
        <div className="relative">
          <ListboxButton className="relative w-full cursor-pointer text-sm font-medium shadow-sm">
            <div className="flex items-center gap-2">
              {selectedLocale?.flag && ( // Added optional chaining for safety
                <Flag
                  code={selectedLocale.flag}
                  style={{ width: 20, height: 15 }}
                />
              )}
              <span>{selectedLocale?.label || ""}</span>{" "}
              {/* Added optional chaining */}
            </div>
          </ListboxButton>

          <ListboxOptions className="absolute z-50 mt-1 w-auto min-w-full rounded-md bg-white shadow-lg border border-gray-200 text-sm focus:outline-none max-h-70 overflow-auto">
            {localesData.map((localeOption) => (
              <ListboxOption
                key={localeOption.code}
                value={localeOption}
                className={(
                  { active, selected } // headlessUI provides selected based on value comparison
                ) =>
                  `cursor-pointer px-3 py-2 flex items-center gap-2 ${
                    active ? "bg-indigo-50 text-indigo-700" : "text-gray-900"
                  } ${selected ? "font-semibold" : "font-normal"}`
                }
              >
                {({ selected }) => (
                  <>
                    <Flag
                      code={localeOption.flag}
                      style={{ width: 20, height: 15 }}
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
