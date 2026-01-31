export interface Project {
    id: string;
    title: string;
    category: string;
    thumbnail: string;
    videoPreview?: string;
    description?: string;
    year: string;
    client?: string;
    services: string[];
}

export const projects: Project[] = [
    {
        id: "1",
        title: "Future Vision",
        category: "3D Animation",
        year: "2024",
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        videoPreview: "/reels/sample.mp4",
        description: "A comprehensive exploration of futuristic urban environments using advanced 3D motion techniques.",
        services: ["3D Animation", "Spatial Sound", "Art Direction"]
    },
    {
        id: "2",
        title: "Brand Identity",
        category: "Graphic Design",
        year: "2024",
        thumbnail: "https://images.unsplash.com/photo-1635405074683-96d6921a2a2c?q=80&w=2538&auto=format&fit=crop",
        description: "Minimalist brand visual system for a high-end luxury fashion house.",
        services: ["Brand Strategy", "Visual Identity", "Typography"]
    },
    {
        id: "3",
        title: "Motion Reel",
        category: "Video Editing",
        year: "2024",
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        description: "A fast-paced kinetic typography and video editing showreel.",
        services: ["Video Production", "Sound Design"]
    },
    {
        id: "4",
        title: "Spatial Design",
        category: "3D Modeling",
        year: "2023",
        thumbnail: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2564&auto=format&fit=crop",
        description: "Architectural visualization of a conceptual minimal gallery space.",
        services: ["3D Modeling", "Lighting Design"]
    },
    {
        id: "5",
        title: "Abstract Flow",
        category: "3D Motion",
        year: "2023",
        thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
        description: "Fluid simulation and procedural animation studies.",
        services: ["Cloth Simulation", "Particle Effects"]
    },
    {
        id: "6",
        title: "Minimal Type",
        category: "Graphic Design",
        year: "2023",
        thumbnail: "https://images.unsplash.com/photo-1614850523011-8f49ffc73908?q=80&w=2670&auto=format&fit=crop",
        description: "Editorial design focused on Swiss typography principles.",
        services: ["Editorial", "Graphic Design"]
    },
    {
        id: "7",
        title: "Cinematic Landscape",
        category: "Video Editing",
        year: "2022",
        thumbnail: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2683&auto=format&fit=crop",
        description: "Short film focusing on the relationship between urban development and nature.",
        services: ["Directing", "Color Grading"]
    },
    {
        id: "8",
        title: "Metaverse Concept",
        category: "3D Animation",
        year: "2022",
        thumbnail: "https://images.unsplash.com/photo-1614728263952-84ea206f0c41?q=80&w=2574&auto=format&fit=crop",
        description: "UX/UI motion concepts for future spatial computing environments.",
        services: ["3D Animation", "Spatial UI"]
    }
];
