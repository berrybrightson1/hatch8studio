export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Request from "@/models/Request";

export async function GET(): Promise<NextResponse> {
    try {
        await dbConnect();

        const requests = await Request.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, requests });
    } catch (error: any) {
        console.error("Failed to fetch requests:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch requests" }, { status: 500 });
    }
}
