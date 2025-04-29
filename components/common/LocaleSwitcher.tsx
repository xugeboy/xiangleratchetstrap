"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const DEFAULT_LOCALE = "en-US";

const locales = [
  { code: "en", label: "US" },
  { code: "au", label: "Australia" },
  { code: "ca", label: "Canada" },
  { code: "gb", label: "United Kindom" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
];

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  
  const [selectedLocale, setSelectedLocale] = useState<string>('en-US');
  useEffect(() => {
    // 如果 localStorage 有保存过，自动选上
    const storedLocale = localStorage.getItem('preferred-locale');
    if (storedLocale) {
      setSelectedLocale(storedLocale);
    }
  }, []);

  const handleLocaleChange = (locale: string) => {
    setSelectedLocale(locale);
    localStorage.setItem('preferred-locale', locale);

    const segments = pathname.split("/").filter(Boolean);

    // 检查当前路径是否已经包含语言前缀
    const currentLocale = locales.find(l => segments[0] === l.code) ? segments[0] : DEFAULT_LOCALE;

    // 移除已有的语言前缀
    let newSegments = segments;
    if (currentLocale !== DEFAULT_LOCALE) {
      newSegments = segments.slice(1);
    }

    // 组装新的路径
    const newPath =
      locale === DEFAULT_LOCALE
        ? `/${newSegments.join("/")}`
        : `/${locale}/${newSegments.join("/")}`;

    router.push(newPath);
  };

  return (
    <select
      onChange={(e) => handleLocaleChange(e.target.value)}
      value={selectedLocale}
      className="rounded-md border px-2 py-1 text-sm text-amber-700"
    >
      {locales.map((locale) => (
        <option key={locale.code} value={locale.code}>
          {locale.label}
        </option>
      ))}
    </select>
  );
}
