"use client";

import Image from "next/image";
import LogoClouds from "@/components/common/LogoClouds";
import { useTranslations } from "next-intl"; // Import useTranslations

// Define a type for your timeline items if you haven't already
interface TimelineItem {
  nameKey: string; // Key for the name/title
  descriptionKey: string; // Key for the description
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

export default function AboutUsPage() { // Renamed for clarity
  const t = useTranslations("AboutUsPage"); // Initialize translations for 'AboutUsPage' namespace

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">
            {t("mainHeading")}
          </h1>
          <div className="mt-6 lg:mt-0">
            <p className="text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              {t("missionVision")}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32" />

      {/* Timeline section */}
      <div className="mx-auto -mt-8 max-w-7xl px-6 lg:px-8 mb-40">
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
              <p className="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900">
                {t(item.nameKey)}
              </p>
              <p className="mt-1 text-base/7 text-gray-600">
                {t(item.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Logo cloud */}
      <LogoClouds />

      {/* Content section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
          <div className="w-full lg:max-w-lg lg:flex-auto">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
              {t("engineeringCapabilities.heading")}
            </h2>
            <p className="mt-6 text-xl/8 text-gray-600">
              {t("engineeringCapabilities.description")}
            </p>
          </div>
          <div className="w-full lg:max-w-xl lg:flex-auto">
            <Image
              alt={t("imageAlts.customProductCapabilities")}
              src="https://res.cloudinary.com/duimeqqch/image/upload/v1744955344/custom_options_raqkxy.jpg"
              width={600}
              height={600}
              className="object-scale-down"
            />
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="mt-32 overflow-hidden sm:mt-40">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8">
            <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
              <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {t("ourStrength.heading")}
              </h2>
              <p className="mt-6 text-xl/8 text-gray-600">
                {t("ourStrength.description")}
              </p>
            </div>
            <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                <Image
                  alt={t("imageAlts.scaleCapacity")} // Example: Provide meaningful alt text keys
                  src="https://res.cloudinary.com/duimeqqch/image/upload/v1745291515/SCALE_CAPACITY_kjmie6.jpg"
                  className="aspect-7/5 w-[37rem] max-w-none rounded-2xl bg-gray-50 object-scale-down"
                  width={592}
                  height={600}
                />
              </div>
              <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                  <Image
                    alt={t("imageAlts.precisionSkill")}
                    src="https://res.cloudinary.com/duimeqqch/image/upload/v1745291515/PRECISION_SKILL_u0bfdk.jpg"
                    className="aspect-7/5 w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-scale-down"
                    width={592}
                    height={600}
                  />
                </div>
                <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                  <Image
                    alt={t("imageAlts.gsCertificated")}
                    src="https://res.cloudinary.com/duimeqqch/image/upload/v1744962148/GS_CERTIFICATED_h2ri7d.jpg"
                    className="aspect-4/3 w-[24rem] max-w-none rounded-2xl bg-gray-50"
                    width={300}
                    height={600}
                  />
                </div>
                <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                  <Image
                    alt={t("imageAlts.testedQuality")}
                    src="https://res.cloudinary.com/duimeqqch/image/upload/v1744955344/tested_quality_uoophk.jpg"
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
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8">
            {/* Text Area - Right Aligned on Large Screens */}
            <div className="lg:col-start-2 lg:row-start-1 lg:w-full lg:max-w-lg lg:pb-8"> {/* Adjusted for right alignment */}
              <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {t("globalReach.heading")}
              </h2>
              <p className="mt-6 text-xl/8 text-gray-600">
                {t("globalReach.description")}
              </p>
            </div>
            {/* Image Area - Left Aligned on Large Screens */}
            <div className="flex flex-wrap items-start justify-start gap-6 sm:gap-8 lg:contents lg:col-start-1 lg:row-start-1"> {/* Adjusted for left alignment */}
              <Image
                alt={t("imageAlts.globalReachMap")}
                src="https://res.cloudinary.com/duimeqqch/image/upload/v1744961092/global_reach_h6hh9h.png"
                className="max-w-none rounded-2xl bg-gray-50"
                width={718} // Adjust width/height as per your design
                height={387}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}