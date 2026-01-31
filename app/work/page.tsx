"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Project, PROJECTS } from "@/data/projects";
import { X, ArrowRight } from "lucide-react";

export default function WorkPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleNext = () => {
        if (!selectedProject) return;
        const currentIndex = PROJECTS.findIndex(p => p.id === selectedProject.id);
        const nextIndex = (currentIndex + 1) % PROJECTS.length;
        setSelectedProject(PROJECTS[nextIndex]);
    };

    React.useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [selectedProject]);

    // Extract unique categories
    const categories = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

    const filteredProjects = activeCategory === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeCategory);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-40 pb-24 px-8 md:px-12">
                <div className="max-w-[1800px] mx-auto">
                    <div className="border-b-2 border-black pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#E8942A] mb-4">Portfolio</p>
                            <h1 className="text-[clamp(3rem,8vw,10rem)] font-black uppercase leading-[0.85] tracking-[-0.08em]">Projects <br /> / Archive</h1>
                        </div>
                        <div className="max-w-xs">
                            <p className="text-xs font-black uppercase tracking-[0.1em] opacity-40 leading-relaxed">
                                A curated selection of digital experiences, 3D explorations, and visual systems crafted between 2022 and 2026.
                            </p>
                        </div>
                    </div>

                    {/* Category Filter Bar */}
                    <div className="flex flex-wrap gap-4 mb-16">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border-2 transition-all ${activeCategory === cat
                                    ? "bg-black text-white border-black"
                                    : "bg-transparent text-black border-black/10 hover:border-black"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={() => setSelectedProject(project)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Preview Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectPreview
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                        onNext={handleNext}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playPromiseRef = useRef<Promise<void> | null>(null);

    return (
        <motion.div
            layoutId={`project-${project.id}`}
            onClick={onClick}
            className="group cursor-pointer"
            onMouseEnter={() => {
                if (videoRef.current) {
                    playPromiseRef.current = videoRef.current.play();
                    playPromiseRef.current.catch(() => { });
                }
            }}
            onMouseLeave={async () => {
                if (videoRef.current) {
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
            }}
        >
            <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-6 relative border border-black/5 group-hover:border-[#E8942A] transition-colors duration-500">
                <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-50"
                />

                {project.videoPreview && (
                    <video
                        ref={videoRef}
                        src={project.videoPreview}
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    />
                )}

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 rounded-full bg-[#E8942A] text-black flex items-center justify-center font-black text-xs uppercase tracking-widest scale-75 group-hover:scale-100 transition-transform duration-500">
                        View
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-start px-2">
                <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#E8942A] mb-1">{project.category}</p>
                    <h3 className="text-lg font-black uppercase tracking-tighter">{project.title}</h3>
                </div>
                <p className="text-[10px] font-black opacity-20">{project.year}</p>
            </div>
        </motion.div>
    );
};

const ProjectPreview = ({ project, onClose, onNext }: { project: Project; onClose: () => void; onNext: () => void }) => {
    return (
        <div className="fixed inset-0 z-[200] overflow-y-auto px-4 py-8 md:p-12 flex justify-center items-start md:items-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
                layoutId={`project-${project.id}`}
                className="relative w-full max-w-6xl bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex flex-col shadow-2xl z-10"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black transition-all z-20 md:bg-white/80 md:text-black md:border md:border-black/10"
                    aria-label="Close project preview"
                >
                    <X size={20} />
                </button>

                {/* Media Section */}
                <div className="w-full h-[65vh] md:h-[75vh] lg:h-[80vh] bg-gray-50 flex items-center justify-center relative group">
                    {project.videoPreview ? (
                        <video
                            key={project.videoPreview}
                            src={project.videoPreview}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* Footer Section - Compact & Centered */}
                <div className="bg-white px-8 py-8 md:px-12 md:py-10 border-t border-black/5 flex justify-center">
                    <button
                        onClick={onNext}
                        className="w-full md:max-w-md bg-black text-white px-10 py-6 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-[#E8942A] hover:text-black transition-all flex items-center justify-center gap-6 group rounded-2xl md:rounded-full"
                    >
                        Next Project
                        <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform italic" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
