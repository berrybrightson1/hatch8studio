"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        businessName: "",
        serviceType: "Graphic Design",
        budget: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            // Updated to use the new /api/request endpoint that saves to Request model
            const res = await fetch("/api/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");

                // WhatsApp Redirection Flow
                const message = `Hello Hatch8, I have a request for ${formData.serviceType}.\n\nBusiness: ${formData.businessName}\nBudget: ${formData.budget}\nMessage: ${formData.message}`;
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/233540958230?text=${encodedMessage}`;

                // Small delay to show success state, then jump to WhatsApp
                setTimeout(() => {
                    window.open(whatsappUrl, "_blank");
                    setStatus("idle");
                }, 1000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    const FormField = ({ label, placeholder, value, onChange }: { label: string; placeholder: string; value: string; onChange: (val: string) => void }) => (
        <div className="w-full">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 block opacity-30">{label}</label>
            <input
                type="text"
                className="w-full bg-transparent border-b-2 border-black py-4 text-xl font-black uppercase tracking-tight focus:outline-none placeholder:text-gray-200"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
            />
        </div>
    );

    return (
        <section className="py-24 px-8 md:px-12 bg-white" id="request">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-[#E8942A]">Get Started</p>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
                        Request <br /> a <span className="italic">service.</span>
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <FormField
                            label="Business Name"
                            placeholder="Your Brand"
                            value={formData.businessName}
                            onChange={(val) => setFormData({ ...formData, businessName: val })}
                        />
                        <div className="relative w-full">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 block opacity-30">Service Type</label>
                            <select
                                className="w-full bg-transparent border-b-2 border-black py-4 text-xl font-black uppercase tracking-tight focus:outline-none appearance-none cursor-pointer"
                                value={formData.serviceType}
                                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                            >
                                <option value="Graphic Design">Graphic Design</option>
                                <option value="Video Editing">Video Editing</option>
                                <option value="3D Modeling">3D Modeling</option>
                            </select>
                            <div className="absolute right-0 bottom-4 pointer-events-none">
                                <ChevronDown size={20} className="opacity-30" />
                            </div>
                        </div>
                    </div>

                    <FormField
                        label="Budget Range"
                        placeholder="e.g. $1,000 - $5,000"
                        value={formData.budget}
                        onChange={(val) => setFormData({ ...formData, budget: val })}
                    />

                    <div className="w-full">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 block opacity-30">Message</label>
                        <textarea
                            className="w-full bg-transparent border-b-2 border-black py-4 text-xl font-black uppercase tracking-tight focus:outline-none min-h-[120px] resize-none placeholder:text-gray-200"
                            placeholder="Tell us about your project..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                        />
                    </div>

                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="bg-black text-white w-full py-8 text-[12px] font-black uppercase tracking-[0.5em] hover:bg-[#E8942A] hover:text-black transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
                        >
                            {status === "loading" ? "Processing..." : status === "success" ? "Sent Successfully!" : "Save & Switch to WhatsApp"}
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                        {status === "error" && (
                            <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mt-4 text-center">Something went wrong. Please try again.</p>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}
