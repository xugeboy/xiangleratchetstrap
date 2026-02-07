import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

/**
 * Counter 动效组件：用于强调 100k 产能
 */
const Counter = ({ value, duration = 2, suffix = "" }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const nodeRef = useRef(null);
    const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = parseInt(value);
            let timer = setInterval(() => {
                start += Math.ceil(end / 80);
                if (start >= end) {
                    setDisplayValue(end);
                    clearInterval(timer);
                } else {
                    setDisplayValue(start);
                }
            }, 1000 / 60);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return <span ref={nodeRef}>{displayValue.toLocaleString()}{suffix}</span>;
};

const GreenSection = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center overflow-hidden font-sans">

            {/* 背景装饰：超大号水印 */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex flex-col justify-center opacity-10 leading-none">
                <motion.h2
                    animate={{ x: [20, 40] }}
                    transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                    className="text-[20rem] font-black italic text-white whitespace-nowrap"
                >
                    MASS PRODUCTION
                </motion.h2>
                <motion.h2
                    animate={{ x: [40, 60] }}
                    transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                    className="text-[20rem] font-black italic text-white whitespace-nowrap"
                >
                    CONSISTENT QUALITY
                </motion.h2>
            </div>

            <div className="container mx-auto px-6 relative z-10 py-20">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-16">

                    {/* 左侧：文案内容 */}
                    <div className="w-full lg:w-5/12 text-white order-2 lg:order-1">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* 1. 背景图片层 */}
                            <div className="absolute mt-80 inset-0 -z-10">
                                <Image src="/v1770434312/consistency_turi3n.png" alt="consistency"
                                    width={600}
                                    height={600} />
                            </div>

                            <h2 className="text-5xl lg:text-8xl font-black italic tracking-tighter leading-[0.9] mb-8 uppercase">
                                Consistency <br /> at Scale
                            </h2>

                            <p className="text-xl lg:text-2xl font-light opacity-90 max-w-xl leading-relaxed mb-12">
                                Over <span className="font-bold text-green-300 underline decoration-white/20 underline-offset-8"><Counter value="1500000" suffix="+" /> units</span> produced — every piece with identical feel and quality.
                            </p>

                            {/* 核心指标展示 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-2">Daily Output</h4>
                                    <p className="text-4xl font-black italic leading-none"><Counter value="9000" suffix="+" /></p>
                                    <p className="text-[10px] uppercase opacity-50 mt-2">Units</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-2">Quality Pass Rate</h4>
                                    <p className="text-4xl font-black italic leading-none text-white">100%</p>
                                    <p className="text-[10px] uppercase opacity-50 mt-2">Guaranteed</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* 右侧：扣掉背景的车间大图 */}
                    <div className="w-full lg:w-7/12 order-1 lg:order-2 relative">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
                            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-10 object-contain"
                        >
                            {/* 这里放置您提供的扣掉背景的车间图 */}
                            <Image src="/v1770434048/mass_production_b32xhm.jpg" alt="mass production" width={1200} height={1200} />

                            {/* 装饰性光效 */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-green-400/20 blur-[150px] -z-10 rounded-full" />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default GreenSection;