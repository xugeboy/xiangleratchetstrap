"use client";

import Image from 'next/image';
import { FiTruck, FiShield, FiPackage } from 'react-icons/fi';

const scenarios = [
  {
    icon: <FiTruck className="w-full h-full" />,
    title: "OVERLAND",
    subtitle: "ROOF RACK SYSTEM",
    description: "Military-grade security for extreme off-road terrain.",
    bg: "bg-[#0a0a0a]",
    image: "/image/overland-scenario.jpg",
  },
  {
    icon: <FiShield className="w-full h-full" />,
    title: "MARINE",
    subtitle: "SALTWATER RESISTANT",
    description: "304 Stainless steel variants for professional boat storage.",
    bg: "bg-[#080808]",
    accent: true,
    image: "/image/marine-scenario.jpg",
  },
  {
    icon: <FiPackage className="w-full h-full" />,
    title: "LOGISTICS",
    subtitle: "DAILY COMMERCIAL USE",
    description: "Engineered for high-frequency loading dock efficiency.",
    bg: "bg-black",
    image: "/image/logistics-scenario.jpg",
  },
];

export default function ApplicationScenarios() {
  return (
    <section className="py-40 px-6 lg:px-24 bg-[#050505] relative z-10">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8">
            Built for <span className="text-rose-600">Every Application</span>
          </h2>
          <div className="w-24 h-1 bg-rose-600 mx-auto mb-8" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {scenarios.map((scenario, index) => (
            <div
              key={index}
              className={`${scenario.bg} rounded-[3rem] p-12 border border-white/5 overflow-hidden group hover:border-rose-600/30 transition-all relative min-h-[500px] flex flex-col`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <Image
                  src={scenario.image}
                  alt={scenario.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <div className={`w-32 h-32 mb-12 ${scenario.accent ? 'text-rose-600' : 'text-white'} opacity-50 group-hover:opacity-100 transition-opacity flex items-center justify-center relative z-10`}>
                {scenario.icon}
              </div>
              
              <span className="font-mono text-xs tracking-[0.5em] text-rose-500 uppercase mb-4 relative z-10">
                {scenario.subtitle}
              </span>
              
              <h3 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-8 relative z-10">
                {scenario.title}
              </h3>
              
              <p className="text-xl text-slate-400 font-light italic relative z-10 mt-auto">
                {scenario.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
