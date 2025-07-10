import OnlineBuilderShell from '@/components/custom/OnlineBuilderShell';
import { defaultUrlPrefix, localePrefixMap } from '@/middleware';
import type { Metadata, ResolvingMetadata } from 'next';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const currentLocale = await getLocale();

  const pageTitle = "Online Builder - Xiangle Ratchet Strap";
  const pageSlug = "custom-print/online-builder";
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

export default function OnlineBuilderPage() {
  return (
    <main>
      <OnlineBuilderShell />
    </main>
  );
}
