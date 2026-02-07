import React from 'react';
import { motion } from 'framer-motion';
import QuoteForm from '@/components/forms/QuoteForm';
import Image from 'next/image';
import Link from 'next/link';

const GreySection = () => {
    return (
        <section className="relative w-full min-h-screen bg-[#c2c1c2] py-20 flex items-center overflow-hidden font-sans selection:bg-gray-950 selection:text-white">

            {/* 背景装饰：全球化水印 (在浅色背景下使用深色半透明) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.08] flex items-center justify-center">
                <svg width="80%" height="80%" viewBox="0 0 800 400" fill="currentColor" className="text-gray-800">
                    <path d="M150,100 Q400,50 650,100 M100,200 Q400,150 700,200 M150,300 Q400,250 650,300" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
                    <circle cx="200" cy="150" r="3" />
                    <circle cx="600" cy="250" r="3" />
                    <circle cx="400" cy="100" r="3" />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    <div className="w-full lg:w-1/2 text-gray-950">
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-3 border border-gray-400 px-4 py-1.5 rounded-full mb-8 bg-white/30 backdrop-blur-sm">
                                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-800">Global Partnership Program</span>
                            </div>

                            <h2 className="text-5xl lg:text-7xl font-black italic tracking-tighter leading-none mb-6 uppercase text-gray-950">
                                Start a <br /> Conversation
                            </h2>

                            <p className="text-xl lg:text-2xl font-light text-gray-700 max-w-xl leading-relaxed mb-10">
                                Request samples, discuss OEM, or get a custom quote — <span className="text-gray-950 font-bold underline decoration-gray-400 underline-offset-8">we ship worldwide.</span>
                            </p>

                            {/* 核心价值主张 */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/50 border border-gray-300 flex items-center justify-center shrink-0 shadow-sm">
                                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold uppercase text-sm tracking-widest text-gray-900">Global Logistics</h4>
                                        <p className="text-xs text-gray-600 mt-1 uppercase leading-relaxed">Reliable shipping to 50+ countries via air, sea, and rail.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/50 border border-gray-300 flex items-center justify-center shrink-0 shadow-sm">
                                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold uppercase text-sm tracking-widest text-gray-900">Wholesale Support</h4>
                                        <p className="text-xs text-gray-600 mt-1 uppercase leading-relaxed">Flexible MOQs and volume-based pricing for long-term growth.</p>
                                    </div>
                                </div>
                            </div>

                            {/* 1:1 全颜色图片展示区域 */}
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="relative mb-12 max-w-xl"
                            >
                                <Link
                                    href="/en/products/1-x-10ft-automatic-retractable-ratchet-strap-full-bend-s-hooks-1760-lbs-bs"
                                    className="block group relative"
                                >
                                    <div className="aspect-square w-full relative group">
                                        <Image src="/v1770431290/7-colors_x0q5dv.png" alt="7-colors available" fill />
                                    </div></Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* 右侧：表单容器 */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <QuoteForm></QuoteForm>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* 侧边装饰文字 (浅灰色背景下的深色暗纹) */}
            <div className="absolute top-1/2 -right-24 -translate-y-1/2 rotate-90 pointer-events-none hidden xl:block">
                <span className="text-[10rem] font-black italic text-gray-950/5 uppercase leading-none">
                    DISTRIBUTION
                </span>
            </div>
        </section>
    );
};

export default GreySection;