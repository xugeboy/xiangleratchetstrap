"use client";

const specs = [
  { label: "Break Strength", value: "1760 LBS", desc: "Verified tensile test" },
  { label: "Cycles", value: "10,000+", desc: "Retraction test" },
  { label: "Base", value: "M8 Bolt", desc: "Dual mounting" },
  { label: "Width", value: "1 inch", desc: "Standard webbing" },
  { label: "Material", value: "All-Metal", desc: "Steel casing" },
  { label: "Certification", value: "ISO9001", desc: "Quality standard" },
];

export default function TechnicalSpecs() {
  return (
    <section className="py-40 px-6 lg:px-24 bg-black relative z-10">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
          <div>
            <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8">
              Technical <br />
              <span className="text-rose-600">Specifications</span>
            </h2>
            <div className="w-full h-px bg-white/10 mb-8" />
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              Every component engineered for maximum performance and durability. 
              Industrial-grade materials throughout.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {specs.map((spec, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/5 p-8 rounded-3xl group hover:border-rose-600/30 transition-colors"
              >
                <span className="font-mono text-[10px] text-rose-500 uppercase tracking-widest block mb-2">
                  {spec.label}
                </span>
                <span className="text-4xl font-black block mb-1 italic tracking-tighter">
                  {spec.value}
                </span>
                <span className="text-xs text-slate-500 uppercase">{spec.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
