export const localePrefixMap: { [key: string]: string } = {
  "en-US": "en", // 默认语言
  "en-GB": "uk",
  "en-AU": "au",
  "en-CA": "ca",
  "de-DE": "de",
  "fr-FR": "fr",
  "es-ES": "es",
};

export const defaultLocaleKey = "en-US";
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'uk', 'au', 'ca', 'de', 'fr', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)', '/']
};