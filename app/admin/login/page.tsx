"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple password check for the minimalist version
        if (password === "hatch8") {
            localStorage.setItem("h8_admin_auth", "true");
            router.push("/admin");
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-12 text-center">Admin Access</h1>
                <form onSubmit={handleLogin} className="space-y-8">
                    <div>
                        <input
                            type="password"
                            placeholder="PASSWORD"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full bg-transparent border-b-2 ${error ? 'border-red-500' : 'border-black'} py-4 text-2xl font-black uppercase tracking-widest text-center focus:outline-none transition-colors mb-4`}
                            autoFocus
                        />
                        {error && (
                            <p className="text-[10px] font-black uppercase tracking-widest text-red-500 text-center">Invalid Access Code</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-6 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-gray-800 transition-all"
                    >
                        Enter Console
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
