"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReactLenis, useLenis } from "lenis/react";
import BlackSection from "./blackSection";
import RedSection from "./redSection";
import PinkSection from "./pinkSection";
import BlueSection from "./blueSection";
import OrangeSection from "./orangeSection";
import GreySection from "./greySection";
import GreenSection from "./greenSection";
gsap.registerPlugin(ScrollTrigger);

export default function InnerPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lenis = useLenis();
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        if (!lenis) return;

        const update = (time: number) => {
            lenis.raf(time * 1000);
        };

        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.off("scroll", ScrollTrigger.update);
            gsap.ticker.remove(update);
        };
    }, [lenis]);

    useGSAP(
        () => {
            const sections = gsap.utils.toArray<HTMLElement>("section");

            sections.forEach((section, index) => {
                const container = section.querySelector(".containerx");
                if (!container) return;

                gsap.to(container, {
                    rotation: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "top 20%",
                        scrub: true,
                    },
                });

                if (index === sections.length - 2) return;

                ScrollTrigger.create({
                    trigger: section,
                    start: "bottom bottom",
                    end: "bottom top",
                    pin: true,
                    pinSpacing: false,
                });
            });

            return () => {
                ScrollTrigger.getAll().forEach((t) => t.kill());
                gsap.killTweensOf("*");
            };
        },
        { scope: containerRef }
    );

    return (
        <>
            <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
            <main ref={containerRef} className="w-full">
                {/* Section 1: Black */}
                <section className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden z-10 two">
                    <div className="containerx relative w-full h-full p-8 flex flex-col lg:flex-row rotate-[30deg] origin-bottom-left will-change-transform bg-[#000000]">
                        <BlackSection />
                    </div>
                </section>

                {/* Section 2: Red */}
                <section className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden z-10 two">
                    <div className="containerx relative w-full h-full p-8 flex flex-col lg:flex-row rotate-[30deg] origin-bottom-left will-change-transform bg-[#ff0004]">
                        <RedSection />
                    </div>
                </section>

                {/* Section 3: PINK */}
                <section className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden z-10 three">
                    <div className="containerx relative w-full h-full p-8 flex flex-col lg:flex-row rotate-[30deg] origin-bottom-left will-change-transform bg-[#ff8bdc]">
                        <PinkSection />
                    </div>
                </section>

                {/* Section 4: BLUE */}
                <section className="relative w-full h-[125svh] lg:h-[150svh] min-h-[100svh] overflow-hidden z-10 four">
                    <div className="containerx relative w-full h-full p-8 flex flex-col justify-center items-center text-center gap-4 rotate-[30deg] origin-bottom-left will-change-transform bg-[#009dff]">
                        <BlueSection></BlueSection>
                    </div>
                </section>

                {/* Section 5: GREEN */}
                <section className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden z-10 five">
                    <div className="containerx relative w-full h-full p-8 flex flex-col lg:flex-row rotate-[30deg] origin-bottom-left will-change-transform bg-[#3a5a40]">
                        <GreenSection></GreenSection>
                    </div>
                </section>

                {/* Section 6: ORANGE */}
                <section className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden z-10 six">
                    <div className="containerx relative w-full h-full p-8 flex flex-col lg:flex-row rotate-[30deg] origin-bottom-left will-change-transform bg-[#ffbf00]">
                        <OrangeSection></OrangeSection>
                    </div>
                </section>

                {/* Section 7: GREY */}
                <section className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden z-10 one">
                    <div className="containerx relative w-full h-full p-8 flex flex-col lg:flex-row rotate-[30deg] origin-bottom-left will-change-transform bg-[#c2c1c2] ">
                        <GreySection></GreySection>
                    </div>
                </section>
            </main>
        </>
    );
}