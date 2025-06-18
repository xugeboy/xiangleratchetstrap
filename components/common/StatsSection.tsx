import Image from "next/image";
import { useTranslations } from "next-intl";



export default function Example() {
  const t = useTranslations("StatsSection");
  const statsData = [
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
        src="/v1744183210/manufacturer_jgqytx.jpg"
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
          <p className="mt-6 text-lg/8 text-white drop-shadow-md">
          {t("description")}
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-2 md:grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col gap-y-3 pl-6  p-4 rounded-lg"
            >
              <dt className="text md:text-2xl text-white text-center">{t(stat.nameKey)}</dt>
              <dt className="text font-bold md:text-2xl text-white text-center">{stat.value}{stat.suffix}</dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
