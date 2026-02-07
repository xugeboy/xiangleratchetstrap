import { Metadata, ResolvingMetadata } from "next";
import { defaultUrlPrefix, localePrefixMap } from "@/middleware";
import { generateGeneralBreadcrumbs } from "@/utils/breadcrumbs";
import { generateSchema, embedSchema } from "@/utils/schema";
import { useLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import InnerPage from "./innerPage";

export async function generateMetadata(
    parent: ResolvingMetadata
): Promise<Metadata> {
    const currentLocale = await getLocale();

    const pageTitle = "Next-gen Automatic Retractable Ratchet Strap - Heavy Duty 1760 lbs. BS";
    const description = "Next-gen automatic retractable ratchet strap with heavy-duty construction, 1760 lbs break strength, smooth operation, and fast retraction for cargo securing, transport, and industrial use.";
    const pageSlug = "fly-fish-retractable-ratchet-strap";
    const ogImageUrl = "https://xiangleratchetstrap.com/cdn/imgs/f_webp,w_1200,q_75/v1770431290/7-colors_x0q5dv.png";
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

    return {
        title: pageTitle,
        alternates: {
            canonical: canonicalUrl,
            languages:
                Object.keys(languagesAlternate).length > 0
                    ? languagesAlternate
                    : undefined,
        },
        description: description,
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
        },
    };
}


export default function Home() {
    const locale = useLocale();

    const breadcrumbItems = generateGeneralBreadcrumbs(
        "fly fish retractable ratchet strap",
        "fly-fish-retractable-ratchet-strap",
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
        <>
            <section>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
                />
            </section>
            <InnerPage></InnerPage>
        </>
    );
}