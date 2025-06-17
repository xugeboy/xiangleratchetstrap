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

export function getPreviousFullLocale(cprefix: string, pprefix: string): { locale: string,previousLocale: string } {
  const locale = 
    Object.keys(localePrefixMap).find(
      (key) => localePrefixMap[key] === cprefix
    ) || "en";
  const finalCLocale = locale === "en-US" ? "en" : locale;
  const previousLocale = 
  Object.keys(localePrefixMap).find(
    (key) => localePrefixMap[key] === pprefix
  ) || "en";
const finalPLocale = previousLocale === "en-US" ? "en" : previousLocale;
  return { locale:finalCLocale,previousLocale:finalPLocale };
}

export function getBreadcrumbPathPrefix(currentLang: string): string {
  if (currentLang === defaultUrlPrefixForNoPrefixURLs) {
    return ""; // 默认语言 (en) 的 URL 不加前缀
  }
  return `/${currentLang}`; // 其他语言 URL 加前缀
}

export function getCombainedLocalePath(currentLang: string,path: string): string {
  if (currentLang === defaultUrlPrefixForNoPrefixURLs) {
    return `/${path}`; // 默认语言 (en) 的 URL 不加前缀
  }
  return `/${currentLang}/${path}`; // 其他语言 URL 加前缀
}

export function getCloudinaryPublicId(fullUrl: string): string {
  // 我们以 '/image/upload/' 作为分隔符
  const parts = fullUrl.split('/image/upload');
  
  // 如果成功分割成两部分，我们就取第二部分
  if (parts.length === 2) {
    // 这将返回例如 'v1750143204/catalog_u0aq7n.jpg'
    return parts[1];
  }
  
  // 如果URL格式不符，返回原始URL以防万一
  return fullUrl;
};