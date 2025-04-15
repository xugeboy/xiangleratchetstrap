import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BackToTop from "@/components/common/BackToTop";
import { fetchAPI } from "@/utils/fetch-api";
import { CategoryProvider } from "@/contexts/CategoryContext";
import { ProductCategory } from "@/types/productCategory";
import ClarityProvider from "@/components/common/ClarityProvider";
import TawkToWidget from "@/components/common/TawkToWidget";
import { Viewport } from "next";
import { generateSchema } from "@/utils/schema";
import { embedSchema } from "@/utils/schema";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// export const metadata: Metadata = {
//   title: "",
//   description:
//     "",
// };
// --- 静态 Metadata 对象 ---

// --- 基本站点信息 (从环境变量获取) ---
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL; // Fallback for local dev
const siteName = process.env.SITE_NAME;
const defaultDescription = "Ratchet, E-Track, and Cargo Tie Down Straps - Xiangle Ratchet Strap"
const siteLogo = process.env.NEXT_PUBLIC_LOGO_URL;

// --- 站点范围的 Schema ---
// 这些通常在所有页面都一样, 可以在根布局生成
const websiteSchema = generateSchema({ type: 'WebSite', data: null });
const organizationSchema = generateSchema({ type: 'Organization', data: null });
const baseSchemaMetadata = embedSchema([websiteSchema, organizationSchema]); // Combine base schemas

export const metadata: Metadata = {
  // **核心元数据**
  metadataBase: new URL(siteUrl), // !! 重要: 设置元数据 URL 基准
  title: {
    default: 'Ratchet, E-Track, and Cargo Tie Down Straps - Xiangle Ratchet Strap', // 默认标题 (用于首页或未指定标题的页面)
    template: `%s | ${siteName}`, // 标题模板 (子页面标题会替换 %s)
  },
  description: defaultDescription, // 默认描述

  // **应用和图标**
  applicationName: siteName,
  appleWebApp: { // iOS PWA 相关设置
    capable: true,
    title: siteName,
    statusBarStyle: 'default',
  },
  icons: { // Favicons 等
    icon: '/favicon.ico', // 指向 public 目录
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  // **Open Graph (社交分享) 默认值**
  openGraph: {
    title: siteName,
    description: defaultDescription,
    url: siteUrl, // 网站基础 URL
    siteName: siteName,
    // 提供一个默认的 OG 图片 (绝对路径)
    images: [
      {
        url: siteLogo, // 指向 public 目录下的默认 OG 图片
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US', // 根据你的主要语言设置
    type: 'website', // 网站类型
  },

  // **Twitter 卡片默认值**
  twitter: {
    card: 'summary_large_image', // 卡片类型
    title: siteName,
    description: defaultDescription,
    // images: [`${siteUrl}/twitter-default.png`], // 可以设置不同的默认 Twitter 图片
    // siteId: '关联的 Twitter 应用 ID (可选)',
  },

  // **其他技术性元数据**
  robots: { // 默认允许爬虫索引和跟随链接
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { // 可以在这里设置首页的 canonical URL
    canonical: '/', // 或 siteUrl
  },
  other: { // 嵌入基础 JSON-LD (WebSite, Organization)
    ...baseSchemaMetadata, // 展开之前生成的 Schema 对象
    // 你也可以在这里添加其他自定义 <meta> 标签
    // 'custom-tag': 'some-value',
  },
};

// --- Viewport 设置 (通常在根布局定义) ---
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};


async function fetchCategories(): Promise<ProductCategory[]> {
  try {
    const res = await fetchAPI("/getAllCategorySlugAndChildren");
    return res.data || null;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await fetchCategories();
  return (
    <html lang="en">
      <head>
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        {/* 使用 Provider 包裹需要共享数据的部分 */}
        <CategoryProvider categories={categories}>
          <div className="flex min-h-screen flex-col">
            {/* Header 现在可以从 Context 获取 categories */}
            <Header />
            <main className="flex-grow">
              <ClarityProvider />
              {children}
              <TawkToWidget />
            </main>
            <Footer />
            <BackToTop />
          </div>
        </CategoryProvider>
      </body>
    </html>
  );
}
