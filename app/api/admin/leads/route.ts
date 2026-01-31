export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function GET(): Promise<NextResponse> {
    try {
        const db = await dbConnect();
        if (!db) {
            return NextResponse.json({ success: true, leads: [] });
        }
        const leads = await Lead.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, leads });
    } catch (error: any) {
        return NextResponse.json({ success: true, leads: [] });
    }
}

export async function PUT(req: Request): Promise<NextResponse> {
    try {
        const { id, status } = await req.json();
        const db = await dbConnect();
        if (!db) return NextResponse.json({ success: true });

        const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });
        if (!lead) return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
        return NextResponse.json({ success: true, lead });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
