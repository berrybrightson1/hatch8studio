"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Eye,
    Image as ImageIcon,
    Video,
    Calendar,
    ChevronDown,
    Save,
    X,
    Folder
} from "lucide-react";
import { showToast } from "@/components/ui/Toaster";

interface Project {
    _id: string;
    title: string;
    category: string;
    thumbnail: string;
    videoPreview?: string;
    description: string;
    services: string[];
    year: string;
    isFeatured: boolean;
}

export default function ProjectManager() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Partial<Project> | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/admin/projects");
            const data = await res.json();
            if (data.success) {
                setProjects(data.projects);
            }
        } catch (error) {
            showToast("Failed to fetch projects", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = selectedProject?._id ? "PUT" : "POST";
        const url = selectedProject?._id
            ? `/api/admin/projects/${selectedProject._id}`
            : "/api/admin/projects";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(selectedProject),
            });
            const data = await res.json();
            if (data.success) {
                showToast(selectedProject?._id ? "Project Updated" : "Project Created", "success");
                setIsEditing(false);
                fetchProjects();
            }
        } catch (error) {
            showToast("Save failed", "error");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Confirm removal? This cannot be undone.")) return;

        try {
            const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                showToast("Project Removed", "success");
                fetchProjects();
            }
        } catch (error) {
            showToast("Delete failed", "error");
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 md:mb-12">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">Portfolio Engine</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 mt-2">Manage Hive Archive</p>
                </div>
                <button
                    onClick={() => {
                        setSelectedProject({ title: "", category: "", year: new Date().getFullYear().toString(), services: [], isFeatured: false });
                        setIsEditing(true);
                    }}
                    className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-[#E5FF00] hover:text-black transition-all shadow-xl"
                >
                    <Plus size={16} /> Add project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-y-auto pr-2 pb-12 scrollbar-hide no-scrollbar">
                {loading ? (
                    <div className="col-span-full h-64 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : projects.length === 0 ? (
                    <div className="col-span-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-black/5 rounded-[2rem] text-gray-300">
                        <Folder size={48} strokeWidth={1} className="mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Archive is empty</p>
                    </div>
                ) : (
                    projects.map((project) => (
                        <div key={project._id} className="group relative bg-white border-2 border-black/5 rounded-3xl overflow-hidden hover:border-black transition-all">
                            <div className="aspect-video relative overflow-hidden">
                                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute inset-0 bg-black/40 md:opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <button
                                        onClick={() => {
                                            setSelectedProject(project);
                                            setIsEditing(true);
                                        }}
                                        className="p-3 bg-white text-black rounded-full hover:bg-[#E5FF00] transition-colors"
                                        aria-label="Edit project"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="p-3 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                                        aria-label="Delete project"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[8px] font-black uppercase tracking-widest text-black/30">{project.category} / {project.year}</span>
                                    {project.isFeatured && (
                                        <span className="text-[8px] font-black uppercase tracking-widest text-[#E8942A]">Featured</span>
                                    )}
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tighter group-hover:italic transition-all">{project.title}</h3>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal Editor */}
            <AnimatePresence>
                {isEditing && (
                    <div className="fixed inset-0 z-[500] flex items-center justify-center p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                            onClick={() => setIsEditing(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 md:p-8 border-b border-black/5 flex items-center justify-between">
                                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">
                                    {selectedProject?._id ? 'Edit Entry' : 'New Entry'}
                                </h2>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                    aria-label="Close editor"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8 no-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 ml-2">Title</label>
                                        <input
                                            type="text"
                                            required
                                            value={selectedProject?.title || ""}
                                            onChange={(e) => setSelectedProject({ ...selectedProject, title: e.target.value })}
                                            className="w-full bg-black/5 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-widest outline-none focus:ring-2 ring-black/10"
                                            placeholder="PROJECT TITLE"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 ml-2">Category</label>
                                        <input
                                            type="text"
                                            required
                                            value={selectedProject?.category || ""}
                                            onChange={(e) => setSelectedProject({ ...selectedProject, category: e.target.value })}
                                            className="w-full bg-black/5 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-widest outline-none focus:ring-2 ring-black/10"
                                            placeholder="E.G. 3D ANIMATION"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 ml-2">Year</label>
                                        <input
                                            type="text"
                                            required
                                            value={selectedProject?.year || ""}
                                            onChange={(e) => setSelectedProject({ ...selectedProject, year: e.target.value })}
                                            className="w-full bg-black/5 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-widest outline-none focus:ring-2 ring-black/10"
                                            placeholder="2024"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="isFeatured" className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 ml-2">Featured</label>
                                        <div className="flex items-center gap-4 py-4 px-6 bg-black/5 rounded-2xl">
                                            <input
                                                id="isFeatured"
                                                type="checkbox"
                                                checked={selectedProject?.isFeatured || false}
                                                onChange={(e) => setSelectedProject({ ...selectedProject, isFeatured: e.target.checked })}
                                                className="w-5 h-5 accent-black"
                                            />
                                            <span className="text-[9px] font-black uppercase tracking-widest leading-none">Show on homepage</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 ml-2">Thumbnail URL</label>
                                    <input
                                        type="text"
                                        required
                                        value={selectedProject?.thumbnail || ""}
                                        onChange={(e) => setSelectedProject({ ...selectedProject, thumbnail: e.target.value })}
                                        className="w-full bg-black/5 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-widest outline-none focus:ring-2 ring-black/10"
                                        placeholder="HTTPS://..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 ml-2">Video Preview URL (Optional)</label>
                                    <input
                                        type="text"
                                        value={selectedProject?.videoPreview || ""}
                                        onChange={(e) => setSelectedProject({ ...selectedProject, videoPreview: e.target.value })}
                                        className="w-full bg-black/5 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-widest outline-none focus:ring-2 ring-black/10"
                                        placeholder="/REELS/..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 ml-2">Description</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={selectedProject?.description || ""}
                                        onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}
                                        className="w-full bg-black/5 rounded-2xl px-6 py-8 text-sm font-medium outline-none focus:ring-2 ring-black/10 resize-none leading-relaxed"
                                        placeholder="Tell the story of the project..."
                                    />
                                </div>

                                <div className="flex gap-4 pt-10">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="flex-1 py-5 border-2 border-black/10 hover:border-black rounded-xl text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] py-5 bg-black text-white border-2 border-black rounded-xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#E5FF00] hover:text-black transition-all flex items-center justify-center gap-3 shadow-xl"
                                    >
                                        <Save size={14} strokeWidth={3} /> Save project
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
