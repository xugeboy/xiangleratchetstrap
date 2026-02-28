import Breadcrumb from "@/components/common/Breadcrumb";
import { defaultUrlPrefix, localePrefixMap } from "@/middleware";
import { generateGeneralBreadcrumbs } from "@/utils/breadcrumbs";
import { getCombainedLocalePath } from "@/utils/formatUtils";
import { generateSchema, embedSchema } from "@/utils/schema";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";

const CATALOGS = [
  {
    year: "2026",
    title: "Xiangle New Products Catalog",
    file: "/asset/Xiangle New Products Catalog - 2026.pdf",
    name: "Xiangle New Products Catalog - 2026.pdf",
    sizeMb: "9.14",
    latest: true,
    summary:
      "Latest products, upgraded webbing options, and updated OEM customization references for 2026 sourcing plans.",
    highlights: [
      "Newest ratchet strap and tie-down product lines",
      "Updated technical specs and load range coverage",
      "OEM and private-label customization options",
    ],
    publishedAt: "2026-01-01",
  },
  {
    year: "2025",
    title: "Xiangle Ratchet Strap Catalog",
    file: "/asset/2025 Xiangle Ratchet Strap Catalog.pdf",
    name: "2025 Xiangle Ratchet Strap Catalog.pdf",
    sizeMb: "13.08",
    latest: false,
    summary:
      "Core tie-down strap portfolio with complete model references and standard production capabilities.",
    highlights: [
      "Full range of ratchet and cam buckle straps",
      "Material, hook, and assembly specification overview",
      "Factory-direct product selection guide",
    ],
    publishedAt: "2025-01-01",
  },
] as const;

const PAGE_SLUG = "download-catalog";
const PAGE_TITLE = "Download Ratchet Strap Catalog PDFs (2026 Updated) | Xiangle";
const PAGE_DESCRIPTION =
  "Download Xiangle's official tie-down strap catalog PDFs, including the 2026 new products catalog and 2025 full catalog. Explore ratchet straps, cam buckle straps, OEM customization, and factory-direct manufacturing capabilities.";

const FAQS = [
  {
    question: "What is included in the 2026 Xiangle catalog?",
    answer:
      "The 2026 catalog includes newly released tie-down products, updated technical specifications, and expanded OEM customization options for business buyers and distributors.",
  },
  {
    question: "Can I request custom ratchet strap products after downloading the catalog?",
    answer:
      "Yes. After reviewing the catalog, you can submit your requirements through the request quote page for OEM dimensions, colors, hooks, labels, and logo branding.",
  },
  {
    question: "Which catalog should I download first?",
    answer:
      "Start with the 2026 catalog for the latest products. The 2025 catalog is useful if you want to compare legacy models and historical specifications.",
  },
  {
    question: "Are these catalogs free to download?",
    answer:
      "Yes. Both PDF catalogs are provided free for sourcing and technical evaluation.",
  },
] as const;

