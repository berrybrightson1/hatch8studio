"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Filter,
    MoreVertical,
    CheckCircle,
    Clock,
    AlertCircle,
    User,
    Mail,
    Phone,
    Briefcase,
    Calendar,
    ChevronRight,
    MessageSquare,
    Inbox,
    X
} from "lucide-react";
import { showToast } from "@/components/ui/Toaster";

interface Lead {
    _id: string;
    brandName: string;
    contactName: string;
    email: string;
    whatsapp: string;
    serviceInterest: string;
    pricingTier: string;
    projectDescription?: string;
    status: "New" | "Contacted" | "Proposal Sent" | "Closed - Won" | "Closed - Lost";
    createdAt: string;
}

export default function LeadManager() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await fetch("/api/admin/leads");
            const data = await res.json();
            if (data.success) {
                setLeads(data.leads);
            }
        } catch (error) {
            showToast("Failed to fetch leads", "error");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch("/api/admin/leads", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });
            const data = await res.json();
            if (data.success) {
                setLeads(leads.map(l => l._id === id ? { ...l, status: newStatus as any } : l));
                if (selectedLead?._id === id) {
                    setSelectedLead({ ...selectedLead, status: newStatus as any });
                }
                showToast(`Status updated to ${newStatus}`, "success");
            }
        } catch (error) {
            showToast("Update failed", "error");
        }
    };

    const filteredLeads = leads
        .filter(l => filter === "all" || l.status === filter)
        .filter(l =>
            l.brandName.toLowerCase().includes(search.toLowerCase()) ||
            l.contactName.toLowerCase().includes(search.toLowerCase())
        );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "New": return "text-blue-500 border-blue-500/20 bg-blue-500/5";
            case "Contacted": return "text-yellow-600 border-yellow-600/20 bg-yellow-600/5";
            case "Proposal Sent": return "text-purple-600 border-purple-600/20 bg-purple-600/5";
            case "Closed - Won": return "text-[#E5FF00] border-[#E5FF00]/20 bg-[#E5FF00]/5";
            case "Closed - Lost": return "text-red-500 border-red-500/20 bg-red-500/5";
            default: return "text-gray-400 border-gray-400/20 bg-gray-400/5";
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-full gap-8 relative overflow-hidden">
            {/* List Side */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="flex items-center justify-between mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">Inquiry Flow</h2>
                    <div className="hidden md:block">
                        <div className="relative">
                            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="SEARCH BRANDS..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-black/5 rounded-xl pl-10 pr-6 py-2 text-[10px] font-black uppercase tracking-widest focus:ring-2 ring-black/10 outline-none w-64"
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden relative mb-8">
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="SEARCH..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-black/5 rounded-xl pl-10 pr-6 py-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 ring-black/10 outline-none"
                    />
                </div>

                <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
                    {["all", "New", "Contacted", "Proposal Sent", "Closed - Won", "Closed - Lost"].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-6 py-2 rounded-xl border-2 text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === s ? 'bg-black text-white border-black' : 'border-black/5 hover:border-black'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    {loading ? (
                        <div className="h-full flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : filteredLeads.length === 0 ? (
                        <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-black/5 rounded-3xl text-gray-300">
                            <Inbox size={48} strokeWidth={1} className="mb-4" />
                            <p className="text-[10px] font-black uppercase tracking-widest">No inquiries found</p>
                        </div>
                    ) : (
                        filteredLeads.map((lead) => (
                            <motion.div
                                layoutId={lead._id}
                                key={lead._id}
                                onClick={() => setSelectedLead(lead)}
                                className={`group p-6 md:p-8 rounded-3xl border-2 transition-all cursor-pointer ${selectedLead?._id === lead._id
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white border-black/5 hover:border-black'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${selectedLead?._id === lead._id ? 'border-white/20 text-white' : getStatusColor(lead.status)
                                            }`}>
                                            {lead.status}
                                        </span>
                                        <span className={`text-[9px] font-black uppercase tracking-widest opacity-30`}>
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-1 select-none">
                                    {lead.brandName}
                                </h3>
                                <p className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ${selectedLead?._id === lead._id ? 'text-white/50' : 'text-black/30'
                                    }`}>
                                    {lead.contactName} • {lead.serviceInterest}
                                </p>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Detail Side (Overlay on mobile, sidebar on desktop) */}
            <AnimatePresence>
                {selectedLead && (
                    <div className="fixed inset-0 z-[200] lg:relative lg:inset-auto lg:z-0 lg:flex">
                        {/* Mobile Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedLead(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
                        />

                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            className="absolute right-0 bottom-0 top-0 w-[90%] md:w-[500px] lg:relative lg:w-[450px] bg-white border-l-2 border-black/5 p-6 md:p-10 flex flex-col shadow-2xl lg:shadow-none"
                        >
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-[#E5FF00] bg-black px-3 py-1 inline-block italics">Case File</p>
                                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">{selectedLead.brandName}</h2>
                                </div>
                                <button
                                    onClick={() => setSelectedLead(null)}
                                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                    aria-label="Close detail view"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 space-y-10 overflow-y-auto pr-2 scrollbar-hide no-scrollbar">
                                <section>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-black/20 mb-4 flex items-center gap-2">
                                        <User size={12} /> Contact Information
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 bg-black/5 p-4 rounded-2xl group hover:bg-black hover:text-white transition-all cursor-pointer">
                                            <Mail size={16} className="text-black/30 group-hover:text-white/50" />
                                            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest break-all">{selectedLead.email}</span>
                                        </div>
                                        <div className="flex items-center gap-4 bg-black/5 p-4 rounded-2xl group hover:bg-black hover:text-white transition-all cursor-pointer">
                                            <Phone size={16} className="text-black/30 group-hover:text-white/50" />
                                            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest">{selectedLead.whatsapp}</span>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-black/20 mb-4 flex items-center gap-2">
                                        <Briefcase size={12} /> Project Details
                                    </p>
                                    <div className="bg-black/5 p-6 rounded-3xl space-y-4">
                                        <div>
                                            <p className="text-[9px] font-black text-black/30 uppercase tracking-widest mb-1">Service</p>
                                            <p className="text-sm font-black uppercase">{selectedLead.serviceInterest}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-black/30 uppercase tracking-widest mb-1">Tier</p>
                                            <p className="text-sm font-black uppercase">{selectedLead.pricingTier}</p>
                                        </div>
                                        {selectedLead.projectDescription && (
                                            <div>
                                                <p className="text-[9px] font-black text-black/30 uppercase tracking-widest mb-1">Message</p>
                                                <p className="text-xs font-medium leading-relaxed italic">"{selectedLead.projectDescription}"</p>
                                            </div>
                                        )}
                                    </div>
                                </section>

                                <section>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-black/20 mb-4 flex items-center gap-2">
                                        <Clock size={12} /> Update Status
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["New", "Contacted", "Proposal Sent", "Closed - Won", "Closed - Lost"].map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => updateStatus(selectedLead._id, s)}
                                                className={`p-3 rounded-xl border-2 text-[9px] font-black uppercase tracking-widest transition-all ${selectedLead.status === s
                                                    ? 'bg-black text-white border-black'
                                                    : 'border-black/5 hover:border-black'
                                                    }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            <div className="pt-10 mt-auto border-t border-black/5">
                                <button
                                    className="w-full bg-[#E5FF00] text-black py-5 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:translate-y-[-1px] transition-all shadow-xl shadow-[#E5FF00]/20 border-2 border-[#E5FF00]"
                                >
                                    <MessageSquare size={14} strokeWidth={3} /> Contact Lead
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
