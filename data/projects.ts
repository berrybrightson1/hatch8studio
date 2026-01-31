
export interface Project {
    id: string;
    title: string;
    category: string;
    thumbnail: string;
    videoPreview?: string;
    year: string;
}

export const PROJECTS: Project[] = [
    {
        id: "1",
        title: "Nike Air Max",
        category: "3D Motion",
        // OPTION 1: External Link (Good for hosting elsewhere)
        thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
        // OPTION 2: Local File (Put file in public/images/projects folder)
        // thumbnail: "/images/projects/nike-thumb.jpg", 
        year: "2024"
    },
    {
        id: "2",
        title: "Kith x Versace",
        category: "Campaign",
        thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
        year: "2024"
    },
    {
        id: "3",
        title: "Spotify Wrapped",
        category: "Motion Graphics",
        thumbnail: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1974&auto=format&fit=crop",
        year: "2023"
    },
    {
        id: "4",
        title: "Rimowa",
        category: "Product Design",
        thumbnail: "https://images.unsplash.com/photo-1565058686692-0b809854dc69?q=80&w=1932&auto=format&fit=crop",
        year: "2023"
    },
    {
        id: "5",
        title: "Porsche 911",
        category: "Automotive",
        thumbnail: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop",
        year: "2023"
    },
    {
        id: "6",
        title: "Off-White",
        category: "Brand Identity",
        thumbnail: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop",
        year: "2022"
    }
];
