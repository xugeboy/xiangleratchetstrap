import Breadcrumb from '@/components/common/Breadcrumb'
import CargoSecuringCalculator from '@/components/tools/cargo-securing/CargoSecuringCalculator'
import { FAQSection } from '@/components/tools/cargo-securing/FAQSection'
import { SEOContentSection } from '@/components/tools/cargo-securing/SEOContentSection'
import { defaultUrlPrefix, localePrefixMap } from '@/middleware';
import { generateBreadcrumbsFromPath, PathSegment } from '@/utils/breadcrumbs';
import { generateSchema, embedSchema } from '@/utils/schema';
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const currentLocale = await getLocale();

  const pageTitle = "Global Cargo Securement Calculator | International Tie-Down Standards Tool";
  const pageSlug = "tools/cargo-securing-calculator";
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
    description: "输入货物信息，立即计算所需捆绑带数量与AWLL值，支持美国DOT、澳洲AS/NS 4380、欧洲EN12195-2等国际标准。",
    openGraph: {
      title: pageTitle,
      description: "输入货物信息，立即计算所需捆绑带数量与AWLL值，支持美国DOT、澳洲AS/NS 4380、欧洲EN12195-2等国际标准。",
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
      description: "输入货物信息，立即计算所需捆绑带数量与AWLL值，支持美国DOT、澳洲AS/NS 4380、欧洲EN12195-2等国际标准。",
    },
  };
}

export default async function Page() {
  const lang = await getLocale()
  const productPath: PathSegment[] = [
    { name: "Tools", slug: "tools" },
    { name: "Cargo Securing Calculator", slug: "cargo-securing-calculator" }
  ];

  const breadcrumbItems = generateBreadcrumbsFromPath(
    productPath,
    lang
  );
  const websiteSchema = generateSchema({
    type: "WebSite",
    lang: lang,
  });
  const organizationSchema = generateSchema({
    type: "Organization",
    lang: lang,
  });
  const breadcrumbSchema = generateSchema({
    type: "BreadcrumbList",
    breadcrumbItems,
  });
  
  // WebApplication Schema for the calculator
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Global Cargo Securement Calculator",
    "description": "Professional international tie-down standards tool supporting DOT (US), AS/NS 4380 (Australia), EN12195-2 (Europe) and more",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "url": process.env.NEXT_PUBLIC_SITE_URL + "/tools/cargo-securing-calculator",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many tie down straps do I need for 20 feet cargo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "According to DOT regulations, cargo over 20 feet (6.1 meters) requires at least 3 tie-downs. Our calculator determines the exact number based on your specific cargo weight and dimensions."
        }
      },
      {
        "@type": "Question",
        "name": "What is AWLL in cargo securement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AWLL (Aggregate Working Load Limit) is the total working load limit of all tie-downs used to secure cargo. It must be at least 50% of the cargo weight for indirect tie-downs and 100% for direct tie-downs."
        }
      },
      {
        "@type": "Question",
        "name": "What are international cargo securement standards?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "International cargo securement standards include: DOT (US), AS/NS 4380 (Australia), EN12195-2 (Europe), and others. Each standard has specific requirements for minimum tie-downs, AWLL calculations, and safety factors. Our calculator provides guidance based on these international standards."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate tie down requirements?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use our calculator by entering cargo weight, dimensions, securing method (direct/indirect), and tie-down angle. The tool automatically calculates required AWLL and recommends appropriate tie-down configurations."
        }
      }
    ]
  };

  const schemaMetadataJson = embedSchema(
    [websiteSchema, organizationSchema, breadcrumbSchema, webApplicationSchema, faqSchema].filter(Boolean)
  );

  return (
    <div>
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
        />
      </section>
      <div className="mx-auto container px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems.slice(1)} lang={lang} />
        <div className="mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Global Cargo Securement Calculator
          </h1>
          <p className="mt-3 text-lg text-black/70">
            Professional international tie-down standards tool supporting DOT (US), AS/NS 4380 (Australia), EN12195-2 (Europe) and more. Calculate required AWLL and tie-down strap capacity based on cargo weight, securing method, and angle.
          </p>
        </div>
        <div className="mt-8">
          <CargoSecuringCalculator />
        </div>
      </div>
      
      {/* SEO Content Section */}
      <SEOContentSection />
      
      {/* FAQ Section */}
      <FAQSection />
    </div>
  )
}
