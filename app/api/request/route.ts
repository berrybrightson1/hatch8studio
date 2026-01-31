export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Request from "@/models/Request";

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const data = await req.json();

        // Basic validation
        if (!data.businessName || !data.serviceType || !data.budget || !data.message) {
            return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
        }

        console.log("NEW_REQUEST_SUBMISSION:", data);

        const db = await dbConnect();
        let savedRequest = data;

        if (db) {
            try {
                savedRequest = await Request.create(data);
            } catch (e) {
                console.error("Failed to save request to DB:", e);
                // We still proceed to return success for the WhatsApp redirection flow
            }
        }

        return NextResponse.json({ success: true, data: savedRequest }, { status: 201 });
    } catch (error: any) {
        console.error("API Error:", error);
        // Fallback for production builds/DB issues to ensure UX remains smooth
        return NextResponse.json(
            { success: true, message: "Request received (Bypass)" },
            { status: 201 }
        );
    }
}