function buildLocalizedPagePath(locale: string | undefined, slug: string) {
  if (!locale || locale === defaultUrlPrefix) {
    return `/${slug}`;
  }
  return `/${locale}/${slug}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const currentLocale = await getLocale();

  const pageTitle = PAGE_TITLE;
  const pageSlug = PAGE_SLUG;
  const ogImageUrl = process.env.NEXT_PUBLIC_LOGO_URL;
  const ogImageAlt = pageTitle;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  const canonicalUrlPath = buildLocalizedPagePath(currentLocale, pageSlug);
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
    description: PAGE_DESCRIPTION,
    keywords: [
      "ratchet strap catalog pdf",
      "tie down straps catalog",
      "cargo strap manufacturer",
      "OEM ratchet strap supplier",
      "cam buckle strap catalog",
      "Xiangle catalog download",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages:
        Object.keys(languagesAlternate).length > 0
          ? languagesAlternate
          : undefined,
    },
    robots: {
      index: true,
      follow: true,
      maxImagePreview: "large",
      maxSnippet: -1,
      maxVideoPreview: -1,
    },
    openGraph: {
      title: pageTitle,
      description: PAGE_DESCRIPTION,
      url: canonicalUrl,
      type: "website",
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
      description: PAGE_DESCRIPTION,
      card: "summary_large_image",
    },
  };
}

export default function PDFViewerPage() {
  const locale = useLocale();
  const t = useTranslations("DownloadCatalogPage");
  const quotePath = getCombainedLocalePath(locale, "request-quote");
  const contactPath = getCombainedLocalePath(locale, "contact-us");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const pageUrl = `${siteUrl}${buildLocalizedPagePath(locale, PAGE_SLUG)}`;

  const breadcrumbItems = generateGeneralBreadcrumbs(
    "DownloadCatalog",
    "download-catalog",
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

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Xiangle Catalog Download Center",
    description: PAGE_DESCRIPTION,
    url: pageUrl,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      url: siteUrl,
    },
    hasPart: CATALOGS.map((catalog) => ({
      "@type": "DigitalDocument",
      name: `${catalog.year} ${catalog.title}`,
      description: catalog.summary,
      contentUrl: `${siteUrl}${catalog.file}`,
      encodingFormat: "application/pdf",
      datePublished: catalog.publishedAt,
      inLanguage: "en",
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const schemaMetadataJson = embedSchema(
    [
      websiteSchema,
      organizationSchema,
      breadcrumbSchema,
      collectionPageSchema,
      faqSchema,
    ].filter(Boolean)
  );

  return (
    <div className="bg-gradient-to-b from-cyan-50/60 via-white to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
      />

      <div className="container mx-auto px-4 py-10 md:py-16">
        <Breadcrumb items={breadcrumbItems.slice(1)} lang={locale} />

        <section className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="inline-flex rounded-full bg-cyan-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
              2026 Edition Available
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-gray-700 md:text-lg">
              {t("description")}
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-700 md:text-base">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-500" />
                <span>{t("features.feature1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-500" />
                <span>{t("features.feature2")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-500" />
                <span>{t("features.feature3")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-500" />
                <span>Direct PDF downloads for 2026 and 2025 product editions</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#catalog-downloads"
                className="inline-flex items-center rounded-lg bg-cyan-600 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-700"
              >
                Jump to Downloads
              </a>
              <Link
                href={quotePath}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:border-cyan-600 hover:text-cyan-700"
              >
                Request OEM Quote
              </Link>
            </div>
            <p className="mt-4 text-xs text-gray-500">Last updated: February 2026</p>
          </div>

          <div>
            <div className="overflow-hidden rounded-2xl border border-cyan-100 bg-white p-4 shadow-lg shadow-cyan-100/50">
              <Image
                src="/v1750143204/catalog_u0aq7n.jpg"
                alt={t("imageAlt")}
                width={960}
                height={720}
                className="h-auto w-full rounded-xl object-cover"
                priority
              />
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-2xl font-bold text-gray-900">2</p>
                  <p className="text-xs text-gray-600">PDF Editions</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-2xl font-bold text-gray-900">2026</p>
                  <p className="text-xs text-gray-600">Latest Update</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-2xl font-bold text-gray-900">OEM</p>
                  <p className="text-xs text-gray-600">Factory Direct</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="catalog-downloads" className="mt-14 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Download Catalog PDFs
          </h2>
          <p className="mt-3 max-w-3xl text-gray-700">
            Access the latest Xiangle product catalogs for technical evaluation,
            sourcing, and distributor planning. Start with the 2026 release, then
            use the 2025 edition for model comparison.
          </p>

          <div className="mt-6 space-y-4">
            {CATALOGS.map((catalog) => (
              <article
                key={catalog.name}
                className={`rounded-2xl border p-6 transition-colors ${
                  catalog.latest
                    ? "border-cyan-300 bg-cyan-50/40"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">
                      {catalog.year} {catalog.latest ? "Latest Release" : "Archive Edition"}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-gray-900">
                      {catalog.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                      {catalog.summary}
                    </p>
                    <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-700 md:grid-cols-2">
                      {catalog.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-cyan-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-full lg:w-auto">
                    <a
                      href={catalog.file}
                      download={catalog.name}
                      aria-label={`Download ${catalog.title} ${catalog.year} PDF`}
                      className="inline-flex w-full items-center justify-center rounded-lg bg-cyan-600 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-700 lg:w-auto"
                    >
                      {t("buttonText")}
                    </a>
                    <p className="mt-2 text-center text-xs text-gray-500">
                      {t("buttonMeta", { size: catalog.sizeMb })}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-gray-900">For Importers</h2>
            <p className="mt-2 text-sm text-gray-700">
              Compare product ranges, verify specifications, and shortlist models
              for procurement and private labeling.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-gray-900">For Distributors</h2>
            <p className="mt-2 text-sm text-gray-700">
              Use the catalog data to align inventory planning with market demand
              and customer segment requirements.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-gray-900">For OEM Buyers</h2>
            <p className="mt-2 text-sm text-gray-700">
              Review customization routes including webbing, hooks, branding, and
              packaging before requesting quotations.
            </p>
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900">Catalog FAQ</h2>
          <dl className="mt-5 space-y-5">
            {FAQS.map((item) => (
              <div key={item.question}>
                <dt className="text-base font-semibold text-gray-900">
                  {item.question}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-14 rounded-2xl border border-cyan-200 bg-cyan-50/60 p-7 text-center md:p-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Need exact specs or custom requirements?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-700">
            Share your load requirement, target market, and packaging needs.
            Our factory team can provide model matching and OEM recommendations.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={quotePath}
              className="inline-flex items-center rounded-lg bg-cyan-600 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-700"
            >
              Request Quote
            </Link>
            <Link
              href={contactPath}
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:border-cyan-600 hover:text-cyan-700"
            >
              Contact Sales
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
