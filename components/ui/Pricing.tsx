"use client";

import React from "react";
import { MinimalButton } from "./MinimalButton";
import { Check } from "lucide-react";

const DEFAULT_PACKAGES = [
    {
        _id: "starter",
        name: "Starter",
        price: "$1,499",
        features: ["4 Graphic Designs / Mo", "1 Video Edit (Short)", "Unlimited Revisions", "2-Day Turnaround"],
        tag: "Essential",
        order: 0
    },
    {
        _id: "pro",
        name: "Pro",
        price: "$2,999",
        features: ["10 Graphic Designs / Mo", "4 Video Edits", "1 3D Model / Animation", "1-Day Turnaround", "Direct Slack Access"],
        tag: "Most Popular",
        order: 1
    },
    {
        _id: "agency",
        name: "Agency",
        price: "$4,999",
        features: ["Unlimited Design", "Unlimited Video", "Unlimited 3D", "Priority Support", "Dedicated Creative Director"],
        tag: "Enterprise",
        order: 2
    }
];

export const Pricing = () => {
    const packages = DEFAULT_PACKAGES;
    return (
        <section id="pricing" className="py-32 px-8 md:px-12 bg-white">
            <div className="max-w-[1800px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 border-b-2 border-black pb-8">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-gray-300">Scalable Creative</p>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Monthly <br /> Packages</h2>
                    </div>
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mt-6 md:mt-0 max-w-sm">Transparent pricing for high-speed creative output. No hidden fees. Cancel anytime.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black border-2 border-black min-h-[400px]">
                    {packages.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center bg-white p-24 text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Creative plans coming soon.</p>
                        </div>
                    ) : (
                        packages.map((plan) => (
                            <div key={plan._id} className="bg-white p-12 flex flex-col hover:bg-gray-50 transition-colors group">
                                <div className="mb-12">
                                    <span className="inline-block px-3 py-1 border border-black text-[9px] font-black uppercase tracking-[0.3em] mb-6">{plan.tag || "Creative"}</span>
                                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">{plan.name}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black">Reach Out</span>
                                        {/* <span className="text-gray-400 font-black uppercase text-[10px] tracking-widest">/month</span> */}
                                    </div>
                                </div>

                                <div className="flex-grow space-y-6 mb-16">
                                    {plan.features.map((feature: string, idx: number) => (
                                        <div key={idx} className="flex items-start gap-4">
                                            <div className="mt-1 w-2 h-2 bg-black rounded-full" />
                                            <span className="text-[11px] font-black uppercase tracking-widest text-gray-600 line-clamp-2">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <MinimalButton
                                    className="w-full py-6 text-[10px] font-black uppercase tracking-[0.4em] bg-black text-white hover:bg-[#E8942A] hover:text-black transition-all border-none rounded-xl"
                                    onClick={() => {
                                        window.dispatchEvent(new CustomEvent('selectPackage', { detail: plan.name }));
                                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Get Started
                                </MinimalButton>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};
