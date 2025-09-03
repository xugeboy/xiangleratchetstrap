import Breadcrumb from '@/components/common/Breadcrumb'
import { UnifiedCargoCalculator } from '@/components/tools/cargo-securing/UnifiedCargoCalculator'
import { FAQSection } from '@/components/tools/cargo-securing/FAQSection'
import { SEOContentSection } from '@/components/tools/cargo-securing/SEOContentSection'
import { RegionProvider } from '@/contexts/RegionContext'
import { defaultUrlPrefix, localePrefixMap } from '@/middleware';
import { generateBreadcrumbsFromPath, PathSegment } from '@/utils/breadcrumbs';
import { generateSchema, embedSchema } from '@/utils/schema';
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const currentLocale = await getLocale();

  const pageTitle = "Global Cargo Securing Calculator | DOT, EN 12195-1 Standards Tool";
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
    description: "Global cargo securing calculator supporting North America (DOT) and Europe/Australia (EN 12195-1/AS/NZS 4380) standards. Choose your region for automatic unit selection and calculation standards.",
    openGraph: {
      title: pageTitle,
      description: "Global cargo securing calculator supporting North America (DOT) and Europe/Australia (EN 12195-1/AS/NZS 4380) standards. Choose your region for automatic unit selection and calculation standards.",
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
      description: "Global cargo securing calculator supporting North America (DOT) and Europe/Australia (EN 12195-1/AS/NZS 4380) standards. Choose your region for automatic unit selection and calculation standards.",
    },
  };
}

export default async function Page() {
  const lang = await getLocale()
  const productPath: PathSegment[] = [
    { name: "Tools", slug: "tools" },
    { name: "Global Cargo Securing Calculator", slug: "cargo-securing-calculator" }
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
    "name": "Global Cargo Securing Calculator",
    "description": "Global cargo securing calculator supporting North America (DOT) and Europe/Australia (EN 12195-1/AS/NZS 4380) standards. Choose your region for automatic unit selection and calculation standards.",
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
        "name": "What are the differences between DOT and EN 12195-1/AS/NZS 4380 standards?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "DOT standards (North America) use imperial units (lbs, ft) and WLL-based calculations, while EN 12195-1 (Europe) and AS/NZS 4380 (Australia) use metric units (kg, m) and STF/LC-based calculations. Each standard has different requirements and calculation methods."
        }
      },
      {
        "@type": "Question",
        "name": "Which calculator should I use for my region?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use the North America calculator for US and Canada (DOT standards), and the Europe & Australia calculator for EU countries (EN 12195-1 standard) and Australia (AS/NZS 4380 standard). The page automatically shows the appropriate calculator based on your selection."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between STF and LC in lashing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "STF (Standard Tension Force) is used in indirect lashing and represents the force applied when tensioning the strap. LC (Lashing Capacity) is used in direct lashing and represents the maximum allowed force for the strap. They are different values found on different parts of the strap label."
        }
      },
      {
        "@type": "Question",
        "name": "How many lashing straps are required minimum?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "According to EN 12195-1, a minimum of 2 lashing straps is always required regardless of calculation results. DOT standards also require minimum tie-downs based on cargo length. This ensures redundancy and safety in cargo securing arrangements."
        }
      },
      {
        "@type": "Question",
        "name": "What units are used in each region?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "North America uses imperial units: weight in pounds (lbs), dimensions in feet (ft). Europe and Australia use metric units: weight in kilograms (kg), dimensions in meters (m). The calculator automatically applies the correct units for your selected region."
        }
      }
    ]
  };

  const schemaMetadataJson = embedSchema(
    [websiteSchema, organizationSchema, breadcrumbSchema, webApplicationSchema, faqSchema].filter(Boolean)
  );

  return (
    <RegionProvider>
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
              Global Cargo Securing Calculator
            </h1>
            <p className="mt-3 text-lg text-black/70">
              Professional cargo securing calculator supporting North America (DOT) and Europe/Australia (EN 12195-1/AS/NZS 4380) standards. 
              Choose your region for automatic unit selection and calculation standards.
            </p>
          </div>
          <div className="mt-8">
            <UnifiedCargoCalculator />
          </div>
        </div>
        
        {/* SEO Content Section */}
        <SEOContentSection />
        
        {/* FAQ Section */}
        <FAQSection />
      </div>
    </RegionProvider>
  )
}
