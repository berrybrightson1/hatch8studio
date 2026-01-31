"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Edit2,
    Trash2,
    Check,
    X,
    MoveUp,
    MoveDown,
    Layers,
    DollarSign,
    Tag
} from "lucide-react";
import { showToast } from "@/components/ui/Toaster";

interface Package {
    _id: string;
    name: string;
    price: string;
    features: string[];
    tag: string;
    order: number;
    active: boolean;
}

export default function PackageManager() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<Partial<Package> | null>(null);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const res = await fetch("/api/admin/packages");
            const data = await res.json();
            if (data.success) {
                setPackages(data.packages);
            }
        } catch (error) {
            showToast("Failed to fetch packages", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = selectedPackage?._id ? "PUT" : "POST";
        const body = selectedPackage?._id
            ? { id: selectedPackage._id, ...selectedPackage }
            : selectedPackage;

        try {
            const res = await fetch("/api/admin/packages", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (data.success) {
                showToast(selectedPackage?._id ? "Package updated" : "Package created", "success");
                setIsEditing(false);
                fetchPackages();
            }
        } catch (error) {
            showToast("Save failed", "error");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This will remove the package from the public site.")) return;
        try {
            const res = await fetch("/api/admin/packages", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (data.success) {
                showToast("Package deleted", "success");
                fetchPackages();
            }
        } catch (error) {
            showToast("Delete failed", "error");
        }
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...(selectedPackage?.features || [])];
        newFeatures[index] = value;
        setSelectedPackage({ ...selectedPackage, features: newFeatures });
    };

    const addFeature = () => {
        setSelectedPackage({
            ...selectedPackage,
            features: [...(selectedPackage?.features || []), ""]
        });
    };

    const removeFeature = (index: number) => {
        const newFeatures = [...(selectedPackage?.features || [])];
        newFeatures.splice(index, 1);
        setSelectedPackage({ ...selectedPackage, features: newFeatures });
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 md:mb-12">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">Package Command</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 mt-2">Manage Monthly Retainers</p>
                </div>
                <button
                    onClick={() => {
                        setSelectedPackage({ name: "", price: "", features: [""], tag: "", order: packages.length, active: true });
                        setIsEditing(true);
                    }}
                    className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-[#E5FF00] hover:text-black transition-all shadow-xl"
                >
                    <Plus size={16} /> New Package
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-y-auto pr-2 pb-12 no-scrollbar">
                {loading ? (
                    <div className="col-span-full h-64 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : packages.length === 0 ? (
                    <div className="col-span-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-black/5 rounded-3xl text-gray-300">
                        <Layers size={48} strokeWidth={1} className="mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest">No packages configured</p>
                    </div>
                ) : (
                    packages.map((pkg) => (
                        <div key={pkg._id} className="group relative bg-white border-2 border-black/5 rounded-3xl p-8 hover:border-black transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <span className="inline-block px-3 py-1 border border-black text-[8px] font-black uppercase tracking-[0.3em]">{pkg.tag || "Retainer"}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedPackage(pkg);
                                            setIsEditing(true);
                                        }}
                                        className="p-2 hover:bg-black hover:text-white rounded-lg transition-colors"
                                        title="Edit Package"
                                        aria-label="Edit Package"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pkg._id)}
                                        className="p-2 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                                        title="Delete Package"
                                        aria-label="Delete Package"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-2 italic">{pkg.name}</h3>
                            <p className="text-xl font-black mb-6">{pkg.price}</p>

                            <div className="space-y-3">
                                {pkg.features.slice(0, 3).map((f, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-black rounded-full" />
                                        <span className="text-[9px] font-black uppercase tracking-widest opacity-40 line-clamp-1">{f}</span>
                                    </div>
                                ))}
                                {pkg.features.length > 3 && (
                                    <p className="text-[8px] font-black uppercase tracking-widest opacity-20 mt-2">+{pkg.features.length - 3} more</p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {isEditing && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditing(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 md:p-8 border-b border-black/5 flex items-center justify-between">
                                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">
                                    {selectedPackage?._id ? 'Edit Package' : 'New Package'}
                                </h2>
                                <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-black/5 rounded-full" title="Close" aria-label="Close modal">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="pkg-name" className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 ml-2">Plan Name</label>
                                        <input
                                            id="pkg-name"
                                            type="text"
                                            value={selectedPackage?.name}
                                            onChange={(e) => setSelectedPackage({ ...selectedPackage, name: e.target.value })}
                                            className="w-full bg-black/5 border-2 border-transparent focus:border-black rounded-xl p-4 text-sm font-black uppercase outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 ml-2">Price String</label>
                                        <input
                                            type="text"
                                            value={selectedPackage?.price}
                                            onChange={(e) => setSelectedPackage({ ...selectedPackage, price: e.target.value })}
                                            className="w-full bg-black/5 border-2 border-transparent focus:border-black rounded-xl p-4 text-sm font-black uppercase outline-none transition-all"
                                            placeholder="$0,000"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 ml-2">Tag Line</label>
                                        <input
                                            type="text"
                                            value={selectedPackage?.tag}
                                            onChange={(e) => setSelectedPackage({ ...selectedPackage, tag: e.target.value })}
                                            className="w-full bg-black/5 border-2 border-transparent focus:border-black rounded-xl p-4 text-sm font-black uppercase outline-none transition-all"
                                            placeholder="ESSENTIAL"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="pkg-order" className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 ml-2">Display Order</label>
                                        <input
                                            id="pkg-order"
                                            type="number"
                                            value={selectedPackage?.order}
                                            onChange={(e) => setSelectedPackage({ ...selectedPackage, order: parseInt(e.target.value) })}
                                            className="w-full bg-black/5 border-2 border-transparent focus:border-black rounded-xl p-4 text-sm font-black uppercase outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 ml-2">Features</label>
                                        <button
                                            type="button"
                                            onClick={addFeature}
                                            className="p-1 hover:bg-black hover:text-white rounded transition-all"
                                            title="Add Feature"
                                            aria-label="Add Feature"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {selectedPackage?.features?.map((feature, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={feature}
                                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                    className="flex-1 bg-black/5 border-2 border-transparent focus:border-black rounded-xl p-4 text-[10px] font-black uppercase tracking-widest outline-none transition-all"
                                                    placeholder={`Feature ${index + 1}`}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeFeature(index)}
                                                    className="p-4 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                                    title="Remove Feature"
                                                    aria-label="Remove Feature"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4 pb-8">
                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-black text-white border-2 border-black rounded-xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#E5FF00] hover:text-black transition-all flex items-center justify-center gap-3 shadow-xl"
                                    >
                                        <Check size={14} strokeWidth={3} /> {selectedPackage?._id ? 'Update Package' : 'Create Package'}
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
