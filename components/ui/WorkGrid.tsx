"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Project, projects } from "@/lib/projects";

const items: Project[] = projects.slice(0, 4);

export const WorkGrid = () => {
    return (
        <section id="work" className="py-24 px-8 md:px-12 bg-white">
            <div className="max-w-[1800px] mx-auto">
                <div className="flex justify-between items-end mb-12 border-b-2 border-black pb-4">
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Selected Work</h2>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30 pb-1">2024-2026</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {items.map((item) => (
                        <WorkCard key={item.id} item={item} />
                    ))}
                </div>

                <div className="mt-20 flex justify-center">
                    <Link
                        href="/work"
                        className="group flex items-center gap-6 py-6 px-12 border-2 border-black/5 hover:border-black transition-all hover:bg-black hover:text-white rounded-full"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] whitespace-nowrap">View All Projects</span>
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

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
            // Re-check because of the await
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    };

    return (
        <motion.div
            className="group relative cursor-pointer border border-black/5 hover:border-[#E8942A] transition-colors duration-500 rounded-lg overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-in-out group-hover:scale-105"
                />
                {/* Hover Video Preview */}
                <video
                    ref={videoRef}
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                >
                    <source src={item.videoPreview || "/reels/sample.mp4"} type="video/mp4" />
                </video>
            </div>

            <div className="p-4 flex justify-between items-start bg-white">
                <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{item.category}</p>
                    <h3 className="text-sm font-black uppercase tracking-tighter leading-none">{item.title}</h3>
                </div>
                <div className="w-6 h-6 border border-black flex items-center justify-center group-hover:bg-[#E8942A] group-hover:border-[#E8942A] text-black group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight size={14} />
                </div>
            </div>
        </motion.div>
    );
};
