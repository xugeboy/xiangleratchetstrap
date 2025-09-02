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

  const pageTitle = "Regional Angle Efficiency Calculator | WLL/LC Calculator Tool";
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
    description: "Select regional standards, auto-set units, calculate angle impact on WLL/LC. Supports DOT (US), AS/NZS 4380 (Australia), EN12195-2 (Europe) standards with physics-based angle efficiency calculations.",
    openGraph: {
      title: pageTitle,
      description: "Select regional standards, auto-set units, calculate angle impact on WLL/LC. Supports DOT (US), AS/NZS 4380 (Australia), EN12195-2 (Europe) standards with physics-based angle efficiency calculations.",
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
      description: "Select regional standards, auto-set units, calculate angle impact on WLL/LC. Supports DOT (US), AS/NZS 4380 (Australia), EN12195-2 (Europe) standards with physics-based angle efficiency calculations.",
    },
  };
}

export default async function Page() {
  const lang = await getLocale()
  const productPath: PathSegment[] = [
    { name: "Tools", slug: "tools" },
    { name: "Angle Efficiency Calculator", slug: "angle-efficiency-calculator" }
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
    "name": "Regional Angle Efficiency Calculator",
    "description": "Professional angle efficiency calculator with automatic unit selection supporting DOT (US), AS/NZS 4380 (Australia), EN12195-2 (Europe) standards. Displays WLL for North America and LC for Australia/Europe.",
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
        "name": "How does tie-down angle affect strap efficiency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tie-down angle significantly affects strap efficiency through the sine function. At 90° (vertical), you get 100% efficiency. At 30°, you only get 50% efficiency. The efficiency follows the formula: Efficiency = sin(angle) × 100%. Our calculator shows the exact efficiency for any angle."
        }
      },
      {
        "@type": "Question",
        "name": "What is WLL/LC in tie-down straps?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WLL (Working Load Limit) in North America or LC (Load Capacity) in Australia/Europe is the maximum safe working load that a strap can handle. This rating is printed on the strap and represents the load capacity under ideal conditions (90° angle). At other angles, the effective capacity is reduced."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate the required strap capacity for a specific angle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use our calculator by selecting your region, entering the nominal WLL/LC of your strap, and adjusting the angle. The tool automatically calculates the effective capacity and shows the percentage loss. For example, if you need 2000 lbs capacity at 30°, you'll need straps rated for at least 4000 lbs nominal capacity."
        }
      },
      {
        "@type": "Question",
        "name": "What angle should I avoid for tie-downs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Avoid angles below 30° as they provide less than 50% efficiency. Angles below 15° are particularly dangerous, providing less than 26% efficiency. For optimal safety and efficiency, aim for angles of 60° or greater, which provide 86% or better efficiency."
        }
      },
      {
        "@type": "Question",
        "name": "How does the region selection affect the calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The region selection automatically sets the appropriate units (lbs for North America, kg for Australia/Europe) and displays the correct terminology (WLL for North America, LC for Australia/Europe). The angle efficiency calculations remain the same across all regions as they follow universal physics principles."
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
            Regional Angle Efficiency Calculator
          </h1>
          <p className="mt-3 text-lg text-black/70">
            Select your region for automatic unit selection and calculation standards. Supports DOT (US), AS/NZS 4380 (Australia), EN12195-2 (Europe) with universal physics principles. Displays WLL for North America and LC for Australia/Europe.
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
