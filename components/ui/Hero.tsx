"use client";

import React from "react";
import { MinimalButton } from "./MinimalButton";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-white px-8 md:px-12 py-24 overflow-hidden">
            <div className="max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                {/* Left Side: Massive Typography */}
                <div className="relative z-10 order-2 lg:order-1">
                    <div className="overflow-hidden mb-8">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[clamp(3.5rem,10vw,10rem)] font-black uppercase leading-[0.9] md:leading-[0.85] tracking-[-0.06em] md:tracking-[-0.08em] text-black text-balance"
                        >
                            We craft <br /> <span className="text-[#E8942A]">digital</span> <br /> reality.
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="flex flex-col md:flex-row items-start md:items-center gap-8 mt-12"
                    >
                        <MinimalButton
                            className="w-full md:w-auto text-[10px] px-12 py-6 bg-black text-white hover:bg-[#E8942A] hover:text-black transition-all font-black uppercase tracking-[0.4em] border-none rounded-2xl md:rounded-full"
                            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Explore Work
                        </MinimalButton>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 max-w-[280px] leading-relaxed md:leading-normal">
                            Multi-disciplinary Studio <br className="hidden md:block" /> specializing in 3D Motion, Video <br className="hidden md:block" /> & Brand Identity.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Profile Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="relative z-10 order-1 lg:order-2 flex justify-center lg:justify-end"
                >
                    <div className="relative group w-full max-w-[500px] aspect-[4/5] bg-gray-50 rounded-[2.5rem] overflow-hidden border-2 border-black/5 hover:border-[#E8942A]/30 transition-colors duration-500 shadow-2xl">
                        <img
                            src="/hero_bg.png"
                            alt="Creative Director"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/60 mb-1">Founder / Lead</p>
                                    <h3 className="text-xl font-black uppercase tracking-tight text-white">Creative Director</h3>
                                </div>
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-[#E8942A] group-hover:border-none transition-all duration-300">
                                    <ArrowRight className="text-white group-hover:text-black transition-colors" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#E8942A]/5 blur-[100px] -z-10" />
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-black/5 blur-[80px] -z-10" />
                </motion.div>
            </div>

            {/* Simple Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4"
            >
                <div className="w-[1px] h-12 bg-black animate-pulse" />
            </motion.div>
        </section>
    );
};
