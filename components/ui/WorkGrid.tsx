"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Project, PROJECTS } from "@/data/projects";

const CarouselStart = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isPaused, setIsPaused] = React.useState(false);

    React.useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 4) % PROJECTS.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [isPaused]);

    // Ensure we always have 4 items to show, even if we reach the end
    const visibleItems = [];
    for (let i = 0; i < 4; i++) {
        visibleItems.push(PROJECTS[(currentIndex + i) % PROJECTS.length]);
    }

    return (
        <section
            id="work"
            className="py-24 px-8 md:px-12 bg-[#F5F5F3] relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Architectural Dot Grid Background */}
            <div className="absolute inset-0 w-full h-full bg-dot-black pointer-events-none opacity-50" />

            <div className="max-w-[1800px] mx-auto relative z-10">
                <div className="flex justify-between items-end mb-12 border-b-2 border-black pb-4">
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Selected Work</h2>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30 pb-1">2024-2026</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    <AnimatePresence mode="wait">
                        {visibleItems.map((item, i) => (
                            <motion.div
                                key={`${item.id}-${currentIndex}`} // Unique key to trigger animation on batch change
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <WorkCard item={item} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="mt-20 flex justify-center">
                    <Link
                        href="/work"
                        className="group flex items-center gap-6 py-6 px-12 border-2 border-black/5 hover:border-black transition-all hover:bg-black hover:text-white rounded-full bg-white shadow-lg"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] whitespace-nowrap">View All Projects</span>
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export const WorkGrid = CarouselStart;

const WorkCard = ({ item }: { item: Project }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playPromiseRef = useRef<Promise<void> | null>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            playPromiseRef.current = videoRef.current.play();
            playPromiseRef.current.catch(() => { });
        }
    };

    const handleMouseLeave = async () => {
        const video = videoRef.current;
        if (video) {
            if (playPromiseRef.current) {
                try {
                    await playPromiseRef.current;
                } catch (error) { }
            }
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    };

    return (
        <div
            className="group relative cursor-pointer border border-black/5 hover:border-[#E8942A] transition-colors duration-500 rounded-lg overflow-hidden break-inside-avoid bg-white"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="w-full relative">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-auto block object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-in-out group-hover:scale-105"
                />
                <video
                    ref={videoRef}
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-auto object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                >
                    <source src={item.videoPreview || "/reels/sample.mp4"} type="video/mp4" />
                </video>
            </div>
        </div>
    );
};
