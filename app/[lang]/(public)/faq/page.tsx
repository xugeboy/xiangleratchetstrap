import { Metadata, ResolvingMetadata } from 'next';
import FaqList from './FaqList';
import { getFaqs } from '@/services/api/faq';
import Link from 'next/link';
import { getLocale, getTranslations} from 'next-intl/server'; 
import { generateGeneralBreadcrumbs } from '@/utils/breadcrumbs';
import { generateSchema, embedSchema } from '@/utils/schema';
import { defaultUrlPrefix, localePrefixMap } from '@/middleware';

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const currentLocale = await getLocale();

  const pageTitle = "faq";
  const pageSlug = "faq";
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

export default async function FaqPage() {
  const locale = await getLocale();
  const t = await getTranslations({locale, namespace: "FaqPage.content"});
  const faqs = await getFaqs(locale);

  const contactUsPath = `/${locale}/contact-us`;

  const breadcrumbItems = generateGeneralBreadcrumbs(
    "FAQs",
    "faqs",
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
    <div className="bg-white py-24 sm:py-32">
            <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
        />
      </section>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            {t('mainTitle')}
          </h1>
          <p className="mt-4 text-lg leading-8 text-black">
            {t('introText')}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-4xl">
          <FaqList faqs={faqs} />
        </div>
        <div className="mx-auto max-w-4xl mt-16 text-center">
          <p className="mt-4 text-lg leading-8 text-black">
            {t.rich('notFoundText', {
              contactLink: (chunks) => (
                <Link href={contactUsPath} className="underline hover:text-indigo-600">
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
      </div>
    </div>
  );
}