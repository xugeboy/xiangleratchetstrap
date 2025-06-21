import QuoteForm from '@/components/forms/QuoteForm'
import BentoGrids from '@/components/common/BentoGrids'
import { generateGeneralBreadcrumbs } from '@/utils/breadcrumbs';
import { generateSchema, embedSchema } from '@/utils/schema';
import { getLocale } from 'next-intl/server';
import { defaultUrlPrefix, localePrefixMap } from '@/middleware';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const currentLocale = await getLocale();

  const pageTitle = "Request Quote - Xiangle Ratchet Strap";
  const pageSlug = "request-quote";
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
  languagesAlternate["x-default"] = `${siteUrl}/${pageSlug}`;


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
    }
  };
}

export default async function RequestQuote() {
  const locale = await getLocale();
  const breadcrumbItems = generateGeneralBreadcrumbs(
    "RequestQuote",
    "request-quote",
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
  return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
        />
      </section>
        <BentoGrids />
        <QuoteForm />
      </div>
  )
}   
