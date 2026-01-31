"use client";

import React from "react";
import { MinimalButton } from "./MinimalButton";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [15, -15]);
    const rotateY = useTransform(x, [-100, 100], [-15, 15]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / 2);
        y.set((e.clientY - centerY) / 2);
    };

    return (
        <section className="relative w-full min-h-[95vh] flex items-center justify-center bg-[#0a0a0a] px-6 md:px-12 pt-32 pb-20 md:py-32 overflow-hidden selection:bg-[#E8942A] selection:text-black font-inter">
            {/* Liquid Mesh Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-[0.05] z-[1] pointer-events-none mix-blend-overlay" />

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -left-[10%] w-[100vw] h-[100vw] md:w-[80vw] md:h-[80vw] bg-[#E8942A] rounded-full blur-[100px] md:blur-[150px] opacity-40 mix-blend-screen"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 50, 0],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-[10%] right-[0%] w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] bg-[#444] rounded-full blur-[80px] md:blur-[120px] opacity-30 mix-blend-screen"
                />
            </div>

            <div className="max-w-[1920px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">

                {/* Left Side: Staggered Typography */}
                <div className="lg:col-span-7 relative z-20 order-2 lg:order-1 pt-6 lg:pt-0">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="overflow-hidden mb-6 md:mb-8">
                            <motion.p
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="text-[#E8942A] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-[10px] md:text-sm"
                            >
                                Digital Experience Studio
                            </motion.p>
                        </div>

                        <h1 className="text-white text-[clamp(3.5rem,12vw,11.5rem)] font-black uppercase leading-[0.85] md:leading-[0.8] tracking-[-0.05em]">
                            <span className="block mb-2 md:mb-4">Pure</span>
                            <span className="block text-white/5 stroke-text hover:text-[#E8942A] transition-colors duration-500 cursor-default mb-2 md:mb-4">Digital</span>
                            <span className="block text-[#E8942A]">Impact.</span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="text-white/40 mt-8 md:mt-12 max-w-lg text-base md:text-xl font-light leading-relaxed tracking-wide"
                        >
                            We build immersive digital realities that redefine how brands connect with their audience.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="mt-10 md:mt-16 flex items-center gap-8"
                        >
                            <MinimalButton
                                className="w-full md:w-auto px-10 md:px-12 py-6 md:py-7 bg-white text-black hover:bg-[#E8942A] transition-all font-black uppercase tracking-[0.2em] text-[10px] rounded-full shadow-2xl shadow-white/5"
                                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                View Selected Works
                            </MinimalButton>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right Side: Glassmorphism Card */}
                <div className="lg:col-span-5 relative flex items-center justify-center order-1 lg:order-2 perspective-1000">
                    <motion.div
                        style={{ x, y, rotateX, rotateY, z: 100 }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => { x.set(0); y.set(0); }}
                        className="relative w-full max-w-[400px] lg:max-w-[550px] aspect-[4/5] cursor-none"
                    >
                        {/* Interactive Shine */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent z-[11] pointer-events-none rounded-[2.5rem] md:rounded-[3.5rem]" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                            className="w-full h-full bg-white/5 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden relative z-10 group"
                        >
                            <img
                                src="/hero_bg.png"
                                alt="Director"
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                            <div className="relative z-20 p-8 md:p-12 w-full h-full flex flex-col justify-end">
                                <div className="flex justify-between items-end border-t border-white/10 pt-6 md:pt-8">
                                    <div>
                                        <p className="text-[#E8942A] uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px] font-black mb-2 md:mb-3">Founder / Lead</p>
                                        <h2 className="text-white text-2xl md:text-4xl font-black uppercase tracking-tight leading-none italic">Creative<br />Director</h2>
                                    </div>
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-[#E8942A] transition-all duration-300">
                                        <ArrowRight size={20} className="md:w-6 md:h-6" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 right-8 hidden lg:block z-20">
                <div className="flex items-center gap-6 text-white/20 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">
                    <div className="w-12 md:w-20 h-[1px] bg-white/10" />
                    Interactive
                </div>
            </div>
        </section>
    );
};
