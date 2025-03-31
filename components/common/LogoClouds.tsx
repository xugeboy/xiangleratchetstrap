"use client";
import Image from "next/image";

const partners = [
  {
    name: "CRST",
    logo: "/images/partners/crst-logo.png",
  },
  {
    name: "Extreme Steel",
    logo: "/images/partners/extreme-steel-logo.png",
  },
  {
    name: "Trailer Marketing Inc",
    logo: "/images/partners/trailer-marketing-logo.png",
  },
  {
    name: "ATS",
    logo: "/images/partners/ats-logo.png",
  },
  {
    name: "AFFLINK",
    logo: "/images/partners/afflink-logo.png",
  },
  {
    name: "MSC Industrial Supply Co.",
    logo: "/images/partners/msc-logo.png",
  },
  {
    name: "Mainfreight",
    logo: "/images/partners/mainfreight-logo.png",
  },
];

export default function LogoClouds() {
  return (
    <div className="mb-10">
      {/* Title with underline */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 inline-block relative">
          OUR PARTNERSHIPS SPEAK FOR THEMSELVES
          <div className="absolute bottom-[-8px] left-0 right-0 h-1 bg-yellow-500 mx-auto w-3/4"></div>
        </h2>
      </div>

      {/* Logo Grid */}
      <div className="mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center mb-10">
        {partners.map((partner, index) => (
          <div key={index} className="flex items-center justify-center">
            <Image
              src={partner.logo}
              alt={partner.name}
              width={150}
              height={60}
              className="w-auto h-12 object-contain"
            />
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <div className="text-center max-w-4xl mx-auto">
        <blockquote className="text-xl text-gray-700 mb-4">
          &quot;US CARGO CONTROL HAS BEEN AN AMAZING VENDOR WITH FAST RESPONSE
          TIME, AMAZING CUSTOMER SERVICE, AND GREAT FOLLOW-UP. BY FAR ONE OF OUR
          EASIEST AND BEST VENDORS TO DEAL WITH.&quot;
        </blockquote>
        <cite className="text-gray-600 italic">
          - General Manager, Fastenal
        </cite>
      </div>
    </div>
  );
}
