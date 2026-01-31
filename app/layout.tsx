import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Hatch8 Studios | Digital Creative Agency",
    description: "Multi-disciplinary creative studio specializing in 3D Motion, Video Editing, and Design.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-white text-[#111111] antialiased`}>
                {children}
            </body>
        </html>
    );
}
