export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Request from "@/models/Request";

const DEFAULT_REQUESTS = [
    {
        _id: "demo_1",
        businessName: "Quantum Coffee",
        serviceType: "Graphic Design",
        budget: "$1,000 - $3,000",
        message: "We need a complete rebrand including logo, packaging, and social media assets.",
        status: "New",
        createdAt: new Date().toISOString()
    },
    {
        _id: "demo_2",
        businessName: "EcoTech Sol",
        serviceType: "3D Modeling",
        budget: "$5,000+",
        message: "Looking for a 3D product visualization for our new solar panel prototype.",
        status: "New",
        createdAt: new Date().toISOString()
    }
];

export async function GET(): Promise<NextResponse> {
    try {
        const db = await dbConnect();

        // Static Fallback if DB is disconnected (for Build/Demo)
        if (!db) {
            return NextResponse.json({ success: true, requests: DEFAULT_REQUESTS });
        }

        const requests = await Request.find({}).sort({ createdAt: -1 });

        // Optional: Seed with demo data if empty/new DB
        const count = await Request.countDocuments();
        if (count === 0) {
            // Uncomment to auto-seed
            // await Request.insertMany(DEFAULT_REQUESTS);
            return NextResponse.json({ success: true, requests: [] });
        }

        return NextResponse.json({ success: true, requests });
    } catch (error: any) {
        // Fail gracefully to static data
        return NextResponse.json({ success: true, requests: DEFAULT_REQUESTS });
    }
}
