import { Metadata } from 'next';
import FaqList from './FaqList';
import { getFaqs } from '@/services/api/faq';
import Link from 'next/link';
import { getLocale, getTranslations} from 'next-intl/server'; 
import { generateGeneralBreadcrumbs } from '@/utils/breadcrumbs';
import { generateSchema, embedSchema } from '@/utils/schema';

export async function generateMetadata(): Promise<Metadata> {
  
  const locale = await getLocale();
  const t = await getTranslations({locale, namespace: "FaqPage.metadata"});

  return {
    title: t('title'),
    description: t('description'),
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('mainTitle')}
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {t('introText')}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-4xl">
          <FaqList faqs={faqs} />
        </div>
        <div className="mx-auto max-w-4xl mt-16 text-center">
          <p className="mt-4 text-lg leading-8 text-gray-600">
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