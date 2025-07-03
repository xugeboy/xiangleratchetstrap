// app/[locale]/request-quote/success/page.tsx

import { getLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";

// 生成页面的元数据
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Success - Xiangle Ratchet Strap",
    robots: {
      index: false,
      follow: true,
    },
  };
}

// 成功页面的主组件
export default async function QuoteSuccessPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "SuccessPage" });
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
      <svg
        className="mx-auto h-12 w-12 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
        {t("message")}
      </p>
      <div className="mt-10">
        <Link
          href="/"
          className="inline-block rounded-md border border-transparent bg-primary-600 px-8 py-3 text-center font-medium hover:bg-primary-700"
        >
          {t("cta_return_home")}
        </Link>
      </div>
    </div>
  );
}
