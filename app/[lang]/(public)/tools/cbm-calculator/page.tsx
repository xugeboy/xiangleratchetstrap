import Breadcrumb from '@/components/common/Breadcrumb'
import CbmCalculator from '@/components/tools/cbm/CbmCalculator'
import VolumetricWeightCalculator from '@/components/tools/cbm/VolumetricWeightCalculator'
import MultipleProductsCbmCalculator from '@/components/tools/cbm/MultipleProductsCbmCalculator'
import CubicFeetCalculator from '@/components/tools/cbm/CubicFeetCalculator'
import SingleContainerCalculator from '@/components/tools/cbm/SingleContainerCalculator'
import MultipleContainerCalculator from '@/components/tools/cbm/MultipleContainerCalculator'
import CalculatorTabs from '@/components/tools/cbm/CalculatorTabs'
import { defaultUrlPrefix, localePrefixMap } from '@/middleware';
import { generateBreadcrumbsFromPath, PathSegment } from '@/utils/breadcrumbs';
import { getCombainedLocalePath } from '@/utils/formatUtils'
import { generateSchema, embedSchema } from '@/utils/schema';
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const currentLocale = await getLocale();

  const pageTitle = "CBM Calculator Suite - Xiangle Ratchet Strap";
  const pageSlug = "tools/cbm-calculator";
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

export default async function Page() {
  const lang = await getLocale()
  const productPath: PathSegment[] = [
    { name: "Tools", slug: "tools" },
    { name: "CBM Calculator Suite", slug: "cbm-calculator" }
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
  const schemaMetadataJson = embedSchema(
    [websiteSchema, organizationSchema, breadcrumbSchema].filter(Boolean)
  );

  const items = [
    { name: 'Tools', href: getCombainedLocalePath(lang, '/tools') },
    { name: 'CBM Calculator Suite', href: getCombainedLocalePath(lang, '/tools/cbm-calculator') },
  ]

  const calculators = [
    {
      id: "cbm-calculator",
      title: "CBM Calculator",
      description: "CBM Calculator for Single Product Dimensions",
      icon: "📦",
      color: "from-blue-500 to-cyan-500",
      features: [
        "Calculate cubic meters for single products",
        "Support for multiple units (mm, cm, meter)",
        "Weight and volume calculations",
        "Container fit analysis"
      ]
    },
    {
      id: "volumetric-weight",
      title: "Volumetric Weight Calculator",
      description: "Find the Chargeable Weight for your package",
      icon: "⚖️",
      color: "from-green-500 to-emerald-500",
      features: [
        "Calculate volumetric weight for shipping",
        "Sea and air freight calculations",
        "Compare actual vs volumetric weight",
        "Freight cost optimization"
      ]
    },
    {
      id: "cubic-meter-multiple",
      title: "Cubic Meter Calculator",
      description: "Cubic Meter Calculator for Multiple Products",
      icon: "📊",
      color: "from-purple-500 to-pink-500",
      features: [
        "Handle multiple products simultaneously",
        "Batch volume calculations",
        "Total container volume analysis",
        "Efficient cargo planning"
      ]
    },
    {
      id: "cubic-feet-multiple",
      title: "Cubic Feet Calculator",
      description: "Cubic Feet Calculator for Multiple Products",
      icon: "📏",
      color: "from-orange-500 to-red-500",
      features: [
        "Calculate volumes in cubic feet",
        "Multiple product support",
        "Imperial unit calculations",
        "US shipping standards compliance"
      ]
    },
    {
      id: "single-container",
      title: "Single Shipping Container",
      description: "Calculate number of products that can fit in a single shipping container",
      icon: "🚢",
      color: "from-indigo-500 to-blue-500",
      features: [
        "20ft, 40ft, and 40ft HC container support",
        "Occupied weight and volume percentage",
        "Product stacking optimization",
        "Container utilization analysis"
      ]
    },
    {
      id: "multiple-container",
      title: "Multiple Shipping Container",
      description: "Find the best fit container for mixed cargo shipments",
      icon: "🚛",
      color: "from-teal-500 to-green-500",
      features: [
        "Mixed cargo optimization",
        "Best container selection",
        "Cost-effective shipping solutions",
        "Advanced load planning"
      ]
    }
  ];

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
            CBM Calculator Suite
          </h1>
          <p className="mt-3 text-lg text-black/70">
            Professional tools for calculating cargo volume, weight, and container optimization for efficient logistics planning.
          </p>
        </div>

        {/* Calculator Tabs */}
        <div className="mt-12">
          <CalculatorTabs calculators={calculators}>
            {/* CBM Calculator */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">CBM Calculator</h2>
                <p className="text-gray-600">Calculate cargo volume, pallet stacking plans, and container fit estimates for efficient logistics planning.</p>
              </div>
              <CbmCalculator />
            </div>

            {/* Volumetric Weight Calculator */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Volumetric Weight Calculator</h2>
                <p className="text-gray-600">Calculate the chargeable weight for your packages based on volume and actual weight.</p>
              </div>
              <VolumetricWeightCalculator />
            </div>

            {/* Cubic Meter Calculator for Multiple Products */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Cubic Meter Calculator for Multiple Products</h2>
                <p className="text-gray-600">Calculate total volume for multiple products and optimize container loading.</p>
              </div>
              <MultipleProductsCbmCalculator />
            </div>

            {/* Cubic Feet Calculator for Multiple Products */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Cubic Feet Calculator for Multiple Products</h2>
                <p className="text-gray-600">Calculate total volume in cubic feet for multiple products with imperial units.</p>
              </div>
              <CubicFeetCalculator />
            </div>

            {/* Single Shipping Container */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Single Shipping Container Calculator</h2>
                <p className="text-gray-600">Calculate how many products can fit in a single shipping container with occupied weight and volume analysis.</p>
              </div>
              <SingleContainerCalculator />
            </div>

            {/* Multiple Shipping Container */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Multiple Shipping Container Calculator</h2>
                <p className="text-gray-600">Find the best fit container for mixed cargo shipments and optimize your logistics.</p>
              </div>
              <MultipleContainerCalculator />
            </div>
          </CalculatorTabs>
        </div>
      </div>
    </div>
  )
}
