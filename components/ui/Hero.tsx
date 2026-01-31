"use client";

import React from "react";
import { MinimalButton } from "./MinimalButton";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-[#FDFDFD] px-8 md:px-12 py-24 overflow-hidden">
            {/* Noise Overlay */}
            <div className="absolute inset-0 w-full h-full bg-noise pointer-events-none opacity-40 z-0" />

            {/* Ambient Background blobs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8942A]/10 rounded-full blur-[120px] -z-10"
            />
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-200/50 rounded-full blur-[100px] -z-10"
            />

            <div className="max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">

                {/* Left Side: Staggered Massive Typography */}
                <div className="relative order-2 lg:order-1">
                    <div className="overflow-visible mb-8">
                        <motion.h1 className="text-[clamp(3.5rem,10vw,9.5rem)] font-black uppercase leading-[0.85] tracking-[-0.06em] md:tracking-[-0.08em] text-black text-balance">
                            {/* Staggered Words */}
                            <div className="overflow-hidden">
                                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                                    We Craft
                                </motion.div>
                            </div>
                            <div className="overflow-hidden">
                                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8942A] to-[#ffaa40]">Digital</span>
                                </motion.div>
                            </div>
                            <div className="overflow-hidden">
                                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
                                    Reality.
                                </motion.div>
                            </div>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col md:flex-row items-start md:items-center gap-8 mt-12"
                    >
                        <MinimalButton
                            className="w-full md:w-auto text-[11px] px-10 py-5 bg-black text-white hover:bg-[#E8942A] hover:text-black transition-all font-black uppercase tracking-[0.3em] border-none rounded-xl hover:scale-105 active:scale-95 duration-300 shadow-xl shadow-black/10"
                            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Explore Work
                        </MinimalButton>
                        <p className="text-[11px] font-black uppercase tracking-[0.15em] text-black/50 max-w-[280px] leading-relaxed">
                            Multi-disciplinary Studio <br className="hidden md:block" /> specializing in 3D Motion, Video <br className="hidden md:block" /> & Brand Identity.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Interactive 3D Tilt Card */}
                <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end perspective-1000">
                    <motion.div
                        style={{ x, y, rotateX, rotateY, z: 100 }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => { x.set(0); y.set(0); }}
                        className="relative w-full max-w-[500px] aspect-[4/5] cursor-none"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="w-full h-full bg-gray-100 rounded-[2.5rem] overflow-hidden border border-black/5 shadow-2xl relative group"
                        >
                            <img
                                src="/hero_bg.png"
                                alt="Creative Director"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-[1.02] group-hover:scale-110"
                            />

                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                            {/* Floating Badge */}
                            <motion.div
                                className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="w-3 h-3 bg-[#E8942A] rounded-full animate-pulse" />
                            </motion.div>

                            <div className="absolute bottom-10 left-10">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E8942A] mb-2">Founder / Lead</p>
                                <h3 className="text-3xl font-black uppercase tracking-tight text-white leading-none">Creative <br /> Director</h3>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
