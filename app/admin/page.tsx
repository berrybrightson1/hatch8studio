"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "@/components/admin/AdminSidebar";
import LeadManager from "@/components/admin/LeadManager";
import ProjectManager from "@/components/admin/ProjectManager";
import PackageManager from "@/components/admin/PackageManager";
import Toaster from "@/components/ui/Toaster";

export default function AdminDashboard() {
    const [activeSection, setActiveSection] = useState("leads");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const auth = localStorage.getItem("h8_admin_auth");
        if (!auth) {
            router.push("/admin/login");
        } else {
            setLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("h8_admin_auth");
        router.push("/admin/login");
    };

    if (loading) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">
            <AdminSidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                onLogout={handleLogout}
            />

            <main className="flex-1 overflow-hidden p-6 md:p-16">
                <div className="max-w-[1600px] h-full mx-auto flex flex-col">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex-1 min-h-0"
                        >
                            {activeSection === "leads" && <LeadManager />}
                            {activeSection === "projects" && <ProjectManager />}
                            {activeSection === "packages" && <PackageManager />}
                            {activeSection === "settings" && (
                                <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-black/5 rounded-3xl md:rounded-[3rem] p-8 text-center">
                                    <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter opacity-10">Console v1.0</h2>
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mt-4">System Settings Coming Soon</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            <Toaster />
        </div>
    );
}
