import QuoteForm from '@/components/forms/QuoteForm'
import BentoGrids from '@/components/common/BentoGrids'
import { generateGeneralBreadcrumbs } from '@/utils/breadcrumbs';
import { generateSchema, embedSchema } from '@/utils/schema';
import { getLocale } from 'next-intl/server';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
