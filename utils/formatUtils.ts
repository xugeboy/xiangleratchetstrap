import { localePrefixMap } from "@/middleware";

export default function formatDateToLongEnglish(input: string): string {
  const date = typeof input === "string" ? new Date(input) : input;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const defaultUrlPrefixForNoPrefixURLs = "en"
export function getFullLocale(prefix: string): { locale: string } {
  const locale = 
    Object.keys(localePrefixMap).find(
      (key) => localePrefixMap[key] === prefix
    ) || "en"; // 如果没有找到匹配项，默认返回 "en-US"
  const finalLocale = locale === "en-US" ? "en" : locale;
  return { locale:finalLocale };
}

export function getBreadcrumbPathPrefix(currentLang: string): string {
  if (currentLang === defaultUrlPrefixForNoPrefixURLs) {
    return ""; // 默认语言 (en) 的 URL 不加前缀
  }
  return `/${currentLang}`; // 其他语言 URL 加前缀
}