import { MetadataRoute } from "next";
import localePrefixMap from "@/middleware"
// 1. 配置基础信息
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL; // 确保这是你的实际域名

const defaultLocale = "en"; // 你的默认语言

// 辅助函数：根据语言构建本地化 URL
function getLocalizedUrl(path: string, locale: string): string {
  if (locale === defaultLocale) {
    return `${BASE_URL}${path}`; // 默认语言不带前缀
  }
  return `${BASE_URL}/${locale}${path}`;
}

// 2. 模拟数据获取函数 (你需要替换为真实的API调用或数据查询)

// 获取静态路径 (例如 /about, /contact)
async function getStaticPathsForLocale(
  locale: string
): Promise<{ path: string; lastModified: Date }[]> {
  // 示例：这些路径不应包含语言前缀，它们是相对于语言根目录的
  const paths = [
    { path: "/about", lastModified: new Date() },
    { path: "/contact", lastModified: new Date() },
    // ... 其他静态页面
  ];
  // 如果某些静态页面只存在于特定语言，你可以在这里处理
  return paths;
}

// 获取动态路径，例如产品页面
// **关键**: 这个函数需要能够获取一个产品在所有语言中的对应slug或路径
interface ProductData {
  slug: string; // 当前语言的 slug
  lastModified: Date;
  translations: Record<string, string>; // 例如: { en: 'english-slug', fr: 'french-slug', es: 'spanish-slug' }
}

async function getProductDataForLocale(locale: string): Promise<ProductData[]> {
  // --- 这是模拟数据，你需要从你的CMS或数据库获取 ---
  const allProductsData: Record<string, ProductData[]> = {
    en: [
      {
        slug: "cool-gadget",
        lastModified: new Date(),
        translations: {
          en: "cool-gadget",
          fr: "gadget-cool",
          es: "dispositivo-genial",
        },
      },
      {
        slug: "awesome-stuff",
        lastModified: new Date(),
        translations: {
          en: "awesome-stuff",
          fr: "trucs-geniaux",
          es: "cosas-asombrosas",
        },
      },
    ],
    fr: [
      {
        slug: "gadget-cool",
        lastModified: new Date(),
        translations: {
          en: "cool-gadget",
          fr: "gadget-cool",
          es: "dispositivo-genial",
        },
      },
      {
        slug: "trucs-geniaux",
        lastModified: new Date(),
        translations: {
          en: "awesome-stuff",
          fr: "trucs-geniaux",
          es: "cosas-asombrosas",
        },
      },
    ],
    es: [
      {
        slug: "dispositivo-genial",
        lastModified: new Date(),
        translations: {
          en: "cool-gadget",
          fr: "gadget-cool",
          es: "dispositivo-genial",
        },
      },
      {
        slug: "cosas-asombrosas",
        lastModified: new Date(),
        translations: {
          en: "awesome-stuff",
          fr: "trucs-geniaux",
          es: "cosas-asombrosas",
        },
      },
    ],
  };
  return allProductsData[locale] || [];
  // --- 模拟数据结束 ---
}

// 3. `generateSitemaps` 函数
// Next.js 会为这个函数返回的每个对象的 id 调用下面的默认 sitemap 函数
export async function generateSitemaps() {
  return locales.map((locale) => ({
    id: locale, // id 将作为参数传递给 sitemap 函数，代表当前的语言
  }));
}

// 4. 默认 `sitemap` 函数
// 这个函数会为 generateSitemaps 返回的每个 id (即每个语言) 执行一次
export default async function sitemap({
  id: currentLocale,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 添加根路径 ("/")
  sitemapEntries.push({
    url: getLocalizedUrl("/", currentLocale),
    lastModified: new Date(), // 或更具体的日期
    alternates: {
      languages: Object.fromEntries(
        locales.map((lang) => [lang, getLocalizedUrl("/", lang)])
      ) as { [key: string]: string } & { "x-default"?: string }, // 类型断言确保兼容性
    },
  });

  // 添加静态页面
  const staticPaths = await getStaticPathsForLocale(currentLocale);
  staticPaths.forEach((page) => {
    sitemapEntries.push({
      url: getLocalizedUrl(page.path, currentLocale),
      lastModified: page.lastModified,
      alternates: {
        languages: Object.fromEntries(
          locales.map((lang) => [lang, getLocalizedUrl(page.path, lang)])
        ) as { [key: string]: string } & { "x-default"?: string },
      },
    });
  });

  // 添加动态页面 (例如产品)
  const products = await getProductDataForLocale(currentLocale);
  products.forEach((product) => {
    const productPathInCurrentLocale = `/products/${product.slug}`; // 产品在当前语言的相对路径

    // 构建 alternates 对象
    const alternateLanguages: { [key: string]: string } & {
      "x-default"?: string;
    } = {};
    locales.forEach((altLocale) => {
      const translatedSlug = product.translations[altLocale];
      if (translatedSlug) {
        // 确保翻译存在
        alternateLanguages[altLocale] = getLocalizedUrl(
          `/products/${translatedSlug}`,
          altLocale
        );
      } else {
        console.warn(
          `Sitemap: Missing translation for product slug '${product.slug}' in locale '${altLocale}'`
        );
      }
    });
    // 可选: 添加 x-default 指向默认语言版本
    const defaultSlug = product.translations[defaultLocale];
    if (defaultSlug) {
      alternateLanguages["x-default"] = getLocalizedUrl(
        `/products/${defaultSlug}`,
        defaultLocale
      );
    }

    sitemapEntries.push({
      url: getLocalizedUrl(productPathInCurrentLocale, currentLocale),
      lastModified: product.lastModified,
      alternates: {
        languages: alternateLanguages,
      },
    });
  });

  // 你可以按类似方式添加其他类型的动态页面 (博客文章、分类等)

  return sitemapEntries;
}
