import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/[lang]/globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BackToTop from "@/components/common/BackToTop";
import { fetchAPI } from "@/utils/fetch-api";
import { CategoryProvider } from "@/contexts/CategoryContext";
import TawkToWidget from "@/components/common/TawkToWidget";
import { Viewport } from "next";
import { localePrefixMap, defaultLocaleKey } from "@/middleware";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getFullLocale } from "@/utils/formatUtils";
import { setRequestLocale } from "next-intl/server";
import Analytics from "@/components/common/Analytics";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

interface LocaleLayoutProps {
  params: {
    lang: string;
  };
  children: React.ReactNode;
}
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteName = process.env.NEXT_PUBLIC_ORGANIZATION_NAME;
const defaultDescription =
  "Leading manufacturer for custom ratchet straps, cam buckle straps and powersport tie down straps. Quality guaranteed from our production facility - Xiangle Ratchet Strap";
const siteLogo = process.env.NEXT_PUBLIC_LOGO_URL;

const currentPath =
  typeof window !== "undefined" ? window.location.pathname : "";

const alternates: Record<string, string> = {};

Object.keys(localePrefixMap).forEach((localeKey) => {
  const prefix = localePrefixMap[localeKey]; // 获取该语言对应的 URL 前缀

  let url;
  if (localeKey === defaultLocaleKey || localeKey === undefined) {
    url = `${siteUrl}${currentPath === "/" ? "" : currentPath}`;
  } else {
    // 非默认语言，URL 带上对应的语言前缀
    url = `${siteUrl}/${prefix}${currentPath === "/" ? "" : currentPath}`;
  }

  // 使用标准的语言 key 作为 alternates 对象的键
  alternates[localeKey] = url;
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Xiangle Ratchet Strap",
    template: `%s`,
  },
  description: defaultDescription,

  applicationName: siteName,
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "default",
  },
  icons: {
    icon: "https://res.cloudinary.com/duimeqqch/image/upload/v1749543828/favicon_kdh2ff.ico",
    shortcut:
      "https://res.cloudinary.com/duimeqqch/image/upload/v1749543828/favicon_kdh2ff.ico",
    apple:
      "https://res.cloudinary.com/duimeqqch/image/upload/v1749543828/favicon_kdh2ff.ico",
  },

  openGraph: {
    title: siteName,
    description: defaultDescription,
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: siteLogo,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // **Twitter 卡片默认值**
  twitter: {
    card: "summary_large_image", // 卡片类型
    title: siteName,
    description: defaultDescription,
  },

  // **其他技术性元数据**
  robots: {
    // 默认允许爬虫索引和跟随链接
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: alternates,
  },
  other: {
    "google-site-verification": "6skGRSGQlvwgvTJDE_HF2ao3SoHhdtFeUe2-wMKpLeg",
    ["og:type"]: "website"
  },
};

// --- Viewport 设置 (通常在根布局定义) ---
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  params,
  children,
}: LocaleLayoutProps) {
  const lang = params.lang;
  const locale = getFullLocale(lang);
  const res = await fetchAPI("/getAllCategories", locale);
  const categories = res.data;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }
  let messages;
  try {
    messages = (await import(`../../messages/${lang}.json`)).default;
  } catch (error) {
    console.error(`Could not load messages for locale: ${locale}`, error);
    notFound();
  }
  setRequestLocale(lang);
  return (
    <html lang={locale.locale}>
      <head>
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="/sitemap.xml"
        />
        <script
          id="usercentrics-cmp"
          src="https://web.cmp.usercentrics.eu/ui/loader.js"
          data-settings-id="8gW917p7RryyNW"
          async
        ></script>
      </head>
      <body className={`${poppins.className} antialiased`}>
        <CategoryProvider categories={categories}>
          <div className="flex min-h-screen flex-col">
            <NextIntlClientProvider locale={lang} messages={messages}>
              <Header />
              <main className="flex-grow">
                {children}
                <TawkToWidget />
              </main>
              <Footer />
            </NextIntlClientProvider>
            <BackToTop />
          </div>
        </CategoryProvider>

        <Analytics />
      </body>
    </html>
  );
}
