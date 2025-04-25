import BentoGrids from "@/components/common/BentoGrids";
import LogoClouds from "@/components/common/LogoClouds";
import StatsSection from "@/components/common/StatsSection";
import TeamSection from "@/components/common/TeamSection";
import QuoteForm from "@/components/forms/QuoteForm";
import Image from "next/image";

export default function BusinessSolutions() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Banner Section */}
      <div className="relative h-[400px] w-full overflow-hidden mb-10">
        {/* Background Image */}
        <Image
          src="/image/banner.png"
          alt="Business Solutions"
          fill
          className="object-cover"
          priority
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            EQUIPMENT YOU NEED. SERVICE YOU DESERVE.
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl">
            YOUR PREFERRED VENDOR OF HIGH-QUALITY TRUCKING, RIGGING & LIFTING,
            AND MOVING EQUIPMENT.
          </p>
          <a
            href="#quote_form"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8 py-3 rounded-lg 
                  transition-colors duration-200 uppercase tracking-wide"
          >
            PARTNER WITH US
          </a>
        </div>
      </div>

      <div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center mb-10">
          {/* Left side - Image and EO Logo */}
          <div className="relative">
            <Image
              src="/image/team.png"
              alt="Our Team"
              width={800}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Right side - Text content */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              SMALL COMPANY FEEL WITH HIGH-TOUCH SERVICE, BACKED BY A LARGE
              COMPANY OPERATION.
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Xiangle Ratchet Strap is not your average equipment supplier. We
              don&apos;t just want to work for you, we want to work with you.
              Our dedicated team of experts is what sets us apart - ensuring you
              get the high-quality equipment you need and the exceptional
              service you deserve. With custom product capabilities, fast
              delivery, and financing available, we look forward to keeping you
              moving forward.
            </p>
            <a
              href="#meet-the-team"
              className="text-yellow-600 font-semibold hover:text-yellow-700 inline-flex items-center"
            >
              Meet the Team
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <StatsSection />
      <BentoGrids />
      <LogoClouds />
      <QuoteForm/>
      <TeamSection />
    </div>
  );
}
