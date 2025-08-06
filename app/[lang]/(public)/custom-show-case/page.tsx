import { LoadMore } from "@/components/common/LoadMore";
import ProductCard from "@/components/common/ProductCard";
import { defaultUrlPrefix, localePrefixMap } from "@/middleware";
import { getInitialShowCases } from "@/services/api/showCase";
import { ResolvingMetadata, Metadata } from "next";
import { getLocale } from "next-intl/server";


export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const currentLocale = await getLocale();

  const pageTitle = "Custom Show Case - Xiangle Ratchet Strap";
  const pageSlug = "custom-show-case";
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

export default async function CasesPage() {
  const { data: initialProducts, meta } = await getInitialShowCases();
  const pageCount = meta.pagination.pageCount;

  return (
    <div>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            SEE WHAT XIANGLE CREATE
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Discover the unique products and solutions we have created for our global customers.
          </p>
        </div>

        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 mt-12">
        {initialProducts.map((product) => {
            return <ProductCard key={product.id} product={product} />
          })}
          
          <LoadMore initialPageCount={pageCount} />
        </div>
      </div>
    </div>
  );
}
