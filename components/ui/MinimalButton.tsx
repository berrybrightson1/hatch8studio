"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface MinimalButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "solid" | "outline";
}

export const MinimalButton = ({
    children,
    className,
    variant = "solid",
    ...props
}: MinimalButtonProps) => {
    return (
        <button
            className={cn(
                "px-6 py-3 font-bold uppercase tracking-tighter text-sm transition-all duration-200",
                variant === "solid"
                    ? "bg-black text-white hover:bg-white hover:text-black border-2 border-black"
                    : "bg-transparent text-black border-2 border-black hover:bg-black hover:text-white",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
