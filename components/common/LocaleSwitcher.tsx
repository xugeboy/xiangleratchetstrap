"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Flag from "react-world-flags"; // 确保此导入路径和库使用正确

const DEFAULT_LOCALE = "en";

type Locale = {
  code: string;
  label: string;
  flag: string;
};

const localesData: Locale[] = [
  { code: "en", label: "US", flag: "US" },
  { code: "au", label: "Australia", flag: "AU" },
  { code: "ca", label: "Canada", flag: "CA" },
  { code: "uk", label: "UK", flag: "GB" },
  { code: "de", label: "Deutsch", flag: "DE" },
  { code: "fr", label: "Français", flag: "FR" },
  { code: "es", label: "Español", flag: "ES" },
];

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // 初始化 selectedLocale 状态，确保它是一个 Locale 对象
  const [selectedLocale, setSelectedLocale] = useState<Locale>(() => {
    return localesData.find((l) => l.code === DEFAULT_LOCALE) || localesData[0]; // 提供回退，确保不为 undefined
  });

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const potentialLocaleCodeFromUrl = pathSegments[0];

    let localeToSet: Locale | undefined = undefined;

    // 1. 尝试从 URL 中获取 locale
    const urlLocaleObject = localesData.find(
      (l) => l.code === potentialLocaleCodeFromUrl
    );

    if (urlLocaleObject) {
      localeToSet = urlLocaleObject;
      localStorage.setItem("preferred-locale", urlLocaleObject.code);
    } else {
      // 2. 如果 URL 中没有有效 locale，尝试从 localStorage 获取
      const storedLocaleCode = localStorage.getItem("preferred-locale");
      const storedLocaleObject = localesData.find(
        (l) => l.code === storedLocaleCode
      );
      if (storedLocaleObject) {
        localeToSet = storedLocaleObject;
        // 注意：此 useEffect 不会自动重定向 URL 以匹配存储的偏好。
        // 如果需要这种行为 (例如，从 /about 变为 /fr/about)，则需要在此处添加 router.push() 逻辑。
      }
    }

    // 3. 设置最终的 locale 对象，如果都未找到则使用默认值
    if (localeToSet) {
      setSelectedLocale(localeToSet);
    } else {
      const defaultLocaleObject =
        localesData.find((l) => l.code === DEFAULT_LOCALE) || localesData[0];
      setSelectedLocale(defaultLocaleObject);
      // 如果 storedLocaleCode 存在但无效，可以考虑清除它
      // if (localStorage.getItem("preferred-locale") && !localesData.some(l => l.code === localStorage.getItem("preferred-locale"))) {
      //    localStorage.removeItem("preferred-locale");
      // }
    }
  }, [pathname]); // 依赖 pathname；localesData 和 DEFAULT_LOCALE 是模块级常量，通常不需要加入依赖

  const handleLocaleChange = (newlySelectedLocaleObject: Locale) => {
    setSelectedLocale(newlySelectedLocaleObject); // 设置为完整的对象
    localStorage.setItem("preferred-locale", newlySelectedLocaleObject.code);
    document.cookie = `preferred-locale=${newlySelectedLocaleObject.code}; path=/; max-age=31536000; SameSite=Lax`; // 添加 SameSite

    const newLocaleCode = newlySelectedLocaleObject.code;
    const segments = pathname.split("/").filter(Boolean);

    // 检查当前路径的第一个段是否是已知的 locale code
    const currentPathFirstSegment = segments[0];
    const hasLocalePrefix = localesData.some(
      (l) => currentPathFirstSegment === l.code
    );

    const basePathSegments = hasLocalePrefix ? segments.slice(1) : segments;

    let newPath;
    if (newLocaleCode === DEFAULT_LOCALE) {
      // 对于默认语言，路径不应包含语言前缀
      newPath =
        basePathSegments.length > 0 ? `/${basePathSegments.join("/")}` : "/";
    } else {
      // 对于非默认语言，始终添加语言前缀
      newPath = `/${newLocaleCode}${
        basePathSegments.length > 0 ? `/${basePathSegments.join("/")}` : ""
      }`;
    }

    // 仅当路径实际更改时才推送，以避免不必要的导航
    if (pathname !== newPath) {
      router.push(newPath);
    }
  };

  return (
    <div className="w-30">
      {/* 确保 selectedLocale 在传递给 Listbox 前是一个有效的对象 */}
      {/* selectedLocale 应该始终由 useState 和 useEffect 保证为有效 Locale 对象 */}
      <Listbox value={selectedLocale} onChange={handleLocaleChange}>
        <div className="relative">
          <ListboxButton className="relative w-full cursor-pointer
          text-sm font-medium shadow-sm">
            <div className="flex items-center gap-2">
              {selectedLocale && selectedLocale.flag && (
                <Flag
                  code={selectedLocale.flag}
                  style={{ width: 20, height: 15 }}
                />
              )}
              <span>{selectedLocale ? selectedLocale.label : ""}</span>
            </div>
          </ListboxButton>

          <ListboxOptions className="absolute z-50 w-full rounded-md 
          bg-white shadow-lg border border-gray-200 text-sm 
          focus:outline-none max-h-70 overflow-auto">
            {localesData.map((localeOption) => (
              <ListboxOption
                key={localeOption.code}
                value={localeOption} // 传递完整的 locale 对象
                className={(
                  { active, selected } // selected 由 Listbox 根据 value 比较提供
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
