import Breadcrumb from '@/components/common/Breadcrumb'
import AngleEfficiencyCalculator from '@/components/tools/angle-efficiency/AngleEfficiencyCalculator'
import { FAQSection } from '@/components/tools/angle-efficiency/FAQSection';
import { SEOContentSection } from '@/components/tools/angle-efficiency/SEOContentSection';
import { defaultUrlPrefix, localePrefixMap } from '@/middleware';
import { generateBreadcrumbsFromPath, PathSegment } from '@/utils/breadcrumbs';

import { generateSchema, embedSchema } from '@/utils/schema';
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const currentLocale = await getLocale();

  const pageTitle = "European Angle Efficiency Calculator | EN 12195-1 Standard";
  const pageSlug = "tools/angle-efficiency-calculator";
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
    description: "European angle efficiency calculator for cargo securing. Supports EN 12195-1 (Europe) with indirect and direct lashing mode calculations.",
    openGraph: {
      title: pageTitle,
      description: "European angle efficiency calculator for cargo securing. Supports EN 12195-1 (Europe) with indirect and direct lashing mode calculations.",
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
      description: "European angle efficiency calculator for cargo securing. Supports EN 12195-1 (Europe) with indirect and direct lashing mode calculations.",
    },
  };
}

export default async function Page() {
  const lang = await getLocale()
  const productPath: PathSegment[] = [
    { name: "Tools", slug: "tools" },
    { name: "European Angle Efficiency Calculator", slug: "angle-efficiency-calculator" }
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

  // WebApplication Schema
  const webApplicationSchema = {
    "@type": "WebApplication",
    "name": "European Angle Efficiency Calculator",
    "description": "Professional angle efficiency calculator for European (EN 12195-1) cargo securing standard. Supports indirect and direct lashing modes with real-time geometric efficiency calculations.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "url": process.env.NEXT_PUBLIC_SITE_URL + "/tools/angle-efficiency-calculator",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between indirect and direct lashing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Indirect lashing (friction lashing) uses sin(α) calculation and relies on friction between cargo and vehicle surface. Direct lashing uses cos(α) × cos(β) calculation and directly restrains cargo movement. The choice depends on your cargo securing method and EN 12195-1 requirements."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate geometric efficiency for indirect lashing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For indirect lashing, geometric efficiency = sin(α) × 100%, where α is the vertical angle. At 90° (vertical), you get 100% efficiency. At 45°, you get 70.7% efficiency. At 30°, you get 50% efficiency. Our calculator shows real-time efficiency as you adjust the angle."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate geometric efficiency for direct lashing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For direct lashing, geometric efficiency = cos(α) × cos(β) × 100%, where α is the vertical angle and β is the horizontal angle. Both angles must be optimized for maximum efficiency. Perfect alignment (0° both angles) gives 100% efficiency."
        }
      },
      {
        "@type": "Question",
        "name": "What efficiency levels are considered good for cargo securing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "High efficiency (>85%) is excellent for optimal force transfer. Medium efficiency (50-85%) is acceptable but consider optimization. Low efficiency (<50%) requires stronger straps or angle adjustment. Our calculator provides specific recommendations based on your efficiency level."
        }
      },
      {
        "@type": "Question",
        "name": "How do EN 12195-1 and AS/NZS 4380 standards affect angle calculations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Both European (EN 12195-1) and Australian (AS/NZS 4380) standards use the same geometric efficiency principles. The physics of angle efficiency is universal - only the terminology and units differ. Our calculator applies the correct trigonometric formulas for both standards."
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
        <div className="mx-auto container text-center">
          <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            European Angle Efficiency Calculator
          </h1>
          <p className="mt-3 text-lg text-black/70">
            Professional angle efficiency calculator for European (EN 12195-1) cargo securing standard. 
            Choose between indirect lashing (friction) and direct lashing modes with real-time geometric efficiency calculations.
          </p>
        </div>
        <div className="mt-8">
          <AngleEfficiencyCalculator />
        </div>
      </div>
      <SEOContentSection />
      <FAQSection />
    </div>
  )
}
