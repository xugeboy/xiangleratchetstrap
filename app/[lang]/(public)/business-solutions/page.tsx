import BentoGrids from "@/components/common/BentoGrids";
import LogoClouds from "@/components/common/LogoClouds";
import StatsSection from "@/components/common/StatsSection";
import TeamSection from "@/components/common/TeamSection";
import QuoteForm from "@/components/forms/QuoteForm";
import { generateGeneralBreadcrumbs } from "@/utils/breadcrumbs";
import { generateSchema, embedSchema } from "@/utils/schema";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function BusinessSolutions() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "BusinessSolutions" });
  const breadcrumbItems = generateGeneralBreadcrumbs(
    "BusinessSolutions",
    "business-solutions",
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
      {/* Hero Banner Section */}
      <div className="relative h-[400px] w-full overflow-hidden mb-10">
        {/* Background Image */}
        <Image
          src="/v1750216891/banner_jhkn0h.png"
          alt="Business Solutions"
          fill
          className="object-cover"
          priority
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl">
            {t("hero.subtitle")}
          </p>
          <a
            href="#quote_form"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8 py-3 rounded-lg 
                  transition-colors duration-200 uppercase tracking-wide"
          >
            {t("hero.ctaButton")}
          </a>
        </div>
      </div>

      <div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center mb-10">
          {/* Left side - Image and EO Logo */}
          <div className="relative">
            <Image
              src="/v1750216943/team_qrsob1.jpg"
              alt="Our Team"
              width={800}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Right side - Text content */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-3xl font-bold text-black mb-4">
              {t("section.title")}
            </h2>
            <p className="text-lg text-black mb-6">
              {t("section.description")}
            </p>
            <a
              href="#meet-the-team"
              className="text-yellow-600 font-semibold hover:text-yellow-700 inline-flex items-center"
            >
              {t("section.linkText")}
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <StatsSection />
      <BentoGrids />
      <LogoClouds />
      <QuoteForm />
      <TeamSection />
    </div>
  );
}
