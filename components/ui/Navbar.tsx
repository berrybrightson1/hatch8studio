"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const navLinks = [
        { name: "Work", href: "/#work" },
        { name: "Services", href: "/#services" },
        { name: "Pricing", href: "/#pricing" },
        { name: "Contact", href: "/#contact" },
    ];

    return (
        <>
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
                scrolled ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-8"
            )}>
                <div className="max-w-[1800px] mx-auto px-8 md:px-12 flex items-center justify-between">
                    <Link href="/" className="hover:opacity-70 transition-opacity flex items-center gap-3">
                        <img
                            src="/Logo/Hatch8Studio-logo-7.png"
                            alt="Hatch8 Studios Logo"
                            className="h-8 md:h-12 w-auto"
                        />
                        <span className="text-xl md:text-2xl font-black tracking-[-0.05em] text-white">HATCH8STUDIO</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 hover:text-[#E8942A] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="#contact"
                            className="hidden md:block bg-[#E8942A] text-black px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all transform active:scale-95 whitespace-nowrap"
                        >
                            Inquire
                        </Link>

                        {/* Mobile Toggle */}
                        {!isOpen && (
                            <button
                                className="md:hidden flex items-center p-2 text-white"
                                onClick={() => setIsOpen(true)}
                                aria-label="Open menu"
                            >
                                <Menu size={24} />
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-0 w-full h-[100dvh] bg-[#0a0a0a] z-[200] flex flex-col transition-all duration-500 ease-in-out px-8 py-12",
                isOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-full"
            )}>
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-20">
                    <Link href="/" onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity flex items-center gap-3">
                        <img
                            src="/Logo/Hatch8Studio-logo-7.png"
                            alt="Hatch8 Studios Logo"
                            className="h-10 w-auto"
                        />
                        <span className="text-2xl font-black tracking-[-0.05em] text-white">HATCH8STUDIO</span>
                    </Link>
                    <button
                        className="flex items-center p-2 text-white"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Mobile Links */}
                <div className="flex-1 flex flex-col space-y-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-4xl font-black uppercase tracking-tighter text-white hover:text-[#E8942A] transition-all"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

            </div>
        </>
    );
};
