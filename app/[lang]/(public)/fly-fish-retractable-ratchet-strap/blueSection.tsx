import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * BlueSection: 增加滚动联动动画
 * 太阳从左上角缩放滑入，海浪从右下角滑入
 */
const BlueSection = () => {
    const containerRef = useRef(null);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex items-center overflow-hidden font-san "
        >

            {/* 背景装饰：大号镂空文字 */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-10">
                <h2 className="text-[15rem] lg:text-[20rem] font-black italic text-white whitespace-nowrap leading-none select-none uppercase">
                    Marine Grade
                </h2>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* 左侧：文案内容 */}
                    <div className="w-full lg:w-1/2 text-white order-2 lg:order-1">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-5xl lg:text-8xl font-black italic tracking-tighter leading-[0.9] mb-8 uppercase">
                                Ready for <br /> All Weathers
                            </h2>

                            <p className="text-lg lg:text-xl font-light opacity-90 max-w-xl leading-relaxed mb-10">
                                From scorching UV rays to corrosive salt water. <br />
                                Our high-tenacity webbing and <span className="font-bold text-blue-200 underline decoration-blue-300 underline-offset-8">Stainless Steel Parts</span> are built for the toughest marine conditions.
                            </p>

                            {/* 特性展示卡片 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                    <h4 className="font-bold uppercase text-s">UV Resistant</h4>
                                    <p className="opacity-60 uppercase mt-1 italic tracking-wider">Zero-fading technology</p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                    <h4 className="font-bold uppercase text-s">Marine Grade</h4>
                                    <p className="opacity-60 uppercase mt-1 italic tracking-wider">AISI 304L/316L Stainless</p>
                                </div>
                            </div>

                            {/* 适用场景标签 */}
                            <div className="mt-10 flex flex-wrap gap-2">
                                {['Marine', 'Pickup', 'Roof Racks', 'Kayaks'].map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-blue-900/40 border border-white/10 rounded-full uppercase tracking-widest font-bold">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* 右侧：场景化图片展示 */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="w-full lg:w-1/2 order-1 lg:order-2"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-2" />
                            <div className="relative overflow-hidden">
                                <Image src="/v1770366932/marine-grade_hqavai.png" alt="marine-grade"
                                    width={1200}
                                    height={1200} />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default BlueSection;