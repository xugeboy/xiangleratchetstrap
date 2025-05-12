"use client";

import Image from "next/image";
import CountUp from "@/reactbits/TextAnimations/CountUp/CountUp";
import GradientText from "@/reactbits/TextAnimations/GradientText/GradientText";
import { useTranslations } from "next-intl";



export default function Example() {
  const t = useTranslations("StatsSection");const 
  statsData = [
    { id: 1, nameKey: "stats.years", value: 16, suffix: "+" },
    { id: 2, nameKey: "stats.partners", value: 1000, suffix: "+" },
    { id: 3, nameKey: "stats.orders", value: 20000, suffix: "+" },
    { id: 4, nameKey: "stats.deliveryRate", value: 100, suffix: "%" },
    { id: 5, nameKey: "stats.productsAvailable", value: "1000", suffix: "+" },
  ];
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 rounded-3xl sm:py-32 mb-10">
      {/* Background image */}
      <Image
        alt="Manufacturing machinery"
        src="https://res.cloudinary.com/duimeqqch/image/upload/v1744183210/manufacturer_jgqytx.jpg"
        className="absolute inset-0 -z-10 size-full object-cover brightness-75"
        width={1000}
        height={1080}
      />

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 -z-10 bg-black/50" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl drop-shadow-md">
          {t("title")}
          </p>
          <p className="mt-6 text-lg/8 text-gray-100 drop-shadow-md">
          {t("description")}
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col gap-y-3 border-l border-white/10 pl-6 backdrop-blur-sm p-4 rounded-lg"
            >
              <dt className="text-sm/6 text-gray-100 text-center">{t(stat.nameKey)}</dt>
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="order-first text-3xl font-semibold tracking-tight"
              >
                <CountUp
                  from={0}
                  to={stat.value}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                {stat.suffix}
              </GradientText>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
