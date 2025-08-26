import Breadcrumb from '@/components/common/Breadcrumb'
import { defaultUrlPrefix, localePrefixMap } from '@/middleware';
import { generateGeneralBreadcrumbs } from '@/utils/breadcrumbs';
import { getCombainedLocalePath } from '@/utils/formatUtils'
import { generateSchema, embedSchema } from '@/utils/schema';
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const currentLocale = await getLocale();

  const pageTitle = "Tools - Xiangle Ratchet Strap";
  const pageSlug = "tools";
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


export default async function ToolsPage() {
  const lang = await getLocale()
  const breadcrumbItems = generateGeneralBreadcrumbs(
    "Tools",
    "tools",
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

  const tools = [
          {
        title: "CBM Calculator Suite",
        description: "Professional suite of 6 calculators for cargo volume, weight, and container optimization. Includes volumetric weight, multiple products, and container loading analysis.",
        icon: "📦",
        features: [
          "6 specialized calculators in one suite",
          "Volumetric weight calculations",
          "Multiple products support",
          "Container optimization tools"
        ],
        href: getCombainedLocalePath(lang, 'tools/cbm-calculator'),
        color: "from-blue-500 to-cyan-500"
      },
          {
        title: "Cargo Securing Calculator",
        description: "Professional tool for calculating required tie-down capacity based on cargo weight, securing method, and angle. Default units: pounds and feet.",
        icon: "🔗",
        features: [
          "DOT compliance calculations",
          "Angle efficiency analysis",
          "Professional strap recommendations",
          "Safety guidelines and best practices"
        ],
        href: getCombainedLocalePath(lang, 'tools/cargo-securing-calculator'),
        color: "from-green-500 to-emerald-500"
      },
    {
      title: "Angle Efficiency Calculator",
      description: "Quick tool to see how tie-down angle affects your strap's actual working capacity. Instant visual feedback. Default units: pounds.",
      icon: "📐",
      features: [
        "Real-time angle efficiency calculation",
        "Visual angle representation",
        "Capacity loss warnings",
        "Safety guidelines and recommendations"
      ],
      href: getCombainedLocalePath(lang, 'tools/angle-efficiency-calculator'),
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Cargo-Specific Recommender",
      description: "Get personalized strap recommendations for your specific cargo type. No technical knowledge required - just tell us what you're securing!",
      icon: "🎯",
      features: [
        "Cargo-specific recommendations",
        "No technical knowledge needed",
        "Bundle discounts and accessories",
        "Pro tips and video tutorials"
      ],
      href: getCombainedLocalePath(lang, 'tools/cargo-specific-recommender'),
      color: "from-orange-500 to-red-500"
    }
  ]

  return (
    
    <div>
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
        />
      </section>
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <Breadcrumb items={breadcrumbItems.slice(1)} lang={lang} />
      
      <div className="mx-auto max-w-4xl text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Professional Tools & Calculators
        </h1>
        <p className="mt-3 text-lg text-black/70">
          Expert tools designed to help you optimize cargo operations, ensure safety compliance, 
          and make informed decisions for your transportation needs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {tools.map((tool, index) => (
          <Link 
            key={index} 
            href={tool.href}
            className="group block"
          >
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300">
              <div className={`bg-gradient-to-r ${tool.color} p-6 text-white`}>
                <div className="text-4xl mb-2">{tool.icon}</div>
                <h2 className="text-2xl font-bold mb-2">{tool.title}</h2>
                <p className="text-white/90 text-sm">{tool.description}</p>
              </div>
              
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {tool.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    Try Calculator →
                  </span>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Additional Information */}
      <div className="bg-gray-50 rounded-xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          Why Use Our Professional Tools?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Industry Standards</h4>
            <p className="text-sm text-gray-600">Based on DOT regulations and international best practices</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Instant Results</h4>
            <p className="text-sm text-gray-600">Real-time calculations with professional recommendations</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Safety First</h4>
            <p className="text-sm text-gray-600">Ensure compliance and prevent accidents</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
