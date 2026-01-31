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
        let allPackages = await Package.find({}).sort({ order: 1 });

        const totalCount = await Package.countDocuments();
        if (totalCount === 0) {
            await Package.insertMany(DEFAULT_PACKAGES);
            allPackages = await Package.find({}).sort({ order: 1 });
        }

        return NextResponse.json({ success: true, packages: allPackages });
    } catch (error) {
        return NextResponse.json({ success: true, packages: DEFAULT_PACKAGES });
    }
}

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const db = await dbConnect();
        const body = await req.json();
        if (!db) return NextResponse.json({ success: true, package: { ...body, _id: "temp" } });
        const pkg = await Package.create(body);
        return NextResponse.json({ success: true, package: pkg });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to create package" }, { status: 500 });
    }
}

export async function PUT(req: Request): Promise<NextResponse> {
    try {
        const db = await dbConnect();
        const { id, ...updateData } = await req.json();
        if (!db) return NextResponse.json({ success: true, package: { ...updateData, _id: id } });
        const pkg = await Package.findByIdAndUpdate(id, updateData, { new: true });
        return NextResponse.json({ success: true, package: pkg });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to update package" }, { status: 500 });
    }
}

export async function DELETE(req: Request): Promise<NextResponse> {
    try {
        const db = await dbConnect();
        const { id } = await req.json();
        if (!db) return NextResponse.json({ success: true });
        await Package.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to delete package" }, { status: 500 });
    }
}
