import ContactSection from "@/components/common/ContactSection";
import { generateGeneralBreadcrumbs } from "@/utils/breadcrumbs";
import { embedSchema, generateSchema } from "@/utils/schema";
import { getLocale } from "next-intl/server";
export default async function ContactUs() {
  const locale = await getLocale();
  const breadcrumbItems = generateGeneralBreadcrumbs(
    "ContactUs",
    "contact-us",
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
    <div className="mt-20">
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
        />
      </section>
      <ContactSection />
    </div>
  );
}
