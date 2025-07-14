"use client"
import Image from "next/image"
import { useTranslations } from "next-intl"

const partners = [
  "/v1745480008/logo8_dboi4s.jpg",
  "/v1745480008/logo2_yiwvub.jpg",
  "/v1745480008/logo1_zkji8a.jpg",
  "/v1745480008/logo6_bdnt7v.jpg",
  "/v1745480008/logo3_e2spcz.jpg",
  "/v1745480009/logo4_dlor4i.jpg",
  "/v1745480008/logo7_oszse9.jpg",
  "/v1745480009/logo5_inzejn.jpg",
]

export default function LogoClouds() {
  const t = useTranslations("LogoClouds")

  // 复制数组以确保无缝循环
  const duplicatedPartners = [...partners, ...partners]

  return (
    <div className="mx-auto container mb-10">
      <div className="relative overflow-hidden px-6 py-16 text-center sm:rounded-3xl sm:px-16 sm:py-20">
        {/* Content */}
        <div className="relative z-10 mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">{t("title")}</h2>
          <p className="mx-auto mt-6 max-w-6xl text-lg text-gray-600 sm:text-xl">{t("description")}</p>

          {/* 滚动Logo容器 */}
          <div className="mt-12 sm:mt-16">
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll space-x-8 sm:space-x-12">
                {duplicatedPartners.map((logo, index) => (
                  <div key={index} className="flex-shrink-0 flex items-center justify-center w-32 h-16 sm:w-40 sm:h-20">
                    <Image
                      src={logo}
                      alt={`Partner logo ${(index % partners.length) + 1}`}
                      width={160}
                      height={80}
                      className="h-12 w-auto object-contain sm:h-16 max-w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CSS动画样式 */}
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            animation: scroll 10s linear infinite;
          }
        `}</style>
      </div>
    </div>
  )
}
