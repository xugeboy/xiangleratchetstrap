import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en", "uk", "au", "de", "fr", "es"],
    defaultLocale: "en",
    alternateLinks: false
});