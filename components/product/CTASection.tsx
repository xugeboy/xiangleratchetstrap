"use client";

import { useState } from 'react';
import { FiX, FiChevronRight } from 'react-icons/fi';

export default function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-48 px-6 lg:px-24 text-center bg-black relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(225,29,72,0.15)_0%,_transparent_70%)]" />
        <div className="relative z-20 max-w-5xl mx-auto">
          <h2 className="text-6xl md:text-[11rem] font-black uppercase italic tracking-tighter leading-[0.85] mb-16">
            Audit our <br />
            <span className="text-rose-600">Capability</span>
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-rose-600 hover:bg-rose-500 text-white px-20 py-10 rounded-2xl font-black text-3xl uppercase italic tracking-tighter transition-all shadow-[0_30px_60px_rgba(225,29,72,0.4)]"
          >
            Get Wholesale Quote
          </button>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 transition-all duration-300">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-[#0a0a0a] rounded-[3rem] border border-rose-600/30 p-12 shadow-2xl animate-[fadeIn_0.3s_ease-out] overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-start mb-12">
              <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">
                Wholesale <span className="text-rose-600">Inquiry</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 text-slate-500 hover:text-white transition-colors flex items-center justify-center"
              >
                <FiX className="w-full h-full" />
              </button>
            </div>
            <form className="space-y-6 text-left">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-rose-500">
                    Business Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-rose-600 outline-none transition-colors placeholder:text-slate-800"
                    placeholder="Xiangle Partners"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-rose-500">
                    Quantity
                  </label>
                  <input
                    type="text"
                    className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-rose-600 outline-none transition-colors placeholder:text-slate-800"
                    placeholder="Min. 500 pcs"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-rose-500">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-rose-600 outline-none transition-colors placeholder:text-slate-800"
                  placeholder="partner@company.com"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-rose-500">
                  Requirements
                </label>
                <textarea
                  className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-rose-600 outline-none h-32 transition-colors placeholder:text-slate-800"
                  placeholder="Custom branding, lengths, or special application needs..."
                />
              </div>
              <button
                type="button"
                className="w-full bg-rose-600 py-6 rounded-2xl font-black uppercase italic tracking-widest text-xl hover:bg-rose-500 transition-colors"
              >
                Submit Specification
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
