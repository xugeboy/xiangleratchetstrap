export const localePrefixMap: { [key: string]: string } = {
  "en-US": "en", // 默认语言
  "en-GB": "uk",
  "en-AU": "au",
  "en-CA": "ca",
  "de-DE": "de",
  "fr-FR": "fr",
  "es-ES": "es",
};

// 默认语言的 IETF 标签 (用于 x-default 和 canonical URL 判断)
export const defaultLocaleKey = "en-US";

// 默认语言在 URL 中使用的前缀 (来自 localePrefixMap)
export const defaultUrlPrefix = localePrefixMap[defaultLocaleKey]; // 'en'

// 所有支持的 URL 前缀 (用于 next-intl 中间件等)
export const supportedUrlPrefixes = Object.values(localePrefixMap);

// 所有支持的 IETF 语言标签 (用于 hreflang)
export const supportedIetfLangTags = Object.keys(localePrefixMap);
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'uk', 'au', 'ca', 'de', 'fr', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)', '/']
};