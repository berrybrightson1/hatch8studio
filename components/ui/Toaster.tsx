"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

let toastFn: (message: string, type: ToastType) => void;

export const showToast = (message: string, type: ToastType = "success") => {
    if (toastFn) toastFn(message, type);
};

export default function Toaster() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        toastFn = (message, type) => {
            const id = Math.random().toString(36).substr(2, 9);
            setToasts((prev) => [...prev, { id, message, type }]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 4000);
        };
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div className="fixed bottom-8 right-8 z-[1000] flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        layout
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="group relative flex items-center gap-4 bg-black text-white px-6 py-4 rounded-2xl shadow-2xl min-w-[320px] overflow-hidden"
                    >
                        {/* Progress Bar */}
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 4, ease: "linear" }}
                            className={`absolute bottom-0 left-0 h-1 ${toast.type === 'success' ? 'bg-[#E5FF00]' :
                                toast.type === 'error' ? 'bg-red-500' :
                                    'bg-blue-500'
                                }`}
                        />

                        <div className={`${toast.type === 'success' ? 'text-[#E5FF00]' :
                            toast.type === 'error' ? 'text-red-500' :
                                'text-blue-500'
                            }`}>
                            {toast.type === 'success' && <CheckCircle size={20} />}
                            {toast.type === 'error' && <XCircle size={20} />}
                            {toast.type === 'info' && <Info size={20} />}
                        </div>

                        <p className="text-[11px] font-black uppercase tracking-widest flex-1">
                            {toast.message}
                        </p>

                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-white/40 hover:text-white transition-colors"
                            aria-label="Remove notification"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
