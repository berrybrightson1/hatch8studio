"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MessageSquare, Briefcase, DollarSign, Clock, X, Check, Copy } from "lucide-react";
import { showToast } from "@/components/ui/Toaster";

interface Request {
    _id: string;
    businessName: string;
    serviceType: "Graphic Design" | "Video Editing" | "3D Modeling";
    budget: string;
    message: string;
    status: string;
    createdAt: string;
}

export default function RequestManager() {
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            // Since we implemented the API at /api/request for POST, 
            // we should probably add a GET endpoint there or create a new admin route.
            // For now, let's assume we use /api/request for fetching too or a dedicated admin route.
            // Given the pattern, I'll use /api/admin/requests if I create it, or reuse /api/request if safe.
            // Wait, I only created POST at /api/request. I need to create a GET endpoint.
            // I'll create /api/admin/requests/route.ts in the next step.
            const res = await fetch("/api/admin/requests");
            const data = await res.json();
            if (data.success) {
                setRequests(data.requests);
            }
        } catch (error) {
            console.error("Failed to fetch requests", error);
        } finally {
            setLoading(false);
        }
    };

    const handleWhatsAppReply = (req: Request) => {
        const message = `Hello ${req.businessName}, regarding your ${req.serviceType} request...`;
        const url = `https://wa.me/233540958230?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    const filteredRequests = requests.filter(r =>
        r.businessName.toLowerCase().includes(search.toLowerCase()) ||
        r.serviceType.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between mb-8 md:mb-12">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">Inquiries</h2>
                <div className="relative hidden md:block">
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="SEARCH..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-black/5 rounded-xl pl-10 pr-6 py-2 text-[10px] font-black uppercase tracking-widest focus:ring-2 ring-black/10 outline-none w-64"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-20">
                    {filteredRequests.map((req) => (
                        <div key={req._id} className="bg-white border-2 border-black/5 hover:border-black rounded-3xl p-6 md:p-8 flex flex-col transition-all group shadow-sm hover:shadow-xl">
                            <div className="flex justify-between items-start mb-6">
                                <span className="bg-black text-[9px] font-black uppercase tracking-widest text-white px-3 py-1 rounded-lg">
                                    {req.serviceType}
                                </span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">
                                    {new Date(req.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{req.businessName}</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#E8942A] mb-6 flex items-center gap-2">
                                <DollarSign size={12} strokeWidth={3} /> {req.budget}
                            </p>

                            <p className="text-xs font-medium text-gray-600 italic mb-8 line-clamp-3">
                                "{req.message}"
                            </p>

                            <div className="mt-auto pt-6 border-t border-black/5">
                                <button
                                    onClick={() => handleWhatsAppReply(req)}
                                    className="w-full bg-[#25D366] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all"
                                >
                                    <MessageSquare size={16} fill="currentColor" /> Reply via WhatsApp
                                </button>
                            </div>
                        </div>
                    ))}
                    {filteredRequests.length === 0 && (
                        <div className="col-span-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-black/5 rounded-3xl text-gray-300">
                            <p className="text-[10px] font-black uppercase tracking-widest">No requests found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
