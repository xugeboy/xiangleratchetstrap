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

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ratchet, E-Track, and Cargo Tie Down Straps - Xiangle Ratchet Strap",
  description:
    "Xiangle Ratchet Strap has Ratchet Straps, Flatbed & Van Trailer Products, Moving Supplies, Towing and Auto Hauling, Tie Downs",
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
