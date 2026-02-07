import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * OEMNode: 思维导图的分支节点
 */
const OEMNode = ({ label, imgUrl, side = 'left', delay = 0 }) => {
    const isLeft = side === 'left';

    return (
        <motion.div
            initial={{ x: isLeft ? -30 : 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay, duration: 0.6 }}
            className={`flex items-center gap-4 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
        >
            <div className="relative group">
                <div className="absolute -inset-1 bg-white opacity-20 blur group-hover:opacity-40 rounded-full transition" />
                <div className="relative w-16 h-16 md:w-28 md:h-28 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 flex items-center justify-center">
                    <Image src={imgUrl} alt={label}
                        fill
                    />
                </div>
            </div>
            <div className={` ${isLeft ? 'text-left' : 'text-right'}`}>
                <p className="font-bold whitespace-nowrap">{label}</p>
            </div>
        </motion.div>
    );
};

const OrangeSection = () => {
    return (
        <section className="relative w-full h-[100svh] flex flex-col md:flex-row items-center justify-center p-6">

            {/* 背景水印 */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-10">
                <h2 className="text-[20rem] font-black italic  whitespace-nowrap leading-none select-none uppercase">
                    OEM READY
                </h2>
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">

                {/* 标题部分 */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-7xl font-black italic  uppercase tracking-tighter mb-4"
                    >
                        Your Brand, <br className="md:hidden" /> Our Expertize.
                    </motion.h2>
                    <p className=" text-lg md:text-xl font-light max-w-2xl mx-auto">
                        Colors, webbing, hooks, and packaging — <span className="font-bold underline decoration-white/40">OEM/ODM ready</span> with short lead times.
                    </p>
                </div>

                {/* 核心思维导图区域 */}
                <div className="w-full flex flex-col lg:flex-row items-center justify-center mb-24">

                    {/* 左侧分支 */}
                    <div className="flex flex-col gap-12">
                        <OEMNode label="S-Hooks" imgUrl="/v1770428407/S_hook_nbqi7y.png" side="left" delay={0.2} />
                        <OEMNode label="Claw-Hooks" imgUrl="/v1770428407/Claw_Hook_j57gqy.png" side="left" delay={0.4} />
                        <OEMNode label="Swan-Hooks" imgUrl="/v1770428407/Swan_Hook_fz9d3m.png" side="left" delay={0.6} />
                    </div>

                    {/* 中心枢纽：横向拉紧器图片 */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full"
                    >
                        <div className="absolute inset-0" />
                        <Image src="/v1770370281/oem-ready_pqvnvt.png" alt="marine-grade"
                            width={1200}
                            height={1200} />
                    </motion.div>

                    {/* 右侧分支 */}
                    <div className="flex flex-col gap-12">
                        <OEMNode label="L-Track Fittings" imgUrl="/v1770428406/L_Track_Fitting_sltdqo.png" side="right" delay={0.3} />
                        <OEMNode label="D-Rings" imgUrl="/v1770428406/D_ring_zfqvnb.png" side="right" delay={0.5} />
                        <OEMNode label="M8 Bolts" imgUrl="/v1770428406/m8_bolts_b5uuwq.png" side="right" delay={0.7} />
                    </div>

                </div>

                {/* 底部定制品牌画廊 */}
                <div className="w-full">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-white/20" />
                        <h3 className=" text-sm font-bold uppercase tracking-[0.3em]">Custom Branding Solutions</h3>
                        <div className="h-px flex-1 bg-white/20" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {[
                            { name: 'Slik Screen', desc: 'Cost Effective', imgUrl: '/v1757406970/CustomPrinting_13_daqvzh.jpg' },
                            { name: 'PVC Label', desc: 'Premium Branding', imgUrl: '/v1770429827/PU_Label_egnixd.png'  },
                            { name: 'Colorful Box', desc: 'Retail Display', imgUrl: '/v1770429484/colorful_box_izopq4.png'  },
                            { name: 'Plastic Tag', desc: 'Supermarket Labeling', imgUrl: '/v1770429483/plastic_tag_tc2fcb.png'  },
                            { name: 'Zipper Bag', desc: 'Industrial Packaging', imgUrl: '/v1770429483/zipper_bag_b5i6vp.png'  }
                        ].map((item, idx) => (
                            <motion.div
                                key={item.name}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 * idx }}
                                className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/20 transition-colors cursor-pointer group text-center"
                            >
                                <div className="aspect-square rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                                <div className="relative w-full h-full p-2 flex items-center justify-center">
                                    <Image src={item.imgUrl} alt={item.desc} fill />   
                                </div>                     
                                </div>
                                <h4 className=" font-bold text-s uppercase tracking-tight">{item.name}</h4>
                                <p className="text-sm mt-1 italic">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default OrangeSection;