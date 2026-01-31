"use client";

import React, { useState } from "react";
import { MinimalButton } from "./MinimalButton";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, ChevronDown, ArrowRight } from "lucide-react";

export const ContactForm = () => {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        brandName: "",
        contactName: "",
        email: "",
        whatsapp: "",
        serviceInterest: "Full Package",
        pricingTier: "Pro",
        projectDescription: "",
    });
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    React.useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isDrawerOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) setStatus("success");
            else setStatus("error");
        } catch (error) {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="py-32 px-8 md:px-12 bg-black text-white min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 italic text-[#E8942A]">Received.</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50">We'll be in touch within 24 hours.</p>
                    <MinimalButton
                        className="mt-12 bg-white text-black border-none px-12 py-4 hover:bg-[#E8942A] transition-colors"
                        onClick={() => setStatus("idle")}
                    >
                        Send Another
                    </MinimalButton>
                </div>
            </div>
        );
    }

    return (
        <section id="contact" className="py-24 px-8 md:px-12 bg-white">
            <div className="max-w-[1800px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-[#E8942A]">Phase 01</p>
                        <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-12">
                            Start <br /> something <br /> <span className="italic">real.</span>
                        </h2>

                        <div className="space-y-12">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-30">Our Office</p>
                                <p className="text-xl font-black uppercase tracking-tight">Accra, Ghana / Remote</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-30">Say Hello</p>
                                <p className="text-xl font-black uppercase tracking-tight underline cursor-pointer hover:opacity-50 transition-opacity">hello@hatch8.studio</p>
                            </div>
                        </div>

                        {/* Mobile Trigger */}
                        <div className="mt-12 lg:hidden">
                            <button
                                onClick={() => setIsDrawerOpen(true)}
                                className="w-full py-8 border-2 border-black flex flex-col items-center gap-4 group hover:bg-black hover:text-white transition-all rounded-3xl"
                                aria-label="Open inquiry drawer"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 group-hover:opacity-100 transition-opacity">Got enquiries?</span>
                                <span className="text-2xl italic group-hover:translate-y-[-4px] transition-transform animate-bounce mt-2">
                                    <ChevronDown size={32} />
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Desktop Form (Visible on Large Screens) */}
                    <form onSubmit={handleSubmit} className="hidden lg:block space-y-12">
                        <FormInner formData={formData} setFormData={setFormData} status={status} />
                    </form>
                </div>
            </div>

            {/* Mobile Form Drawer */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[200] bg-white md:hidden overflow-y-auto px-8 py-12"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-3xl font-black uppercase tracking-tighter">Inquiry</h2>
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="p-4 rounded-full border border-black/5 hover:bg-black hover:text-white transition-all"
                                aria-label="Close inquiry form"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-12">
                            <FormInner formData={formData} setFormData={setFormData} status={status} />
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

const FormInner = ({ formData, setFormData, status }: any) => (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FormField
                label="Brand Name"
                placeholder="Your Company"
                value={formData.brandName}
                onChange={(val: string) => setFormData({ ...formData, brandName: val })}
            />
            <FormField
                label="Your Name"
                placeholder="John Doe"
                value={formData.contactName}
                onChange={(val: string) => setFormData({ ...formData, contactName: val })}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FormField
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(val: string) => setFormData({ ...formData, email: val })}
            />
            <FormField
                label="WhatsApp"
                placeholder="+233..."
                value={formData.whatsapp}
                onChange={(val: string) => setFormData({ ...formData, whatsapp: val })}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <CustomDropdown
                label="Service"
                options={["Graphic Design", "Video Editing", "3D Modeling", "Full Package"]}
                value={formData.serviceInterest}
                onChange={(val) => setFormData({ ...formData, serviceInterest: val })}
            />
            <CustomDropdown
                label="Expected Tier"
                options={["Starter", "Pro", "Agency", "Custom"]}
                value={formData.pricingTier}
                onChange={(val) => setFormData({ ...formData, pricingTier: val })}
            />
        </div>

        <FormField
            label="Project Brief"
            placeholder="Tell us about your vision..."
            isTextArea
            value={formData.projectDescription}
            onChange={(val: string) => setFormData({ ...formData, projectDescription: val })}
        />

        <div className="pt-8">
            <button
                type="submit"
                disabled={status === "loading"}
                className="bg-black text-white w-full py-8 text-[12px] font-black uppercase tracking-[0.5em] hover:bg-[#E8942A] hover:text-black transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
            >
                {status === "loading" ? "Processing..." : "Submit Inquiry"}
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform italic" />
            </button>
            {status === "error" && (
                <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mt-4 text-center">Something went wrong. Please try again.</p>
            )}
        </div>
    </>
);

const CustomDropdown = ({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (val: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-full">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 block opacity-30">{label}</label>
            <div
                className="w-full bg-transparent border-b-2 border-black py-4 text-xl font-black uppercase tracking-tight flex items-center justify-between cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={cn(!value && "text-gray-200")}>{value || "Select..."}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={20} className="opacity-30" />
                </motion.div>
            </div>

            <motion.div
                initial={false}
                animate={isOpen ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: -10, pointerEvents: "none" }}
                className="absolute top-full left-0 right-0 z-[50] mt-2 bg-white border-2 border-black rounded-2xl overflow-hidden shadow-2xl"
            >
                {options.map((option) => (
                    <div
                        key={option}
                        className={cn(
                            "px-6 py-4 text-sm font-black uppercase tracking-widest cursor-pointer transition-colors",
                            value === option ? "bg-[#E8942A] text-black" : "hover:bg-gray-50 text-black/60 hover:text-black"
                        )}
                        onClick={() => {
                            onChange(option);
                            setIsOpen(false);
                        }}
                    >
                        {option}
                    </div>
                ))}
            </motion.div>

            {isOpen && <div className="fixed inset-0 z-[40]" onClick={() => setIsOpen(false)} />}
        </div>
    );
};

const FormField = ({ label, type = "text", placeholder, isTextArea, value, onChange }: any) => (
    <div className="w-full">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 block opacity-30">{label}</label>
        {isTextArea ? (
            <textarea
                className="w-full bg-transparent border-b-2 border-black py-4 text-xl font-black uppercase tracking-tight focus:outline-none min-h-[120px] resize-none placeholder:text-gray-200"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
            />
        ) : (
            <input
                type={type}
                className="w-full bg-transparent border-b-2 border-black py-4 text-xl font-black uppercase tracking-tight focus:outline-none placeholder:text-gray-200"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
            />
        )}
    </div>
);
