import Image from "next/image";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { getCombainedLocalePath } from "@/utils/formatUtils";

interface CapabilityItem {
  id: string;
}

const capabilities: CapabilityItem[] = [
  { id: "innovation" },
  { id: "inventorySupply" },
  { id: "moqCustomization" },
];

export default async function CapabilitiesSection() {
  const lang = await getLocale(); 

  const t = await getTranslations("CapabilitiesSection");

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> {/* Increased gap */}
          <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] rounded-lg overflow-hidden shadow-xl"> {/* Added shadow and responsive height */}
            <Image
              alt={t("imageAlt")} // 4. 翻译 alt 文本
              src="https://res.cloudinary.com/duimeqqch/image/upload/v1744958133/why-us-apart_jqszvd.jpg"
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 50vw" // Basic responsive sizes
            />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-2 leading-tight"> {/* Responsive font size & leading */}
                {t("mainTitle")} {/* 5. 翻译主标题 */}
              </h2>
              <h3 className="text-4xl lg:text-5xl font-bold text-amber-700 mb-6 leading-tight"> {/* Responsive font size & leading */}
                {t("subTitle")} {/* 6. 翻译副标题 */}
              </h3>
            </div>

            <div className="space-y-6">
              {capabilities.map((capability) => (
                <div key={capability.id}>
                  <h4 className="text-xl font-bold text-black mb-2">
                    {t(`items.${capability.id}.title`)} {/* 7. 翻译能力点标题 */}
                  </h4>
                  <p className="text-black text-base leading-relaxed"> {/* Adjusted text color and leading */}
                    {t(`items.${capability.id}.description`)} {/* 8. 翻译能力点描述 */}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href={getCombainedLocalePath(lang,"about-us")} // 9. 使用本地化的链接
              className="inline-block bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 font-semibold transition-colors rounded-md text-lg" // Adjusted styling
            >
              {t("aboutUsButton")} {/* 10. 翻译按钮文本 */}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}