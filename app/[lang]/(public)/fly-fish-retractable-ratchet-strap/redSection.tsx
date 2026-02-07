import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

/**
 * Counter 动效组件：用于实现数字从 0 滚动到目标值
 */
const Counter = ({ value, duration = 2, suffix = "" }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const nodeRef = useRef(null);
    const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = parseInt(value);
            if (start === end) return;


            const timer = setInterval(() => {
                start += Math.ceil(end / 60); // 每一帧增加的量，约 60fps
                if (start >= end) {
                    setDisplayValue(end);
                    clearInterval(timer);
                } else {
                    setDisplayValue(start);
                }
            }, 1000 / 60);

            return () => clearInterval(timer);
        }
    }, [isInView, value, duration]);

    return <span ref={nodeRef}>{displayValue.toLocaleString()}{suffix}</span>;
};

const RedSection = () => {
    const containerRef = useRef(null);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex items-center overflow-hidden font-sans selection:bg-white "
        >
            <div className="container mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

                    {/* 左侧：产品图片展示 */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full lg:w-1/2 relative"
                    >

                        <Image src="/v1770358055/test_report_sgw4mh.png" alt="test_report"
                            width={1200}
                            height={1200} />

                        {/* 图片下方的质量印章标签 */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.8, type: "spring" }}
                            className="absolute -bottom-6 -right-6 bg-black text-white p-6 rounded-full w-32 h-32 flex flex-col items-center justify-center text-center shadow-2xl"
                        >
                            <span className="text-[10px] uppercase tracking-tighter opacity-70">Lab Tested</span>
                            <span className="text-xl font-bold leading-none">100%<br />SAFE</span>
                        </motion.div>
                    </motion.div>

                    {/* 右侧：文案与核心数据 (使用指定图片作为背景) */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="w-full lg:w-9/12 relative overflow-hidden flex items-center">
                        {/* 1. 背景图片层 */}
                        <div className="absolute inset-0 z-0">
                            <Image src="/v1770360339/EngineeredtoHold_idkkwr.png" alt="EngineeredtoHold"
                                width={1200}
                                height={1200} />
                        </div>

                        {/* 3. 文案内容层 */}
                        <div className="relative z-10 p-8 md:p-16 text-white w-full">
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-5xl lg:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6">
                                    Engineered <br /> to Hold
                                </h2>
                                <p className="text-xl lg:text-2xl font-light opacity-90 max-w-xl leading-relaxed mb-12">
                                    Strength is not claimed. <br />
                                    <span className="font-medium">It’s tested, repeated, and proven.</span>
                                </p>
                            </motion.div>

                            {/* 数据网格 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* 800kg BS */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="border-l-4 border-white pl-6 py-2"
                                >
                                    <div className="text-5xl lg:text-7xl font-black flex items-baseline gap-2">
                                        <Counter value="1760" suffix="lbs" />
                                    </div>
                                    <div className="text-sm font-bold uppercase tracking-[0.2em] mt-2 flex flex-col">
                                        <span>Breaking Strength</span>
                                        <span className="opacity-80 text-xs italic">~ <Counter value="800" suffix=" kg" /></span>
                                    </div>
                                </motion.div>

                                {/* 400kg LC */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="border-l-4 border-white/40 pl-6 py-2"
                                >
                                    <div className="text-5xl lg:text-7xl font-black opacity-80 flex items-baseline gap-2">
                                        <Counter value="586" suffix="lbs" />
                                    </div>
                                    <div className="text-sm font-bold uppercase tracking-[0.2em] mt-2 flex flex-col">
                                        <span>Working Load Limit</span>
                                        <span className="opacity-80 text-xs italic">~ <Counter value="400" suffix=" daN" /> LC</span>
                                    </div>
                                </motion.div>

                            </div>

                            {/* 补充说明 */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="mt-16 p-4 items-center gap-4"
                            >
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse  inline-flex" />
                                <p className="text-s uppercase tracking-widest font-bold italic  inline-flex ml-2">
                                    Verified by TUV Agency
                                </p>
                            </motion.div>
                            {/* 补充说明 */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="p-4 items-center gap-4"
                            >
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse inline-flex" />
                                <p className="text-s uppercase tracking-widest font-bold italic inline-flex ml-2">
                                    Complies with WSTDA standards
                                </p>
                            </motion.div>
                            {/* 补充说明 */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="p-4 items-center gap-4"
                            >
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse inline-flex" />
                                <p className="text-s uppercase tracking-widest font-bold italic inline-flex ml-2">
                                    Complies with EN 12195-2 standards
                                </p>
                            </motion.div>
                            {/* 补充说明 */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="p-4 items-center gap-4"
                            >
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse inline-flex" />
                                <p className="text-s uppercase tracking-widest font-bold italic inline-flex ml-2">
                                    Complies with AS/NZS 4380 standards
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default RedSection;