import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/ui/Hero";
import { WorkGrid } from "@/components/ui/WorkGrid";
import { Pricing } from "@/components/ui/Pricing";
import { ContactForm } from "@/components/ui/ContactForm";

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <WorkGrid />
            <Pricing />
            <ContactForm />

            <footer className="py-20 border-t border-gray-100 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">© 2026 Hatch8 Studios. All Rights Reserved.</p>
            </footer>
        </main>
    );
}
