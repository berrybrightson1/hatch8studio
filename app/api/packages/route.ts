export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Package from "@/models/Package";

const DEFAULT_PACKAGES = [
    {
        _id: "starter",
        name: "Starter",
        price: "$1,499",
        features: ["4 Graphic Designs / Mo", "1 Video Edit (Short)", "Unlimited Revisions", "2-Day Turnaround"],
        tag: "Essential",
        order: 0,
        active: true
    },
    {
        _id: "pro",
        name: "Pro",
        price: "$2,999",
        features: ["10 Graphic Designs / Mo", "4 Video Edits", "1 3D Model / Animation", "1-Day Turnaround", "Direct Slack Access"],
        tag: "Most Popular",
        order: 1,
        active: true
    },
    {
        _id: "agency",
        name: "Agency",
        price: "$4,999",
        features: ["Unlimited Design", "Unlimited Video", "Unlimited 3D", "Priority Support", "Dedicated Creative Director"],
        tag: "Enterprise",
        order: 2,
        active: true
    }
];

export async function GET(): Promise<NextResponse> {
    try {
        const db = await dbConnect();
        if (!db) {
            return NextResponse.json({ success: true, packages: DEFAULT_PACKAGES });
        }

        let activePackages = await Package.find({ active: true }).sort({ order: 1 });

        if (activePackages.length === 0) {
            await Package.insertMany(DEFAULT_PACKAGES);
            activePackages = await Package.find({ active: true }).sort({ order: 1 });
        }

        return NextResponse.json({ success: true, packages: activePackages });
    } catch (error) {
        console.error("Database error, using static packages:", error);
        return NextResponse.json({ success: true, packages: DEFAULT_PACKAGES });
    }
}
