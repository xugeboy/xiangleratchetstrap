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

  const pageTitle = "Regional Cargo Securement Calculator | DOT, AS/NZS 4380, EN12195-2 Standards Tool";
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
    description: "选择地区标准，自动设置单位，计算所需捆绑带数量与WLL/LC值。支持北美DOT、澳洲AS/NZS 4380、欧洲EN12195-2标准，自动应用相应计算系数。",
    openGraph: {
      title: pageTitle,
      description: "选择地区标准，自动设置单位，计算所需捆绑带数量与WLL/LC值。支持北美DOT、澳洲AS/NZS 4380、欧洲EN12195-2标准，自动应用相应计算系数。",
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
      description: "选择地区标准，自动设置单位，计算所需捆绑带数量与WLL/LC值。支持北美DOT、澳洲AS/NZS 4380、欧洲EN12195-2标准，自动应用相应计算系数。",
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
    "name": "Regional Cargo Securement Calculator",
    "description": "Professional regional tie-down standards tool with automatic unit selection supporting DOT (US), AS/NZS 4380 (Australia), EN12195-2 (Europe) standards. Displays WLL for North America and LC for Australia/Europe.",
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
          "text": "Requirements vary by region: DOT (US) requires 3+ tie-downs for cargo over 20 feet (6.1m), AS/NZS 4380 (Australia) requires 3+ for cargo over 6.0m, and EN12195-2 (Europe) requires 3+ for cargo over 6.0m. Our calculator automatically applies the correct standard."
        }
      },
      {
        "@type": "Question",
        "name": "What is WLL/LC in cargo securement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WLL (Working Load Limit) in North America or LC (Load Capacity) in Australia/Europe is the total working load limit of all tie-downs used to secure cargo. Requirements vary by region: DOT requires 50% for indirect tie-downs, AS/NZS 4380 requires 60%, and EN12195-2 requires 50%. Direct tie-downs require 100% across all standards."
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
          "text": "Use our calculator by selecting your region, entering cargo weight, dimensions, securing method (direct/indirect), and tie-down angle. The tool automatically sets units and applies region-specific standards to calculate required WLL/LC and recommend appropriate tie-down configurations."
        }
      },
      {
        "@type": "Question",
        "name": "How does region selection affect calculations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Region selection automatically sets units (lbs/ft for North America, kg/m for Australia/Europe) and applies correct calculation standards. DOT uses 50% indirect factor and 20% safety margin, AS/NZS 4380 uses 60% indirect factor and 25% safety margin, while EN12195-2 uses 50% indirect factor and 30% safety margin."
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
            Regional Cargo Securement Calculator
          </h1>
          <p className="mt-3 text-lg text-black/70">
            Select your region for automatic unit selection and calculation standards. Supports DOT (US), AS/NZS 4380 (Australia), EN12195-2 (Europe) with region-specific factors and safety margins. Displays WLL for North America and LC for Australia/Europe.
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
