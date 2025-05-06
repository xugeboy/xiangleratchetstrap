import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en", "uk", "au", "ca", "de", "fr", "es"],
    defaultLocale: "en",
});