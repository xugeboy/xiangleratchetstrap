const locales = ['en', 'uk', 'au', 'ca', 'de', 'fr', 'es'];
export function isValidLocale(locale: string): boolean {
    return locales.includes(locale);
}