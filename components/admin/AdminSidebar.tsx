"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Briefcase,
    Inbox,
    Settings,
    LogOut,
    ArrowRight,
    Menu,
    X,
    Layers,
    MessageSquare,
} from "lucide-react";

interface AdminSidebarProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
    onLogout: () => void;
}

export default function AdminSidebar({ activeSection, setActiveSection, onLogout }: AdminSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = [
        { id: "leads", label: "Leads", icon: Inbox },
        { id: "requests", label: "Requests", icon: MessageSquare }, // Added Requests
        { id: "projects", label: "Projects", icon: Briefcase },
        { id: "packages", label: "Packages", icon: Layers },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    const handleSelect = (id: string) => {
        setActiveSection(id);
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-6 bg-black text-white border-b border-white/10 sticky top-0 z-[100]">
                <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 italic">H8 Console</p>
                    <h2 className="text-xl font-black uppercase tracking-tighter">Hatch8Studios</h2>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 hover:bg-white/5 rounded-xl transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar / Drawer */}
            <div className={`
                fixed inset-y-0 left-0 z-[150] w-80 bg-black text-white p-8 flex flex-col shrink-0 transition-transform duration-500 ease-in-out
                md:relative md:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="hidden md:block mb-16">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 text-white/30 italic">H8 Console</p>
                    <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">Hatch8Studios</h2>
                </div>

                <nav className="flex-1 space-y-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleSelect(item.id)}
                                className={`w-full group flex items-center justify-between p-4 transition-all ${isActive
                                    ? 'bg-white text-black rounded-xl'
                                    : 'hover:bg-white/5 rounded-xl'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <Icon size={20} className={isActive ? 'text-black' : 'text-white/40 group-hover:text-white'} />
                                    <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                                </div>
                                {isActive && <motion.div layoutId="active-nav"><ArrowRight size={14} /></motion.div>}
                            </button>
                        );
                    })}
                </nav>

                <div className="pt-8 border-t border-white/10">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-4 p-4 text-white/40 hover:text-red-500 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="text-[11px] font-black uppercase tracking-widest">Logout</span>
                    </button>
                </div>
            </div>

            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[140] md:hidden"
                    />
                )}
            </AnimatePresence>
        </>
    );
}
