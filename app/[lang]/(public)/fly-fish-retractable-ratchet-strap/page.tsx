import { defaultUrlPrefix, localePrefixMap } from "@/middleware";
import { generateGeneralBreadcrumbs } from "@/utils/breadcrumbs";
import { embedSchema, generateSchema } from "@/utils/schema";
import { getLocale } from "next-intl/server";
import { Metadata } from "next";
import SmoothScroll from "@/components/gsap/SmoothScroll";
import SplitCardScroll, { type CardContent } from "@/components/gsap/SplitCardScroll";
import RevealText from "@/components/gsap/RevealText";
import MagneticButton from "@/components/gsap/MagneticButton";
import HeroSection from "@/components/gsap/HeroSection";
import TextHighlight from "@/components/gsap/TextHighlight";

export async function generateMetadata(
): Promise<Metadata> {
  const currentLocale = await getLocale();

  const pageTitle =
    "Fly Fish Retractable Ratchet Strap | Patent Pending | China Direct Manufacturer";
  const pageSlug = "fly-fish-retractable-ratchet-strap";
  const ogImageUrl = process.env.NEXT_PUBLIC_LOGO_URL;
  const ogImageAlt = pageTitle;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  let canonicalUrlPath;
  if (currentLocale === defaultUrlPrefix || currentLocale === undefined) {
    canonicalUrlPath = `/${pageSlug}`;
  } else {
    canonicalUrlPath = `/${currentLocale}/${pageSlug}`;
  }
  const canonicalUrl = `${siteUrl}${canonicalUrlPath}`;

  const languagesAlternate: Record<string, string> = {};

  for (const ietfTag in localePrefixMap) {
    const targetUrlPrefix = localePrefixMap[ietfTag];
    let pathForLang = "";
    if (targetUrlPrefix === defaultUrlPrefix) {
      pathForLang = `${siteUrl}/${pageSlug}`;
    } else {
      pathForLang = `${siteUrl}/${targetUrlPrefix}/${pageSlug}`;
    }
    languagesAlternate[ietfTag] = pathForLang;
  }

  return {
    title: pageTitle,
    alternates: {
      canonical: canonicalUrl,
      languages:
        Object.keys(languagesAlternate).length > 0
          ? languagesAlternate
          : undefined,
    },
    openGraph: {
      title: pageTitle,
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      title: pageTitle,
    },
  };
}

export default async function FlyFishRetractableRatchetStrap() {
  const locale = await getLocale();
  const breadcrumbItems = generateGeneralBreadcrumbs(
    "FlyFishRetractableRatchetStrap",
    "fly-fish-retractable-ratchet-strap",
    locale
  );
  const websiteSchema = generateSchema({
    type: "WebSite",
    lang: locale,
  });
  const organizationSchema = generateSchema({
    type: "Organization",
    lang: locale,
  });
  const breadcrumbSchema = generateSchema({
    type: "BreadcrumbList",
    breadcrumbItems,
  });
  const schemaMetadataJson = embedSchema(
    [websiteSchema, organizationSchema, breadcrumbSchema].filter(Boolean)
  );

// 示例数据
const CARDS_DATA: [CardContent, CardContent, CardContent] = [
    {
      id: "1",
      backText: "Interactive Web Experiences",
      backNumber: "( 01 )",
      color: "#b2b2b2",
      textColor: "text-black",
    },
    {
      id: "2",
      backText: "Thoughtful Design Language",
      backNumber: "( 02 )",
      color: "#ce2017",
      textColor: "text-white",
    },
    {
      id: "3",
      backText: "Visual Design Systems",
      backNumber: "( 03 )",
      color: "#2f2f2f",
      textColor: "text-white",
    },
  ] as const;
  
const MASTER_IMG = "https://framerusercontent.com/images/Wne6ywIpp0BwY8GoBBoZlZEoC9g.png";

  return (
    <div>
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
        />
      </section>

      <SmoothScroll>
      <main className="min-h-screen text-white font-serif">
        
        {/* 1. 开场动画与首屏 */}
        <HeroSection />

        <div className="relative z-10 bg-[#0f0f0f]">
        {/* 2. 公司介绍 (使用 RevealText) */}
        <section className="min-h-[80vh] flex items-center justify-center px-6 md:px-20 py-32 bg-[#0f0f0f]">
          <div className="max-w-5xl mx-auto text-center">
            {/* 使用 TextHighlight 组件，大字号 */}
            <TextHighlight 
              text="We craft durable cargo control solutions that keep up with your logistics ambition. So you can focus on transporting what matters, while we ensure it arrives safely."
              className="text-4xl md:text-6xl lg:text-7xl font-medium text-gray-500 justify-center"
            />
          </div>
        </section>
        
        {/* 3. 核心产品展示 (Split Card 动效) */}
        <SplitCardScroll
          headerText="Our Core Product Lines"
          masterImageSrc= {MASTER_IMG}
          // @ts-ignore
          cards={CARDS_DATA}
        />

        {/* 4. 页脚 CTA */}
        <section className="h-[50vh] flex flex-col items-center justify-center text-center bg-[#ce2017] text-white">
           <RevealText 
              tag="h2" 
              text="Ready to Secure Your Cargo?" 
              className="text-4xl md:text-6xl font-medium mb-8"
           />
           <MagneticButton className="bg-white text-[#ce2017] border-transparent hover:bg-black hover:text-white">
              Get a Quote
           </MagneticButton>
        </section>
        </div>

      </main>
    </SmoothScroll>
    </div>
  );
}
