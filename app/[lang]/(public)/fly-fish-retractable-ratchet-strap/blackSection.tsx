import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * FeaturePin 子组件：处理内部的标注逻辑
 */
const FeaturePin = ({ x, y, label, subLabel, direction = 'left', delay = 0 }) => {
    const isLeft = direction === 'left';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="absolute z-20 pointer-events-none"
            style={{ top: `${y}%`, left: `${x}%` }}
        >
            {/* 标注原点 */}
            <div className="relative">
                <motion.div
                    className="w-3 h-3 md:w-4 md:h-4 bg-red-600 rounded-full shadow-[0_0_12px_rgba(220,38,38,0.9)]"
                />
                <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-400 rounded-full"
                />
            </div>

            {/* 响应式 SVG 折线 */}
            <svg
                className={`absolute ${isLeft ? 'bottom-2.5 right-2 md:right-4' : 'bottom-2.5 left-2 md:left-4'} 
                    w-[80px] h-[60px] md:w-[220px] md:h-[120px]`}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: delay + 0.3 }}
                    d={isLeft
                        ? `M 100 100 L 70 50 L 5 50`
                        : `M 0 100 L 30 50 L 95 50`
                    }
                    fill="transparent"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                />
            </svg>

            {/* 文案内容块 */}
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: delay + 0.8 }}
                className={`absolute whitespace-nowrap 
            ${isLeft
                        ? 'right-[65px] md:right-[250px] bottom-[25px] md:bottom-[50px]'
                        : 'left-[65px] md:left-[250px] bottom-[25px] md:bottom-[50px]'
                    }`}
            >
                <div className={`flex flex-col ${isLeft ? 'items-end' : 'items-start'}`}>
                    <h3 className="text-[#f5f5f5] text-xs md:text-3xl font-bold tracking-wider drop-shadow-md">
                        {label}
                    </h3>
                    <p className="text-[#9ca3af] text-[8px] md:text-xl font-mono uppercase tracking-widest mt-0.5">
                        {subLabel}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

/**
 * ProductSpotlight 主组件
 * 您可以将此文件放入 components/ProductSpotlight.jsx
 */
const BlackSection = () => {
    return (
        <div className="min-h-screen w-full bg-[#0a0a0a] text-white overflow-hidden font-sans">
            <section className="relative w-full h-[100svh] flex flex-col md:flex-row items-center justify-center p-6">

                {/* 背景装饰层 */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] rotate-[20deg] opacity-[0.03]">
                        <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(255,255,255,0.1)_41px)] md:bg-[repeating-linear-gradient(90deg,transparent,transparent_80px,rgba(255,255,255,0.1)_81px)]" />
                    </div>
                </div>

                <div className="relative w-full container mx-auto h-full flex flex-col justify-between md:justify-center items-center py-12 md:py-0">

                    {/* 标题层 */}
                    <div className="md:absolute md:top-0 md:left-0 z-10 w-full text-center md:text-left">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl md:text-8xl font-black italic tracking-tighter leading-[0.9] text-white uppercase">
                                {"Built on Reliability".split(' ').map((word, i) => (
                                    <React.Fragment key={i}>
                                        {word} {i === 1 && <br className="hidden md:block" />}
                                    </React.Fragment>
                                ))}
                            </h1>
                            <span className="text-red-600 font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm mb-1 block">
                                Core design validated by long-term customers and repeated production runs.
                            </span>
                        </motion.div>
                    </div>

                    {/* 产品展示核心区 */}
                    <div className="relative w-full max-w-[1200px] aspect-square flex items-center justify-center my-8 md:my-0">

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative z-10 w-full"
                        >
                            <Image src="/v1770356881/test_ebnadi.png" alt="WhatsApp QR Code"
                                width={1200}
                                height={1200} />
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-black blur-[30px] opacity-60 rounded-full -z-10" />
                        </motion.div>

                        {/* 标注点 */}
                        <FeaturePin x={35} y={45} label="Nylon Spring Protective Housing" subLabel="Durable impact resistance for long-term use." direction="left" delay={0.5} />
                        <FeaturePin x={60} y={57} label="Fish-Mouth Webbing Inlet" subLabel="Precision-engineered for smooth, snag-free operation." direction="right" delay={0.8} />
                        <FeaturePin x={45} y={30} label="All-Black Surface Finish" subLabel="Superior corrosion resistance with a sleek, tactical aesthetic." direction="right" delay={1.1} />

                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-900/40 to-transparent" />
            </section>
        </div>
    );
};

export default BlackSection;