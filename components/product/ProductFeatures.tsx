"use client";

import { FiZap, FiShield, FiPackage, FiSettings, FiCheck } from 'react-icons/fi';

const features = [
  {
    icon: <FiZap className="w-full h-full" />,
    title: "3s Deployment",
    description: "Instant lock. Instant retract. No manual winding. Ever.",
  },
  {
    icon: <FiShield className="w-full h-full" />,
    title: "Steel Casing",
    description: "Impact-resistant housing designed for construction sites.",
  },
  {
    icon: <FiPackage className="w-full h-full" />,
    title: "Factory Supply",
    description: "Direct wholesale pricing from the source manufacturer.",
  },
  {
    icon: <FiSettings className="w-full h-full" />,
    title: "All-Metal Core",
    description: "CNC-machined steel ratchet mechanism. No plastic gears.",
  },
  {
    icon: <FiCheck className="w-full h-full" />,
    title: "1760 LBS Strength",
    description: "Verified break strength. Tested to ISO9001 standards.",
  },
  {
    icon: <FiShield className="w-full h-full" />,
    title: "Dual M8 Mounting",
    description: "Designed for custom base plates. OEM integration ready.",
  },
];

export default function ProductFeatures() {
  return (
    <section className="py-40 px-6 lg:px-24 bg-[#080808] relative z-10">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8">
            Design for <span className="text-rose-600">Heavy Duty</span>
          </h2>
          <div className="w-24 h-1 bg-rose-600 mx-auto mb-8" />
          <p className="text-xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto">
            Most automatic straps use plastic internal gears that shear under 400 lbs of lateral tension. 
            XiangleTools uses a CNC-machined steel ratchet core.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-12 bg-white rounded-[2.5rem] border border-transparent transition-all hover:shadow-2xl group text-black"
            >
              <div className="w-16 h-16 mb-8 text-rose-600 group-hover:scale-110 transition-transform flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
