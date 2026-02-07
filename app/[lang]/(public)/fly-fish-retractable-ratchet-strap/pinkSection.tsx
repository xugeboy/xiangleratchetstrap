import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PinkSection = () => {
    return (
        <section className="relative w-full min-h-screen overflow-hidden font-sans flex items-center justify-center">

            {/* 中央内容容器 */}
            <div className="relative w-full mx-auto px-6 md:px-12">

                {/* 局部背景图片 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                >
                    <div className="relative container aspect-square">
                        <Image
                            src="/v1770364973/one-hand_operation_thth5w.png"
                            alt="one-hand operation background"
                            fill
                            className="object-contain"
                        />
                    </div>
                </motion.div>

                {/* 内容主体 */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 container mx-auto text-left"
                >
                    {/* 标签 */}
                    <div className="inline-block bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-6 border border-white/20">
                        <span className="text-xs md:text-sm font-bold tracking-[0.35em] uppercase text-white">
                            Ergonomic Engineering
                        </span>
                    </div>

                    {/* 标题 */}
                    <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.85] mb-8 uppercase text-white">
                        Fits in <br /> Your Palm
                    </h2>

                    {/* 副标题 */}
                    <p className="text-xl md:text-3xl font-light leading-relaxed mb-12 text-white max-w-3xl mx-auto">
                        Don’t let the size fool you. <br />
                        Industrial performance in a{' '}
                        <span className="font-bold underline decoration-white/40 underline-offset-4">
                            pocket-sized
                        </span>{' '}
                        form factor.
                    </p>

                    {/* 卖点 */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <div className="flex items-center gap-4 group">
                            <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-pink-600 transition-colors text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 013 0m-6 3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                                </svg>
                            </div>
                            <div className="text-white text-left">
                                <h4 className="font-bold text-sm md:text-base uppercase tracking-tight">
                                    One-Hand Operation
                                </h4>
                                <p className="text-xs opacity-90">
                                    Simple trigger mechanism for effortless use.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-pink-600 transition-colors text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="text-white text-left">
                                <h4 className="font-bold text-sm md:text-base uppercase tracking-tight">
                                    Tactical Portability
                                </h4>
                                <p className="text-xs opacity-90">
                                    Ready when you are, wherever you go.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PinkSection;
