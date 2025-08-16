"use client";
import Image from "next/image";
import {
  FaWeight,
  FaShieldAlt,
  FaLeaf,
  FaLightbulb,
  FaIndustry,
  FaCertificate,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { WiDaySunny } from "react-icons/wi";
import { useTranslations } from "next-intl";
import { MdGppGood } from "react-icons/md";
import { SiGooglecontaineroptimizedos } from "react-icons/si";

const Tqc = () => {
  const t = useTranslations("Tqc");
  const [activeTab, setActiveTab] = useState(0);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);

  const testingData = [
    {
      title: t("quality.testing.tensile.title"),
      icon: FaWeight,
      description: t("quality.testing.tensile.description"),
      details: t("quality.testing.tensile.details"),
    },
    {
      title: t("quality.testing.durability.title"),
      icon: FaShieldAlt,
      description: t("quality.testing.durability.description"),
      details: t("quality.testing.durability.details"),
    },
    {
      title: t("quality.testing.uv.title"),
      icon: WiDaySunny,
      description: t("quality.testing.uv.description"),
      details: t("quality.testing.uv.details"),
    },
  ];

  const allCertifications = [
    {
      name: "GS Certificate",
      image: "/v1754990835/gs_cert_7_jaxamj.jpg",
      category: "Safety Certification",
      icon: FaShieldAlt,
      color: "text-red-600",
    },
    {
      name: "Design Patent",
      image: "/v1754990834/patents_7_wawjt2.jpg",
      category: "Patent Certificates",
      icon: FaLightbulb,
      color: "text-yellow-600",
    },
    {
      name: "REACH Certification",
      image: "/v1754990834/reach_cert_7_fdhwgc.jpg",
      category: "Environmental Compliance",
      icon: FaLeaf,
      color: "text-green-600",
    }
  ];

  // 自动轮播效果
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCertIndex((prev) => (prev + 1) % allCertifications.length);
    }, 3000); // 每3秒切换一次

    return () => clearInterval(interval);
  }, [allCertifications.length]);

  const tabs = [
    {
      id: 0,
      name: t("tabs.manufacturing"),
      icon: FaIndustry,
      content: (
        <div className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Process Flow Image */}
            <div className="order-2 lg:order-1">
              <div className="bg-gray-50 rounded-2xl">
                <Image
                  src="/v1754980221/production_flow_n5m3vy.png"
                  alt={t("manufacturing.imageAlt")}
                  width={736}
                  height={465}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Right - Text Content */}
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {t("manufacturing.heading")}
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                {t("manufacturing.description")}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span className="text-gray-700">
                    {t("manufacturing.bullets.integratedProduction")}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span className="text-gray-700">
                    {t("manufacturing.bullets.precisionQC")}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span className="text-gray-700">
                    {t("manufacturing.bullets.sustainable")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      name: t("tabs.quality"),
      icon: MdGppGood,
      content: (
        <div className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {t("quality.heading")}
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                {t("quality.description")}
              </p>

              <div className="space-y-3">
                {testingData.map((test, index) => (
                  <div key={index} className="bg-white rounded-lg">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <test.icon className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {test.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {test.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <p className="text-gray-600">{test.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Testing Laboratory Images */}
            <div className="bg-white rounded-2xl shadow-lg">
              <Image
                src="/v1754964711/quality_control_d96wrr.jpg"
                alt={t("quality.labImageAlt")}
                width={736}
                height={465}
                className="w-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      name: t("tabs.certifications"),
      icon: FaCertificate,
      content: (
        <div className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg">
                  <div className="cursor-pointer">
                    <Image
                      src={allCertifications[currentCertIndex].image}
                      alt={allCertifications[currentCertIndex].name}
                      width={736}
                      height={465}
                      className="w-full object-contain rounded-lg transition-all duration-500 ease-in-out"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Text Content */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {t("certifications.heading")}
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                {t("certifications.description")}
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FaShieldAlt className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {t("certifications.bullet1.title")}
                    </h4>
                    <p className="text-gray-600">
                      {t("certifications.bullet1.desc")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FaLightbulb className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {t("certifications.bullet2.title")}
                    </h4>
                    <p className="text-gray-600">
                      {t("certifications.bullet2.desc")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FaLeaf className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {t("certifications.bullet3.title")}
                    </h4>
                    <p className="text-gray-600">
                      {t("certifications.bullet3.desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      name: t("tabs.tradeTerms"),
      icon: SiGooglecontaineroptimizedos,
      content: (
        <div className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Stock Image */}
            <div className="order-2 lg:order-1">
              <div className="bg-gray-50 rounded-2xl">
                <Image
                  src="/v1754981201/multi_stock_itpkjt.jpg"
                  alt={t("trade.imageAlt")}
                  width={736}
                  height={465}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Right - Text Content */}
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {t("trade.heading")}
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                {t("trade.description")}
              </p>

              {/* Trade Terms Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* MOQ */}
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
                  <h4 className="font-bold text-gray-900 mb-1">
                    {t("trade.terms.moq.title")}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t("trade.terms.moq.value")}
                  </p>
                  <p className="text-red-600 text-xs mt-1 font-medium">
                    {t("trade.terms.moq.note")}
                  </p>
                </div>

                {/* Lead Time */}
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-900 mb-1">
                    {t("trade.terms.lead.title")}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t("trade.terms.lead.value")}
                  </p>
                  <p className="text-blue-600 text-xs mt-1 font-medium">
                    {t("trade.terms.lead.note")}
                  </p>
                </div>

                {/* Payment Terms */}
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
                  <h4 className="font-bold text-gray-900 mb-1">
                    {t("trade.terms.payment.title")}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t("trade.terms.payment.value")}
                  </p>
                  <p className="text-green-600 text-xs mt-1 font-medium">
                    {t("trade.terms.payment.note")}
                  </p>
                </div>

                {/* Sample Policy */}
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
                  <h4 className="font-bold text-gray-900 mb-1">
                    {t("trade.terms.sample.title")}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t("trade.terms.sample.value")}
                  </p>
                  <p className="text-yellow-600 text-xs mt-1 font-medium">
                    {t("trade.terms.sample.note")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-4 sm:space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 sm:px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <tab.icon className="w-5 h-5" />
                <h2 className="hidden md:inline">{tab.name}</h2>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tqc;
