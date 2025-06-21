"use client"
import ImageTrail from "@/reactbits/Animations/ImageTrail/ImageTrail"
import { useTranslations } from "next-intl";

const partners = [
  "https://res.cloudinary.com/duimeqqch/image/upload/v1745480008/logo8_dboi4s.jpg",
  "https://res.cloudinary.com/duimeqqch/image/upload/v1745480008/logo2_yiwvub.jpg",
  "https://res.cloudinary.com/duimeqqch/image/upload/v1745480008/logo1_zkji8a.jpg",
  "https://res.cloudinary.com/duimeqqch/image/upload/v1745480008/logo6_bdnt7v.jpg",
  "https://res.cloudinary.com/duimeqqch/image/upload/v1745480008/logo3_e2spcz.jpg",
  "https://res.cloudinary.com/duimeqqch/image/upload/v1745480009/logo4_dlor4i.jpg",
  "https://res.cloudinary.com/duimeqqch/image/upload/v1745480008/logo7_oszse9.jpg",
  "https://res.cloudinary.com/duimeqqch/image/upload/v1745480009/logo5_inzejn.jpg",
]

export default function LogoClouds() {
  const t = useTranslations("LogoClouds");

  return (
    <div className="mx-auto container mb-10">
      <div className="relative isolate h-full overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
        <div className="relative z-10">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t("title")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg/8 text-white">
          {t("description")}
          </p>
        </div>

        <div className="absolute inset-0 z-20">
          <ImageTrail key="ImageTrail" items={partners} variant={2} />
        </div>

        {/* 背景装饰 */}
        <div aria-hidden="true" className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl">
          <div
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
            className="aspect-1404/767 w-[87.75rem] bg-linear-to-r from-[#80caff] to-[#4f46e5] opacity-25"
          />
        </div>
      </div>
    </div>
  )
}
