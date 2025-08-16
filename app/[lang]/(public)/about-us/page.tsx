import Image from "next/image";
import LogoClouds from "@/components/common/LogoClouds";
import { embedSchema, generateSchema } from "@/utils/schema";
import { generateGeneralBreadcrumbs } from "@/utils/breadcrumbs";
import { Metadata, ResolvingMetadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { defaultUrlPrefix, localePrefixMap } from "@/middleware";

interface TimelineItem {
  nameKey: string;
  descriptionKey: string;
  date: string;
  dateTime: string;
}

const timelineData: TimelineItem[] = [
  {
    nameKey: "timeline.factoryEstablished.name",
    descriptionKey: "timeline.factoryEstablished.description",
    date: "2006",
    dateTime: "2006-01",
  },
  {
    nameKey: "timeline.enteredInternationalTrade.name",
    descriptionKey: "timeline.enteredInternationalTrade.description",
    date: "2016",
    dateTime: "2016-01",
  },
  {
    nameKey: "timeline.scaledTo100Workers.name",
    descriptionKey: "timeline.scaledTo100Workers.description",
    date: "2023",
    dateTime: "2023-01",
  },
  {
    nameKey: "timeline.newProductInnovation.name",
    descriptionKey: "timeline.newProductInnovation.description",
    date: "2024",
    dateTime: "2024-01",
  },
];

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const currentLocale = await getLocale();

  const pageTitle = "About us - Xiangle Ratchet Strap";
  const pageSlug = "about-us";
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
  // languagesAlternate["x-default"] = `${siteUrl}/${pageSlug}`;


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

export default async function AboutUsPage() {
  const lang = await getLocale();
  const t = await getTranslations({
    locale:lang,
    namespace: "AboutUsPage",
  });
  const breadcrumbItems = generateGeneralBreadcrumbs(
    "AboutUs",
    "about-us",
    lang
  );
  const websiteSchema = generateSchema({
    type: "WebSite",
    lang,
  });
  const organizationSchema = generateSchema({ type: "Organization", lang });
  const breadcrumbSchema = generateSchema({
    type: "BreadcrumbList",
    breadcrumbItems,
  });
  const schemaMetadataJson = embedSchema(
    [websiteSchema, organizationSchema, breadcrumbSchema].filter(Boolean)
  );
  return (
    <div>
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
        />
      </section>
      <div className="mx-auto container px-6 py-32 sm:py-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance text-black sm:text-7xl lg:col-span-2 xl:col-auto">
            {t("mainHeading")}
          </h1>
          <div className="mt-6 lg:mt-0">
            <p className="text-lg font-medium text-pretty text-black sm:text-xl/8">
              {t("missionVision")}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32" />

      {/* Timeline section */}
      <div className="mx-auto -mt-8 container px-6 lg:px-8 mb-40">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {timelineData.map((item) => (
            <div key={item.nameKey}>
              <time
                dateTime={item.dateTime}
                className="flex items-center text-sm/6 font-semibold text-indigo-600"
              >
                <svg
                  viewBox="0 0 4 4"
                  aria-hidden="true"
                  className="mr-4 size-1 flex-none"
                >
                  <circle r={2} cx={2} cy={2} fill="currentColor" />
                </svg>
                {item.date}
                <div
                  aria-hidden="true"
                  className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                />
              </time>
              <p className="mt-6 text-lg/8 font-semibold tracking-tight text-black">
                {t(item.nameKey)}
              </p>
              <p className="mt-1 text-base/7 text-black">
                {t(item.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Logo cloud */}
      <LogoClouds />

      {/* Content section */}
      <div className="mx-auto mt-32 container px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
          <div className="w-full lg:max-w-lg lg:flex-auto">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-black sm:text-4xl">
              {t("engineeringCapabilities.heading")}
            </h2>
            <p className="mt-6 text-xl/8 text-black">
              {t("engineeringCapabilities.description")}
            </p>
          </div>
          <div className="w-full lg:max-w-xl lg:flex-auto">
            <Image
              alt={t("imageAlts.customProductCapabilities")}
              src="/v1744955344/custom_options_raqkxy.jpg"
              width={600}
              height={600}
              className="object-scale-down"
            />
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="mt-32 overflow-hidden hidden md:block sm:mt-40">
        <div className="mx-auto container px-6 lg:flex lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8">
            <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
              <h2 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl">
                {t("ourStrength.heading")}
              </h2>
              <p className="mt-6 text-xl/8 text-black">
                {t("ourStrength.description")}
              </p>
            </div>
            <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                <Image
                  alt={t("imageAlts.scaleCapacity")} // Example: Provide meaningful alt text keys
                  src="/v1745291515/SCALE_CAPACITY_kjmie6.jpg"
                  className="aspect-7/5 w-[37rem] max-w-none rounded-2xl bg-gray-50 object-scale-down"
                  width={592}
                  height={600}
                />
              </div>
              <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                  <Image
                    alt={t("imageAlts.precisionSkill")}
                    src="/v1745291515/PRECISION_SKILL_u0bfdk.jpg"
                    className="aspect-7/5 w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-scale-down"
                    width={592}
                    height={600}
                  />
                </div>
                <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                  <Image
                    alt={t("imageAlts.gsCertificated")}
                    src="/v1744962148/GS_CERTIFICATED_h2ri7d.jpg"
                    className="aspect-4/3 w-[24rem] max-w-none rounded-2xl bg-gray-50"
                    width={300}
                    height={600}
                  />
                </div>
                <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                  <Image
                    alt={t("imageAlts.testedQuality")}
                    src="/v1744955344/tested_quality_uoophk.jpg"
                    className="aspect-4/3 w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50"
                    width={600}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content section - Global Reach */}
      <div className="mt-32 overflow-hidden sm:mt-40">
        <div className="mx-auto container px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-x-12 gap-y-16">
            {/* Text Area */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl">
                {t("globalReach.heading")}
              </h2>
              <p className="mt-6 text-xl/8 text-black">
                {t("globalReach.description")}
              </p>
            </div>
            {/* Image Area */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <Image
                alt={t("imageAlts.globalReachMap")}
                src="/v1744961092/global_reach_h6hh9h.png"
                className="w-full max-w-md rounded-2xl bg-gray-50 object-contain"
                width={718}
                height={387}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
