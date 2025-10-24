import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BannerSection from "@/components/custom-ratchet-straps/BannerSection";
import HeroSection from "@/components/custom-ratchet-straps/HeroSection";
import CompanyOverviewSection from "@/components/custom-ratchet-straps/CompanyOverviewSection";
import CustomizationSection from "@/components/custom-ratchet-straps/CustomizationSection";
import CertificationsSection from "@/components/custom-ratchet-straps/CertificationsSection";
import OrderOptionsSection from "@/components/custom-ratchet-straps/OrderOptionsSection";
import TrustedPartnersSection from "@/components/custom-ratchet-straps/TrustedPartnersSection";
import QuoteFormSection from "@/components/custom-ratchet-straps/QuoteFormSection";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({
    locale: lang,
    namespace: "CustomRatchetStraps",
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function CustomRatchetStrapsPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params;

  return (
    <div className="min-h-screen bg-white">
      <BannerSection lang={lang} />
      <HeroSection lang={lang} />
      <CompanyOverviewSection />
      <CustomizationSection />
      <CertificationsSection />
      <OrderOptionsSection />
      <TrustedPartnersSection />
      <QuoteFormSection />
    </div>
  );
}
