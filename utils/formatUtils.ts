import { localePrefixMap } from "@/middleware";

export default function formatDateToLongEnglish(input: string): string {
  const date = typeof input === "string" ? new Date(input) : input;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getFullLocale(prefix: string): { locale: string } {
  const locale = 
    Object.keys(localePrefixMap).find(
      (key) => localePrefixMap[key] === prefix
    ) || "en"; // 如果没有找到匹配项，默认返回 "en-US"
  const finalLocale = locale === "en-US" ? "en" : locale;
  return { locale:finalLocale };
}